
CREATE OR REPLACE FUNCTION public.mark_happymd_completed_private(
  p_email text,
  p_tracking_code text
)
RETURNS TABLE(lead_id uuid, already_completed boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_lead_id uuid;
  v_already boolean := false;
  v_email text := lower(trim(p_email));
BEGIN
  SELECT id, happymd_completed
    INTO v_lead_id, v_already
  FROM public.leads
  WHERE lower(email) = v_email
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_lead_id IS NULL THEN
    RETURN QUERY SELECT NULL::uuid, false;
    RETURN;
  END IF;

  IF NOT v_already THEN
    UPDATE public.leads
       SET happymd_completed = true,
           happymd_completed_at = now()
     WHERE id = v_lead_id;

    INSERT INTO public.intake_completions (source, tracking_code)
    VALUES ('tprime365', COALESCE(NULLIF(p_tracking_code, ''), 'TPRIME365CELL'));
  END IF;

  RETURN QUERY SELECT v_lead_id, v_already;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_happymd_completed_private(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_happymd_completed_private(text, text) TO service_role;
