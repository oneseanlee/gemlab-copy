# Rewrite TPrime365 CTAs to Ultra High-Converting Copy

## Goal
Replace every "See If I Qualify" / "see if you qualify" reference on `/tprime365` with action-driven, conversion-focused language centered on starting TPrime today. All CTAs now scroll to the in-page `#tprime365-checkout` section, so the copy should reflect *starting*, not *qualifying*.

## Copy Changes (src/pages/TPrime365Page.tsx)

| # | Location (line) | Current | New |
|---|---|---|---|
| 1 | MidPageCTA button (46) | See If I Qualify | Start My Transformation |
| 2 | Nav bar CTA (252) | See If I Qualify | Start TPrime Today |
| 3 | Hero subline (274) | Complete your intake to see if you qualify | Join 2,000+ men already optimizing — start in under 5 minutes |
| 4 | Hero main CTA (283) | See If I Qualify | Start My TPrime Protocol → |
| 5 | Steps callout (339) | Complete your intake to see if you qualify | 5-minute intake — no waiting rooms, no labs required |
| 6 | Final CTA price box (628) | Complete your intake to see if you qualify | Lock in $149/mo — physician review included |
| 7 | Final CTA button (631) | See If I Qualify | Claim My Spot — Start Today |
| 8 | Final CTA trust point (636) | See if you qualify in minutes | Start in under 5 minutes |
| 9 | Sticky mobile CTA (824) | See If I Qualify | Start Today |

FAQ answer at line 199 stays as-is (it's body copy explaining the qualification process, not a CTA).

## Why This Converts Better
- **Action verbs over conditionals**: "Start" > "See If" — removes hesitation framing (AIDA: Action stage).
- **Ownership language**: "My Protocol", "My Spot" triggers commitment bias.
- **Time + scarcity micro-proof** in supporting lines instead of repeating the qualification hedge.
- **Variety per placement**: nav, hero, mid-page, final, and sticky each get a slightly different verb to avoid repetition fatigue across the scroll.

## Out of Scope
- No layout, styling, or component changes
- No changes to `handleStartProtocol` scroll behavior (already scrolls to `#tprime365-checkout`)
- No edits to other pages, the FAQ body copy, or the cta-terminology memory (will update memory after user confirms direction)

## Files Modified
- `src/pages/TPrime365Page.tsx` — 9 text replacements
