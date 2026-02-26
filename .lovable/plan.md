
# Fix Button Positioning on TPrime365 Page

## Problem
The "Start My Protocol" CTA buttons throughout the TPrime365 page appear too close to surrounding content. The root cause is that `.tprime-mid-cta` uses `margin-top: var(--space-10)`, but `--space-10` is **not defined** in the design system tokens (only 1, 2, 3, 4, 6, 8, 12, 16, 24 exist). This means the margin resolves to nothing, leaving no spacing above or below the CTA blocks.

## Fix

### 1. Update `.tprime-mid-cta` spacing (`src/pages/TPrime365Page.css`, line 953)
- Change `margin-top: var(--space-10)` to `margin-top: var(--space-12)` (48px) -- the next available token
- Add `margin-bottom: var(--space-4)` (16px) for balanced bottom spacing

This single CSS fix will correct the spacing for all 6 MidPageCTA instances across the page since they all use the same class.
