

# NHTO Intake Form Page

## Overview
Create a new dedicated intake form page at `/nhto-intake` that embeds the happyMD testosterone consultation iframe. The page will follow the existing medical-grade aesthetic and reuse the privacy/legal page styling patterns for consistency.

## What Gets Built

**A professional intake form page featuring:**
- Sticky top navigation bar with the Best365 Labs logo and a "Back to NHTO Products" link
- A clean header section with the title "Testosterone Optimization Intake Form" and a brief description
- Three trust badges in a row: HIPAA Compliant, Licensed Providers, Testosterone Support
- The embedded happyMD iframe (full-width, auto-resizing via postMessage listener)
- A bottom "Back to NHTO Products" button
- Consistent branding with the site's Playfair Display headings and Plus Jakarta Sans body text

## Technical Details

### New Files
1. **`src/pages/NHTOIntakePage.tsx`** -- The page component containing:
   - `useEffect` to scroll to top on mount
   - `useEffect` with a `postMessage` listener for iframe resize/submit/error events from `https://happymd.co`
   - Sticky nav bar (reusing `.privacy-nav` pattern from PrivacyPolicyPage.css)
   - Header with title, description, and three trust badges (using Lucide icons: `FileText`, `Shield`, `Clock`)
   - `<iframe>` element with `id="happymd-testosterone-embed"` pointing to the happyMD testosterone form URL
   - "Back to NHTO Products" button at the bottom linking to `/nhto`

2. **`src/pages/NHTOIntakePage.css`** -- Styling that:
   - Reuses patterns from `PrivacyPolicyPage.css` for the nav and page layout
   - Adds trust badge row styling (3-column grid, icon + label + description)
   - Styles the iframe container for full-width, minimum height (~800px), no border, rounded corners
   - Responsive adjustments for mobile (stacking trust badges, padding adjustments)

### Modified Files
3. **`src/App.tsx`** -- Add route: `<Route path="/nhto-intake" element={<NHTOIntakePage />} />`

4. **`src/pages/NHTOPage.tsx`** -- Add a link/button in the "How It Works" section (Step 1) or hero area that directs users to `/nhto-intake` to complete their intake form.

### Key Implementation Notes
- The iframe `src` URL will need to be confirmed (the Replit code references `happymd.co` but the exact embed URL path needs to be set -- will use a placeholder that can be easily updated)
- The `postMessage` handler validates origin is `https://happymd.co` before processing resize, submit, or error events
- Uses `react-router-dom` (not `wouter` as in the Replit version) to match the existing project routing
- Navigation uses `<a href="/nhto">` or `useNavigate()` for the back button

