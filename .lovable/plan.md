

## Plan: GLP-1 Protocol page CTAs add to cart and redirect to /checkout

### What changes
On `src/pages/GLP1Page.tsx`, the `handleOrderNow` function (line 141-152) currently adds the GLP-1 item to cart and opens the cart drawer. It should instead navigate directly to `/checkout`.

### Implementation
1. Add `useNavigate` import from `react-router-dom` (may already be imported)
2. Initialize `const navigate = useNavigate()` inside the component
3. In `handleOrderNow` (line 151), replace `useCartStore.getState().setCartOpen(true)` with `navigate('/checkout')`

This single change affects all CTA buttons on the page (Order Now, Start Your Protocol, etc.) since they all call the same `handleOrderNow` function. The item is added to cart first, then the user is taken straight to the checkout page with that item ready.

