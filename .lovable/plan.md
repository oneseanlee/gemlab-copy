

# Make the Homepage Hero Gender-Inclusive

The hero section currently skews heavily male. Since Best 365 Labs serves both men and women (GLP-1 Protocol, UCOS, and cellular longevity products are gender-neutral), the homepage should reflect that.

## What Changes

### 1. Social Proof Ticker Messages
**Current:** References "men" and only male names.
**Updated:**
- "Trusted by 50,000+ men nationwide" becomes "Trusted by 50,000+ clients nationwide"
- "James from Dallas just started his protocol" becomes "A new client in Dallas just started their protocol" (gender-neutral, also feels more privacy-conscious)

### 2. Hero Subhead Copy
**Current:** "Precision-grade testosterone and metabolic support delivered to your door."
**Updated:** "Precision-grade hormonal and metabolic optimization delivered to your door." -- this encompasses testosterone, GLP-1, and cellular health without excluding anyone.

### 3. Trusted Badge
**Current:** "Trusted by 50,000+ men"
**Updated:** "Trusted by 50,000+ clients"

### 4. Sticky Mobile CTA
**Current:** Hardcoded to only show TPrime365 at $149/mo.
**Updated:** Change to a generic brand CTA: label becomes "Best 365 Labs" and price becomes "From $39.95" (the lowest entry price), making it relevant regardless of which product the visitor is interested in.

### 5. Benefit Cards (Minor Wording Tweak)
The four benefit cards (Sharper Focus, Increased Drive, Elevated Energy, Stronger Body) are already fairly gender-neutral. No changes needed here.

### 6. Hero Image
The current image (`hero-couple.png`) already shows a couple, which is inclusive. No change needed.

## What Stays the Same
- The hero headline "Your Hormones, Optimized." -- already gender-neutral
- Individual product pages (TPrime365, NHTO) can still speak directly to men since those are male-specific products
- The GLP-1 and UCOS product cards are already gender-neutral
- Benefit card labels and icons remain unchanged

## Technical Details

All changes are in a single file: `src/pages/HomePage.tsx`

- **Line 42:** Update social proof message string (male name)
- **Line 44:** Update social proof message string ("men" to "clients")
- **Lines 334-337:** Update hero subhead paragraph text
- **Line 352:** Update trusted badge span text
- **Lines 274-275:** Update sticky mobile CTA label and price

Total: ~5 line edits in one file. No CSS changes, no new assets needed.
