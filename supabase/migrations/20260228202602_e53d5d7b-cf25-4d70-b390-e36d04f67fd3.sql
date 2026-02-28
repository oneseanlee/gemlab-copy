
-- 1. Add database constraints for input validation
ALTER TABLE public.leads 
  ADD CONSTRAINT valid_email 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.leads
  ADD CONSTRAINT reasonable_length
  CHECK (char_length(first_name) > 0 AND char_length(first_name) <= 100 AND char_length(email) > 0 AND char_length(email) <= 255);

-- 2. Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_lead_rate_limit(
  p_email TEXT,
  p_source TEXT,
  p_cooldown_seconds INTEGER DEFAULT 60
)
RETURNS BOOLEAN AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Replace permissive RLS policy with validated + rate-limited one
DROP POLICY "Anyone can insert leads" ON public.leads;

CREATE POLICY "Validated rate-limited lead inserts"
ON public.leads
FOR INSERT
WITH CHECK (
  char_length(first_name) > 0 AND char_length(first_name) <= 100
  AND char_length(email) > 0 AND char_length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND public.check_lead_rate_limit(email, source, 60)
);
