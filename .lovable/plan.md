

## Add UGC Video Testimonials Section

### Placement

Directly below the **Community Collage Bridge** (line 433) and above the **Six Powerful Benefits** section (line 435). This is the highest-conversion placement because:
- The community collage just built visual social proof
- UGC videos immediately reinforce that proof with real voices/faces
- The viewer then flows into the structured "Six Benefits" section already primed with trust

### Design

A horizontally scrollable row of 5 video cards styled as a clean, premium UGC gallery:
- Each video rendered as a `<video>` element with `controls`, `preload="none"`, and a poster frame (browser-generated)
- Cards have rounded corners (`var(--radius-md)`), subtle border, and consistent aspect ratio (9:16 portrait, matching typical UGC selfie-style)
- On desktop: 5 videos in a single row, each ~220px wide
- On tablet: horizontal scroll with 3 visible
- On mobile: horizontal scroll with 1.5 visible (peek effect to encourage swiping)
- Section heading: "Hear From Real Users" in Playfair Display serif
- Minimal vertical padding to keep the flow tight between community collage and benefits

### Files Modified

**`src/pages/GLP1Page.tsx`**
- Insert a new `<section>` between the Community Collage Bridge and Six Powerful Benefits
- Contains a heading, a horizontally scrollable container with 5 `<video>` elements sourced from the CDN URLs

**`src/pages/GLP1Page.css`**
- Add `.glp1-ugc-section` styles: centered, tight padding
- Add `.glp1-ugc-scroll` styles: flex row, horizontal overflow scroll, gap, snap behavior, hidden scrollbar (`-webkit-scrollbar: none`)
- Add `.glp1-ugc-card` styles: flex-shrink 0, fixed width, 9:16 aspect ratio, rounded corners, border, overflow hidden
- Add `.glp1-ugc-card video` styles: width/height 100%, object-fit cover
- Responsive breakpoints for card widths at 1024px and 768px

### Video Sources (all 5)
1. `https://assets.cdn.filesafe.space/aYvoAsXxf5xBOSngnm2U/media/69a11cf9753f1581bca8281d.mp4`
2. `https://assets.cdn.filesafe.space/aYvoAsXxf5xBOSngnm2U/media/69a11cf99a0c1813a448e210.mp4`
3. `https://assets.cdn.filesafe.space/aYvoAsXxf5xBOSngnm2U/media/69a11cf9848f6445769e1e17.mp4`
4. `https://assets.cdn.filesafe.space/aYvoAsXxf5xBOSngnm2U/media/69a11cf9c4df65977964bd7d.mp4`
5. `https://assets.cdn.filesafe.space/aYvoAsXxf5xBOSngnm2U/media/69a11cf9753f1558e8a8281e.mp4`

