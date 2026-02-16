
# Fix Broken Links on Homepage

## Problem
The homepage product cards ("Start evaluation" buttons) all point to `href="#"` instead of linking to their respective product pages. Several other links on the homepage are also placeholder `href="#"` values.

## Changes

### 1. Add route mappings to product data (OceanRaysPage.tsx)
Add a `href` property to each product object:
- TPrime365 -> `/tprime365`
- GLP-1 Optimization Protocol -> `/glp1-protocol`
- Ultimate Cellular Optimization System -> `/ucos`
- GLP-1 Cellular Bundle -> `/glp1-ucos`
- Non-Hormonal Testosterone Bundle -> `/nhto`

### 2. Update product card CTAs
Change each product card's `<AnimatedCTA href="#">Start evaluation</AnimatedCTA>` to use the product's `href` property instead.

### 3. Fix other placeholder links on homepage
- **Logo** (`href="#"`) -> `href="/"`
- **"Learn More"** in MODS Max section (`href="#"`) -> `href="#science"` (scroll to science section)
- **Guide cards** (`href="#"`) -> leave as `href="#"` or link to `/article` (the editorial article page)
- **"See All Guides"** (`href="#"`) -> `href="/article"`
- **"Contact Support"** (`href="#"`) -> `href="mailto:info@best365labs.com"`
- **"Log In"** (`href="#"`) -> keep as-is (no login system currently)

## Technical Details

All changes are in one file: `src/pages/OceanRaysPage.tsx`.

- Add `href: string` to each product in the `products` array (lines 9-95)
- Update the card render (line 315) from `href="#"` to `href={product.href}`
- Update logo link (line 211) from `href="#"` to `href="/"`
- Update "Contact Support" (line 503) to `href="mailto:info@best365labs.com"`
- Update guide-related links (lines 459, 466) to point to `/article`

No new dependencies or files needed.
