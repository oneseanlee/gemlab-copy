-- Re-create the triggers that fire notification emails on lead inserts
CREATE TRIGGER on_new_lead
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();

CREATE TRIGGER on_new_checkout_lead
  AFTER INSERT ON public.checkout_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_checkout_lead();