-- Remove duplicate triggers (keep only one per table)
DROP TRIGGER IF EXISTS on_new_lead_notify ON public.leads;
DROP TRIGGER IF EXISTS on_new_checkout_lead_notify ON public.checkout_leads;