

# Lighten the Final CTA Section Background

## What changes
Update the `.tprime-final-cta` background from the current dark navy gradient (`--b365-navy` / `#1a2a44`) to a lighter blue that matches the site's primary blue (`#3376b0`). This will also require adjusting the price box background and the trust strip border for better contrast against the lighter background.

## Technical details

### File: `src/pages/TPrime365Page.css`

- Change `.tprime-final-cta` background from `linear-gradient(135deg, var(--b365-navy) 0%, #1a2a44 100%)` to `linear-gradient(135deg, #3376b0 0%, #2a6191 100%)` -- matching the site's primary blue
- Update `.tprime-final-price-box` background from `rgba(255,255,255,0.08)` to `rgba(255,255,255,0.15)` for better visibility on the lighter blue
- Update `.tprime-value-total` background from `var(--b365-navy)` to `var(--b365-blue)` to stay consistent

Single file change, no content modifications.

