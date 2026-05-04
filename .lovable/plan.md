## Goal

Bring `/glp1-activate` in line with the rest of the site (GLP1Page, TPrime365Page, UCOSPage). Right now it uses a custom dark `glpa-*` design with a text-only "Cell365Power" wordmark. The rest of the site uses the shared `b365-*` brand system: real Best 365 Labs logo image, light "medical-clean" white aesthetic, Playfair Display headings with `<em>` accents, and shared promo banner + sticky nav.

Keep all current page **content**, sections, Shopify variants, cart wiring, and FAQs. Only change the **visual shell and styling**.

## What changes

### 1. `src/pages/GLP1ActivatePage.tsx`

Swap the custom shell for the shared brand shell, keep all sections.

- **Logo / nav**: Replace the text `<a className="glpa-logo">Cell365Power</a>` and the custom `glpa-nav` with the same pattern used in `GLP1Page.tsx`:
  - `b365-promo-banner` (with desktop + mobile copy variants and ✕ dismiss)
  - `b365-nav` (with `with-banner` modifier when banner is showing)
  - `<img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />`
  - `b365-nav-links` for Benefits / Science / Stack / FAQ
  - `b365-nav-right` containing `<CartDrawer />` and `<AnimatedCTA small>Preorder Now</AnimatedCTA>`
  - `b365-hamburger` button on mobile that opens existing `<MobileMenu />`
- **Sections**: change every `<section className="glpa-section dark/light">` to `<section className="b365-section">` (or `b365-section b365-section-alt` for alternating bands). Replace `glpa-h2` headings with `b365-section-heading b365-serif` and use `<em>` for the accented word, matching GLP1Page (`Transform Your Weight Loss Journey with <em>Cellular-Level Support</em>`).
- **Hero**: rebuild using the same structure as GLP1Page's hero (`tprime-hero-container` / `tprime-hero-img` / `tprime-hero-text`) so the Activate bottle sits left or right of the value prop on a white background, not on a dark navy radial. Keep the buy box (purchase toggle + qty + CTA) but restyle to light cards with `var(--b365-border)` borders and `var(--b365-blue)` accents — matching the `glp1-callout-card` and `glp1-price-row` patterns already in `GLP1Page.css`.
- **Pills / trust row**: convert dark glass pills to the existing `glp1-save-badge` style (transparent, brand-blue text + Tag icon) and the trust row to a horizontal list of small icons using `--b365-text-secondary`.
- **Comparison, ingredient, strips, steps, subs, cross-sell, FAQ, final CTA**: keep the same content but render with the shared `b365-section` band system, white cards with `var(--b365-border)`, blue accents, and Playfair Display headings. The FAQ already uses shadcn Accordion — keep, just drop the dark color overrides.
- **Sticky mobile CTA**: keep, but restyle to white-on-light with brand blue button (matches `MobileCTABar` aesthetic noted in memory).
- **FDA disclaimer**: keep copy, restyle to match `SharedFooter` disclaimer treatment.

### 2. `src/pages/GLP1ActivatePage.css`

Rewrite to drop the dark theme entirely. New rules will:

- Set `.glpa-page` background to `var(--b365-white)` and use `var(--b365-text)` / `var(--b365-text-secondary)`.
- Remove all `.glpa-section.dark` gradients, dark card backgrounds (`rgba(255,255,255,.04)`), and white-text overrides.
- Style the buy box, purchase toggle, qty stepper, ingredient cards, strips, steps, sub cards, cross-sell cards, and final CTA on white surfaces with `var(--b365-border)`, soft `var(--shadow-sm)`-style shadows, `var(--b365-light-blue)` icon chips, and `var(--b365-blue)` for active states / accents — mirroring patterns in `GLP1Page.css` (e.g. `glp1-callout-card`, protocol-card visuals).
- Keep the responsive breakpoints (`@media (max-width: 768px)` flattening grids to 1 column; sticky mobile CTA appears under 768px).
- Import (or re-declare locally) the same `tprime-hero-container` / `tprime-hero-img` / `tprime-hero-text` classes already used by GLP1Page hero by adding `import '../pages/GLP1Page.css'` and `import '../pages/TPrime365Page.css'` to the TSX (same approach GLP1Page itself uses), so the hero gets the proven brand layout for free.

### 3. Files NOT touched

- `src/lib/shopify.ts` (variant IDs already correct)
- `src/App.tsx` (route already in)
- `src/pages/HomePage.tsx` (product card already in grid)
- `MobileMenu`, `CartDrawer`, `AnimatedCTA`, `SharedFooter` (already shared, no changes)

## Layout overview

```text
┌─────────────────────────────────────────────────────────┐
│ b365-promo-banner   "Preorder · Ships May 1 · Free Ship"│
├─────────────────────────────────────────────────────────┤
│ b365-nav   [☰]  [Best365Labs logo]  Benefits Science... │
│                                       [Cart] [Preorder] │
├─────────────────────────────────────────────────────────┤
│ HERO (white)                                            │
│  ┌──────────────┐   GLP-1 Cellular Companion™           │
│  │ Bottle image │   Your GLP-1 Has a *Blind Spot*…      │
│  │              │   subhead · pills · BUY BOX           │
│  └──────────────┘   trust row                           │
├─────────────────────────────────────────────────────────┤
│ b365-section          The Hidden Problem                │
│ b365-section-alt      The Solution / Absorption         │
│ b365-section          Dual NAD+ Strategy™               │
│ b365-section-alt      Ingredients (4 cards)             │
│ b365-section          What GLP-1 Strips Away            │
│ b365-section-alt      How To Use (3 steps)              │
│ b365-section          Choose Your Plan (sub cards)      │
│ b365-section-alt      Stack With Full System            │
│ b365-section          FAQ (Accordion)                   │
│ Final CTA band (brand-blue background, white text)      │
│ FDA disclaimer · SharedFooter                           │
└─────────────────────────────────────────────────────────┘
```

## Verification

- Navigate to `/glp1-activate` — header logo is the Best365Labs image, page is bright white, matches GLP1Page / TPrime365Page look.
- Buy box still adds correct Shopify variant to cart (one-time / monthly / bimonthly).
- Mobile (≤768px): hamburger opens MobileMenu, sticky preorder CTA at bottom, all grids stack to 1 column, no horizontal scroll.
- All anchor links (#benefits, #science, #stack, #faq) still scroll correctly.
