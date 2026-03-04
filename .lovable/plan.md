

## Plan: Scroll to top on route change

### Problem
When navigating between pages (e.g. from GLP-1 Protocol to Checkout), the browser keeps the previous scroll position instead of starting at the top.

### Implementation
Create a `ScrollToTopOnNav` component that listens to route changes via `useLocation` and calls `window.scrollTo(0, 0)` on every pathname change. Add it inside `BrowserRouter` in `src/App.tsx`.

### Files to change

1. **`src/App.tsx`** — Add a small inline component (or import) that resets scroll on route change:
   ```tsx
   import { useLocation } from "react-router-dom";
   
   function ScrollToTopOnNav() {
     const { pathname } = useLocation();
     useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
     return null;
   }
   ```
   Place `<ScrollToTopOnNav />` inside `AppRoutes`, before `<Routes>`.

One file, ~5 lines of logic.

