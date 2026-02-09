

# Fix: Sticky Blue Promo Banner

## The Problem
The blue promo banner scrolls away with the page content, but the navigation bar stays fixed at `top: 37px` (to make room for the banner). This creates a visual gap at the top when you scroll down -- the nav floats 37px below the top of the viewport with nothing above it.

## The Fix
Make the promo banner also fixed/sticky so it stays visible at the top of the screen, and adjust the hero section's top padding to account for both the banner and the nav bar.

## Changes

### `src/pages/OceanRaysPage.css`
- Change `.b365-promo-banner` from `position: relative` to `position: fixed`, with `top: 0`, `width: 100%`, and `z-index: 101` (above the nav)
- Update the hero section's top padding to account for both the banner height (37px) and the nav height (72px) when the banner is visible

### `src/pages/OceanRaysPage.tsx`
- No changes needed -- the banner dismiss logic and `with-banner` class toggle already work correctly

