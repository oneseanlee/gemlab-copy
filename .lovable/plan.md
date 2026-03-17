

## Add 4 Images to the GLP-1 Buy Page Product Thumbnail Carousel

The user wants to add the 4 uploaded images to the `carouselMedia` array — the thumbnail strip below the main video/image display (the product gallery with clickable thumbnails, not the auto-rotating banner carousel at the bottom).

### Current State
`carouselMedia` (line 89-96) has 6 items: 1 video + 5 images. These render as the main product display + clickable thumbnail strip.

### Steps

1. **Copy 4 uploaded images to `public/images/`**:
   - `user-uploads://4.jpg` → `public/images/glp1-product-4.jpg`
   - `user-uploads://5.jpg` → `public/images/glp1-product-5.jpg`
   - `user-uploads://7.jpg` → `public/images/glp1-product-7.jpg`
   - `user-uploads://1-8.png` → `public/images/glp1-product-8.png`

2. **Append 4 new entries to `carouselMedia`** in `GLP1BuyPage.tsx` (after line 95), bringing the total to 10 items (1 video + 9 images).

### Files Changed
- `src/pages/GLP1BuyPage.tsx` — add 4 image entries to `carouselMedia`

