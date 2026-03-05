-- 1. Rate-limit function for checkout_leads
CREATE OR REPLACE FUNCTION public.check_checkout_lead_rate_limit(
  p_email text,
  p_cooldown_seconds integer DEFAULT 60
)
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

-- 2. Replace INSERT policy with rate-limited version
DROP POLICY IF EXISTS "Validated checkout lead inserts" ON public.checkout_leads;

CREATE POLICY "Validated rate-limited checkout lead inserts"
ON public.checkout_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(first_name) > 0
  AND char_length(first_name) <= 100
  AND char_length(email) > 0
  AND char_length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND check_checkout_lead_rate_limit(email, 60)
);