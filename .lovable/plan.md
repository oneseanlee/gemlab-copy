## /glp1-buy funnel audit

**Data (last 60 days):**
- 307 page views / 248 unique visitors on `/glp1-buy`
- 34 checkout leads captured (form-fill rate ~13.7% — healthy)
- Only **2 of 34** marked completed = **5.9% post-lead conversion**
- For comparison: `direct` source converts 6/17 = 35%; `checkout` source 1/5 = 20%
- The drop happens **after** the lead form submits — visitors hit the form, get redirected, then don't pay

**Root causes identified in the code:**

1. **Hard 1500ms delay before redirect** (`GLP1BuyPage.tsx` L368–370). Users see "Redirecting…" for 1.5s with no feedback. On mobile this is enough time for impatient users to back out, and any nav/JS interruption kills the redirect entirely.
2. **Buyer identity missing email pre-fill on checkout, requires re-typing**. We pass an empty address (`address1: "", city: "", zip: ""`) which Shopify treats as invalid and discards — so the customer lands on Shopify checkout with a blank form, even though we already have their name + email. Re-entering data is the #1 abandonment trigger.
3. **No phone field collected** on the inline form, even though the schema accepts one. Without phone we can't trigger SMS recovery, and Shopify checkout asks again.
4. **No abandoned-cart recovery.** 32 leads have email + name + cart but received zero follow-up. Even one recovery email at 1hr typically reclaims 8–15%.
5. **Webhook reconciliation works only on email/name match.** The 2 "completed" leads matched correctly, but if a customer types one email in our form and a different one at Shopify checkout, we never mark it complete — so true completion is likely modestly higher than 5.9% but still very low.

## Fixes to ship

### 1. Eliminate redirect delay + show real progress (highest impact)
File: `src/pages/GLP1BuyPage.tsx`
- Remove the `setTimeout(..., 1500)`. Redirect immediately after `updateBuyerIdentity` resolves (it already awaits Shopify).
- Fire the GTM `begin_checkout` event before the redirect (already does — keep).
- Keep the spinner on the button so visual continuity is preserved.

### 2. Pre-fill Shopify checkout with name + email (and phone if given)
File: `src/pages/GLP1BuyPage.tsx`
- Drop the empty `deliveryAddressPreferences` block. Sending an address with empty `address1`/`city`/`zip` causes Shopify to throw the buyer-identity update away. Pass **only** `email` and (if provided) `phone` — Shopify will then pre-fill the contact step on checkout.
- Add an optional **phone** input to the inline form (already in the Zod schema). Format-validate US numbers loosely (`/^[\d\s().+-]{7,20}$/`).

### 3. Append `checkout[email]` & `checkout[shipping_address][first_name]` query params
File: `src/pages/GLP1BuyPage.tsx`
- Shopify accepts these as additional URL hints when buyer-identity update is dropped. Append to the checkout URL alongside the existing UTM params for belt-and-suspenders pre-fill.

### 4. Abandoned-cart recovery email at 1 hour
New edge function: `supabase/functions/recover-abandoned-checkout/index.ts`
- Cron-invoked (every 15 min) via `pg_cron` calling the function.
- Selects from `checkout_leads` where `completed = false`, `created_at` between 60 min and 75 min ago, `source = 'glp1-buy'`, and no prior recovery email logged in `email_send_log` for that lead.
- Sends a single recovery email via existing `send-digital-delivery` infra/Resend with subject "Your protocol is still reserved — complete checkout" and a CTA back to `/glp1-buy?recover=1` (which we'll already pass UTMs back through).
- Logs to `email_send_log` so we never double-send.

Migration needed:
- Add `recovery_email_sent_at timestamptz` column to `checkout_leads` (cleaner than scanning `email_send_log` for joins).
- Schedule pg_cron job to invoke the function every 15 min.

### 5. Improve webhook reconciliation
File: `supabase/functions/shopify-order-webhook/index.ts`
- In addition to email + (name+total) fallback, add a **phone-number fallback**: if the order's `customer.phone` matches a pending lead's `phone`, mark it complete. Reduces unmatched orders when customers use different emails.
- Lower the unmatched-order risk by also matching on **first_name + cart_total within 4 hours** (tighter than the current 30-day window) when email differs.

### 6. Light analytic add-on
- Add `dataLayer.push({event: 'lead_captured', source: 'glp1-buy'})` so we can measure form-fill→Shopify-load drop in GTM separately from Shopify-load→purchase drop.

## Out of scope (call out, don't build)
- A/B testing framework — too heavy for one session.
- SMS recovery — requires Twilio/GHL conversation API setup and explicit consent UX.
- Replacing Shopify hosted checkout with custom — large project, high risk.

## Expected impact
- Removing the 1.5s delay alone typically recovers 5–10% of post-form drop-off.
- Proper email/phone pre-fill on Shopify cuts checkout abandonment 10–20%.
- A single 1-hour recovery email on this volume (~30/mo leads) should recover **2–4 additional orders/month** — roughly doubling current `/glp1-buy` conversion.

## Files touched
- `src/pages/GLP1BuyPage.tsx` (redirect timing, buyer identity, phone field, URL params, dataLayer event)
- `supabase/functions/shopify-order-webhook/index.ts` (phone + tighter name/total fallback)
- `supabase/functions/recover-abandoned-checkout/index.ts` (new)
- Database migration: add `recovery_email_sent_at` column + pg_cron schedule

Approve and I'll implement all of the above in one pass.
