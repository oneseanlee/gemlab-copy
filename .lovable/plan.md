

# GLP-1 Optimization Protocol Landing Page

## Overview
Create a new dedicated landing page at `/glp1` for the GLP-1 Optimization Protocol product. The page will follow the exact same Maximus medical-grade design system used across the homepage and TPrime365 page -- same fonts, colors, spacing, card styles, section patterns, and shared components.

## New Files
1. **`src/pages/GLP1Page.tsx`** -- The page component
2. **`src/pages/GLP1Page.css`** -- Page-specific CSS (reuses OceanRaysPage.css variables and shared classes like `b365-section`, `b365-section-alt`, `b365-section-heading`, `b365-serif`, etc.)

## Modified Files
3. **`src/App.tsx`** -- Add route: `/glp1` pointing to `GLP1Page`

## Page Sections (in order)

### 1. Promo Banner + Navigation
Reuses the same sticky blue banner and nav bar pattern from TPrime365/homepage. Nav links: Ingredients, Protocol, Results, FAQ. CTA: "Order Now".

### 2. Hero Section
- Two-column layout (image left, text right) using the `tprime-hero-container` pattern
- Headline: "Transform Your Weight Loss Journey with *Cellular-Level Support*"
- Price callout: $39.95 with strikethrough $90.00
- "Save $50 + FREE Shipping" badge
- AnimatedCTA button: "Order Now -- $39.95"
- **PLACEHOLDER IMAGE**: Hero product shot (left column) -- will need a product/lifestyle image showing the GLP-1 protocol bottles/products

### 3. The Hidden Crisis (Problem Section)
- Section heading: "The Hidden Crisis of *GLP-1 Therapy*"
- Introductory text: "You're losing weight... but at what cost?"
- 2-column comparison table using the existing `b365-table-wrap` / `b365-table` pattern showing the 4 crisis points (40% muscle lost, 25% metabolic slowdown, energy crashes, 85% regain)
- Callout card with the "Regular Gas in a Ferrari" analogy

### 4. Complete Daily Protocol
- Section heading: "Your Complete *Daily Protocol*"
- 3-column card grid (Morning Upon Waking, With Breakfast, With Lunch) using the `tprime-problem-card`-style layout but with blue icons instead of red
- Each card shows timing, product, and bullet points

### 5. Lifestyle Optimization Formula
- Alternating-background section
- 4-column pillar cards (same as `tprime-pillars-grid`) showing: 9-Hour Eating Window, 2 Meals + 1 Snack, 7 Hours Sleep, 8,000 Steps Daily

### 6. Clinical Results
- Section heading: "Clinical *Results*"
- Stats grid (3x2) using the `b365-stat-card` pattern showing the 6 key outcomes (22-30% mitochondrial density, 38% ATP, 72% lean mass, etc.)

### 7. The Transformation (Before/After Comparison)
- Section heading: "The Transformation *You'll Experience*"
- 2-column delivery comparison cards (same as `tprime-delivery-grid`) -- "Without This Protocol" vs "WITH This Protocol"
- Red X icons for "without", green check icons for "with"

### 8. Six Powerful Benefits
- Section heading: "Six Powerful Benefits You'll Feel *Within Days*"
- 3x2 benefit card grid using the `tprime-benefit-card` pattern
- Energy, Fat Burning, Mental Clarity, Appetite Control, Movement, Long-term Results

### 9. How Triple Power Optimizes GLP-1 (Science Section)
- Section heading: "Three Longevity Pathways *Working Together*"
- 3-column ingredient cards using the `tprime-ingredient-card` pattern (but single-column each)
- AMPK Activation, Sirtuin Support, Autophagy Balance
- **PLACEHOLDER IMAGE**: Optional science/pathway diagram image in a callout card

### 10. Your Complete Success Package (Value Stack)
- Section heading: "Your Complete GLP-1 *Success Package*"
- Value breakdown card using the `tprime-value-card` pattern
- Lists: Triple Power (30-day), Metabolism+ (60 tablets), FREE Shipping, Protocol Guide
- Total value: $131.00, Your price: $39.95

### 11. Price Comparison / Perspective
- Alternating-background section
- "Let's Put This In Perspective" callout
- Comparison items in a clean card layout (Starbucks, GLP-1 copay, personal training, multivitamin)

### 12. What's Happening Inside Your Cells (Timeline)
- Section heading: "What's Really Happening *Inside Your Cells*"
- Step-style cards (reusing `b365-steps-grid` / `b365-step-card` pattern) for the 4 stages: Week 1-2, Week 3-8, Week 8+, After Stopping
- Followed by a callout card showing how Triple Power changes each stage

### 13. Final CTA
- Blue gradient CTA section (same `tprime-final-cta` pattern)
- Price: $39.95, strikethrough $131 value
- AnimatedCTA with white variant
- Trust points and trust strip

### 14. FAQ
- Reuses the `b365-faq-layout` two-column pattern
- GLP-1 specific questions (safety with GLP-1, when to start, what's included, shipping, etc.)

### 15. Safety Information
- Reuses `tprime-safety` pattern
- FDA disclaimer, methylene blue caution, consult healthcare provider

### 16. Shared Footer
- Reuses `SharedFooter` component

## Placeholder Images Summary
The following images will be placeholders (using `/placeholder.svg` with descriptive alt text). I will clearly mark each in the code with a comment `{/* PLACEHOLDER IMAGE */}`:

1. **Hero product shot** -- Needs: Photo of Triple Power Methylene Blue bottle + Metabolism+ tablets together, styled product photography
2. **Science/pathway diagram** (optional) -- Needs: Visual showing AMPK + Sirtuin + Autophagy pathways

All other sections use icon-based designs (Iconify/Lucide icons) and don't require images.

## CSS Approach
- The new `GLP1Page.css` file will import/reuse the shared CSS from `OceanRaysPage.css` (same as TPrime365 does)
- New CSS classes will be prefixed with `glp1-` for any page-specific styles
- Most layout will reuse existing classes: `b365-section`, `b365-section-alt`, `b365-section-heading`, `b365-serif`, `tprime-*` card patterns, etc.
- Minimal new CSS needed -- primarily just a few color overrides (green/teal accents for weight-loss branding vs the blue testosterone branding)

## Technical Notes
- File uses `// @ts-nocheck` at top (consistent with other pages)
- Uses `iconify-icon` web components for icons (consistent with existing pages)
- Imports `AnimatedCTA` and `SharedFooter` shared components
- FAQ accordion uses the same `useState` pattern as other pages

