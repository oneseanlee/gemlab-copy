

# GLP-1 Cellular Optimization System Sales Page ($279 Bundle)

## Overview
Create a new sales page for the "Complete GLP-1 Cellular Optimization System" -- the $279 bundle that includes 4 products (Activate365, Mito365, Metabolism Plus, Restore365) plus a happyMD telehealth GLP-1 consultation with refund protection. This is distinct from the existing `/glp1-protocol` page ($39.95) and `/ucos` page ($258).

## New Files

### 1. `src/pages/GLP1BundlePage.tsx`
Full sales page following the established pattern used on UCOS, NHTO, TPrime365, and GLP1 pages. Uses `// @ts-nocheck`, imports shared CSS from `OceanRaysPage.css` and `TPrime365Page.css`, and integrates with Shopify cart via `useCartStore` with a placeholder variant ID.

### 2. `src/pages/GLP1BundlePage.css`
Page-specific styles for unique sections (refund protection breakdown, payment transparency table, how-it-works steps, bonus offer card). Reuses shared classes for nav, hero, benefits, FAQ, footer, comparison table patterns.

## Modified Files

### 3. `src/App.tsx`
Add new route: `/glp1-bundle` pointing to `GLP1BundlePage`.

## Page Sections (from provided content)

1. **Promo Banner** -- "Save $376 Today" dismissible banner
2. **Navigation** -- Logo, anchor links (Benefits, System, Pricing, FAQ), CartDrawer + "Get The System" CTA
3. **Hero Section** -- "GLP-1 Cellular Optimization System for Daily Energy + Recovery" headline, 3 benefit bullets (lean mass, energy, metabolic health), price $279, "See What's Included" anchor link, placeholder hero image
4. **Trust Strip** -- Consultation with Refund Protection, Free Shipping, Professional Grade, Made in USA (reusing `ucos-trust-strip` pattern adapted)
5. **Supporting Your Routine** -- Contextual intro explaining GLP-1 companion supplements, soft educational tone
6. **4-Product System** -- "The Only 4-Product System Designed SPECIFICALLY for GLP-1 Users" with Morning (Activate365), Mid-Day (Mito365), Afternoon (Metabolism Plus), Evening (Restore365) cards using `glp1-protocol-card` / `ucos-flow-card` pattern, placeholder product images
7. **Key Benefits** -- 4 cards: Supports Lean Mass, Supports Metabolism, Supports Daily Energy, Supports Recovery (using `tprime-benefits-grid`)
8. **Testimonials** -- Same co-founders + early testers as UCOS page, reusing existing testimonial images
9. **Pricing & Payment Breakdown** -- Transparent two-tier pricing: $139 supplements (non-refundable) + $140 consultation/medication (refundable if not approved). Clear visual breakdown using a styled card.
10. **Refund Protection Guarantee** -- Two-column "If Approved" vs "If NOT Approved" comparison using `tprime-delivery-grid` pattern
11. **Bundle Value Card** -- Full product listing with $655 value, $279 price, individual product details, trust badges (Free Shipping, 60-Day Guarantee, GMP Certified)
12. **Order Summary** -- Line-item breakdown (supplements $139, consultation $140, GLP-1 medication included, shipping FREE, total $279)
13. **60-Day Satisfaction Guarantee** -- Guarantee section
14. **Bonus Offer** -- GLP-1 Prescription Program details: 4-step "How It Works" flow (Order, Intake Form, Medical Review, Medication Shipped)
15. **Final CTA** -- Blue background CTA with pricing, savings, trust badges
16. **FAQ Section** -- 10 questions from provided content, using `b365-faq-layout`
17. **Safety/Disclaimer** -- Medical disclaimer about happyMD
18. **Footer** -- SharedFooter component

## Placeholder Images
- Hero composite (4 products together)
- Activate365 product bottle
- Mito365 product bottle  
- Metabolism Plus product bottle
- Restore365 product bottle
- Reuse existing testimonial images from `/public/images/`

## Technical Details

- **Cart Integration**: Placeholder variant ID `PLACEHOLDER_GLP1_BUNDLE`, price `$279.00`, same pattern as NHTO/UCOS pages
- **Route**: `/glp1-bundle` in `App.tsx`
- **CSS Strategy**: New `GLP1BundlePage.css` for unique elements (payment breakdown table, refund protection cards, how-it-works steps); shared classes from `OceanRaysPage.css` and `TPrime365Page.css` for nav, sections, FAQ, footer, benefits grid, comparison cards
- **Components**: `AnimatedCTA`, `SharedFooter`, `CartDrawer`, `useCartStore`
- **Responsive**: All sections follow existing breakpoints (1024px, 640px) for tablet and mobile

