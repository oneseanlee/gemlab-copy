
-- Create checkout_leads table
CREATE TABLE public.checkout_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  cart_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  cart_total NUMERIC NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.checkout_leads ENABLE ROW LEVEL SECURITY;

-- RLS policy: validated anonymous inserts
CREATE POLICY "Validated checkout lead inserts"
ON public.checkout_leads
FOR INSERT
WITH CHECK (
  char_length(first_name) > 0 AND char_length(first_name) <= 100
  AND char_length(email) > 0 AND char_length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
