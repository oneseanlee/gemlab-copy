CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  supabase_url text;
  anon_key text;
BEGIN
  SELECT decrypted_secret INTO supabase_url FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL';
  SELECT decrypted_secret INTO anon_key FROM vault.decrypted_secrets WHERE name = 'SUPABASE_ANON_KEY';

  PERFORM extensions.http((
    'POST',
    supabase_url || '/functions/v1/send-lead-notification',
    ARRAY[
      extensions.http_header('Content-Type', 'application/json'),
      extensions.http_header('Authorization', 'Bearer ' || anon_key)
    ],
    'application/json',
    jsonb_build_object(
      'type', 'lead',
      'record', jsonb_build_object(
        'first_name', NEW.first_name,
        'email', NEW.email,
        'source', NEW.source,
        'created_at', NEW.created_at::text,
        'utm_params', NEW.utm_params
      )
    )::text
  )::extensions.http_request);
  RETURN NEW;
END;
$function$;