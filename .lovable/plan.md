

# Make Product Bottles Bigger with Row-by-Row Layout

## Overview
Restructure the product breakdown section from a 2-column side-by-side layout (small image + text) to a full-width row-per-product layout with much larger bottle images, giving the products significantly more visual emphasis.

## Changes

### 1. Restructure Layout (NHTOPage.tsx)
- Change each product card from a horizontal card (small image + text beside it) to a **two-column row layout** where:
  - Left column: Large product bottle image (takes ~40% width)
  - Right column: Product name, tag, and benefit list
- Each product gets its own full-width row, stacking vertically
- On mobile, image stacks on top of text

### 2. CSS Updates (NHTOPage.css)
- Change `.nhto-product-grid` from `grid-template-columns: repeat(2, 1fr)` to `grid-template-columns: 1fr` (one product per row)
- Change `.nhto-product-card` to a two-column internal grid: `grid-template-columns: 280px 1fr` with centered alignment
- Increase `.nhto-product-img` from 120x160px to **280x320px** -- dramatically larger bottles
- Remove `max-width/max-height` constraints on the image itself so bottles fill the space
- Add stronger drop-shadow for visual pop
- On tablet (1024px): image column shrinks to 220px
- On mobile (768px): single column stack, image centered at ~200px wide

### Files Modified
- `src/pages/NHTOPage.tsx` -- minor layout restructure of product cards
- `src/pages/NHTOPage.css` -- grid and sizing changes for bigger bottles
