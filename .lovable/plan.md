
# Redesign "Simple Daily Routine" Section -- Split Layout with Product Image

## Overview
Replace the current single-card dosing layout with a two-column split design: the TPrime bottle image on the left, and the dosing steps + pro tips on the right. This mirrors the accordion section pattern already used on the site.

## Layout

```text
+---------------------------+---------------------------+
|                           |  Your Nightly Protocol    |
|                           |                           |
|    [TPrime Bottle Image]  |  1. WHEN  30-60 min...   |
|                           |  2. PLACE 1 dropper...   |
|                           |  3. HOLD  30 seconds...  |
|                           |  4. SWALLOW remaining... |
|                           |                           |
|                           |  30-day supply per bottle |
|                           |                           |
|                           |  Pro Tip card (unchanged) |
+---------------------------+---------------------------+
```

On mobile, the image stacks above the steps.

---

## Changes

### 1. TPrime365Page.tsx (lines 610-639)
- Wrap the section content in a new `tprime-dosing-split` container with two children:
  - **Left column**: Product image using `tprime-bottle.png` (already in `/public/images/`)
  - **Right column**: The existing dosing steps and pro-tip card
- Update heading from "Simple Daily Routine" to "Your Nightly Protocol" for stronger branding
- Add numbered step indicators (1-4) to each dosing item for visual progression

### 2. TPrime365Page.css (lines 586-649)
- Add new `.tprime-dosing-split` class: two-column flex layout, `gap: var(--space-8)`, `max-width: 1100px`, centered
- Left column (`.tprime-dosing-image`): `flex: 1`, image with `border-radius: var(--radius-md)`, `object-fit: contain`
- Right column (`.tprime-dosing-steps`): `flex: 1`, contains existing dosing items and pro-tip
- Remove `max-width: 800px` and `grid-template-columns` from `.tprime-dosing-card` since it will now live inside the right column as a single-column flow
- Add numbered step styling (`.tprime-step-number`): small blue circle with the step number
- Mobile breakpoint (768px): stack columns vertically, image on top

### 3. Mobile CSS update (existing 768px media query, line ~1093)
- Update `.tprime-dosing-split` to `flex-direction: column`
- Constrain image height on mobile to ~250px
