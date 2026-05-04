
-- Create private schema not exposed to PostgREST
CREATE SCHEMA IF NOT EXISTS private;

-- Recreate functions in private schema
CREATE OR REPLACE FUNCTION private.check_lead_rate_limit(p_email text, p_source text, p_cooldown_seconds integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  last_submission TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT created_at INTO last_submission
  FROM public.leads
  WHERE email = p_email AND source = p_source
  ORDER BY created_at DESC
  LIMIT 1;

  IF last_submission IS NULL THEN
    RETURN TRUE;
  END IF;

  RETURN (EXTRACT(EPOCH FROM (NOW() - last_submission)) > p_cooldown_seconds);
END;
$$;

CREATE OR REPLACE FUNCTION private.check_checkout_lead_rate_limit(p_email text, p_cooldown_seconds integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  last_submission TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT created_at INTO last_submission
  FROM public.checkout_leads
  WHERE email = p_email
  ORDER BY created_at DESC
  LIMIT 1;

  IF last_submission IS NULL THEN
    RETURN TRUE;
  END IF;

  RETURN (EXTRACT(EPOCH FROM (NOW() - last_submission)) > p_cooldown_seconds);
END;
$$;

CREATE OR REPLACE FUNCTION private.mark_intake_completed(p_email text, p_source text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.leads
  SET happymd_completed = true, happymd_completed_at = now()
  WHERE id = (
    SELECT id FROM public.leads
    WHERE email = p_email AND source = p_source AND happymd_completed = false
    ORDER BY created_at DESC
    LIMIT 1
  );
  RETURN FOUND;
END;
$$;

-- Grant execute to anon/authenticated only on private schema functions (still needed for RLS evaluation)
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.check_lead_rate_limit(text, text, integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.check_checkout_lead_rate_limit(text, integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.mark_intake_completed(text, text) TO anon, authenticated, service_role;

-- Recreate RLS policies to reference the private schema functions
DROP POLICY IF EXISTS "Validated rate-limited lead inserts" ON public.leads;
CREATE POLICY "Validated rate-limited lead inserts"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (char_length(first_name) > 0) AND (char_length(first_name) <= 100)
  AND (char_length(email) > 0) AND (char_length(email) <= 255)
  AND (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
  AND ((phone IS NULL) OR (char_length(phone) <= 20))
  AND private.check_lead_rate_limit(email, source, 60)
);

DROP POLICY IF EXISTS "Validated rate-limited checkout lead inserts" ON public.checkout_leads;
CREATE POLICY "Validated rate-limited checkout lead inserts"
ON public.checkout_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (char_length(first_name) > 0) AND (char_length(first_name) <= 100)
  AND (char_length(email) > 0) AND (char_length(email) <= 255)
  AND (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
  AND private.check_checkout_lead_rate_limit(email, 60)
);

-- Drop the public-schema versions (no longer referenced)
DROP FUNCTION IF EXISTS public.check_lead_rate_limit(text, text, integer);
DROP FUNCTION IF EXISTS public.check_checkout_lead_rate_limit(text, integer);
DROP FUNCTION IF EXISTS public.mark_intake_completed(text, text);
