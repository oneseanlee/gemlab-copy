## Wire up HappyMD purchase capture on TPrime buy pages

Goal: Start capturing who buys TPrime so we have a record on our side (not just HappyMD's), and tag those contacts in GHL.

### What to change

1. **Mount `useHappyMDPurchaseTag` on the buy pages**
   - `src/pages/TPrimeBuyPage.tsx` → `useHappyMDPurchaseTag({ tag: "tprime365-purchase" })`
   - `src/pages/TPrime365Page.tsx` and `src/pages/NHTOPage.tsx` (both embed HappyMD) → same hook
   - `src/pages/TPrime365IntakePage.tsx` / `src/pages/NHTOIntakePage.tsx` if they host the iframe → same hook

2. **Record the buyer on our side (new)**
   - Today, the hook only tags GHL. If no lead row exists (buy page has no pre-form), we still see nothing in the dashboard.
   - Extend `happymd-purchase-tag` edge function to also insert a row into `public.leads` (or flip `happymd_completed=true` on an existing row) using `mark_happymd_completed_private`. If no lead exists, insert a minimal one with `source = 'tprime365-purchase'` so it shows in reports.
   - Also write an `intake_completions` row so the admin funnel counts it.

3. **Auth hardening for the edge function**
   - The hook currently calls the function with the **anon** key, but the function requires the **service role** key (recent security fix). As-is, every call will 401.
   - Fix: keep the function service-role-only, and have the hook call a thin public wrapper — OR relax this specific function to accept anon calls but (a) validate origin is `https://app.happymd.co`, (b) rate-limit by email, (c) only allow the 3 allowlisted tags. Recommend the second option since the client must call it directly from the browser.

4. **Capture the buyer's email reliably**
   - Hook reads `localStorage.intake_lead_email`, which is only set on flows with a pre-checkout form. On `/tprime-buy` there is no such form.
   - Options:
     a. Add a small pre-iframe email capture on `/tprime-buy` (name + email + phone, same pattern as `/glp1-buy`) — best for capture rate and gives us a lead even for non-buyers.
     b. Rely entirely on the postMessage payload carrying the buyer's email from HappyMD (requires HappyMD to include it).
   - Recommend (a) for `/tprime-buy` so we get 100% capture, and use postMessage email as a fallback/confirmation.

5. **Confirm HappyMD's success event**
   - The hook listens for 6 candidate event names. Before this can fire in production, HappyMD must confirm which one they emit (and ideally include `email` in the payload).
   - Action: I'll add `console.info` logging of every message received from the HappyMD origin so we can see the real event shape in the browser console on a test purchase, then narrow the matcher.

### Files to touch

- `src/hooks/useHappyMDPurchaseTag.ts` — add debug logging, send email from payload when present
- `src/pages/TPrimeBuyPage.tsx` — mount hook (+ optional pre-iframe lead capture form)
- `src/pages/TPrime365Page.tsx`, `src/pages/NHTOPage.tsx` (and intake pages if they embed) — mount hook
- `supabase/functions/happymd-purchase-tag/index.ts` — allow anon with origin + rate-limit + allowlist; also upsert lead + intake_completion
- `supabase/migrations/<new>.sql` — add a `private.check_happymd_purchase_rate_limit` helper if we go the rate-limit route

### Open questions before I build

1. On `/tprime-buy`, do you want a **pre-iframe lead capture form** (name/email/phone gate, like `/glp1-buy`) so we capture intent even from non-buyers? Or keep the iframe immediately visible and only capture confirmed buyers from the postMessage?
2. Should I mount the hook on **all** HappyMD-embedding pages (`/tprime-buy`, `/tprime365`, `/nhto`, intake pages), or just `/tprime-buy` for now?
3. Have you (or HappyMD) confirmed the exact postMessage event name + payload shape they emit on payment success? If not, I'll ship with debug logging so you can capture it on the next live purchase and I'll narrow it after.
