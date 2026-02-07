

# Replace Placeholder Images with Testosterone-Themed Imagery

## Overview
Replace the 4 remaining placeholder images on the `/article` advertorial page that currently show irrelevant skincare imagery (Almond Milk, Cedarwood, etc.) with new AI-generated images featuring men and testosterone optimization themes.

---

## Current Placeholder Images to Replace

| Location | Current Image | Current Alt Text | Suggested New Theme |
|----------|---------------|------------------|---------------------|
| After Reason 1 | `sec2Img` | "Natural testosterone optimization" | Fit man with supplement bottle, natural/clean aesthetic |
| After Reason 2 | `almondImg` (Almond Milk skincare) | "Sublingual delivery system" | Close-up of sublingual drop under tongue or man taking sublingual supplement |
| After Reason 4 | `sec4Img` | "Results in 2-4 weeks" | Before/after style transformation - man looking energized, confident |
| After Reason 5 | `menFaceWashImg` (Face wash) | "Longevity benefits" | Healthy older man, active lifestyle, vitality/longevity theme |
| Comparison Table | `heroImg` | "TPrime365 Bottle" | TPrime365 product bottle (can reuse existing product image) |

---

## Implementation Plan

### Step 1: Generate 4 New AI Images
Use the AI image generation capability to create on-brand, professional images:

1. **Image for Reason 1** - "Natural Optimization"
   - Theme: Athletic man in his 30s-40s, healthy lifestyle, clean background
   - Style: Professional, aspirational, wellness-focused

2. **Image for Reason 2** - "Sublingual Delivery"
   - Theme: Man taking a sublingual drop or close-up of the delivery method
   - Style: Clean, medical-trust, simple

3. **Image for Reason 4** - "Visible Results"
   - Theme: Confident, energized man in gym or active setting
   - Style: Transformation/results focused, motivational

4. **Image for Reason 5** - "Longevity"
   - Theme: Healthy man in his 50s-60s, active, vital, hiking or outdoor activity
   - Style: Aspirational longevity, healthy aging

### Step 2: Save Generated Images
Save all generated images to `public/images/` folder:
- `tprime-natural-optimization.png`
- `tprime-sublingual-delivery.png`
- `tprime-visible-results.png`
- `tprime-longevity.png`

### Step 3: Update ListiclePage.tsx
- Remove old skincare image imports (cedarwoodImg, almondImg, sec2Img, sec3Img, sec4Img, menFaceWashImg, heroImg, shutterstockKitImg)
- Update image sources to use the new TPrime365-themed images
- Update the comparison table image to use the existing `tprime-product-benefits.png`

---

## Files to Modify

**src/pages/ListiclePage.tsx**
- Remove unused skincare image imports
- Update 4 image card sources with new AI-generated images
- Update comparison table image to reuse product image

---

## Image Style Guidelines
All generated images should:
- Feature men in their 30s-50s (target demographic)
- Use clean, professional lighting
- Have a warm, aspirational tone
- Be suitable for health/wellness marketing
- Avoid any text overlays (keep them clean for web use)

