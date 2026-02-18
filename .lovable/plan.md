

# Rename OceanRaysPage to HomePage

A straightforward file rename and import update across all references.

## Changes

### 1. Create new files (copies of originals with updated names)
- `src/pages/OceanRaysPage.tsx` becomes `src/pages/HomePage.tsx`
  - Update internal CSS import from `'./OceanRaysPage.css'` to `'./HomePage.css'`
  - Rename the component from `OceanRaysPage` to `HomePage`
  - Update the default export
- `src/pages/OceanRaysPage.css` becomes `src/pages/HomePage.css`
  - No content changes needed (just the filename)

### 2. Update imports in App.tsx
- Change `import OceanRaysPage from "./pages/OceanRaysPage"` to `import HomePage from "./pages/HomePage"`
- Change `<Route path="/" element={<OceanRaysPage />} />` to `<Route path="/" element={<HomePage />} />`

### 3. Update CSS imports in 5 other page files
These pages import OceanRaysPage.css for shared styles:
- `src/pages/TPrime365Page.tsx`: `'../pages/OceanRaysPage.css'` to `'../pages/HomePage.css'`
- `src/pages/NHTOPage.tsx`: same change
- `src/pages/UCOSPage.tsx`: same change
- `src/pages/GLP1Page.tsx`: same change
- `src/pages/GLP1BundlePage.tsx`: same change
- `src/pages/PartnersPage.tsx`: same change

### 4. Update CSS comments (cosmetic, 5 files)
- `TPrime365Page.css` line 2: reference to `OceanRaysPage.css` becomes `HomePage.css`
- `NHTOPage.css` line 2: same
- `UCOSPage.css` line 2: same
- `GLP1Page.css` line 2: same
- `GLP1BundlePage.css` line 2: same

### 5. Delete old files
- Remove `src/pages/OceanRaysPage.tsx`
- Remove `src/pages/OceanRaysPage.css`

No visual changes -- purely a naming cleanup for codebase clarity.
