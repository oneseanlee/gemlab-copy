

## Simplify the Free Testosterone Guide Page

Strip the page down to just the essentials: Hero with form, trust strip, "Inside This Guide" list, and final CTA. Remove all the heavy middle sections.

### What gets removed
- **Testimonials section** (lines 258-276) — the 6 quote cards with headshots
- **FAQ section** (lines 278-286) — the 4-item accordion
- **Mid-page CTA** (lines 244-256) — redundant third form between discover and testimonials
- **Testimonials data** (`testimonials` array, lines 43-50)
- **FAQ data** (`faqItems` array, lines 53-58)
- **FaqItem component** (lines 125-138)
- **Unused refs**: `midCtaRef`, `proofRef`, `faqRef`
- **Unused imports**: `Star`, `ChevronDown`

### What stays
1. **Video background** — cinematic feel
2. **Hero** — headline, subtitle, opt-in form, ebook cover
3. **Trust strip** — 4 credibility badges
4. **"Inside This Guide"** — the 7-item discover list (gives just enough value preview)
5. **Final CTA** — dark video section with second opt-in form
6. **Footer** — legal/contact

### Result
The page goes from 7 sections down to 4 content sections. Clean, fast, focused on one action: enter name + email to get the guide.

