

# Optimize NHTO Page: Remove Safety Section and Add Product Bottle Images

## Overview
Remove the "Important Safety Information" section, replace placeholder images with actual bottle product images, and ensure visual consistency with the TPrime365 page styling.

## Changes

### 1. Remove Safety Information Section (lines 554-577 in NHTOPage.tsx)
- Delete the entire section 17 ("Important Safety Information") block containing the FDA disclaimers and medication warnings
- The FDA disclaimer text is already present in the SharedFooter, so no critical content is lost

### 2. Replace Placeholder Images with Actual Bottle Images (lines 318-352)
Update the product breakdown cards to use real bottle images instead of `/placeholder.svg`:
- Non-Hormonal Testosterone Optimizer: `/images/product-nhto.png`
- Activate365: `/images/activate365.png`
- Mito365: `/images/mito365.png`
- Restore365: `/images/restore365.png`

### 3. Visual Polish for Product Cards (NHTOPage.css)
- Add subtle drop-shadow to `.nhto-product-img img` for depth (matching TPrime's `filter: drop-shadow()` pattern)
- Increase `.nhto-product-img` dimensions slightly (120px wide, 160px tall) to better showcase the bottles
- Add hover lift effect on `.nhto-product-card` consistent with `.trust-badge:hover` pattern used elsewhere

### 4. Result Card Avatars (lines 290-310)
- Replace `/placeholder.svg` on the 4 result cards with the existing diverse avatar images (`avatar-man-1.jpg`, `avatar-woman-1.jpg`, `avatar-woman-2.jpg`, `avatar-man-1.jpg`) to match the social proof pattern from other pages

