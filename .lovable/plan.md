

# Free Testosterone Guide Page Updates

## Changes

### 1. Replace Hero Background Video
Swap the current `ftg-bg-running.mp4` with the newly uploaded video file. Copy `user-uploads://2505952_Running_Music_1280x720-2.mp4` to `public/images/ftg-bg-running.mp4` (replacing the existing one) and update the source reference.

### 2. Redesign the Bottom CTA Section
The current final CTA section has issues with the video overlay contrast, spacing, and form layout against the dark background. The fix:
- Increase padding for more breathing room (top/bottom `var(--space-32)`)
- Improve the overlay gradient for better legibility (darker, with a subtle blue tint)
- Add a decorative top border glow effect for visual separation
- Style the form inputs for dark backgrounds (semi-transparent white backgrounds, light borders, white placeholder text)
- Center and constrain the form width to 480px
- Add subtle backdrop blur to the form area for a frosted-glass premium feel
- Ensure the `ftg-cta-micro` text has proper opacity and spacing

### 3. Add First Name Field to All Opt-In Forms
Re-introduce a "First Name" input field to the `OptInForm` component:
- Add `firstName` and `onFirstNameChange` props to the component
- Add state for `firstName` in the parent component
- Place the first name input above the email row (stacked layout: first name, then email + CTA button)
- Use a `User` icon for the first name field (from lucide-react)
- The input row becomes two rows: name field on top, email + button below

## Technical Details

### Files Modified
- `public/images/ftg-bg-running.mp4` -- replaced with new uploaded video
- `src/pages/FreeTestosteroneGuidePage.tsx` -- add `firstName` state, update `OptInForm` props and JSX to include first name input
- `src/pages/FreeTestosteroneGuidePage.css` -- restyle `.ftg-final-cta` section (padding, overlay, form inputs on dark bg), add `.ftg-name-row` styles

### Form Layout (All 3 Forms)
```text
+-------------------------------+
| [User icon] First Name        |
+-------------------------------+
| [Mail icon] Email  | GET FREE |
+-------------------------------+
  Lock icon  100% Free...
```

### Bottom CTA Visual Hierarchy
```text
+--[blue glow top border]------+
|                               |
|   Stop Renting.               |
|   Start Owning.               |
|                               |
|   Get the Free Guide Now.     |
|                               |
|   [ First Name             ]  |
|   [ Email       ] [GET FREE]  |
|   Lock 100% Free...           |
|                               |
|   Join 50,000+ men...         |
+-------------------------------+
```
