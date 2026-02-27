

## Replace "Many Users Report" Image and Make It Wider

### What Changes

1. **Replace image asset**: Copy the new uploaded image to `public/images/glp1-many-users-report.png`, overwriting the current file.

2. **Widen the image container**: Update `.glp1-enhancement-img` in `src/pages/GLP1Page.css`:
   - Increase `max-width` from `900px` to `1280px` (matching the page content width)
   - Add a subtle background gradient (light blue, matching the image's own background) so it blends seamlessly
   - Add vertical padding for breathing room
   - Add a soft box-shadow for a polished, premium feel

3. **Enhance the section wrapper** in `src/pages/GLP1Page.tsx`:
   - Add scroll-reveal animation using the existing `useScrollReveal` hook for a smooth entrance effect

### Files Modified
- `public/images/glp1-many-users-report.png` -- replaced with new image
- `src/pages/GLP1Page.css` -- widen `.glp1-enhancement-img` to 1280px, add shadow and background polish
- `src/pages/GLP1Page.tsx` -- add scroll-reveal ref to the "Many Users Report" section

