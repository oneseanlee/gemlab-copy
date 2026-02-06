

# TPrime365 Landing Page Implementation Plan

## Overview
Create a new landing page at `/tprime365` for the TPrime365 testosterone optimizer product, matching the professional look and feel of the existing GemLab listicle page while adapting the design for this pharmaceutical/supplement product.

## Design Approach
The new page will reuse the existing design language including:
- Light blue gradient background (`#ddeafa`)
- White rounded cards with shadows (border-radius: 2rem)
- Zalando Sans Expanded for headlines
- Rethink Sans for body text
- Neon lime accent color (`#CCFF00`) for highlights
- 5:2 and 4:3 aspect ratio cards where appropriate

---

## Page Structure & Sections

### 1. Header
- Simple header with "TPrime365" logo (styled like GEMLAB logo)
- Optional "Advertorial" banner if needed

### 2. Hero Section
A large white card containing:
- Main headline: "The Only 4-in-1 Testosterone Optimizer With Sublingual Delivery"
- Subheadline with ingredient list
- Price banner: "$149/month"
- HappyMD physician consultation note
- Money-back guarantee callout
- Large CTA button: "START YOUR OPTIMIZATION"

### 3. The Problem Section
Three problem cards showing what's wrong with traditional solutions:
- Injectable TRT (with list of cons)
- Oral Pills (with list of cons)
- Single-Ingredient Solutions (with list of cons)
Each using a dark/red color scheme to indicate "bad" options

### 4. The Solution Section
- Headline: "TPrime365: Your Natural Testosterone, Amplified"
- Visual 4-pillar diagram showing:
  - Enclomiphene 25mg
  - Spermidine 10mg
  - Boron 10mg
  - Vitamin C 10mg
- MODS Max Gold sublingual delivery callout

### 5. Ingredient Breakdown Section
Four detailed ingredient cards (grid layout):
- **Pillar 1: Enclomiphene** - Hormone Optimization
- **Pillar 2: Spermidine** - Testosterone + Longevity
- **Pillar 3: Boron** - Strength & Vitality
- **Pillar 4: Vitamin C** - Protection & Support

Each card includes:
- Icon/badge
- "What It Does" bullet list
- "The Science" bullet list

### 6. Delivery Advantage Section
Two-column comparison:
- Left: "Oral Capsules (Competitors)" with cons
- Right: "Sublingual (TPrime365)" with pros
- MODS Max Gold Technology callout box

### 7. Who Is This For Section
Three persona cards:
- The Performer (Age 25-40)
- The Rebuilder (Age 40-55)
- The Optimizer (Age 55+)

### 8. Benefits Section
3x3 icon grid showing:
- Energy & Drive
- Lean Muscle Growth
- Mental Clarity
- Libido & Performance
- Faster Recovery
- Fat Loss
- Better Sleep
- Bone Density
- Longevity

### 9. Comparison Table Section
Full-width comparison table (styled like the GemLab vs Competitors table):
- TPrime365 vs Hims vs Maximus vs Strut vs TRT Clinics
- Rows: Price, Dose, Delivery, Ingredients, Fertility, etc.
- TPrime365 column highlighted with lime accent

### 10. Value Breakdown Section
Visual value stack showing:
- What's included and retail values
- Total value vs your price
- Savings calculation

### 11. How It Works Section
3-step process flow:
1. Complete Order & Health Assessment
2. Physician Review via HappyMD
3. Receive & Start Optimizing

With timeline callout: "Order to delivery: 7-10 days"

### 12. Dosing Instructions Section
Card with:
- When to take (30-60 min before bedtime)
- How to take (sublingual)
- Pro tips box

### 13. Safety & Quality Section
Trust badges grid:
- FDA-Registered 503A Facility
- Money-Back Guarantee
- Third-Party Tested
- Made in USA
- Licensed Physician Oversight
- HIPAA Compliant

### 14. Contraindications Section
Important safety information with list of conditions

### 15. FAQ Section
Accordion-style FAQ matching the GemLab accordion component

### 16. Testimonials Section
Placeholder section for future testimonials

### 17. Final CTA Section
Large CTA card with:
- Headline: "Ready to Reclaim Your Prime?"
- Price callout
- Large CTA button
- Trust bullet points below button
- Trust badge strip

### 18. Footer
- Contact information
- HappyMD attribution
- Legal links

---

## Files to Create

### New Files:
1. `src/pages/TPrime365Page.tsx` - Main page component
2. `src/pages/TPrime365Page.css` - Page-specific styles

### Files to Modify:
1. `src/App.tsx` - Add route for `/tprime365`

---

## Technical Details

### Component Reuse
- Reuse existing CSS patterns from ListiclePage.css
- Follow same card styling conventions
- Use existing color variables and fonts from index.css

### Responsive Design
- Mobile-first approach
- Cards stack vertically on mobile
- Comparison table scrolls horizontally or stacks
- CTA buttons remain full-width on mobile

### Key Style Classes to Create
- `.tprime-hero-card` - Hero section styling
- `.problem-card` - Problem section cards (red accents)
- `.pillar-card` - Ingredient pillar cards
- `.comparison-col.tprime` - Highlighted TPrime column
- `.process-step` - How it works steps
- `.trust-badge` - Safety badges
- `.faq-item` - FAQ accordion items
- `.final-cta` - Final CTA section

### Color Scheme
- Primary: `#CCFF00` (neon lime) - CTAs, accents
- Background: `#ddeafa` (light blue)
- Cards: `#FFFFFF` (white)
- Problem cards: Dark gradients with red accents
- Text: `#1a1a1a` (primary), `#4A5568` (secondary)

---

## Implementation Order

1. Create the route in App.tsx
2. Create TPrime365Page.tsx with basic structure
3. Create TPrime365Page.css with all section styles
4. Build out each section from top to bottom
5. Add responsive breakpoints
6. Test on mobile/tablet/desktop

