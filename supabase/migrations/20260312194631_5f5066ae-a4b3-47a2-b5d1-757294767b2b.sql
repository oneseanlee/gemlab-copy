ALTER TABLE public.checkout_leads ADD COLUMN utm_params jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.leads ADD COLUMN utm_params jsonb DEFAULT '{}'::jsonb;