

## GLP-1 Buy Page Performance Analysis

### Current Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| First Contentful Paint (FCP) | 5.56s | < 1.8s | Poor |
| Full Page Load | 4.77s | < 3s | Needs work |
| CLS | 0.095 | < 0.1 | Borderline |
| Total image weight | ~10.2 MB | < 3 MB | Poor |
| DOM nodes | 1,831 | < 1,500 | Acceptable |

### Root Causes

1. **Oversized images** -- Five images are 800KB-1.2MB each. The newly added `glp1-product-9.jpg` is 963KB (unoptimized JPG). The carousel images (`glp1-carousel-1/2/3.jpg`) are 544-656KB each and among the slowest resources.
2. **Too many images loaded upfront** -- 19 images totaling 10MB are requested on page load. Many below-the-fold images may not be truly lazy-loaded due to DOM layout (e.g., the `BannerCarousel` and carousel images).
3. **CLS from `.glp1-benefit-callouts`** -- layout shift of 0.095 from content that loads without reserved dimensions.
4. **Render-blocking Google Fonts** -- a single CSS import loads 4 font families, blocking first paint.

### Recommended Fixes

**1. Convert large JPGs to WebP (biggest win)**
- `glp1-product-9.jpg` (963KB) → WebP (~250KB)
- `glp1-carousel-1/2/3.jpg` (1.7MB total) → WebP (~500KB total)
- `glp1-product-4.jpg` (864KB) → WebP (~220KB)

This alone should cut ~7MB from the page load.

**2. Add explicit dimensions to CLS-causing elements**
- Set `min-height` on `.glp1-benefit-callouts` to reserve space and eliminate the 0.095 CLS shift.

**3. Defer carousel images**
- The `BannerCarousel` component at the bottom loads 3 large images immediately. Add `loading="lazy"` (already present) but also wrap in an Intersection Observer or move it behind a dynamic import so it only renders when near the viewport.

**4. Optimize font loading**
- Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to `index.html` if not already present.
- Consider using `font-display: optional` for non-critical font families.

**5. Preload the hero/first-visible image**
- Add a `<link rel="preload">` for the primary product image to improve LCP.

### Implementation Priority

The image optimization (step 1) will deliver the largest improvement. Converting the 5 heaviest JPGs to WebP should reduce total image payload by ~70% and bring FCP under 3s.

