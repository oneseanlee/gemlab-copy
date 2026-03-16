

## Fix: "FREE" tag on one line in mobile bonus cards

**Problem**: At ≤480px, the bonus cards switch to a horizontal row layout. The "FREE" badge (`bonus-free-tag`) may be wrapping or not staying on a single line.

**Change**: In `src/pages/GLP1BuyPage.css`, inside the existing `@media (max-width: 480px)` block for `.bonus-card--visual`, add `white-space: nowrap` to the `.bonus-free-tag` so it never wraps, and ensure the text container area has enough room.

**File: `src/pages/GLP1BuyPage.css`**

Add this rule inside the existing `@media (max-width: 480px)` block (around line 290):

```css
.bonus-card--visual .bonus-free-tag {
  white-space: nowrap;
  flex-shrink: 0;
}
```

This ensures the "FREE" tag always renders on a single row on mobile without breaking or wrapping.

