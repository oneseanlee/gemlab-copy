

# Lead Magnet Landing Page: `/free-testosterone-guide`

## Overview

A distraction-free, high-converting lead capture page designed to collect name and email in exchange for the free guide "The Difference Between Renting Testosterone and Owning It." No navigation bar, no footer links beyond legal -- pure conversion focus.

---

## New Files

### 1. `src/pages/FreeTestosteroneGuidePage.tsx`
React component with all sections, form state management via `useState`, and scroll-reveal animations using the existing `useScrollReveal` hook.

### 2. `src/pages/FreeTestosteroneGuidePage.css`
All styling for the page, using existing design tokens (`--font-title`, `--font-body`, `--space-*`, `--radius-*`, `--shadow-*`, `--duration-*`).

### 3. Route Registration
Add `/free-testosterone-guide` to `src/App.tsx` routes.

---

## Page Sections (top to bottom)

### Hero Section (above the fold)
- Full-width dark gradient background (`#0a0f1e` to `#111827`)
- Two-column layout on desktop (stacked on mobile):
  - **Left column**: Headline in Playfair Display ("FREE GUIDE: The Difference Between Renting Testosterone and Owning It"), subheadline in Plus Jakarta Sans, then the opt-in form (First Name + Email inputs, amber/gold gradient submit button "GET YOUR FREE GUIDE" with arrow icon, privacy note below)
  - **Right column**: Styled div simulating a 3D ebook mockup with perspective transform, gradient background, white text showing the guide title and "Best 365 Labs" branding
- Form uses React `useState` for `firstName` and `email`, with basic validation and `console.log` on submit

### Trust Strip
- Horizontal row of 4 semi-transparent cards on dark background
- Icons from Lucide: Users, Building2, Stethoscope, FlaskConical
- Items: "50,000+ Men Served", "FDA-Registered Facility", "Physician-Backed Protocols", "Patent-Pending Science"

### What You'll Discover Section
- Dark background continues
- Section heading: "Inside This Free Guide, You'll Discover:"
- 7 numbered items in a 2-column grid (1 column on mobile)
- Each item: gold-colored number on left, white text on right, subtle card styling
- Fade-in animation on scroll via `useScrollReveal`

### Social Proof Section
- Heading: "Real Results From Real Men"
- 3 testimonial cards in a row (stacked on mobile)
- Dark cards with subtle border, gold star ratings (5 stars), white quote text, name/details below
- Three testimonials as specified (Brett Earnshaw, Alex T., David R.)

### Final CTA Section
- Repeat of the opt-in form with heading "Stop Renting. Start Owning. Get the Free Guide Now."
- Same form fields, same amber/gold button
- Both forms share state so filling one fills the other

### Minimal Footer
- Copyright line, FDA disclaimer
- Links to /privacy and /terms using React Router `Link`
- Gray-400 text on dark background

---

## Technical Details

### Form Implementation
- `useState` for `firstName`, `email`, and `submitted` state
- Basic HTML5 validation (`required`, `type="email"`)
- On submit: `console.log({ firstName, email })`, show a brief success message
- No backend connection yet (as specified)

### Animations
- Each section wrapped with `useScrollReveal` for fade-in on scroll
- Hero has staggered CSS entrance animations (headline, then subtext, then form, then ebook mockup)
- Submit button has hover scale + glow effect

### Responsive Breakpoints
- Desktop (1024px+): two-column hero, 2-column discover grid, 3-column testimonials
- Tablet (768px): single-column hero, 2-column discover grid, stacked testimonials
- Mobile (480px): everything single-column, reduced font sizes, full-width form

### Ebook Mockup
- Pure CSS implementation: a styled div with `perspective` and `rotateY` transform to create a 3D book appearance
- Gradient background (dark navy to blue), white text, "Best 365 Labs" at bottom
- No external images required

### CTA Button Styling
- Custom amber/gold gradient (`#D4A843` to `#B8922E`) -- distinct from the site's blue CTAs to signal "free" vs "buy"
- White bold text, rounded corners, hover animation (translateY + shadow increase)
- Not using AnimatedCTA component since this needs a unique gold style and is a form submit button

### Page Isolation
- Page sets its own `background` on the wrapper div, overriding the global gradient from `index.css`
- No nav bar, no shared header components
- Minimal footer is self-contained within this page (not SharedFooter)

