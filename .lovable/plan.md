

# Fix: Free Testosterone Guide Page -- Content Missing & Layout Broken

## Root Cause

Two interrelated issues are causing the page to appear broken:

1. **Video background stacking context conflict**: The hero video element (`.ftg-hero-video-bg`) uses `position: fixed` but is placed as a child of `.ftg-hero`, which is a grid container with `position: relative` and `z-index: 1`. This creates a broken stacking context -- the fixed-position video with `z-index: -2` gets trapped behind the page background, and the grid layout miscalculates because it has an extra child element it tries to place in the grid.

2. **Unbounded parallax transform**: The `useParallax` hook applies `translateY(offset)` on every scroll tick with no clamping. As the user scrolls, the ebook image gets translated hundreds of pixels off-screen, making it (and potentially other content) disappear.

## Fixes

### 1. Move Hero Video Background Outside the Grid
Move the `<div className="ftg-hero-video-bg">` out of the `<section className="ftg-hero">` grid and place it as a direct child of the page wrapper (`.ftg-page`), right at the top. This way the fixed video sits behind everything without interfering with the hero grid layout.

**File:** `src/pages/FreeTestosteroneGuidePage.tsx`
- Move the video background `div` from inside `<section className="ftg-hero">` to just before it, as a sibling inside `.ftg-page`

### 2. Clamp the Parallax Effect
Add bounds to the parallax hook so the ebook image never translates more than +/-30px, keeping it visible at all scroll positions.

**File:** `src/pages/FreeTestosteroneGuidePage.tsx`
- Change line in `useParallax`: `const offset = rect.top * speed;` to `const offset = Math.max(-30, Math.min(30, rect.top * speed));`

### 3. Fix Console Ref Warnings
The console shows warnings about refs being passed to `FaqItem` and `OptInForm` function components. Wrap both with `React.forwardRef` to eliminate these warnings cleanly.

**File:** `src/pages/FreeTestosteroneGuidePage.tsx`
- Wrap `OptInForm` and `FaqItem` with `React.forwardRef`

---

## Technical Details

### Files Modified
- `src/pages/FreeTestosteroneGuidePage.tsx` -- 3 targeted edits (move video div, clamp parallax, forwardRef wrappers)
- No CSS changes needed -- the existing styles are correct once the HTML structure is fixed

### Why This Fixes It
- The hero video at `position: fixed; z-index: -2` will now live outside the grid's stacking context, rendering correctly behind all page content
- The grid will only contain its intended 2 columns (hero-left and hero-right) without the video div disrupting the layout
- The parallax clamping prevents the ebook from ever scrolling out of view
- The final CTA video (position: absolute, inside its own section with `isolation: isolate`) is already correctly structured and needs no changes

