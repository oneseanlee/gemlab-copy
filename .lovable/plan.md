
# Move Digital Guides Section After Testimonials

## What changes
In `src/pages/OceanRaysPage.tsx`, move the "Digital Guides & Resources" section (currently at lines 443-469, right above the footer) to right after the Testimonials section (after line 389, before the "3-Step Process" section).

No CSS or other file changes needed -- just a cut-and-paste of the JSX block within the same file.

## Technical details
- Cut lines 443-469 (the entire `{/* 12. Digital Guides & Resources */}` section block)
- Paste it at line 390 (between the Testimonials closing `</section>` and the `{/* 10. 3-Step Process */}` comment)
- Re-number the section comments accordingly (Guides becomes 10, 3-Step becomes 11, FAQ becomes 12, Footer becomes 13)
