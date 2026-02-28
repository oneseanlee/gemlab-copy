-- Remove duplicate leads, keeping the earliest entry per email+source
DELETE FROM public.leads a
USING public.leads b
WHERE a.email = b.email
  AND a.source = b.source
  AND a.created_at > b.created_at;

-- Now add the unique constraint
ALTER TABLE public.leads ADD CONSTRAINT unique_email_source UNIQUE (email, source);