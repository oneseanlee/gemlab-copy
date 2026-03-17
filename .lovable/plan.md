

## Update TPrime365 Intake Iframe

Align the iframe embed with the official HappyMD snippet the user provided, while preserving the existing advanced tracking logic.

### Changes to `src/pages/TPrime365IntakePage.tsx`

1. **Iframe element updates:**
   - Change `id` from `happymd-tprime365-embed` to `happymd-testosterone-embed`
   - Change default `height` from `1200px` to `800px`
   - Remove `scrolling="auto"` (not in the official snippet)
   - Keep existing `allow="camera; microphone"` and `title`

2. **Re-enable auto-resize via postMessage:**
   - Add a `resize` handler in the existing `handleMessage` function: when `e.data.type === 'resize'`, set `iframe.style.height = e.data.height + 'px'`
   - This was previously disabled due to an "endless scroll bug" — the official embed now supports it, so we re-enable it

3. **Update the iframe ID reference** in the `useEffect` hook from `happymd-tprime365-embed` to `happymd-testosterone-embed`

All existing tracking logic (load-count detection, `generate_lead` dataLayer push, deduplication, `send-lead-notification` call) remains untouched.

