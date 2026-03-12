CREATE TABLE public.failed_admin_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  attempted_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.failed_admin_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON public.failed_admin_attempts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Auto-cleanup old attempts (older than 1 hour)
CREATE INDEX idx_failed_admin_attempts_ip_time ON public.failed_admin_attempts (ip_address, attempted_at);