

# Best 365 Labs: Premium Medical-Grade Homepage Rebuild

## Overview
Complete rewrite of `OceanRaysPage.tsx` and `OceanRaysPage.css` into a Maximus-style medical-grade e-commerce homepage for Best 365 Labs. The design will match the Maximus Tribe aesthetic -- clean white backgrounds, brand-matched blue accents, large serif/italic headlines, generous white space, rounded cards with thin borders -- adapted with Best 365 Labs branding, products, and the logo's blue color palette.

---

## Design System

### Color Tokens
- **Primary Blue:** `#29ABE2` (extracted from Best 365 Labs logo)
- **Dark Navy:** `#0A1628` (footer, dark sections)
- **Light Blue BG:** `#EBF4FB` (hero, alternate sections)
- **White:** `#FFFFFF` (cards, main background)
- **Light Gray:** `#F5F7FA` (section alternation)
- **Text Primary:** `#0F1724` (headlines)
- **Text Secondary:** `#5A6578` (body copy)
- **Success Green:** `#22C55E` (checkmarks, positive indicators)

### Typography
- **Headlines:** Playfair Display (serif) -- large, mixed weight with *italic* emphasis on key emotional words (matches Maximus pattern: "Your Hormones, *Optimized.*")
- **Body/UI:** Plus Jakarta Sans (already loaded) -- clean sans-serif
- **Scale:** 64px hero h1, 48px section h2, 20px body, 14px captions

### Spacing
- Section padding: 96-120px vertical
- Max content width: 1280px
- Card border-radius: 16px
- Card borders: 1px solid `#E5E9F0`

---

## Page Sections (Top to Bottom)

### 1. Promo Banner
- Full-width `#29ABE2` bar
- Text: "MODS Max(TM) 10x Absorption Technology -- Now Available in All Products"
- Dismissible with X icon

### 2. Navigation
- White background, fixed top, subtle bottom border
- Left: Best 365 Labs logo image (`/images/best365labs-logo.png`)
- Center nav links: Solutions, The Science, Process, FAQ
- Right: "Log In" text link + "Get Started" solid blue (`#29ABE2`) rounded-full button
- Mobile: hamburger menu icon

### 3. Hero Section (Split-Screen)
- Light blue background (`#EBF4FB`) with large rounded container (matching Maximus hero)
- **Left side (image):** Full-height lifestyle image of athletic man -- using existing `/images/tprime-natural-optimization.jpg`
- **Right side (text):**
  - Headline: "Your Hormones, *Optimized.*" (serif, italic on "Optimized")
  - Subhead: "Precision-grade testosterone and metabolic support delivered to your door. No needles. No hormonal shutdown. Just science-backed results."
  - Tertiary: "Powered by MODS Max(TM) 10x Absorption Technology."
  - CTA: "Start my evaluation" blue button
- **Benefits row below hero:** 4 small cards with icons -- "Sharper Focus", "Increased Drive", "Elevated Energy", "Stronger Body Composition"

### 4. Product Section with Category Tabs
- Section heading in serif: "Precision Protocols for *Every Goal*"
- Horizontal tab navigation: "Testosterone Optimization" | "Weight Loss Support" | "Cellular Longevity" | "Complete Systems"
- Default tab shows 2-3 product cards in a grid
- **Each product card (white, thin border, rounded-2xl):**
  - Product image area (using existing tprime images)
  - Category pill tags (e.g., "Flagship", "Fertility-Friendly")
  - Product name in serif
  - "Best for:" description
  - 3 bullet benefits with checkmark icons
  - Price: large bold "Starting at **$149**/mo"
  - Two buttons: "Start evaluation" (solid blue) + "Learn more" (outlined)

**Products displayed:**
1. TPrime365(TM) -- $149/mo -- "4-in-1 Testosterone Optimizer (Enclomiphene + Spermidine)"
2. GLP-1 Optimization Protocol -- $39.95 -- "Mitochondrial support for active GLP-1 therapy"
3. Ultimate Cellular Optimization System -- $258 -- "24-hour longevity and energy stack"
4. GLP-1 Cellular Bundle -- $279 -- "System + Medication + Physician Consultation"
5. Non-Hormonal Testosterone Bundle -- $300 -- "Maximum Optimization: Rx Optimizer + 3-Product System"

