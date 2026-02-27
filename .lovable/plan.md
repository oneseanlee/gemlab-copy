

## Make "Many Users Report" Image Full-Width, Borderless, with Rounded Corners

### Changes

**File: `src/pages/GLP1Page.css`** (lines 632-655)

1. **Remove the container's border/background/shadow**: Strip the `background`, `box-shadow`, and `padding` from `.glp1-enhancement-img` so there's no visible card wrapper around the image.

2. **Make it full-width**: Set `max-width: 100%` so the image extends edge-to-edge within the section.

3. **Round the image corners**: Apply `border-radius: var(--radius-md)` (14px, matching the hero section's card-level rounding) to the `img` element instead of `--radius-sm`.

### Resulting CSS

```css
.glp1-enhancement-img {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0;
  border-radius: 0;
  background: none;
  box-shadow: none;
}
.glp1-enhancement-img img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  display: block;
}
```

The mobile override for `.glp1-enhancement-img` padding will also be updated to `padding: 0` for consistency.

### Files Modified
- `src/pages/GLP1Page.css` -- remove wrapper styling, apply rounded corners to image
