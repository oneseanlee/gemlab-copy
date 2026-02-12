

# GLP-1 Medical Intake Form Page

## Overview
Create a new GLP-1 intake form page at `/glp1-intake` that mirrors the existing NHTO intake page pattern but is tailored for GLP-1 consultations. Includes the cell365power tracking script from the Replit source.

## What Gets Built

A clean, professional intake form page with:
- Sticky nav with Best365 Labs logo and "Back to GLP-1 Products" link
- Header: "GLP-1 Medical Intake Form" with HIPAA description
- Three trust badges: HIPAA Compliant, Licensed Providers, Quick Process (5-10 minutes)
- Embedded happyMD GLP-1 iframe (auto-resizing)
- Cell365power external tracking script injection
- Bottom "Back to GLP-1 Products" button
- Shared footer

## Technical Details

### New File
1. **`src/pages/GLP1IntakePage.tsx`** -- Based on existing `NHTOIntakePage.tsx` with these differences:
   - Title: "GLP-1 Medical Intake Form"
   - Description references GLP-1 telehealth consultation
   - Third trust badge: "Quick Process" / "Takes only 5-10 minutes" (using `Clock` icon)
   - Iframe ID: `happymd-glp1-intake-embed`
   - Iframe src: `https://happymd.co/embed/glp1-consultation` (placeholder, easily updated)
   - Additional `useEffect` to inject the tracking script (`https://links.cell365power.com/js/external-tracking.js` with `data-tracking-id`)
   - Back links point to `/glp1` instead of `/nhto`

### No New CSS Needed
The existing `NHTOIntakePage.css` classes (`.intake-page`, `.intake-nav`, `.intake-header`, `.intake-trust-badges`, `.intake-iframe-container`, etc.) are generic enough to be reused directly -- just import the same CSS file.

### Modified Files
2. **`src/App.tsx`** -- Add import and route: `<Route path="/glp1-intake" element={<GLP1IntakePage />} />`

3. **`src/pages/GLP1Page.tsx`** -- Add a "Start Intake Form" link somewhere visible (e.g., in the hero section or near the order CTAs) pointing to `/glp1-intake`

