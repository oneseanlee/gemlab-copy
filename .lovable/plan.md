

## Reduce top spacing on desktop GLP-1 Buy page

**Problem**: The checkout section has 60px top padding from `.glp1-checkout-section` (in GLP1Page.css) plus additional padding from `.b365-section` (96px in HomePage.css). Combined, this creates excessive whitespace at the top on desktop.

**Change**: Add a desktop-only override in `src/pages/GLP1BuyPage.css` to reduce the top padding of the checkout section.

**File: `src/pages/GLP1BuyPage.css`** — add near the top (after the `.glp1buy-page` rule):

```css
.glp1buy-page .glp1-checkout-section {
  padding-top: 24px;
}
```

This targets only the buy page, reducing the top gap from ~60px to 24px on desktop without affecting mobile (which already has its own override at 32px).

