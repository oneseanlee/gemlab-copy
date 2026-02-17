
# Revise Partners Page: Match Homepage Styling + Add UGC Videos

## Overview

Redesign the Partners page to match the clean, white-background, medical-grade aesthetic of the homepage instead of the current dark navy hero. Add the four TPrime365 UGC testimonial videos as social proof to make the page more engaging and visually compelling.

## Key Changes

### 1. Hero Section -- Match Homepage Style
Replace the dark navy gradient hero with the homepage's signature light blue rounded card hero style:
- White page background with a `#b8ccde` (light blue) rounded card container
- Split layout: left side with the Best 365 Labs logo or a hero image, right side with headline text
- Uses the same `b365-hero-container` pattern with `border-radius: 24px`
- "Affiliate Program" badge stays but adapts to the light color scheme
- Typography uses dark text (`var(--b365-text)`) instead of white

### 2. Section Styling -- Consistent with Homepage
- All sections use the same white/gray alternating pattern (`b365-section` and `b365-section-alt`)
- Cards use white backgrounds with `var(--b365-border)` borders and subtle hover shadows
- Step numbers and icons use `var(--b365-blue)` (#3376b0) as the accent color
- Commission table header uses `var(--b365-blue)` instead of dark navy
- Bottom CTA section switches from dark navy to the light blue card style or a clean white section with blue accents

### 3. Add UGC Video Section
Insert a new "See the Results" section between the "Products You'll Promote" and "Who This Is For" sections:
- Heading: "See the *Results*" (following the serif italic pattern)
- 4-column responsive video grid (same as TPrime365 page)
- Reuses the same four external video URLs from the TPrime365 page
- Videos display in 9:16 vertical format with controls, `playsInline`, and `preload="metadata"`
- Responsive: 4 columns on desktop, 2 on tablet, 1 on mobile

### 4. Bottom CTA Section
Replace the dark navy gradient with a clean light blue card (matching the hero) or a white section with a prominent blue CTA button, keeping the premium feel without the dark background.

## Technical Details

### Files Modified

**`src/pages/PartnersPage.css`** -- Major restyle:
- Remove dark navy hero gradient styles (`.partners-hero` background)
- Add homepage-matching hero card styles (light blue rounded container, split grid)
- Update `.partners-apply-section` from dark navy to light blue card or white with blue accents
- Update `.partners-commission-table thead` from navy to `var(--b365-blue)`
- Add `.partners-ugc-grid` styles (reusing the same pattern as `.tprime-ugc-grid`)
- Ensure all responsive breakpoints are updated

**`src/pages/PartnersPage.tsx`** -- Content updates:
- Restructure hero section markup to use the homepage card layout pattern
- Add UGC video section with the four video URLs between Products and Who This Is For
- Update bottom CTA section markup to match new styling
- Keep all existing data (value props, products, audiences, commission table, trust signals)
