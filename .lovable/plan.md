

# Update Product Card CTAs

## Change
Replace the CTA text on all product cards from **"Start evaluation"** to **"Get Started"** in `src/pages/OceanRaysPage.tsx`.

## Technical Detail
One line change at approximately line 263 in the product card render loop:

```
Before: <AnimatedCTA href={product.href} className="card-cta">Start evaluation</AnimatedCTA>
After:  <AnimatedCTA href={product.href} className="card-cta">Get Started</AnimatedCTA>
```

This updates all five product cards at once since they share the same render template.

