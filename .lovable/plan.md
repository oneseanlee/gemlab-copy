
# Redesign Free Testosterone Guide Page

## Problem
The current page uses a dark background (#0a0f1e) with gold/amber accents (#D4A843) that doesn't match the rest of the site. The site uses a white-to-blue gradient background, brand blue (#3376b0), white cards with subtle borders, and the standard blue AnimatedCTA buttons.

## Changes

### 1. Remove Dark Theme -- Match Site Background
- Remove the dark `background` override on `.ftg-page`
- Let the page inherit the global gradient background (`#FFFFFF` to `#BFD5E6` to `#5D8AA8`) from `index.css`
- All text switches from white to the site's standard dark text (`--b365-text` / `--b365-gray-900`)
- Secondary text uses `--b365-text-secondary` (`#5A6578`)

### 2. Restyle All Sections to White Card Aesthetic
- **Trust strip cards**: White background, `--shadow-sm` box shadow, `--b365-border` border, blue icons instead of gold
- **Discover grid items**: White card background with border and shadow, numbered items use `--b365-blue` instead of gold
- **Testimonial cards**: White background with border/shadow, standard blue star ratings instead of gold
- **Form inputs**: Light gray border, white background, standard focus ring in blue
- **Success state**: Green border with light green background (matches `--b365-green`)

### 3. Replace Gold CTA Buttons with Standard AnimatedCTA
- Remove the custom `.ftg-submit` gold gradient button entirely
- Use the site's `AnimatedCTA` component (blue gradient, pill shape, hover animation) as the form submit button via its `onClick` prop
- This ensures visual consistency with every other CTA on the site

### 4. Restyle the 3D Ebook Mockup
- Change the ebook gradient from dark navy to the brand blue palette (`--b365-blue` to `--b365-blue-dark`)
- Keep the 3D perspective effect but adjust shadow colors to work on a light background
- Badge text uses white on blue instead of gold

### 5. Update Hero Tag and Heading Colors
- "Free Guide" tag: Blue (`--b365-blue`) instead of gold
- Headlines: `--b365-text` (dark navy) instead of white
- Subheadline: `--b365-text-secondary` instead of gray-400

### 6. Footer Styling
- Border top uses `--b365-border` instead of rgba white
- Text uses `--b365-gray-400`
- Links hover to `--b365-blue` instead of gold

### 7. Scroll Reveal
- Keep the existing `useScrollReveal` hook and `.b365-reveal` / `.b365-revealed` classes (they work on any background)

---

## Technical Details

### Files Modified
1. **`src/pages/FreeTestosteroneGuidePage.tsx`** -- Import and use `AnimatedCTA` for submit buttons, replace the custom button element, adjust ebook badge/star colors
2. **`src/pages/FreeTestosteroneGuidePage.css`** -- Complete restyle of all color values, backgrounds, borders, and shadows to match the homepage design system

### Key CSS Token Swaps

| Element | Current (Dark/Gold) | New (Light/Blue) |
|---------|-------------------|-----------------|
| Page background | `#0a0f1e to #111827` | Inherit global gradient |
| Headlines | `#fff` | `var(--b365-text)` |
| Body text | `#9CA3AF` | `var(--b365-text-secondary)` |
| Accent color | `#D4A843` (gold) | `var(--b365-blue)` |
| Card backgrounds | `rgba(255,255,255,0.04)` | `var(--b365-white)` |
| Card borders | `rgba(255,255,255,0.06)` | `1px solid var(--b365-border)` |
| Card shadows | None | `var(--shadow-sm)` |
| CTA button | Gold gradient | `AnimatedCTA` component (blue) |
| Input borders | `rgba(255,255,255,0.12)` | `var(--b365-border)` |
| Input focus | `#D4A843` border | `var(--b365-blue)` border |
| Stars | `#D4A843` fill | `var(--b365-blue)` fill |
| Ebook mockup | Dark navy gradient | `--b365-blue` gradient |

### Form Handling
The `AnimatedCTA` component supports `onClick` without `href`, rendering as a `<button>`. We wrap the form's submit logic so that clicking the AnimatedCTA triggers form validation and submission. The form element itself handles validation via HTML5 `required` attributes -- we attach an `id` to the form and use `form.requestSubmit()` from the button click, or restructure to keep the button inside the `<form>` tag.

### No New Dependencies
All changes use existing design tokens, components, and patterns already in the codebase.
