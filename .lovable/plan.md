

## Fixes for /glp1-buy Page

### FIX 1: Video Player Visibility
**`src/pages/GLP1BuyPage.css`** — Change video styles:
- Change `object-fit: cover` to `object-fit: contain` so captions aren't cropped
- Remove `border-radius: 12px` from both the wrapper and the video element
- Keep `aspect-ratio: 1/1` since the video is square

### FIX 2: Replace Sound Hint with Centered Pulsing Overlay
**`src/pages/GLP1BuyPage.tsx`**:
- Remove the 3-second auto-hide `useEffect` (timer-based). The overlay should only disappear on user tap
- Replace the `handleVideoClick` with a `handleSoundOverlayClick` that unmutes video and hides overlay
- Remove the old `.glp1buy-sound-hint` div, replace with a new centered overlay structure: a wrapper div containing a 64px red circle with Volume2 icon (28px, white) and "TAP FOR SOUND" text below
- The overlay click handler: unmutes video, sets `showSoundHint` to false
- Remove the `onClick` from the outer `.glp1buy-hero-video` wrapper (only the overlay should handle clicks)

**`src/pages/GLP1BuyPage.css`**:
- Remove old `.glp1buy-sound-hint` styles
- Add new `.glp1buy-sound-overlay`: position absolute, inset 0, display flex, flex-direction column, align-items center, justify-content center, gap 8px, z-index 3, cursor pointer, pointer-events auto, transition opacity 0.3s
- `.glp1buy-sound-overlay.hidden`: opacity 0, pointer-events none
- `.glp1buy-sound-circle`: width 64px, height 64px, border-radius 50%, background #E53E3E, display flex, align-items center, justify-content center, box-shadow 0 2px 12px rgba(0,0,0,0.3), animation `glp1buy-pulse` 1.5s ease-in-out infinite
- `.glp1buy-sound-label`: color white, font-size 13px, font-weight 700, text-shadow 0 1px 3px rgba(0,0,0,0.5)
- `@keyframes glp1buy-pulse`: 0%/100% scale(1), 50% scale(1.08)

### FIX 3: Mobile Content Order
**`src/pages/GLP1BuyPage.css`** — Update the mobile order values to match the requested sequence:
1. Promo strip (1)
2. Video (2)
3. Title (3)
4. Star rating (4)
5. Description (5)
6. Check list (6)
7. Price (7)
8. Shipping note (8)
9. Bonuses (9)
10. Form (10)
11. Guarantee (11)
12. Phone (12)
13. FDA disclaimer (13)
14. Product display (14)
15. Thumbnails (15)
16. Benefit callouts (16)

The change from current: description moves up (was 7, now 5), check-list moves up (was 8, now 6), price moves down (was 5, now 7), shipping note moves down (was 6, now 8).

### FIX 4: "Up to" Qualifier
**`src/pages/GLP1BuyPage.tsx`** line 226 — Change "72% more lean tissue retention" to "Up to 72% more lean tissue retention"

