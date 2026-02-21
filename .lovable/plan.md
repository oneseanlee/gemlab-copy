

# Auto-Open Cart Drawer After "Add to Cart"

## The Problem
Right now, when a customer clicks "Order Now" / "See If You Qualify" / "Get Started", the item silently gets added to the cart. The customer then has to manually find and click the tiny cart icon in the top-right corner to see their cart and proceed to checkout. That's a terrible conversion flow.

## The Solution
After a product is added to the cart, the cart drawer will automatically slide open, showing the customer exactly what they just added along with a clear "Proceed to Checkout" button. One click to add, instant visual confirmation, one more click to check out.

## How It Works

1. **Add a global `isCartOpen` state to the Zustand cart store** -- this lets any component (product pages, nav buttons, etc.) programmatically open the cart drawer.

2. **Update the CartDrawer component** to use this shared open/close state instead of its own local `useState`.

3. **Update all 5 product page `handleOrderNow` functions** to open the cart drawer automatically after `addItem` completes successfully.

## Pages Affected
- `src/stores/cartStore.ts` -- add `isCartOpen` / `setCartOpen` state
- `src/components/CartDrawer.tsx` -- use store state instead of local state
- `src/pages/TPrime365Page.tsx` -- auto-open cart after add
- `src/pages/GLP1Page.tsx` -- auto-open cart after add
- `src/pages/NHTOPage.tsx` -- auto-open cart after add
- `src/pages/UCOSPage.tsx` -- auto-open cart after add
- `src/pages/GLP1BundlePage.tsx` -- auto-open cart after add

---

## Technical Details

### 1. Cart Store (cartStore.ts)
Add two new properties:
- `isCartOpen: boolean` (default `false`)
- `setCartOpen: (open: boolean) => void`

These are NOT persisted to localStorage (excluded via `partialize`).

### 2. CartDrawer Component
Replace the local `const [isOpen, setIsOpen] = useState(false)` with:
```
const isCartOpen = useCartStore(state => state.isCartOpen);
const setCartOpen = useCartStore(state => state.setCartOpen);
```
Wire `Sheet` to use `open={isCartOpen}` and `onOpenChange={setCartOpen}`.

### 3. All Product Pages (5 files)
After `await addItem(...)`, add:
```
useCartStore.getState().setCartOpen(true);
```
This opens the drawer immediately after the item is added.

