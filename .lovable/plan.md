

## P0 + P1 Conversion Fixes for GLP-1 Protocol Page

### Status Check
The P0 fixes (3 mid-page CTAs + mobile sticky CTA bar) are **already implemented**. This plan covers the remaining P1 fixes.

---

### Fix 1: Remove Intake Form Link from Hero
**Problem:** The "Start GLP-1 Intake Form" link in the hero (lines 146-149) implies a prescription requirement and competes with the primary "Order Now" CTA.
**Change:** Delete the intake link from `GLP1Page.tsx`.

### Fix 2: Add Urgency Countdown Timer
**What:** A countdown timer in the hero section showing a limited-time offer expiring soon, reinforcing the promo banner's urgency.
**Implementation:**
- Add a `useEffect`-based countdown timer (e.g., 2-hour rolling window) to `GLP1Page.tsx`
- Display it between the price row and the CTA button in the hero
- Style: inline-flex badges showing HH:MM:SS with a "Limited Batch" or "Offer Expires In" label
- Add corresponding CSS to `GLP1Page.css`

### Fix 3: Add Testimonial Carousel Section
**What:** Insert a testimonial section between Clinical Results (section 7) and Transformation (section 8) using existing assets.
**Implementation:**
- Create a GLP-1-specific testimonial data array using existing images (`testimonial-brett-earnshaw.png`, `testimonial-dan-schmidt.png`, `testimonial-darren-lopez.png`, `testimonial-ernesto-cruz.png`, `testimonial-jay-atkins.png`, `testimonial-sean-lee.png`)
- Reuse the `EarlyTestersCarousel` component pattern (Embla carousel with autoplay and dots) but with GLP-1-specific quotes about energy, muscle preservation, and metabolism
- Place it as a new section between Clinical Results and Transformation
- Add a mid-page CTA after the testimonials for an additional conversion touchpoint

---

### Section Order After Changes
1. Promo Banner
2. Nav
3. Hero (no intake link, with countdown timer)
4. Hidden Crisis
5. Daily Protocol
6. Lifestyle Optimization
7. Clinical Results
8. **Testimonials (NEW)**
9. Transformation + Mid-CTA
10. Six Benefits + Mid-CTA
11. Science + Mid-CTA
12. Value Stack
13. Price Perspective
14. Cell Timeline
15. Final CTA
16. FAQ
17. Safety
18. Footer + Sticky Mobile CTA

### Files Modified
- `src/pages/GLP1Page.tsx` -- remove intake link, add timer state/logic, add testimonial section
- `src/pages/GLP1Page.css` -- add timer styles, testimonial section styles

