

# Fix Mobile Header Spacing -- More White Space & Professional Look

## Problem
On mobile, the promo banner and navigation bar feel cramped and overlap. The content below doesn't have enough clearance from the fixed header elements.

## Changes (single file: `src/pages/OceanRaysPage.css`)

### 1. Increase Banner Top Offset for Nav
The nav's `top` value when the banner is showing needs to match the actual rendered banner height. Currently set to `52px`, but the banner renders taller. Increase to `~56px` so the nav sits cleanly below the banner with no overlap.

### 2. Add Padding Inside the Nav Bar
Add vertical padding (`8px 16px`) to `.b365-nav-inner` on mobile so the logo, CTA, and cart icon have more breathing room within the white nav bar.

### 3. Increase Hero Top Padding
Push the hero section content down further on mobile (from `120px` to `140px`) so there's visible white space between the fixed nav and the first content section.

### 4. Clean Up the CTA Button
Slightly increase the CTA font size to `13px` and give it `padding: 8px 20px` for a more balanced, professional feel on mobile.

## Summary of CSS Edits

All edits are in the `@media (max-width: 640px)` block of `src/pages/OceanRaysPage.css`:

- `.b365-nav.with-banner` -- `top: 56px` (up from 52px)
- `.b365-nav-inner` -- `height: 64px`, `padding: 4px 16px`
- `.b365-nav-right .animated-cta.cta-sm` -- `font-size: 13px`, `padding: 8px 20px`, `height: 40px`
- `.b365-hero` -- `padding-top: 140px` (up from 120px)

These changes apply globally to all pages (Homepage, TPrime365, GLP-1, NHTO) since they all share this CSS file.
