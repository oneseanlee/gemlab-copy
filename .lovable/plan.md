

# Add Google Tag Manager to the Project

## What changes
Add the two GTM snippets to `index.html`:
1. The GTM `<script>` tag as high as possible in the `<head>` section (right after the opening `<head>` and charset/viewport meta tags)
2. The GTM `<noscript>` iframe immediately after the opening `<body>` tag

## Technical details

### File: `index.html`

**In the `<head>`** -- insert the GTM script right after `<meta name="viewport" ...>` (line 5), before the `<title>` tag:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5Z3KRXJR');</script>
<!-- End Google Tag Manager -->
```

**In the `<body>`** -- insert the noscript fallback right after `<body>`, before `<div id="root">`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5Z3KRXJR"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

No other files are affected. This is a single-file change to `index.html`.

