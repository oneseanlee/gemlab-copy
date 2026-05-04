
CREATE OR REPLACE FUNCTION public.mark_intake_completed_private(p_email text, p_source text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT private.mark_intake_completed(p_email, p_source);
$$;

REVOKE EXECUTE ON FUNCTION public.mark_intake_completed_private(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_intake_completed_private(text, text) TO service_role;
