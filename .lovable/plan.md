

## Fix: CTA Button and Sub-text on Separate Lines

The "Join Them -- Order Now $39.95" button and the "Join hundreds of optimized GLP-1 users" sub-text are appearing side-by-side instead of stacked vertically. This affects all mid-page CTA blocks on the GLP-1 Protocol page.

### Root Cause

The `.glp1-mid-cta` container uses `text-align: center` for centering, but both the button (`inline-flex`) and the sub-text (`inline-flex`) sit on the same line when the viewport is wide enough.

### Fix

Update `.glp1-mid-cta` in `src/pages/GLP1Page.css` to use `display: flex; flex-direction: column; align-items: center;` so the button and sub-text always stack vertically. This one CSS change fixes all 4 mid-page CTA instances across the page.

