

# TPrime365 Conversion Optimization Plan

## Current State Analysis

The page has strong content but critical conversion architecture gaps. Only **3 CTAs** exist across 18 sections. Most high-impact sections (Problem, Solution, Comparison, Value Breakdown) have no call-to-action, letting visitors absorb information without a clear next step. CTA text is inconsistent across the page.

---

## Changes Overview

### 1. Standardize All CTA Text to "Start My Protocol"

**Before:** Three different CTA labels ("Start My Protocol", "See If You Qualify", "Order Now -- Risk Free")
**After:** All CTAs use "Start My Protocol" with an ArrowRight icon -- consistent, ownership-driven language throughout

Files affected: `TPrime365Page.tsx` (lines 476 and 492-494)

---

### 2. Add CTAs After 5 High-Impact Sections

Currently, a visitor can scroll through the Problem, Solution, Ingredients, Comparison, and Value sections without ever seeing a button. Add a centered `AnimatedCTA` after each of these sections:

- **After Problem section** ("Traditional Solutions Are Broken") -- visitor just learned competitors fail, perfect moment to convert
- **After Solution section** ("Your Natural Testosterone, Amplified") -- just saw the formula, ready to act
- **After Ingredient Breakdown** -- deep science readers are high-intent
- **After Comparison Table** -- just saw TPrime365 wins every row
- **After Value Breakdown** -- just saw $285/month savings

This brings total page CTAs from 3 to **8+** (including nav).

Files affected: `TPrime365Page.tsx`

---

### 3. Add Urgency Element -- Dynamic Monthly Pricing Lock

Add a subtle urgency banner just below the hero price row:

```
"February pricing locked at $149/mo -- Next price review: March 1"
```

Uses dynamic `new Date()` to always show the current month. Styled with a small Clock icon, muted text, no aggressive countdown timers -- fits the medical-grade aesthetic.

Files affected: `TPrime365Page.tsx` (hero section), `TPrime365Page.css`

---

### 4. Add Trust Micro-Badges Below Hero CTA

Add a row of small trust indicators directly beneath the hero "Start My Protocol" button:

- Physician-Reviewed
- FDA-Registered Pharmacy
- Money-Back Guarantee
- Free Shipping

Small text with check icons, light gray color. Reduces purchase anxiety at the first decision point.

Files affected: `TPrime365Page.tsx` (hero section), `TPrime365Page.css`

---

### 5. Enhance Testimonial Cards with Quotes

The current testimonial carousel only shows photos and names -- no social proof content. Add short result-focused quotes to each testimonial card:

- Brett Earnshaw: "Testosterone went from 658 to 749 in two months"
- Kerry Reyes: "More energy within the first two weeks"
- Mike VanDyke: "Rapid improvements in energy and cellular performance"
- Sean Lee: "Finally found something that actually works"
- Ernesto Cruz: "Better focus, better sleep, better everything"
- Jay Atkins: "Wish I started this years ago"

Files affected: `TPrime365Page.tsx` (testimonials data + card rendering)

---

### 6. Move Comparison Table Before Final CTA

**Current order:** Final CTA -> Comparison Table -> Value Breakdown -> Dosing -> Safety -> FAQ
**New order:** Comparison Table -> Value Breakdown -> Final CTA -> Dosing -> Safety -> FAQ

Rationale: The comparison table and value breakdown are objection-handlers. They should build the case BEFORE the big conversion moment, not after it.

Files affected: `TPrime365Page.tsx` (reorder JSX sections)

---

### 7. Add Final CTA After FAQ

The page currently ends with FAQ -> Footer. Add one last "Start My Protocol" CTA between FAQ and Footer as a catch-all for visitors who scrolled the entire page.

Files affected: `TPrime365Page.tsx`

---

### 8. Add Sticky Mobile CTA Bar

On mobile (below 768px), add a fixed bottom bar with the price and "Start My Protocol" button that's always visible as the user scrolls. Hidden on desktop where the nav CTA serves this purpose.

Files affected: `TPrime365Page.tsx`, `TPrime365Page.css`

---

## Section Order After Changes

1. Promo Banner
2. Nav (CTA in nav)
3. Hero (CTA + trust badges + urgency line)
4. Testimonials (with quotes)
5. 3 Steps
6. Problem ("Traditional Solutions Are Broken") + CTA
7. Solution ("Amplified") + CTA
8. Ingredient Breakdown + CTA
9. Delivery Comparison
10. Who Is This For
11. Benefits Grid
12. UGC Videos + CTA
13. **Comparison Table** (moved up) + CTA
14. **Value Breakdown** (moved up)
15. **Final CTA section**
16. Dosing Instructions
17. Safety/Quality
18. FAQ + CTA after
19. Footer
20. Sticky mobile CTA bar (mobile only)

---

## Summary of All Changes

| Change | Conversion Principle | Files |
|--------|---------------------|-------|
| Standardize CTA text | Consistency / reduced cognitive load | TSX |
| Add 5 mid-page CTAs | CTA density / strike while hot | TSX |
| Dynamic urgency line | Subtle scarcity | TSX, CSS |
| Hero trust micro-badges | Objection handling at decision point | TSX, CSS |
| Testimonial quotes | Social proof with specifics | TSX |
| Reorder sections | Objection handling before conversion | TSX |
| Post-FAQ CTA | Catch-all for full-page readers | TSX |
| Sticky mobile CTA | Friction removal / always-visible action | TSX, CSS |

No changes to the design system, color palette, typography, or brand identity. All additions use existing component patterns (`AnimatedCTA`, design tokens, Lucide icons).

