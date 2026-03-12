CREATE POLICY "Service role can select leads"
ON public.leads
FOR SELECT
TO service_role
USING (true);