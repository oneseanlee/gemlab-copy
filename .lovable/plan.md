

## GLP-1 Buy Page Speed Optimization

**Problem**: FCP is 5.5 seconds, mainly caused by 2.2 MB of unoptimized PNG images loading eagerly and an auto-playing video.

### Changes (ordered by impact)

**1. Convert carousel images to WebP & lazy-load non-visible ones**
- Only the first visible media item (video at index 0) loads eagerly
- All other carousel images get `loading="lazy"` 
- Convert the 4 large PNGs to WebP (can cut ~60-70% file size)
- Add explicit `width`/`height` attributes to prevent layout shifts

**2. Defer video preload**
- Change `<video>` from `autoPlay` to `preload="metadata"` initially, then autoplay after the page is interactive
- Or keep autoPlay but add `preload="none"` so it doesn't block initial render

**3. Lazy-load below-fold images**
- The testimonial section and payment-methods image are below the fold — ensure they have `loading="lazy"`
- The `metabolism-plus.png` thumbnail (carousel item 5) should lazy-load

**4. Preload the LCP image**
- Add a `<link rel="preload">` for whichever image/video is the LCP element so the browser fetches it earlier

### Technical Details

| Change | File(s) | What |
|---|---|---|
| Lazy-load carousel images | `GLP1BuyPage.tsx` | Add `loading="lazy"` to non-active carousel images |
| Video preload strategy | `GLP1BuyPage.tsx` | Change to `preload="metadata"` |
| WebP conversion | `public/images/` | Convert 4 PNGs to WebP, update references |
| Preload hint | `index.html` or component `useEffect` | `<link rel="preload" as="image">` for first visible asset |

Expected improvement: FCP from ~5.5s down to ~2-3s range.

