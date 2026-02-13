

# Ultimate Cellular Optimization System (UCOS) Sales Page

## Overview
Create a new `/ucos` route with a professional sales page for the Ultimate Cellular Optimization System ($258 bundle). The page will follow the exact same "Maximus" medical-grade design system used on `/tprime365`, `/glp1`, and `/nhto` pages -- reusing shared CSS classes and component patterns for visual congruency.

## New Files

### 1. `src/pages/UCOSPage.tsx`
The main page component following the established pattern (promo banner, nav, hero, sections, FAQ, final CTA, footer). Will include Shopify cart integration with a placeholder variant ID (like NHTO page).

### 2. `src/pages/UCOSPage.css`
Page-specific CSS for UCOS-unique sections (e.g., 3-product flow visualization, cumulative benefits stats, gender-specific advantages). Most styling will reuse existing classes from `OceanRaysPage.css` and `TPrime365Page.css`.

## Modified Files

### 3. `src/App.tsx`
Add route: `/ucos` pointing to `UCOSPage`.

## Page Sections (matching provided content)

1. **Promo Banner** -- "Save $201 Today Only" dismissible banner
2. **Navigation** -- Logo, anchor links (Benefits, Results, Compare, Bundle), CartDrawer + "Get The System" CTA
3. **Hero Section** -- "Unlock 24-Hour Cellular Power" headline, 3-product timing badges (Morning/Mid-Day/Evening), price $258, savings callout, placeholder hero image
4. **Trust Badges** -- Verified 10x Absorption, 24-Hour System, USA Made, Quality Tested (reusing `b365-stats-grid` pattern)
5. **Complete Cellular Integration** -- 3-card flow (Activate365 / Mito365 / Restore365) with placeholder product images, using `tprime-pillars-grid` style
6. **Cellular Optimization Benefits** -- Expanded cards per product with ingredient highlights and placeholder images
7. **Key Benefits Overview** -- 3-column grid (Morning/All Day/Evening benefits) using `tprime-benefits-grid`
8. **Cumulative System Benefits** -- 6 stat cards (NAD+ 170mg, Vitamin C 160mg, Boron 20mg, 10x Absorption, 24/7 Autophagy, 3x Mitochondrial Support) using `b365-stat-card`
9. **Testimonials** -- Co-founders + early testers using a card grid with placeholder portrait images
10. **Complete System Bundle** -- Value stack card with pricing breakdown, savings, individual product ingredient lists, using `tprime-value-card` pattern
11. **Scientific Comparison Table** -- UCOS vs Individual Supplements vs No Treatment, using `tprime-table` pattern
12. **Gender-Specific Advantages** -- Two-column layout (Women / Men benefits) with checkmark lists
13. **Final CTA** -- Blue background CTA block with order summary, pricing, trust badges, using `tprime-final-cta` pattern
14. **FAQ Section** -- 6 questions from the provided content, using `b365-faq-layout`
15. **Safety Information** -- Methylene Blue caution, FDA disclaimer
16. **Footer** -- SharedFooter component

## Placeholder Images
The following will use placeholder references with clear alt text indicating what image is needed:
- Hero composite (3 products together)
- Activate365 product bottle
- Mito365 product bottle
- Restore365 product bottle
- Cellular optimization flow diagram
- Testimonial portraits (Dan Schmidt, Darren Lopez, Brett Earnshaw, Mike VanDyke, Whitney Lopez, Jordan Sides, Maryanne Van Dyke)

Existing images that can be reused: `best365labs-logo.png`, `best365labs-logo-white.png`, testimonial images already in `/public/images/`.

## Technical Details

- **Framework**: React + TypeScript (with `// @ts-nocheck` at top, matching other pages)
- **Imports**: Reuses `OceanRaysPage.css` and `TPrime365Page.css` for shared classes, plus new `UCOSPage.css`
- **Cart Integration**: Shopify cart via `useCartStore` with placeholder variant ID (`PLACEHOLDER_UCOS`) -- same pattern as NHTOPage
- **Components**: `AnimatedCTA`, `SharedFooter`, `CartDrawer`
- **Responsive**: All sections will use existing responsive breakpoints from `TPrime365Page.css` and `OceanRaysPage.css`
- **Route**: `/ucos` added to `App.tsx`

