
Goal: Diagnose why lead counts look too low and harden capture so every valid lead is recorded and visible.

What I found from the investigation:
1) Environment mismatch is likely the biggest confusion:
- Live analytics shows high traffic (Mar 1–12: 908 visitors, 1707 pageviews; top pages include /glp1-buy 474, /glp1-protocol 260).
- The database traffic table currently shows only 12 page views total.
- This pattern strongly indicates you’re comparing live traffic with test-environment lead/traffic rows.

2) Admin dashboard undercounts “all leads” by design:
- It currently reads only `checkout_leads`.
- It does not include `leads` (intake/guide/quiz pipeline), so total lead volume appears lower than actual pipeline activity.

3) There are capture reliability gaps in code:
- Multiple lead insert calls await insert but do not check returned `error`.
- If insert is rejected (validation/rate-limit/network), flow still continues and user is redirected, silently losing attribution.
- `/glp1-buy` still redirects immediately and uses an inconsistent checkout event payload structure.

4) Funnel blind spot:
- At least one purchase path redirects straight to checkout URL (`/glp1-article`) without lead capture, which depresses “lead count vs traffic” in dashboard.

Implementation plan (alternative approach):
Phase 1 — Fix measurement integrity first
- Add explicit insert result checks (`const { error } = ...`) for every lead capture flow.
- Block redirect/navigation if insert fails; show user retry state and log failure reason.
- Standardize checkout tracking payload (`user_data` with identifiers) and add redirect delay where needed.

Phase 2 — Fix admin reporting accuracy
- Update admin backend aggregation to combine:
  - `checkout_leads` (commerce pre-checkout)
  - `leads` (intake/guide/quiz)
- Add breakdown cards by lead source and path so “low leads” can be isolated by funnel type.

Phase 3 — Remove environment confusion
- Add clear environment badge in admin UI (Test vs Live).
- Add date range defaults and route-level conversion table:
  - page views
  - lead submissions
  - lead rate

Phase 4 — Plug funnel holes
- Identify routes that skip lead capture before checkout redirect.
- Decide per-route behavior: capture lead first vs intentionally checkout-direct.
- If checkout-direct is kept, track “checkout_started” server-side so funnel still measures intent.

Technical details (concise):
```text
Traffic (live analytics) -> Route view
                      -> Lead attempt
                      -> Lead persisted (or failed + reason)
                      -> Checkout started
                      -> Completed order
```
Key schema/logic additions:
- Add `source_path`, `source_type`, `capture_status`, `capture_error` fields (or a dedicated `lead_capture_events` table).
- Keep current rate-limit policy, but surface when it blocks writes.
- Admin metrics should use aligned date windows across traffic + leads.

Acceptance checks:
1) Submit forms on /checkout, /glp1-buy, /tprime365, /nhto and verify DB rows are created.
2) Force one failure (e.g., temporary invalid payload) and confirm UI shows failure, no silent redirect.
3) Verify admin totals = commerce leads + intake leads for same date range.
4) Verify route-level conversion percentages look plausible.
5) Test end-to-end on published site and confirm live traffic correlates with live lead records.
