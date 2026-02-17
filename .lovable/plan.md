

# Fix: Partners Page Build Failure

## Problem

The project won't build because `@supabase/supabase-js` is set to version `^2.95.3` in `package.json`, which doesn't exist. This means the entire site (including the Partners page) fails to load -- it's not an issue with the Partners page code or images specifically.

## Solution

Update `package.json` to change the `@supabase/supabase-js` version from `^2.95.3` to `^2.49.4` (the latest valid release).

## File Changed

**`package.json`** (line 44):
- Change `"@supabase/supabase-js": "^2.95.3"` to `"@supabase/supabase-js": "^2.49.4"`

This single fix will restore the build and bring the Partners page (and the entire site) back online with all its styling, images, and UGC videos intact.

