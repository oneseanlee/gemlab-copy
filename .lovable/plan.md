

# Rename GLP-1 Route from `/glp1` to `/glp1-protocol`

## Overview
Rename the GLP-1 page route from `/glp1` to `/glp1-protocol`. This requires updating the route definition and any internal links pointing to `/glp1`.

## Changes

### 1. `src/App.tsx`
- Change `<Route path="/glp1"` to `<Route path="/glp1-protocol"`

### 2. Search and update internal links
- Scan all pages and components for any links or references to `/glp1` (excluding `/glp1-intake` which stays unchanged) and update them to `/glp1-protocol`

