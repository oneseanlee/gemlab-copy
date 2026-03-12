-- Enable pg_net extension for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Function to notify on new lead
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM extensions.http_post(
    url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL') || '/functions/v1/send-lead-notification',
    body := jsonb_build_object(
      'type', 'lead',
      'record', jsonb_build_object(
        'first_name', NEW.first_name,
        'email', NEW.email,
        'source', NEW.source,
        'created_at', NEW.created_at::text
      )
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_ANON_KEY')
    )
  );
  RETURN NEW;
END;
$$;

-- Function to notify on new checkout lead
CREATE OR REPLACE FUNCTION public.notify_new_checkout_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM extensions.http_post(
    url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL') || '/functions/v1/send-lead-notification',
    body := jsonb_build_object(
      'type', 'checkout_lead',
      'record', jsonb_build_object(
        'first_name', NEW.first_name,
        'email', NEW.email,
        'cart_total', NEW.cart_total,
        'created_at', NEW.created_at::text
      )
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_ANON_KEY')
    )
  );
  RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER on_new_lead_notify
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();

CREATE TRIGGER on_new_checkout_lead_notify
  AFTER INSERT ON public.checkout_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_checkout_lead();