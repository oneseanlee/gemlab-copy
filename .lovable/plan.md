

## Fix: Re-compress images and eliminate CLS

### Problem
The WebP files were generated without aggressive compression, resulting in files that are the same size or larger than the JPG originals. The CLS fix (`min-height`) isn't working because the actual rendered height differs.

### Plan

**1. Re-compress the 8 heaviest images with proper quality settings**

Use a proper lossy WebP quality (q=75-80) to get these down to 200-400KB each. The following images need re-creation:
- `glp1-product-4.webp` (1,475KB → target ~300KB)
- `glp1-product-9.webp` (1,441KB → target ~300KB)
- `glp1-risk-free.webp` (1,202KB → target ~250KB)
- `glp1-whats-included.webp` (1,115KB → target ~250KB)
- `glp1-carousel-1.webp` (1,110KB → target ~200KB)
- `glp1-carousel-2.webp` (1,031KB → target ~200KB)
- `glp1-carousel-3.webp` (1,033KB → target ~200KB)
- `metabolism-plus.webp` (1,008KB → target ~200KB)

Since we can't run image processing tools directly, we'll resize these images to max 800px width (they don't need to be larger for web display) and re-encode at quality 75. This will be done by creating optimized replacement files.

**2. Fix CLS on `.glp1-benefit-callouts`**

In `src/pages/GLP1Page.css`, increase the `min-height` value and add `aspect-ratio` or explicit height that matches the actual rendered size. Also add `min-height` to `.glp1buy-testimonial` and `.glp1-thumb-carousel` which are also contributing to the CLS shift.

**3. Ensure below-fold images are truly lazy**

Review `GLP1BuyPage.tsx` to confirm that carousel images 2-3, risk-free badge, metabolism image, and whats-included image all have `loading="lazy"` and are not eagerly fetched.

### Expected outcome
- Total image weight reduced from ~12.7MB to ~3-4MB
- FCP improved from 5.4s toward ~2-3s
- CLS reduced below 0.05

### Technical details
- Files changed: `GLP1BuyPage.tsx`, `GLP1Page.css`, and 8 image assets in `public/images/`
- No database or backend changes needed

