
-- Add completion tracking columns to leads table
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS happymd_completed boolean NOT NULL DEFAULT false;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS happymd_completed_at timestamptz;

-- Create fallback intake_completions table
CREATE TABLE IF NOT EXISTS public.intake_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  tracking_code text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on intake_completions
ALTER TABLE public.intake_completions ENABLE ROW LEVEL SECURITY;

-- Allow anon/authenticated to insert
CREATE POLICY "Allow intake completion inserts" ON public.intake_completions
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(source) > 0 AND char_length(tracking_code) > 0);

-- Allow service_role to read
CREATE POLICY "Service role can read intake completions" ON public.intake_completions
  FOR SELECT TO service_role
  USING (true);

-- Create a security definer function to mark intake as completed
CREATE OR REPLACE FUNCTION public.mark_intake_completed(p_email text, p_source text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.leads
  SET happymd_completed = true, happymd_completed_at = now()
  WHERE id = (
    SELECT id FROM public.leads
    WHERE email = p_email AND source = p_source AND happymd_completed = false
    ORDER BY created_at DESC
    LIMIT 1
  );
  RETURN FOUND;
END;
$$;
