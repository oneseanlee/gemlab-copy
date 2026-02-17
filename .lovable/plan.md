

# B2B Affiliate Partners Page

## Overview

Create a dedicated, professional affiliate/partner page at `/partners` designed to convert B2B prospects (clinics, influencers, health coaches, gym owners, etc.) into affiliate partners. The page highlights the 20% commission structure and positions Best 365 Labs as a premium partnership opportunity.

## Page Structure

### Section 1: Hero
- Headline: "Partner With Best 365 Labs"
- Subheadline: "Earn 20% commission on every sale. Join the movement redefining men's health optimization."
- CTA button: "Apply to Become a Partner" (scrolls to application/contact section)
- Clean, premium feel matching the existing site design system

### Section 2: Why Partner With Us
A 3-4 column grid of value propositions:
- **20% Commission** -- Competitive recurring commissions on every referral
- **Publicly Traded (BHIC)** -- Credibility and longevity of a public company
- **Patent-Pending Technology** -- MODS Max sublingual delivery gives you a differentiated product to offer
- **50,000+ Clients** -- Proven market demand and customer satisfaction

### Section 3: Product Portfolio Overview
A streamlined grid showing the 5 products partners can promote, with price points and key selling hooks:
- TPrime365 ($149/mo)
- GLP-1 Optimization Protocol ($39.95)
- UCOS ($175)
- GLP-1 Cellular Bundle ($175)
- NHTO Bundle ($250)

### Section 4: Who This Is For
Icon + text cards targeting ideal partner types:
- Health & Wellness Clinics
- Fitness Influencers & Content Creators
- Gym Owners & Personal Trainers
- Biohacking / Longevity Communities
- Telehealth Platforms & Practitioners
- Affiliate Marketers in Men's Health

### Section 5: How It Works
A simple 3-step horizontal flow:
1. **Apply** -- Fill out the partner application
2. **Get Approved** -- Receive your unique tracking link and marketing assets
3. **Earn** -- Share with your audience, earn 20% on every sale

### Section 6: Commission Breakdown
A clean table or visual showing earning potential:
- Example: 10 TPrime365 referrals/month = $149 x 10 x 20% = $298/month
- Example: 25 GLP-1 Bundle referrals/month = $175 x 25 x 20% = $875/month
- Scaling projections to show larger volume potential

### Section 7: Partner Testimonials / Trust Signals
- Reuse existing co-founder photos and quotes if applicable
- FDA-registered manufacturing, 503A pharmacy, cGMP certifications
- "As Seen In" press logos (already on site)

### Section 8: Application / CTA
- Simple contact form or mailto CTA: partner name, company/brand, audience size, website/social links, message
- Alternative: link to an external application form if preferred
- Final CTA: "Apply Now" button

### Section 9: Footer
- Reuse the existing SharedFooter component

## Technical Details

### New Files
- `src/pages/PartnersPage.tsx` -- page component
- `src/pages/PartnersPage.css` -- page styles

### Modified Files
- `src/App.tsx` -- add route `/partners`

### Design Approach
- Reuse the existing `b365-` CSS design system (variables, section patterns, serif headings, AnimatedCTA buttons)
- Same nav/footer as other pages
- Dark navy hero section for premium B2B feel, alternating light/dark sections
- Fully responsive (mobile-first grid breakpoints matching existing patterns)

### Form Handling
Since there is no backend, the application form will use a `mailto:` link to `info@best365labs.com` with pre-filled subject line, or alternatively a simple form that opens the user's email client. If you have a preferred form tool (Typeform, Google Forms, etc.), we can embed or link to that instead.

