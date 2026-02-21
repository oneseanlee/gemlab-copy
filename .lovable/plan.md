

## Increase Video Background Overlay Opacity for Better Text Legibility

**Problem:** The current overlay on the video background uses 50-55% opacity values, making text hard to read against the moving video. This violates WCAG 2.2 AA contrast requirements and undermines readability.

**Solution:** Increase the white/blue gradient overlay opacity from ~55% to ~82-88%, creating a soft frosted-white canvas that lets the video add subtle texture without competing with the text.

### What Changes

The `.ftg-hero-video-overlay` gradient in `FreeTestosteroneGuidePage.css` updates from:

```text
BEFORE:
  rgba(255, 255, 255, 0.55)  at top     (55% white)
  rgba(210, 228, 243, 0.50)  at middle  (50% light blue)
  rgba(150, 190, 220, 0.55)  at bottom  (55% blue)

AFTER:
  rgba(255, 255, 255, 0.88)  at top     (88% white)
  rgba(230, 240, 248, 0.85)  at middle  (85% soft blue)
  rgba(210, 228, 243, 0.82)  at bottom  (82% blue)
```

This applies to both the FTG page and the upsell page (which reuses the same `.ftg-hero-video-overlay` class via the shared video background markup).

### Technical Details

**File modified:** `src/pages/FreeTestosteroneGuidePage.css` -- Update the three rgba values in `.ftg-hero-video-overlay` to the higher opacity values above. One line change (the gradient declaration).

**No other files changed.** The upsell page inherits this overlay since both pages use the same CSS class.
