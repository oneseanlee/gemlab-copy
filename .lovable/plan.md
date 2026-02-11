

# Non-Hormonal Testosterone Optimizer (NHTO) Landing Page

## Overview
Create a new landing page at `/nhto` for the Non-Hormonal Testosterone Optimizer bundle. This page follows the exact same Maximus medical-grade design system as TPrime365 and GLP-1 pages, reusing all shared CSS patterns and components.

## New Files

### 1. `src/pages/NHTOPage.tsx`
The main page component containing all 18 sections listed below.

### 2. `src/pages/NHTOPage.css`
Page-specific CSS with `nhto-` prefix. Reuses shared variables and patterns from `OceanRaysPage.css` and `TPrime365Page.css`. New styles needed for:
- Order summary cards with refundable/non-refundable badge styling
- Testimonial result cards with before/after testosterone levels
- Doctor testimonial cards
- Product breakdown tabs/cards for the 4-product UCOS system
- Payment breakdown table with color-coded rows

## Modified Files

### 3. `src/App.tsx`
Add route: `/nhto` pointing to `NHTOPage`

## Page Sections (in order)

### 1. Promo Banner + Navigation
Same sticky blue banner and nav bar. Nav links: Benefits, Results, Compare, Bundle. CTA: "Get The System". Cart drawer included.

### 2. Hero Section
Two-column layout using `tprime-hero-container`. Headline: "Revolutionary Non-Hormonal *Testosterone Optimizer*". Subhead lists 3 key benefits (Maintains Testicular Function, Protects Fertility, Stimulates Natural LH/FSH). Price: $300, consultation included. AnimatedCTA: "YES! I Want My System + Consultation". Consultation facilitated by happyMD badge below CTA.
- **PLACEHOLDER IMAGE**: Hero product shot (needs: NHTO bottle + UCOS system products together)

### 3. Trust Strip
4-column trust badges row: Free Shipping, 60-Day Guarantee, Premium Quality (Made in USA), Doctor Consultation Included.

### 4. Critical Information -- TRT Side Effects
Section heading: "If You're Considering TRT, *You Need to Know This*". 4-column problem cards (same `tprime-problem-card` pattern with red icons): Testicular Atrophy, Fertility Impact, Hormonal Dependency, Estrogen Issues.

### 5. The Non-Hormonal Alternative
Section heading: "The Non-Hormonal Alternative That Protects *Your Vitality*". MODS Max vs TRT Alone comparison using `tprime-delivery-grid` (2 columns). 4 benefit cards below (Maintains Testicular Function, Protects Fertility, Stimulates Natural LH/FSH, Optimizes Hormone Balance).
- **PLACEHOLDER IMAGE**: Optional comparison graphic

### 6. How It Works (4 Steps)
4-step process using `b365-steps-grid` / `b365-step-card` pattern: Health Intake, Provider Review, Supplements Ship Immediately, Prescription Issued If Approved.

### 7. Clinical Results / Real Transformations
Section heading: "Real *Transformations*". Stats strip: 664% Max T Increase, 3 Weeks Avg Results, 100% Patient Safety, 1000+ ng/dL Achieved. Zero Adverse Events badge. 4 testimonial result cards showing before/after testosterone levels (Alex T. Age 32, Marcus L. Age 30, David R. Age 45, Mark Age 60). Each card shows percentage increase and quote.
- **PLACEHOLDER IMAGES**: 4 testimonial profile photos

### 8. Complete Product Breakdown
Section heading: "Complete *Product Breakdown*". 4 product ingredient cards using `tprime-ingredient-card` pattern:
1. Non-Hormonal Testosterone Optimizer (Rx, MODS Max) -- Enclomiphene, Boron, Vitamin C
2. Activate365 Morning Cellular Activation -- Spermidine, NAD+, Boron, MODS Max
3. Mito365 Peak Performance Enhancement -- Methylene Blue, GHK-Cu, PQQ, NAD+, B12, Vitamin C
4. Restore365 Overnight Recovery -- Melatonin, GABA, Boron, Zinc
Plus: Licensed Physician Consultation card ($200 value)
- **PLACEHOLDER IMAGES**: 4 product bottle images (NHTO, Activate365, Mito365, Restore365)

### 9. Order Summary / Value Stack
Two-tier order summary card:
- UCOS System (3 Products): $160 -- NON-REFUNDABLE badge (yours to keep)
- NHTO + Physician Consultation: $140 -- REFUNDABLE IF NOT APPROVED badge
- Shipping: FREE
- Total: $300
- Save $159 callout (Regular $459)
AnimatedCTA: "YES! I Want My System + Consultation"

### 10. Risk-Free Promise
Callout card explaining the refund policy: $140 refunded if not approved, $160 UCOS kept regardless.

### 11. Doctor Testimonials
Section heading: "What Medical Professionals *Say*". 3-column cards (same `tprime-trust-card` style): Dr. Steven Warren MD PhD, Board-Certified Urologist, Dr. K Cardiologist. Each with quote and credentials.

### 12. Scientific Comparison Table
Section heading: "MODS Max vs. *Traditional TRT*". Uses `tprime-table` pattern. 5-column table comparing MODS Max + TRT, TRT Alone, and No Treatment across: Testicular Function, Fertility, Hormone Balance, Estrogen Control, Dependency Risk, Total Testosterone.

### 13. Final CTA
Blue gradient CTA section (`tprime-final-cta` pattern). Price: $300 Complete System. Save $159 callout. AnimatedCTA white variant. Trust points and trust strip. Payment breakdown mini-table (UCOS $160 + NHTO+Consult $140 + FREE shipping).

### 14. Product Timing Schedule
Visual showing the 4-product daily timing: Morning (Activate365 first, then Mito365 15 min after), Evening (Restore365 30-60 min before bed), plus NHTO as prescribed.

### 15. FAQ
Same `b365-faq-layout` two-column pattern. 10 FAQ items from the provided content (consultation, approval, TRT compatibility, fertility, results, side effects, FDA, bundle contents, dosing, happyMD).

### 16. Safety Information
Same `tprime-safety` pattern. FDA disclaimer, Methylene Blue caution, G6PD warning.

### 17. Shared Footer
Reuses `SharedFooter` component.

## Placeholder Images Summary
Images that will use `/placeholder.svg` (marked with `{/* PLACEHOLDER IMAGE */}` comments):

1. **Hero product shot** -- Needs: NHTO bottle + UCOS system (Activate365, Mito365, Restore365) arranged together
2. **4 testimonial profile photos** -- Needs: Photos for Alex T., Marcus L., David R., Mark
3. **4 product bottles** -- Needs: Individual product shots for NHTO, Activate365, Mito365, Restore365

## Shopify Integration
- The page will include `CartDrawer` in the nav and wire all CTA buttons to `addItem()` 
- A new Shopify product will need to be created for this bundle ($300) -- for now, the buttons will be wired with a placeholder variant ID and a TODO comment, since the Shopify product hasn't been created yet
- Alternatively, we can create the Shopify product at the same time if desired

## Technical Notes
- File uses `// @ts-nocheck` at top (consistent with other pages)
- Uses `iconify-icon` web components for all icons
- Imports `AnimatedCTA`, `SharedFooter`, `CartDrawer`, `useCartStore`
- Reuses CSS from `OceanRaysPage.css` and `TPrime365Page.css` 
- New CSS classes prefixed with `nhto-`
- Responsive breakpoints at 1024px and 640px matching existing pages

