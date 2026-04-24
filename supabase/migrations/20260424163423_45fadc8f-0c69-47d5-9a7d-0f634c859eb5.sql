-- 1. Add shopify_order_id column for idempotency
ALTER TABLE public.checkout_leads
ADD COLUMN IF NOT EXISTS shopify_order_id text;

-- 2. Partial unique index — only enforce uniqueness when shopify_order_id is present
CREATE UNIQUE INDEX IF NOT EXISTS checkout_leads_shopify_order_id_unique
ON public.checkout_leads (shopify_order_id)
WHERE shopify_order_id IS NOT NULL;

-- 3. Cleanup: Paula Cooper had 3 webhook fires for the SAME order on 4/21-4/22.
-- Keep the earliest (054085f2...) as the canonical sale. Mark the other two as not-completed.
UPDATE public.checkout_leads
SET completed = false
WHERE id IN (
  '9a915163-d469-4865-a86a-71303a8141e9',
  '061c88f5-d918-4513-943b-babcaaa52641'
);