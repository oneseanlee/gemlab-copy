# Add Embedded Checkout to TPrime365 Page

## Goal
Add a beautifully designed HappyMD checkout section at the bottom of `/tprime365` and re-wire every "See If I Qualify" CTA to smooth-scroll to that section instead of navigating to `/tprime-buy`.

## What Changes

### 1. New `#tprime365-checkout` section (bottom of page, before sticky mobile CTA)
A premium, conversion-optimized checkout block matching the medical-clean aesthetic of the page:

- **Section header** — Playfair serif headline: *"Start Your Transformation Today"* + supporting line: *"Secure checkout — physician intake completed after payment (5 min)."*
- **Two-column layout (desktop) / stacked (mobile):**
  - **Left column** — Offer summary card:
    - Product visual (`/images/tprime-bottle.png`)
    - Price block: `$149/mo` with `$299` strikethrough + "50% OFF" badge
    - Bulleted "What's Included" (formula, physician consult, free shipping, community access)
    - 5-star rating + 1 short testimonial
    - Trust strip: Made in USA · FDA-Registered · HIPAA · 503A Pharmacy
  - **Right column** — `<HappyMDCheckoutIframe height={1150} />`
    - HIPAA lock note below iframe
    - Phone support line `(385) 421-5651`
    - FDA disclaimer footnote
- **Guarantee badge** below grid: "Physician-Reviewed — If you're not approved, you won't be charged."

All styling uses existing tokens from `TPrime365Page.css` plus a new `tprime-checkout-*` block (mirrors the polish of the `/tprime-buy` right column). Animations: subtle fade-in on scroll. Mobile-first responsive.

### 2. Re-wire every CTA
Replace `handleStartProtocol`'s `navigate('/tprime-buy')` with a smooth scroll:

```ts
const handleStartProtocol = (e?: React.MouseEvent) => {
  e?.preventDefault();
  document.getElementById('tprime365-checkout')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
```

This automatically updates all 11 CTA touchpoints already wired to `handleStartProtocol`:
- Nav bar CTA (line 245)
- Hero CTA (line 276)
- 6× `MidPageCTA` blocks (lines 368, 396, 453, 560, 593, 728)
- Final white CTA (line 624)
- Sticky mobile CTA (line 737)

CTA copy stays **"See If I Qualify"** (per clinical-page terminology memory).

### 3. Remove the lead-capture modal flow
Since the user no longer needs to capture a lead before redirecting to intake, the `showLeadModal` / `handleLeadSubmit` paths become dead code. We leave them in place untouched (no removal) to keep scope minimal — they simply won't be triggered.

## Files Modified
- `src/pages/TPrime365Page.tsx` — change `handleStartProtocol`, add `<section id="tprime365-checkout">` near the bottom (before sticky mobile CTA / footer), import `HappyMDCheckoutIframe`
- `src/pages/TPrime365Page.css` — add `.tprime-checkout-section`, grid, offer-card, and price/badge styles

## Out of Scope
- No changes to `/tprime-buy`, `/tprime365-intake`, or any tracking codes
- No backend / Supabase / edge function changes
- No copy changes outside the new section
