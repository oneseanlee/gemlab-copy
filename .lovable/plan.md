

## Restyle Upsell Page to Match Free Testosterone Guide Page

The current upsell page uses a dark navy theme with white text, while the free guide page uses a light theme with a full-page fixed video background, semi-transparent white/blue overlay, and navy body text. This plan brings the upsell page into full visual alignment with the free guide page.

### What Changes

**Visual theme flip:**
- Remove the dark navy background
- Add the same full-page fixed video background (`ftg-bg-running.mp4`) with the white-to-blue gradient overlay
- Switch all text to dark (`--b365-text`, `--b365-text-secondary`) instead of white
- Use `ftg-active` class approach (transparent root background) so the video shows through

**Typography tokens:**
- Replace all hardcoded font families with `var(--font-title)` and `var(--font-body)`
- Replace hardcoded font sizes with `var(--text-*)` scale tokens
- Match heading styles, line heights, and letter spacing to the FTG page

**Component styling updates:**
- Green confirmation bar: keep green but refine to match overall lighter feel
- Gold badge, timer, CTA button: keep gold accent color (this is the upsell-specific urgency element)
- Product grid cards: update to use frosted-glass/light cards with borders matching FTG quote blocks (`background: var(--b365-gray-50)`, `border: 1px solid var(--b365-border)`)
- Value stack card: same frosted-glass treatment
- Dr. Warren card: light background with gold left border
- Guarantee section: dark text on transparent background
- Footer: match FTG footer styling with `var(--b365-gray-400)` text and `var(--b365-border)` top border
- Skip link and secure text: use `var(--b365-gray-400)` / `var(--b365-text-secondary)`

**Responsive behavior:**
- Maintain the same breakpoints (480px, 768px, 1024px) already in use on both pages

### Technical Details

**Files modified:**
- `src/pages/UpsellPage.tsx` -- Add the fixed video background markup (same as FTG: video element + overlay div), switch root class from `upsell-active` to `ftg-active` (reuse the same transparent-root mechanism), update text color classes where needed
- `src/pages/UpsellPage.css` -- Complete restyle: remove dark theme rules, apply light theme with design tokens, add frosted-glass card styles, update all color references from white-on-dark to dark-on-light, keep gold accents for urgency elements (badge, timer, CTA, checkmarks)

**No new files created. No routes changed.**

**Key style mappings:**
- `.upsell-page` background: transparent (video shows through)
- `.upsell-page` color: `var(--b365-text)` instead of white
- Cards: `background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); border: 1px solid var(--b365-border)`
- Headings: `font-family: var(--font-title)` with `color: var(--b365-text)`
- Body text: `font-family: var(--font-body)` with `color: var(--b365-text-secondary)`
- Gold elements remain `#D4A843` for urgency contrast
- Timer digits: gold on light frosted background
- CTA button: keep gold gradient (stands out well against light background too)
