

# Import Ocean Rays HTML as New Homepage

## Overview
Convert the uploaded Ocean Rays HTML page into a React component, make it the site's homepage (`/`), and move the current article (ListiclePage) to `/article`.

---

## What This Does
- The Ocean Rays sea moss gel page becomes the homepage visitors see at `/`
- The TPrime365 article page moves to `/article`
- No changes to the article page itself -- it stays exactly as-is

---

## Technical Details

### 1. Create New Component: `src/pages/OceanRaysPage.tsx`
Convert the raw HTML into a React component as-is:
- Replace `class=` with `className=`
- Replace `<iconify-icon>` elements with equivalent inline SVGs or keep them using the iconify web component (add the iconify script to `index.html`)
- Convert inline `style=` attributes to React syntax (`{{ }}`)
- Keep all Tailwind classes, images, and structure exactly as provided
- Add the custom CSS (glass-panel, mesh-gradient, marquee animation, no-scrollbar) either inline or in a companion CSS file

### 2. Create `src/pages/OceanRaysPage.css`
Extract the custom styles from the HTML:
- `.glass-panel` backdrop blur styles
- `.mesh-gradient` radial gradient background
- `.no-scrollbar` scrollbar hiding
- `@keyframes marquee` animation
- Google Fonts import for Plus Jakarta Sans

### 3. Update `index.html`
Add the Iconify script tag so `<iconify-icon>` web components work:
```
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
```
Add Plus Jakarta Sans font link.

### 4. Update Routing: `src/App.tsx`
```
/           -> OceanRaysPage (NEW homepage)
/article    -> ListiclePage (current article, unchanged)
/tprime365  -> TPrime365Page (unchanged)
/home       -> Home (old homepage, unchanged)
```

---

## Files to Create
- `src/pages/OceanRaysPage.tsx` -- Full React conversion of the uploaded HTML
- `src/pages/OceanRaysPage.css` -- Custom styles extracted from the HTML

## Files to Modify
- `index.html` -- Add Iconify script and Plus Jakarta Sans font
- `src/App.tsx` -- Update routing so `/` points to OceanRaysPage

## Files NOT Changed
- `src/pages/ListiclePage.tsx` -- No changes
- `src/pages/ListiclePage.css` -- No changes
- All other existing pages -- No changes

