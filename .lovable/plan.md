

# Add Discount Pricing to Homepage Product Cards

## What Changes

Update three product cards on the homepage to display the original price with a strikethrough next to the current discounted price, so visitors immediately see the savings.

## Products to Update

| Product | Current Price Shown | Original Price | Savings |
|---|---|---|---|
| Ultimate Cellular Optimization System | $175 | $459 | Save $284 |
| GLP-1 Cellular Bundle | $175 | $655 | Save $480 |
| Non-Hormonal Testosterone Bundle | $250 | $459 | Save $209 |

Note: The original prices are pulled from each product's dedicated sales page. If any of these original prices are incorrect, let me know before I implement.

## Visual Treatment

Each discounted card's price area will show:
- The original price in a smaller, strikethrough style (e.g., ~~$459~~)
- The current price in the existing bold green/large style
- The existing `priceNote` will remain below

This matches the pattern already used on the GLP-1 Protocol card which shows "Launch Offer (Reg. $90.00)".

## Technical Details

### Data Changes (OceanRaysPage.tsx)
Add an `originalPrice` field to the three product objects in the `products` array:
- UCOS (id 3): `originalPrice: '$459'`
- GLP-1 Bundle (id 4): `originalPrice: '$655'`
- NHTO Bundle (id 5): `originalPrice: '$459'`

### Render Changes (OceanRaysPage.tsx)
Update the price display in the product card template (around line 317) to conditionally render the original price with strikethrough styling when `originalPrice` exists:

```
{product.originalPrice && (
  <span style={{ textDecoration: 'line-through', color: '#999', fontSize: 16, marginRight: 8 }}>
    {product.originalPrice}
  </span>
)}
{product.price}
```

### No CSS file changes needed
Inline styles will keep it simple and consistent with patterns already used elsewhere in the codebase (e.g., the GLP-1 Bundle page already uses inline `textDecoration: 'line-through'`).

