

# TPrime365 Page — Targeted Text & Layout Changes

Four specific changes, nothing else touched.

## 1. Hero Section — Text Changes Only

Update the headline from the current single line to two lines:
- Line 1: "More Energy. More Muscle. More Drive."
- Line 2: "Without Shutting Down Your Natural Testosterone."

Update the subhead paragraph to: "Enclomiphene + Spermidine + Boron + Vitamin C -- compounded into one sublingual formula. Physician-reviewed. FDA-registered 503A facility. Delivered to your door."

Change the CTA button text from "Start Your Optimization" to "See If You Qualify" (with the existing arrow icon).

Price line and guarantee text stay exactly as they are. Layout, image, and styling untouched.

## 2. Testimonial / UGC Video Section — Headline + CTA Addition

Change the section heading from "Real Men. Real Results." to "Real Men. Measurable Results."

Add a subhead paragraph below the heading: "These aren't influencers. They're guys who were tired of feeling tired -- and decided to do something about it."

Add a centered AnimatedCTA button below the video grid that says "See If You Qualify" (same styling as the hero CTA), linking to `#process`.

## 3. Move the Final CTA Block

Cut the full blue CTA block (the "Ready to Reclaim Your Prime?" section, currently section 17 at lines 502-529) and move it to appear directly after the testimonial/UGC section and before the comparison table section ("The Only Formula That Does It All").

All content and styling of that block stays identical.

## 4. Remove the Safety Warning Section

Delete the "Important Safety Information" section entirely (lines 458-476) -- the one with the red/orange heading listing contraindications like prostate cancer, kidney disease, under 18, etc.

## Technical Details

### File: `src/pages/TPrime365Page.tsx`

**Hero (lines 97-108):**
- Replace `h1` content with two-line headline
- Replace `p.subhead` content with new copy
- Change CTA text from "Start Your Optimization" to "See If You Qualify"

**UGC Section (lines 335-350):**
- Change heading text to "Real Men. Measurable Results."
- Add subtitle `p` tag below the heading
- Add `AnimatedCTA` button after the `.tprime-ugc-grid` div

**Section reorder:**
- Move the Final CTA block (lines 502-529) to after the UGC/testimonial section (after line 350) and before the comparison table (currently line 352)

**Safety section (lines 458-476):**
- Remove entirely

### File: `src/pages/TPrime365Page.css`

No CSS changes needed. All new elements use existing component styles (AnimatedCTA, b365-section-heading).

