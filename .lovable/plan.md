

## Get CTA Above the Fold on Desktop GLP-1 Buy Page

**Problem**: On desktop (1110×635 viewport), the right column starts with title → stars → description → checklist → price → countdown → shipping note → bonuses → How It Works → **then** the form/CTA. The CTA button is far below the fold.

**Approach**: Restructure the right column to move the core purchase elements (price, countdown, form) up, and push secondary content (bonuses, How It Works, FAQ) below the form.

### Changes to `src/pages/GLP1BuyPage.tsx`

Reorder the right column JSX so the sequence becomes:

1. Title
2. Star rating
3. Price + discount badge
4. Countdown timer
5. Shipping note
6. **Inline form with CTA** (moved up)
7. Guarantee badge
8. Description paragraph (moved down)
9. Checklist (moved down)
10. Bonuses section
11. How It Works
12. FAQ
13. Phone line + disclaimer

This puts the form and "Get My GLP-1 Protocol" button within roughly the first 500px of the right column — well above the fold at 635px viewport height.

### Changes to `src/pages/GLP1BuyPage.css`

- Update mobile `order` values to preserve the existing mobile stack order (mobile already works well with its own ordering via `display: contents`).
- Tighten gap on the description/checklist that now sit below the form so they read as supporting content.

No changes to the left column or mobile layout needed — mobile already uses CSS `order` to control stacking independently.

