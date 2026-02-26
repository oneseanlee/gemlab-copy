

# GLP-1 Optimization Protocol — Editorial Advertorial Page

## Overview
Create a long-form editorial advertorial at `/glp1-article` for the GLP-1 Optimization Protocol ($39.95 impulse purchase). Reuses the proven `adv-*` CSS class system from the TPrime365 advertorial while adding new components specific to this page (pull quotes, timeline, product cards, trust badge strip).

## Architecture

**New files:**
- `src/pages/GLP1AdvertorialPage.tsx` — Full page component
- `src/pages/GLP1AdvertorialPage.css` — Page-specific styles (imports/extends the `adv-*` pattern)

**Modified files:**
- `src/App.tsx` — Add route `/glp1-article`

## Conversion Strategy

This is fundamentally different from the TPrime advertorial:
- **Low-ticket impulse buy** ($39.95 vs $149/mo) -- no consultation, no prescription
- All CTAs trigger direct Shopify checkout via cart creation using Variant ID `gid://shopify/ProductVariant/46539809235068`
- No lead capture modal -- straight to purchase
- Urgency via "Launch Pricing" badge and "$50 savings" callout (green accent), not fake scarcity
- Sticky mobile CTA: "Get the Protocol -- $39.95 (Save $50)"

## Page Sections (14 total)

1. **Headline** -- Editorial headline with category tag "GLP-1 Research", byline, social proof strip (no prescription required, free shipping)
2. **Opening Editorial** -- Journalistic acknowledgment of GLP-1 success, pivot to muscle loss concern, drop-cap opening
3. **"The Number on the Scale"** -- Problem agitation with styled pull quotes (new `.adv-pullquote` component)
4. **"Burn Fat and Keep Your Muscle"** -- Solution intro with 3-card pathway grid (AMPK, Sirtuin, Autophagy) reusing `.adv-ingredient-grid`
5. **"What's in the Protocol"** -- Two product cards (Triple Power + Metabolism+) with daily schedule strip (new `.adv-product-card` and `.adv-schedule-strip`)
6. **Clinical Results** -- 6 stat cards in 3x2 grid reusing `.adv-results-grid` pattern, adapted for percentage stats
7. **"What People Are Feeling"** -- Vertical timeline component (new `.adv-timeline`) showing Days 3-5, Week 1, Weeks 2-4, Long-term
8. **"The Bottom Line"** -- Short editorial summary section
9. **Value Stack + Pricing** -- Reuse `.adv-pricing-card` with $39.95 price, $90 strikethrough, 70% savings badge (green)
10. **Trust & Guarantee Strip** -- 4 trust badges in row (new `.adv-trust-strip`) + 60-day guarantee badge reusing `.adv-guarantee`
11. **"Who Is This For"** -- Single text callout block (not persona cards)
12. **FAQ Accordion** -- 8 questions, reusing `.adv-faq-*` pattern
13. **Final CTA** -- Dark background, reusing `.adv-final-cta`
14. **Footer** -- Reusing `.adv-footer` with added Methylene Blue safety caution

## New CSS Components

Beyond reusing existing `adv-*` classes, these new styles will be added in `GLP1AdvertorialPage.css`:

- **`.adv-pullquote`** -- Styled editorial pull quote with left blue border, larger italic serif text
- **`.adv-product-card`** -- Side-by-side product cards with ingredient lists
- **`.adv-schedule-strip`** -- Horizontal daily schedule (3 time slots)
- **`.adv-stat-card`** -- Variant of result card optimized for percentage stats with labels
- **`.adv-timeline`** -- Vertical timeline with left-side dots/line
- **`.adv-trust-strip`** -- Horizontal 4-badge trust bar
- **`.adv-save-badge`** -- Green savings callout badge

## Checkout Integration

All CTA buttons will use an `onClick` handler that:
1. Calls `addItem()` from `useCartStore` with the GLP-1 variant
2. Immediately retrieves and opens `checkoutUrl` via `window.open(url, '_blank')`
3. Falls back to creating a new cart if none exists

This follows the mandatory Shopify cart-first checkout pattern.

## Technical Details

- Mobile-first responsive (480/768/1024 breakpoints matching design system)
- Sticky bottom CTA bar on mobile (768px and below)
- Bottom padding on `.adv-page` to accommodate sticky bar
- All typography uses existing `--font-title` (Playfair Display) and `--font-body` (Plus Jakarta Sans) tokens
- Green accent color for savings/results: `var(--b365-green)` 
- No popups, no timers, no exit-intent

