DROP POLICY IF EXISTS "Validated rate-limited lead inserts" ON public.leads;

CREATE POLICY "Validated rate-limited lead inserts"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (char_length(first_name) > 0)
  AND (char_length(first_name) <= 100)
  AND (char_length(email) > 0)
  AND (char_length(email) <= 255)
  AND (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)
  AND (phone IS NULL OR char_length(phone) <= 20)
  AND check_lead_rate_limit(email, source, 60)
);