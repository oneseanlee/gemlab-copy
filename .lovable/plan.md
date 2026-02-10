
# Unified Footer Across All Pages

## Overview
Create a single shared footer component matching the reference screenshot, and use it on all three pages (OceanRaysPage, TPrime365Page, ListiclePage).

## Footer Design (from reference)
The footer has a solid blue background (#0e87be or similar bright blue) with white text, structured as:

**Top section** - 4-column grid:
1. **Brand**: Best 365 Labs logo + "Publicly Traded: BHIC"
2. **Contact**: Phone (385) 421-5651, email info@best365labs.com, address 14857 S Concorde Park Dr, Bluffdale, UT 84065
3. **Legal**: Privacy Policy, Terms and Conditions, Return Policy
4. **Follow Us**: Facebook, Instagram, YouTube icons

**Divider line**

**Disclaimers** (centered, smaller text):
- GLP-1 Program Disclaimer about happyMD telehealth network
- Methylene Blue caution notice
- FDA evaluation disclaimer

**Copyright**: (C) 2026 by Best 365 Labs, Inc

## Technical Plan

### 1. Save the logo image
- Copy the uploaded white logo image (`image-4.png`) to `public/images/best365labs-logo-white.png`

### 2. Create shared footer component
- Create `src/components/SharedFooter/SharedFooter.tsx` and `SharedFooter.css`
- 4-column grid layout with brand, contact, legal, social sections
- Three disclaimer paragraphs separated by dividers
- Copyright line at bottom
- Blue background matching the reference (#0e87be)
- Fully responsive (stacks on mobile)

### 3. Update all pages
- **OceanRaysPage.tsx**: Remove inline footer markup (lines 443-502), import and use `<SharedFooter />`
- **OceanRaysPage.css**: Remove footer-specific CSS (`.b365-footer*` rules) since styling moves to SharedFooter.css
- **TPrime365Page.tsx**: Replace the existing `<footer className="tprime-footer">` block with `<SharedFooter />`
- **ListiclePage.tsx**: Replace the `<div className="legal-footer">` block with `<SharedFooter />`
- **Remove** old `src/components/Footer/Footer.jsx` and `Footer.css` (unused legacy component)