### 5. Stats / Trust Section (3-Column Grid)
Matching the Maximus "Max performance. Max support." layout:
- Card 1: "MODS MAX(TM) TECHNOLOGY" / "10x Absorption" / brief description
- Card 2: "THE TELEHEALTH ADVANTAGE" / "24/7 Physician Access" / via happyMD
- Card 3: "A GROWING COMMUNITY" / "50,000+ Clients" / optimized their health

### 6. Guarantee Section
- Split layout with large serif headline: "Improved testosterone *or you don't pay.*"
- Supporting text about the risk-free guarantee (refund policy from product data)
- Product bottle image on the right side (`/images/tprime-bottle.png`)

### 7. Clinical Comparison Table
- Clean, minimal table with blue header row
- 3 columns: Feature | TPrime365(TM) | Traditional TRT
- Rows:
  - Testicular Atrophy: "None" vs "Up to 17% decrease"
  - Fertility: "Preserved" vs "Suppressed"
  - Delivery: "Sublingual (MODS Max(TM))" vs "Injections"
  - Hormonal Dependency: "None" vs "Lifelong"
  - Natural Production: "Stimulated" vs "Shut down"

### 8. "Power Up" Section
- Blue gradient background section
- Headline: "Power up your optimization with *MODS Max(TM)*"
- Description of the sublingual delivery technology
- 3 benefit bullets with icons
- "Learn More" button

### 9. Testimonials -- "Real Clients. *Real Results.*"
- 4-column grid using existing testimonial images:
  - `/images/testimonial-brett-earnshaw.png`
  - `/images/testimonial-dan-schmidt.png`
  - `/images/testimonial-darren-lopez.png`
  - `/images/testimonial-sean-lee.png`
- Each card: photo, name, "Using: TPrime365(TM)", "Verified buyer" badge

### 10. "It's Easy to Get Started" (3-Step Process)
- 3-column layout matching Maximus pattern
- Step 01: "Complete Your Health Intake" -- 5-minute online form
- Step 02: "Physician Review" -- Licensed provider via happyMD
- Step 03: "Discreet Delivery" -- Arrives in 7-10 days
- Each step: large step number, serif title, description
- CTA: "Start my evaluation" below

### 11. FAQ Accordion
- Split layout: left = large serif headline "You have questions, *we have answers.*" + "Contact Support" link
- Right = accordion items with +/- toggle:
  - "What is MODS Max(TM) technology?"
  - "Do I need a prescription?"
  - "Will this affect my fertility?"
  - "How quickly will I see results?"
  - "What if I'm not approved?"

### 12. Footer
- Dark navy background (`#0A1628`)
- 4-column grid:
  - Col 1: Best 365 Labs logo + tagline + social icons
  - Col 2: "Products" -- TPrime365, GLP-1 Protocol, UCOS, Bundles
  - Col 3: "Resources" -- The Science, FAQ, Blog
  - Col 4: "Company" -- About Us, Contact, Careers
- Email newsletter signup row
- Compliance section:
  - "Best 365 Labs is an e-commerce platform. Medical services and prescriptions are provided by independent licensed providers via the happyMD network."
  - "*These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease."
- Copyright line

---

## Files to Modify

### `src/pages/OceanRaysPage.tsx`
- Complete rewrite with all 12 sections above
- All Best 365 Labs product data, pricing, and descriptions
- References to existing images in `/images/`
- Iconify-icon components for icons throughout

### `src/pages/OceanRaysPage.css`
- Complete rewrite for medical-grade Maximus aesthetic
- Playfair Display serif font import
- Brand blue (`#29ABE2`) color variables
- Large section padding (96-120px)
- Serif headline styles with italic variants
- Card styles: white bg, thin borders, 16px radius
- Button styles: solid blue + outlined variants
- Responsive breakpoints for all sections
- Comparison table styling
- Accordion styles for FAQ

### `index.html`
- Add Playfair Display Google Font link

### No other files changed
- Routing stays the same (`/` renders OceanRaysPage)
- No new dependencies needed

