

# Digital Guides Store Page (`/guides`)

## Overview
Create a dedicated Digital Guides store page that serves as the central hub for all health optimization guides. Free guides will have direct download links; paid guides will link to an external payment/checkout page. The homepage "See All Guides" button and guide cards will be updated to point to this new page.

## Page Structure

The page will follow the existing Maximus-style medical aesthetic used across the site, matching the same design system (Playfair Display headings, Plus Jakarta Sans body, `--b365-blue` accent color).

### Sections (top to bottom):

1. **Header/Nav** -- Reuse the standard Best365 nav bar with hamburger mobile menu (same pattern as OceanRaysPage)

2. **Hero Banner** -- Clean centered hero with:
   - Headline: "Digital Guides & Resources"
   - Subtitle: "Expert-backed guides to help you make informed decisions about your health optimization journey."
   - Optional category filter pills (All, Testosterone, GLP-1, Longevity)

3. **Guides Grid** -- Responsive card grid showing all guides:
   - Each card: cover image, title, short description, price badge ("FREE" or "$X.XX")
   - Free guides: "Download Free" button (links to PDF or external URL)
   - Paid guides: "Get Guide - $X.XX" button (links to external payment page)
   - Cards styled identically to the existing `.b365-guide-card` pattern

4. **Footer** -- SharedFooter component (already used across the site)

### Initial Guide Content:
- The 3 existing guides (Renting Testosterone, Testosterone & Fertility, Before You Commit to TRT) will be the starting content, marked as FREE
- Additional placeholder slots with "Coming Soon" state for future guides

## File Changes

### New Files:
- `src/pages/GuidesPage.tsx` -- Main page component with nav, hero, filterable grid, and footer
- `src/pages/GuidesPage.css` -- Styles following the `b365-` naming convention

### Modified Files:
- `src/App.tsx` -- Add `/guides` route
- `src/pages/OceanRaysPage.tsx` -- Update "See All Guides" `AnimatedCTA` href from `/article` to `/guides`, and update individual guide card links from `/article` to `/guides`

## Technical Details

- Guide data will be a simple array of objects in the component (title, image, description, price, downloadUrl, category)
- Category filtering will use local `useState` -- no backend needed
- Free guides: `<a href={guide.downloadUrl} target="_blank">` direct link
- Paid guides: `<a href={guide.paymentUrl} target="_blank">` external link (placeholder URLs for now until you provide real ones)
- Responsive grid: 3 columns desktop, 2 tablet, 1 mobile (matching existing `.b365-guides-grid` breakpoints)
- Price badge: green "FREE" chip or blue "$X.XX" chip on each card
- Mobile menu integrated using the existing `MobileMenu` component

