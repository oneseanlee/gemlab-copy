

## Plan: Revert the broken mobile CSS changes

The previous edit introduced several CSS changes that broke the homepage layout. These need to be reverted to restore the original working state.

### Changes to revert

**1. `src/App.css`** — Remove the added `overflow-x: hidden` from `#root` and the entire `html, body` block. Restore to original:
```css
#root {
  width: 100%;
  margin: 0;
  padding: 0;
}
```

**2. `src/pages/HomePage.css`** — Four reverts:
- Line 238-239: Remove `overflow-x: hidden` and `max-width: 100vw` from `.b365-page`
- Line 440: Change `.b365-hero-image` `overflow` back to `visible` (from `hidden`)
- Line 1298: Remove `overflow: hidden` from the mobile `.b365-hero` rule
- Lines 1306-1308: Restore `.b365-hero-text h1` font-size back to `var(--text-h2)` and remove `word-wrap`/`overflow-wrap`

These are exact reverts of the diff shown. No new changes — just undoing the broken edits.

