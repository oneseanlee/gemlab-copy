## Goal

Switch the TPrime365 funnel so customers **pay first** via the new HappyMD embedded checkout, then complete intake. Today the flow is: lead form → HappyMD intake → (payment after physician review). New flow: HappyMD checkout (payment) → HappyMD intake → success.

## What HappyMD gave us

The PDF provides three install options for `https://app.happymd.co/embed/checkout`:

1. **Button snippet** + `embed-helper.js` (opens modal)
2. **Iframe** (page-builder safe)
3. **Hosted URL** (for ads/email)

Params: `product=tprime365`, `plan=subscription`, `partner=cell365power`, `theme=best365`, optional `tracking_code=…`.

Note: the PDF iframe example has a typo (`partner=cell365powerpower`) — we use `cell365power`.

## Recommended approach

Use the **iframe embed** on the buy pages (consistent with how we already embed the HappyMD intake on `TPrime365IntakePage`), and the **button snippet (modal)** on the marketing/landing pages where the CTA currently scrolls to a form. Hosted URL stays available for paid ads.

This keeps payment + intake fully on HappyMD — no Shopify/Stripe code changes on our side. We only swap CTAs and embeds.

## Pages affected

| Page | Today | After |
|---|---|---|
| `src/pages/TPrimeBuyPage.tsx` (`/tprime-buy`) | Inline name+email lead form → navigates to `/tprime365-intake` | Replace right-column form with HappyMD **checkout iframe**. Keep lead capture as a *silent* pre-write (optional). |
| `src/pages/TPrime365Page.tsx` (`/tprime365`) | "See If I Qualify" buttons route to `/tprime-buy` or `/tprime365-intake` | Swap primary CTAs to HappyMD **button snippet** (modal checkout). |
| `src/pages/TPrime365IntakePage.tsx` (`/tprime365-intake`) | HappyMD intake iframe | **Keep as-is** — HappyMD redirects here after payment. Confirm with HappyMD that post-payment redirect lands on this URL (or update redirect param). |
| `src/pages/TPrimeAdvertorialPage.tsx`, `ListiclePage.tsx`, `TScoreQuizPage.tsx`, `NHTOPage.tsx` | Various TPrime CTAs | Update CTAs that currently go to the lead form to open the checkout modal instead. |
| `src/components/MobileMenu`, sticky mobile CTA bars | Link to `/tprime-buy` | Same — these still land on the buy page, which now shows the checkout. |

## Implementation steps

1. **Create `src/components/HappyMDCheckout/HappyMDCheckout.tsx`**
   - Two exports:
     - `<HappyMDCheckoutIframe product plan partner theme trackingCode height />` — renders the iframe.
     - `<HappyMDCheckoutButton ...props>label</HappyMDCheckoutButton>` — renders the `<button data-happymd-checkout …>` and lazy-loads `https://app.happymd.co/embed-helper.js` once via a module-level guard.
   - Defaults: `product="tprime365"`, `plan="subscription"`, `partner="cell365power"`, `theme="best365"`.
   - Forward UTM/`tracking_code` from `getUtmParams()` so HappyMD attribution lines up with our existing `TPRIME365CELL` analytics.

2. **`TPrimeBuyPage.tsx`**
   - Replace the right-column `<form className="glp1buy-inline-form">` with `<HappyMDCheckoutIframe height={1100} />`.
   - Remove `useForm`, zod schema, `onSubmit`, `splitName`, `supabase.from("leads").insert(...)`, `useNavigate` (unless still needed for sticky CTA fallback).
   - Update sticky mobile CTA: instead of submitting the form, scroll to the iframe (or open the modal via `<HappyMDCheckoutButton>`).
   - Keep all upper marketing content (carousel, testimonials, trust strip, bonuses).
   - Keep the existing GTM `generate_lead` / Meta Pixel hooks but move them to fire on a `postMessage` from HappyMD if/when they expose one (otherwise drop — payment event will come from HappyMD's webhook side).

3. **`TPrime365Page.tsx`**
   - Convert the primary CTAs ("See If I Qualify", sticky CTA) to `<HappyMDCheckoutButton>` so the modal opens in-place. Secondary "Learn more" links stay as-is.
   - Remove the routes-to-`/tprime-buy` redirects on those CTAs only if the user wants the modal everywhere; otherwise leave the buy page link as a fallback.

4. **Other TPrime entry points** (`TPrimeAdvertorialPage`, `ListiclePage`, `TScoreQuizPage` final CTA, `NHTOPage` if it cross-sells TPrime):
   - Replace the "Get TPrime365" CTAs with `<HappyMDCheckoutButton>` (modal).

5. **Tracking + lead capture (optional, recommended)**
   - Keep a *non-blocking* `supabase.from("leads").insert(...)` triggered when the iframe/modal opens (source: `tprime-checkout`) so we still see funnel entries in the admin dashboard even before HappyMD reports a paid order. This preserves the Lead Funnel Architecture memory rule.
   - Coordinate with HappyMD on a webhook to mark `happymd_completed` once payment + intake clear (separate follow-up; not part of this UI task).

6. **Confirm post-payment redirect** with HappyMD partners@: should land on `https://www.cell365power.com/tprime365-intake` (or a new `/tprime365-thank-you`) so existing `mark-intake-completed` + Meta `Lead` events still fire on the same domain.

7. **QA checklist**
   - Iframe loads on `/tprime-buy` desktop + mobile, no console errors.
   - Button snippet opens modal on `/tprime365` and other pages.
   - `tracking_code=TPRIME365CELL` (or UTM-derived) is present in the embed URL.
   - Sticky mobile CTA scrolls to / opens checkout.
   - No layout regression on the marketing sections we left alone.

## Open questions for you

1. **CTA terminology**: keep "See If I Qualify" or switch to "Start TPrime365 — $149/mo" (HappyMD's default copy) now that it's a direct checkout?
2. **Modal vs iframe on `/tprime-buy`**: I recommend **iframe** (more conversion-friendly, no extra click). Confirm.
3. **Keep silent lead capture** when the user opens checkout? (Recommended yes — protects analytics if they bounce mid-checkout.)
4. **Other TPrime pages** — should I update *every* TPrime CTA on the site in this same change, or just `/tprime-buy` + `/tprime365` and leave advertorials/listicles for a follow-up?