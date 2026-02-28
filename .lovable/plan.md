

# Fix Meta Pixel Build Error

## Problem
The `<noscript><img>` tag for the Meta Pixel is inside `<head>`, which Vite's HTML parser (parse5) rejects as "disallowed content in noscript in head."

## Solution
Move the Meta Pixel `<noscript>` fallback from `<head>` (line 56-57) into `<body>`, right after the existing GTM noscript block (after line 66).

### File: `index.html`
1. **Remove** lines 56-57 (the `<noscript><img .../>` tag) from the `<head>` section
2. **Add** it into `<body>`, right after the GTM noscript iframe (after line 66), like:

```html
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5Z3KRXJR"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- Meta Pixel (noscript) -->
    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=147845509971224&ev=PageView&noscript=1"/></noscript>
    <div id="root"></div>
    ...
```

This is a one-line move that fixes the build error while keeping the pixel fully functional.
