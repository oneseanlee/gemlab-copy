CREATE POLICY "Service role can select checkout_leads"
ON public.checkout_leads
FOR SELECT
TO service_role
USING (true);