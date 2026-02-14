

# Make Product Images Larger in "Complete Cellular Integration" Section

## Change
Increase the image size in the UCOS flow cards by updating the `max-height` constraint on `.ucos-flow-card .flow-img` in `src/pages/UCOSPage.css`.

## Technical Details
- **File**: `src/pages/UCOSPage.css`, line ~133
- **Current**: `max-height: 200px`
- **New**: `max-height: 320px` -- this gives the square product images significantly more room to display at a larger size while still fitting within the card layout
- The `width: 100%` and `object-fit: contain` properties remain unchanged, so images will scale proportionally

