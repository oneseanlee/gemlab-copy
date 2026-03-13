

## GLP-1 Buy Page Conversion Optimization

**Problem**: Traffic is arriving but not converting — visitors aren't filling out the form and proceeding to checkout.

**Current page structure**: Promo banner → Video/carousel → Title/description → Benefits list → Price → Bonuses → Lead form → Guarantee → Sticky mobile CTA. One testimonial, one trust strip, no FAQ, no urgency timer.

### High-Impact Additions (ordered by expected lift)

**1. Countdown Timer Near Price**
Add a session-based countdown (e.g. 15 minutes) next to the price block showing "Launch pricing expires in XX:XX". Resets per session so it's always active. Creates urgency without feeling fake — consistent with upsell page pattern already in use.

**2. FAQ Accordion (Objection Crusher)**
Add 5 Q&As below the guarantee badge targeting the exact objections stopping action:
- "What exactly is in the protocol?"
- "Will this work if I'm on Ozempic/Mounjaro?"
- "How fast will I see results?"
- "What if it doesn't work for me?" (reinforces guarantee)
- "Is this a subscription?"

Uses existing `Accordion` UI component.

**3. More Testimonials (Multiple Angles)**
Currently only one testimonial (Sarah M. — energy/muscle). Add 2 more covering different pain points:
- One about metabolism/weight plateau breaking
- One about brain fog clearing + sleep improvement

Rotate them or stack them. Different objections resonate with different visitors.

**4. Payment Method Icons**
Add recognizable payment logos (Visa, Mastercard, Amex, PayPal/Shop Pay) directly below the CTA button. Visitors seeing "Payment on next page" need visual reassurance that the next step is safe. Simple image strip.

**5. "How It Works" 3-Step Visual**
A simple numbered strip: **1** → Enter your info **2** → Complete secure checkout **3** → Protocol ships in 24-48hrs. Reduces uncertainty about what happens after clicking. Placed above the form.

### Technical Details

| Enhancement | Component/Pattern | Location in DOM |
|---|---|---|
| Countdown timer | New `useState` + `useEffect` interval, inline in price block | After `.glp1-checkout-price` |
| FAQ accordion | Radix `Accordion` (already in project) | After `.glp1-guarantee-badge` |
| Extra testimonials | Duplicate existing `.glp1buy-testimonial` markup | Below existing testimonial in left column |
| Payment icons | SVG/image strip | Below `.glp1buy-secure-note` |
| How It Works | 3-column flex layout | Above `.glp1buy-inline-form` |

Mobile ordering CSS will be updated to keep the flow logical on small screens.

