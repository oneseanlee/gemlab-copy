

## Goal
Verify all admin dashboard numbers are syncing correctly and reconcile discrepancies.

## What I Found (Sync Status: ✅ Working, with caveats)

The `admin-dashboard-data` Edge Function is correctly pulling from all 4 tables (`leads`, `checkout_leads`, `intake_completions`, `page_views`). Numbers ARE flowing through. However, there are **3 data-quality issues inflating/distorting the displayed metrics**:

### Issue 1 — Duplicate completed checkouts (revenue inflation)
The Shopify webhook is creating multiple `completed = true` rows for the same customer:
- **Paula Cooper** (`paulac722@gmail.com`): 4 records × $39.95 = **$159.80** counted as 4 sales (likely 1 real sale)
- **Nick Gulmon**: 2 records × $39.95 = $79.90 (likely 1 real sale)
- **Net effect**: dashboard shows 16 sales / ~$639 revenue, true count is ~12 sales / ~$479 revenue

### Issue 2 — Test data polluting email_send_log
- 96 sends to `test@example.com` on 3/17
- 140 `transactional_emails` to 2 test addresses on 3/17
- These don't appear on the dashboard directly but skew any future email analytics

### Issue 3 — Stat card labels are ambiguous
- "Completed Sales" stat counts ALL `checkout_leads.completed = true` (includes Paula's 4 dupes)
- "Conversion Rate" = checkout sales ÷ checkout leads only (excludes intake funnel) — label should clarify

### What's actually correct
- Page views: 1,714 / 1,049 unique ✅
- Intake completions: **3** (Doug, Sunil, Sean) — was previously under-reported as 1 ✅
- All leads (26 checkout + 26 intake = 52) sync correctly ✅
- Pacific Time bucketing works ✅

## Plan (when you approve, I switch to default mode)

1. **Dedupe completed checkouts in the dashboard view** — when computing `Completed Sales` and `Total Revenue`, deduplicate by `email` (keep most recent). Show a "Unique Customers" count alongside.
2. **Filter test data** — exclude `test@example.com`, `sean@oneseanlee.com`, and any `@example.com` from email/lead aggregations on the dashboard (matches existing data-cleanup memory).
3. **Clarify stat labels** — rename "Conversion Rate" → "Checkout Conv. Rate" and add a tooltip explaining the formula. Add an "Intake Conv. Rate" stat (intake completions ÷ intake leads).
4. **Investigate Shopify webhook duplication** — root-cause why Paula's order generated 4 webhook fires (likely Shopify retry logic + missing idempotency check on `order_id`). Add an `order_id` unique check in `shopify-order-webhook` to prevent future duplicates.
5. **One-time DB cleanup migration** — soft-mark the duplicate Paula/Nick rows as `completed = false` with a note, so historical reporting reflects reality.

## Files affected
- `src/pages/AdminDashboardPage.tsx` (dedupe logic, label clarity, intake conv. rate stat)
- `supabase/functions/admin-dashboard-data/index.ts` (test data filter)
- `supabase/functions/shopify-order-webhook/index.ts` (idempotency check)
- New migration to add `shopify_order_id` column + unique index on `checkout_leads`, plus cleanup of Paula/Nick dupes

## Out of scope
- Backfilling historical data beyond the Paula/Nick dedupe
- Rebuilding the dashboard UI

