CREATE POLICY "Service role can update completed status"
ON public.checkout_leads
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);