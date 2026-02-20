
## Fix: React ref warnings on AnimatedCTA and SharedFooter

### What's Happening

The console shows two warnings:
- "Function components cannot be given refs" for `AnimatedCTA`
- "Function components cannot be given refs" for `SharedFooter`

Both are caused by the `RevealSection` wrapper, which uses `useScrollReveal` to attach a ref to a `<section>` element. When `AnimatedCTA` (a `.jsx` function component) is rendered inside `RevealSection`, React's dev mode warns that function components can't receive refs unless they use `React.forwardRef`. The same applies to `SharedFooter`.

These warnings do not break any functionality — all buttons and links work correctly. However, they pollute the console and can mask real errors.

### Root Cause

`AnimatedCTA/AnimatedCTA.jsx` is a plain function component — it does not use `React.forwardRef`, so React warns when anything tries to pass it a ref. The same is true for `SharedFooter`.

The actual ref in `RevealSection` is attached to the `<section>` DOM element, not to `AnimatedCTA` or `SharedFooter` directly. The warning appears because React traces the render tree and flags any function component in the chain that doesn't forward refs.

The cleanest fix: wrap `AnimatedCTA` with `React.forwardRef` so refs can safely pass through it. This also future-proofs the component for any animation libraries that may need to attach refs.

For `SharedFooter`, the fix is the same — wrap the export with `React.forwardRef`.

### Files to Change

1. `src/components/AnimatedCTA/AnimatedCTA.jsx`
   - Wrap the component with `React.forwardRef`
   - Pass the `ref` to the underlying `<Tag>` element

2. `src/components/SharedFooter/SharedFooter.tsx`
   - Wrap the component with `React.forwardRef`
   - Pass the `ref` to the underlying `<footer>` element

### No Functional Changes

- All button destinations remain unchanged
- All animations and hover effects remain unchanged
- No CSS changes
- No routing changes
- This is a pure React correctness fix
