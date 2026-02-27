

## Conversion Optimization: P0 and P1 Fixes for GLP-1 Protocol Page

### 1. Update Star Rating with Specific Review Count
Replace the vague "Based on early tester feedback" text with a specific count like "4.9 (127 reviews)" to add concrete social proof.

**File:** `src/pages/GLP1Page.tsx` (line 646)

### 2. Add Visual Guarantee Badge Near Checkout CTA
Insert a styled guarantee card with a ShieldCheck icon, "60-Day Money-Back Guarantee" heading, and reassurance copy between the checkout CTA button and the payment methods image.

**File:** `src/pages/GLP1Page.tsx` (after line 690)
**File:** `src/pages/GLP1Page.css` (new `.glp1-guarantee-badge` styles)

### 3. Add Phone Number Near CTA
Add a reassurance line with a phone icon and the existing support number (385) 421-5651 directly below the guarantee badge, before the payment image.

**File:** `src/pages/GLP1Page.tsx` (after guarantee badge)

### 4. Add LogoCarousel Press Bar
Import the existing `LogoCarousel` component and place it between the Hero section and the Hidden Crisis section for immediate credibility.

**File:** `src/pages/GLP1Page.tsx` (import + placement after hero around line 220)

### 5. Lazy-Load UGC Videos with IntersectionObserver
Replace `autoPlay` on the 5 UGC videos with an IntersectionObserver-based approach: videos only start playing when they scroll into view and pause when they leave. This will be a small `LazyVideo` sub-component using `useRef` and `useEffect`.

**File:** `src/pages/GLP1Page.tsx` (new `LazyVideo` component, update video section lines 526-547)

---

### Technical Details

**New CSS classes:**
- `.glp1-guarantee-badge` -- flexbox card with ShieldCheck icon, blue-accented left border, subtle background
- `.glp1-phone-line` -- small centered text with phone icon

**LazyVideo component pattern:**
```text
const LazyVideo = ({ src }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play();
      else el.pause();
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} src={src} muted loop playsInline preload="metadata" ... />;
};
```

**Files modified:**
- `src/pages/GLP1Page.tsx` -- all 5 changes
- `src/pages/GLP1Page.css` -- guarantee badge + phone line styles

