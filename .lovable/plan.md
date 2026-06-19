## Problem

The HappyMD checkout iframe on `/tprime365` still shows blank space below the form because the previous fix contains a **critical typo** in the `postMessage` listener: it checks for `"ttmp-checkout:resize"` instead of `"ttp-checkout:resize"`, so resize events from HappyMD are never matched.

## Fix

Update `src/components/HappyMDCheckout/HappyMDCheckout.tsx`:

1. **Correct the typo** on the message type check: `"ttmp-checkout:resize"` → `"ttp-checkout:resize"`.
2. **Remove the `+24` padding** added to the clamped height (current line 90). The HappyMD embed already reports its exact desired height; adding padding creates the blank space.
3. **Simplify the resize listener** to exactly match the payload format HappyMD sends:
   - Only accept `event.data.type === "ttp-checkout:resize"` + `typeof event.data.height === "number"`
   - Clamp to `300–4000`
   - No extra fallback branches
4. **Keep the existing prop structure** (`product`, `plan`, `partner`, `theme`, `trackingCode`, `height`, `className`, `title`) so all call sites (`TPrime365Page.tsx`, `TPrimeBuyPage.tsx`) continue to work without changes.
5. **Clean up iframe styles**: remove `borderRadius: 12`, `background: "#fff"`, and `maxWidth: "100%"` from the inline style; keep `border: 0`, `width: "100%"`, `display: "block"`.

## File to modify

- `src/components/HappyMDCheckout/HappyMDCheckout.tsx`

No other files need changes.