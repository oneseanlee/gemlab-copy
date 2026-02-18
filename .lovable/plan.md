

# Move the Purchase Action Higher on the TPrime365 Page

The current page has 17 sections and the first actionable purchase step ("How It Works" / `#process`) is section 12. Users have to scroll through ingredients, delivery science, persona cards, benefits, UGC videos, and a comparison table before they can buy. That's too much friction.

## The Fix

### 1. Move "How It Works" (3 Steps) directly after the Hero
Relocate the `#process` section (currently section 12, lines 371-400 including the timeline callout) to become section 4 -- right after the hero. This way, when someone clicks "Start Your Optimization" in the hero, they land on the steps immediately. The flow becomes:

- Hero (with CTA)
- 3 Simple Steps to get started
- Then the deeper content (problem, science, ingredients, etc.)

### 2. Add a sticky bottom CTA bar
Add a persistent "Order Now - $149/mo" bar that stays visible as users scroll through the educational content, so they can take action from anywhere on the page without scrolling back.

### 3. Keep the Final CTA section at the bottom
The existing final CTA (section 17) stays as-is for users who read through everything.

## Technical Details

All changes in `src/pages/TPrime365Page.tsx` and `src/pages/TPrime365Page.css`:

**TPrime365Page.tsx:**
- Cut lines 370-400 (the "How It Works" section + timeline callout)
- Paste them after line 112 (right after the hero section closes)
- Add a new sticky CTA bar component at the bottom of the JSX (before the footer), styled to stay fixed at the viewport bottom

**TPrime365Page.css:**
- Add styles for the sticky bottom CTA bar (~20 lines of CSS)
- Bar should match the existing brand aesthetic: dark background, teal accent button, price callout

## Result
- Hero CTA scrolls to the steps immediately (no more scrolling past 10 sections)
- Sticky bar lets users buy from anywhere on the page
- All educational content remains intact, just reordered for better conversion
