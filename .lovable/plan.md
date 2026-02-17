

# Revise Partners Page to Match TPrime365 / Homepage Styling

## Problem

The Partners page has several issues compared to the TPrime365 page (the reference "homepage" style):

1. **Hero section** -- Uses a big company logo as the left image instead of a real product/lifestyle image. This looks empty and unprofessional compared to the TPrime365 hero which uses a product composite with an athlete.
2. **Missing promo banner** -- The TPrime365 page has the blue "MODS Max" promo banner at the top; Partners page doesn't.
3. **Navigation differences** -- Missing the hamburger menu button for mobile and the "Log In" link that other pages have.
4. **Icons not rendering** -- The `iconify-icon` web components in value cards, audience cards, trust signals, and step sections appear empty/invisible, making those sections look broken.

## Solution

### 1. Replace Hero Image
- Replace the company logo in the hero left side with the existing `hero-couple.png` image (or `tprime-hero-composite.png`), which is already in the `/public/images/` folder
- Style the image to match TPrime365's hero image treatment: `max-height: 600px`, `object-fit: contain`, with a drop shadow
- Remove the constrained `width: 70%; max-width: 260px` sizing that was designed for a small logo

### 2. Add Promo Banner
- Add the same dismissable blue promo banner that TPrime365 uses
- Add `useState` for `showBanner` state
- Apply `with-banner` / `no-banner` class logic to shift nav and hero padding

### 3. Fix Navigation
- Add the hamburger menu button for mobile
- Add the "Log In" link in the nav right section (matching TPrime365)

### 4. Replace Iconify Icons with Lucide React Icons
- Remove all `iconify-icon` web components (unreliable rendering)
- Import and use `lucide-react` icons directly (already installed in the project)
- This guarantees icons always render since they're bundled React components, not external web components

### 5. Minor CSS Fixes
- Update hero image styles to remove the logo-specific constraints
- Add the `no-banner` padding adjustment class
- Ensure hero image fills the left panel properly like TPrime365

## Technical Details

### Files Modified

**`src/pages/PartnersPage.tsx`**:
- Add `useState` for `showBanner`
- Add promo banner markup (same as TPrime365)
- Add `with-banner`/`no-banner` classes to nav and hero
- Replace hero image `src` from `best365labs-logo.png` to `hero-couple.png`
- Add hamburger button and "Log In" link to nav
- Replace all `<iconify-icon>` elements with imported `lucide-react` components:
  - `Percent`, `TrendingUp`, `FlaskConical`, `Users` (value props)
  - `HeartPulse`, `Video`, `Dumbbell`, `Atom`, `MonitorSmartphone`, `Megaphone` (audiences)
  - `ShieldCheck`, `BadgeCheck`, `Award`, `Building2` (trust signals)

**`src/pages/PartnersPage.css`**:
- Update `.partners-hero-image` to remove `padding: 48px` and use `padding: 16px` like TPrime365
- Update `.partners-hero-image img` to remove `width: 70%; max-width: 260px` constraints and use `max-height: 600px; max-width: 110%; filter: drop-shadow(...)` like TPrime365
- Add `.partners-hero-section.no-banner` padding adjustment
- Update responsive breakpoints for the new hero image sizing

