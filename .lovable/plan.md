

## Replace Static Banner with Auto-Rotating Image Carousel

**What**: Replace the single `glp1-cellular-energy-hero.jpg` image at line 332 with a rotating slideshow of the 3 uploaded images, cycling every ~2 seconds with a fade transition.

### Steps

1. **Copy the 3 uploaded images** to `public/images/` as `glp1-carousel-1.jpg`, `glp1-carousel-2.jpg`, `glp1-carousel-3.jpg`

2. **Edit `src/pages/GLP1BuyPage.tsx`** (lines 331-339):
   - Replace the static `<img>` with a small auto-rotating component using `useState` + `useEffect` with a 2-second interval
   - Cycle through the 3 images, showing one at a time with a CSS fade transition
   - Keep the same container class (`glp1buy-energy-banner`) and lazy loading

3. **Edit `src/pages/GLP1BuyPage.css`**:
   - Add fade-in/out transition styles for the rotating images (CSS `opacity` transition ~0.5s)
   - Ensure images fill the banner container consistently (object-fit, matching dimensions)

