
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visitor_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for fast queries
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_visitor_id ON public.page_views (visitor_id);
CREATE INDEX idx_page_views_page_path ON public.page_views (page_path);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts with basic validation
CREATE POLICY "Allow anonymous page view inserts"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(page_path) > 0 AND char_length(page_path) <= 500
  AND char_length(visitor_id) > 0 AND char_length(visitor_id) <= 100
);

-- Allow service role to read
CREATE POLICY "Service role can select page_views"
ON public.page_views
FOR SELECT
TO service_role
USING (true);
