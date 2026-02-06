
# Two-Column Hero Section for TPrime365

## Overview
Transform the TPrime365 hero section from a single centered column layout to a two-column layout, matching the visual style used in the GemLab listicle page (similar to the travel-kit-banner pattern).

## Current State
The hero section is currently a centered, single-column card with:
- Title
- Divider
- Subtitle (ingredients list)
- Price banner
- Guarantee text
- CTA button

## Proposed Layout

```text
+------------------------------------------------------------------+
|                                                                  |
|   [LEFT COLUMN - 55%]              [RIGHT COLUMN - 45%]          |
|                                                                  |
|   The Only 4-in-1 Testosterone     +----------------------+      |
|   Optimizer With Sublingual        |                      |      |
|   Delivery                         |   [Product Image]    |      |
|                                    |   Placeholder or     |      |
|   Enclomiphene + Spermidine +      |   bottle visual      |      |
|   Boron + Vitamin C                |                      |      |
|                                    +----------------------+      |
|   [$149/month banner]                                            |
|   Guarantee text                                                 |
|   [START YOUR OPTIMIZATION ->]                                   |
|                                                                  |
+------------------------------------------------------------------+
```

## Changes Required

### 1. TPrime365Page.tsx - Hero Section Structure
Update the hero card to use a two-column flexbox layout:
- Left column: Title, subtitle, price banner, guarantee, CTA button
- Right column: Placeholder image area (styled box or actual image if available)

### 2. TPrime365Page.css - Hero Styling
Add new CSS classes:
- `.tprime-hero-card` - Change to `display: flex` with `justify-content: space-between`
- `.tprime-hero-content` - Left column wrapper (flex: 1, text-align: left)
- `.tprime-hero-image` - Right column wrapper (flex: 0 0 40%, display: flex, centered)
- Remove the divider (doesn't fit two-column layout well)
- Adjust title and text alignment to left-align

### 3. Responsive Behavior
On mobile (768px and below):
- Stack columns vertically (flex-direction: column)
- Image appears above or below content
- Text returns to center alignment

## Technical Details

### File: src/pages/TPrime365Page.tsx
Lines 49-66 will be modified to wrap content in two column containers.

### File: src/pages/TPrime365Page.css  
Lines 26-114 will be updated with new flexbox layout and column styling.

### Image Placeholder
Since there's no specific TPrime365 product image available yet, we'll create a styled placeholder box with:
- Rounded corners
- Light gray background or gradient
- "Product Image" text or icon
- This can easily be replaced with a real image later
