

# Update Article Page: Images & Route Change

## Overview
Transform the current `/listicle` page into `/article` with strategically placed TPrime365 product images to maximize conversions. The uploaded images are high-quality marketing assets that should be embedded directly into the page.

---

## Changes Required

### 1. Route Change
Update the route from `/listicle` to `/article` in App.tsx.

### 2. Image Placement Strategy for Maximum Conversions

Based on conversion optimization best practices, here's the recommended placement for each uploaded image:

| Image | Placement | Rationale |
|-------|-----------|-----------|
| **Image 1** (Product bottle with benefits icons) | Product Showcase section (after hero) | First visual impression - shows the product prominently with key benefits. This is the "above the fold" product shot that anchors trust. |
| **Image 2** (Risk-Free with testimonial) | First Offer Banner section | Social proof + risk reversal messaging. The "RISK FREE" and "AFTER TPRIME365" testimonial creates urgency and reduces purchase anxiety. |
| **Image 9** (Lifestyle collage with men using product) | After Reason 3 (Physician-Verified) | Shows real men using the product, builds credibility after discussing medical legitimacy. Lifestyle imagery increases relatability. |
| **Image 10** (What's Included bundle) | Second Offer Banner section | Value stack visualization before final CTA. Shows everything they get, increasing perceived value right before purchase decision. |

### 3. File Organization
Copy the 4 uploaded images to the public/images folder:
- `tprime-product-benefits.png` (Image 1)
- `tprime-risk-free.png` (Image 2)
- `tprime-lifestyle-collage.png` (Image 9)
- `tprime-whats-included.png` (Image 10)

---

## Detailed Implementation

### Files to Modify

**src/App.tsx**
- Change route path from `/listicle` to `/article`

**src/pages/ListiclePage.tsx**
- Update image sources to use the new TPrime365 images:
  - Product Showcase: `tprime-product-benefits.png`
  - Image after Reason 1: Keep existing or use lifestyle image
  - Image after Reason 3: `tprime-lifestyle-collage.png`
  - First Offer Banner: `tprime-risk-free.png`
  - Second Offer Banner: `tprime-whats-included.png`
  - Comparison table TPrime365 column: Extract bottle from one of the images

### Image Placement Details

**Product Showcase Section (Line 52-56)**
Replace current placeholder with Image 1 (product bottle with benefits icons).
This creates immediate product recognition.

**After Reason 1 (Line 69-71)**
Keep existing image or replace with a cropped version of the product.

**After Reason 3 (Line 99-101)**
Replace with Image 9 (lifestyle collage) - shows real men using the product, perfect after discussing physician verification.

**First Offer Banner (Line 155-157)**
Replace with Image 2 (Risk-Free testimonial) - the "RISK FREE" messaging reinforces the offer copy.

**Second Offer Banner (Line 261-263)**
Replace with Image 10 (What's Included) - shows the full value bundle, creates perceived value before final CTA.

---

## Conversion Optimization Rationale

1. **Product first** - Image 1 in the showcase establishes what they're buying
2. **Social proof early** - Image 2 with testimonial builds trust at first offer point
3. **Lifestyle relatability** - Image 9 shows diverse men using the product
4. **Value visualization** - Image 10 shows the complete bundle with bonuses
5. **Consistent branding** - All images feature the TPrime365 bottle and Best365Labs branding

---

## Technical Steps

1. Copy uploaded images to `public/images/` folder
2. Update `src/App.tsx` to change route from `/listicle` to `/article`
3. Update `src/pages/ListiclePage.tsx` to use new image paths
4. Remove old placeholder image imports that are no longer needed
5. Test responsive behavior of new images

