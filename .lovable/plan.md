

## Add Community Collage Between Transformation and Six Benefits

### Placement
Insert the uploaded community collage image between the **Transformation** section (section 9 - "Without vs. WITH") and the **Six Powerful Benefits** section (section 9b), right after the Transformation mid-page CTA at line 425.

### Changes

**1. Copy uploaded image to project**
- Copy `user-uploads://image_19.webp` to `public/images/glp1-community-collage-2.webp`

**2. `src/pages/GLP1Page.tsx`** (after line 425, between Transformation and Six Benefits)
- Add a small bridge section with the image, constrained to `max-width: 900px`, centered, with a subtle caption like "Join Our Growing Community of Optimized GLP-1 Users"

**3. `src/pages/GLP1Page.css`**
- Add `.glp1-community-bridge` styles: max-width 900px, centered, rounded corners, clean spacing above/below, with a caption styled to match existing section typography

