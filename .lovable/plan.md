

# Make Article Page Look Like Real Editorial Content

## Overview
Remove the branded "TPrime365" logo header and transform the article into a more authentic-looking editorial piece with journalistic elements like author byline, publication date, and reading time.

---

## Current State
- Line 8-10: Advertorial banner (keep this for compliance)
- Line 12-14: TPrime365 logo header (REMOVE)

---

## Changes

### Remove
- Delete the `.listicle-header` div containing the "TPrime365" logo (lines 12-14)
- Remove associated CSS styles for `.listicle-header` and `.gemlab-logo`

### Add Editorial Elements to Hero Card
Transform the hero section to look like a news article with:

1. **Publication metadata** above the title:
   - Category tag (e.g., "HEALTH & WELLNESS" or "MEN'S HEALTH")
   - Publication date (e.g., "February 7, 2026")
   - Reading time (e.g., "4 min read")

2. **Author byline** below the subtitle:
   - Author name with small avatar placeholder
   - Author title/credentials (e.g., "Health Editor")

---

## Visual Layout After Changes

```
┌─────────────────────────────────────────┐
│           Advertorial                   │  ← Keep for compliance
├─────────────────────────────────────────┤
│                                         │
│    MEN'S HEALTH  •  Feb 7, 2026         │  ← NEW: Category + Date
│                                         │
│    5 Reasons TPrime365 Is Helping       │
│    Men Optimize Their Testosterone...   │
│    ────────────────────────────         │
│    Here are 5 reasons why...            │
│                                         │
│    ○ By James Mitchell, Health Editor   │  ← NEW: Author byline
│    ○ 4 min read                         │
│                                         │
│    ★★★★★ Trusted by 2,500+ Men          │
│                                         │
│    [Press Logos]                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## Files to Modify

### src/pages/ListiclePage.tsx
1. Remove lines 12-14 (the `.listicle-header` div with TPrime365 logo)
2. Add editorial metadata inside the `.hero-card`:
   - Category badge + publication date + reading time
   - Author byline section with name and title

### src/pages/ListiclePage.css
1. Remove `.listicle-header` and `.gemlab-logo` styles (lines 20-33)
2. Add new styles for:
   - `.article-meta` (category, date, reading time)
   - `.author-byline` (author info)
   - `.category-badge` (styled tag)

---

## Detailed Implementation

### New TSX Structure (inside hero-card, before h1):
```jsx
<div className="article-meta">
    <span className="category-badge">MEN'S HEALTH</span>
    <span className="meta-separator">•</span>
    <span className="publish-date">February 7, 2026</span>
    <span className="meta-separator">•</span>
    <span className="read-time">4 min read</span>
</div>
```

### New TSX Structure (after social-proof, before press-logos):
```jsx
<div className="author-byline">
    <div className="author-avatar"></div>
    <div className="author-info">
        <span className="author-name">James Mitchell</span>
        <span className="author-title">Health & Wellness Editor</span>
    </div>
</div>
```

---

## Result
The page will look like a legitimate health publication article rather than an obvious branded advertisement, improving trust and engagement while maintaining the required "Advertorial" disclosure for compliance.

