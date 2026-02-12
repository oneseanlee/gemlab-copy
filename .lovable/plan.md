

# Fix Mobile Stacking for "Three Longevity Pathways" Section

## Problem
The grid on line 327 of `GLP1Page.tsx` has an inline style `gridTemplateColumns: 'repeat(3, 1fr)'` that overrides the responsive CSS breakpoints, forcing 3 columns on all screen sizes including mobile.

## Solution
Remove the inline `style` prop from the grid div so the existing responsive CSS in `GLP1Page.css` can handle the layout. Then add a mobile-specific CSS rule to ensure the `.tprime-ingredient-grid` stacks to a single column on small screens.

## Changes

### 1. `src/pages/GLP1Page.tsx` (line 327)
- Remove the inline `style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}` from the div
- Keep the `tprime-ingredient-grid` class which already has responsive rules

### 2. `src/pages/GLP1Page.css`
- Add a mobile rule inside the existing `@media (max-width: 640px)` block:
  ```
  .glp1-page .tprime-ingredient-grid {
    grid-template-columns: 1fr;
  }
  ```
- Add a tablet rule inside the `@media (max-width: 1024px)` block:
  ```
  .glp1-page .tprime-ingredient-grid {
    grid-template-columns: 1fr;
  }
  ```

This ensures the three pathway cards stack vertically on mobile and tablet for a cleaner reading experience.

