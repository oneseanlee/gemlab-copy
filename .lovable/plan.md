

# Add UGC Video Testimonials to TPrime365 Page

## Overview
Add a new section to the TPrime365 page featuring four AI-generated UGC (user-generated content) style videos. These serve as social proof and make the page feel more authentic and engaging.

## Recommended Placement

**After the "What You'll Experience" benefits section (Section 9) and before the Comparison Table (Section 10).**

This is the ideal spot because:
- The visitor has already learned what the product does and its benefits
- Video testimonials reinforce those claims with "real people" before hitting the comparison table
- It breaks up the text-heavy content with engaging media
- It sits right before the decision-making sections (comparison, pricing, CTA)

## What It Will Look Like

A full-width section with:
- Section heading: **"Real Men. Real Results."** (or similar)
- 4 videos in a responsive grid (2x2 on desktop, 1-column on mobile)
- Each video plays inline with controls, poster frame auto-generated
- Clean card styling consistent with the rest of the page

## Technical Details

### 1. Add video files to public directory
Copy the 4 MP4 files into `public/images/` with clean filenames:
- `tprime-ugc-1.mp4`
- `tprime-ugc-2.mp4`
- `tprime-ugc-3.mp4`
- `tprime-ugc-4.mp4`

Since these are external URLs, we will reference them directly as video sources rather than downloading them.

### 2. Add new section in TPrime365Page.tsx
Insert a new section between the Benefits grid (Section 9, ~line 295) and the Comparison Table (Section 10, ~line 298):

```tsx
{/* UGC Video Testimonials */}
<section className="b365-section b365-section-alt">
  <h2 className="b365-section-heading b365-serif">
    Real Men. Real <em>Results.</em>
  </h2>
  <div className="tprime-ugc-grid">
    {ugcVideos.map((video, i) => (
      <div className="tprime-ugc-card" key={i}>
        <video
          controls
          playsInline
          preload="metadata"
          src={video.src}
        />
      </div>
    ))}
  </div>
</section>
```

The video URLs will point directly to the external storage URLs provided.

### 3. Add CSS styles in TPrime365Page.css
New styles for the UGC grid:
- `.tprime-ugc-grid`: 2-column grid on desktop, 1-column on mobile
- `.tprime-ugc-card`: Rounded corners, subtle shadow, overflow hidden
- `video` element: 100% width, aspect-ratio 9/16 (vertical UGC style)
- Responsive breakpoint at 768px for single column

### Files Modified
- `src/pages/TPrime365Page.tsx` -- new UGC video section
- `src/pages/TPrime365Page.css` -- grid and card styles for the videos

