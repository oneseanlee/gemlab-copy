## Fix: Auto-resize HappyMD iframe via postMessage

HappyMD confirmed the iframe sends `{ type: "ttp-checkout:resize", height: <number> }` from `https://app.happymd.co`, and `cell365power.com` is in their allow-list so the message will cross the boundary.

### Changes

**`src/components/HappyMDCheckout/HappyMDCheckout.tsx`** — update `HappyMDCheckoutIframe`:
- Convert `height` prop to React state (default fallback `1100`).
- Add a `useEffect` that listens for `window` `message` events.
- Filter `event.origin === "https://app.happymd.co"`.
- Check `event.data.type === "ttp-checkout:resize"` and read `event.data.height`.
- Clamp height to `300–4000`, add `24px` padding (matches HappyMD embed-helper.js), and `setHeight(...)`.
- Re-render the `<iframe>` with the dynamic `height={height}`.
- Keep `scrolling="auto"` for taller intake steps.

This fixes the blank space below the form on `/tprime365` and every other page using `HappyMDCheckoutIframe`.