

# Create Master Reference Document

## What This Is
A single comprehensive markdown file (`SITE-MASTER-REFERENCE.md`) that documents the entire Best 365 Labs platform in a format optimized for feeding to Claude or other AI assistants. It will consolidate and expand on the existing `BEST365LABS-REFERENCE.md` with additional sections covering:

## Document Structure

### 1. Company Overview
Company details, social media, team, partners (happyMD, ShipStation), manufacturing.

### 2. Core Technology -- MODS Max
Patent-pending sublingual delivery system details, variants, key claims.

### 3. Complete Product Catalog (5 products)
Each product with: Shopify IDs, variant IDs, pricing, ingredients, dosing, FAQs, competitor comparisons, value stacks, clinical claims, and target demographics.

### 4. Site Architecture and Routes
All 17 active routes with their page components, purposes, and relationships (intake forms linked to product pages, etc.).

### 5. Checkout Flow (NEW -- not in existing reference)
Full documentation of the custom on-site checkout:
- Cart Drawer (Zustand store with Shopify Storefront API sync)
- Intermediate checkout page (email/phone capture only)
- Redirect to Shopify native checkout with buyer identity pre-fill
- Cart synchronization on tab visibility change
- Variant ID mapping for each product

### 6. Technology Stack
React 18, Vite, TypeScript, Tailwind CSS, Shopify Storefront API (2025-07), Zustand, Embla Carousel, shadcn/ui, React Router v6, TanStack React Query, Lottie React.

### 7. Design System Audit (NEW -- not in existing reference)
Full token documentation from `src/index.css`:
- Color palette (brand blues, neutrals, semantics)
- Typography scale (Display 48px down to Micro 11px) with font families
- Spacing scale (4px base, 4px to 96px)
- Border radius tokens (8px, 14px, 24px)
- Shadow system (4-tier)
- Animation tokens (durations, easing)
- Breakpoints (480px, 768px, 1024px)
- Common UI patterns across pages

### 8. Conversion Architecture (NEW)
- CTA strategy per page (TPrime365 has 10+ "Start My Protocol" CTAs)
- Urgency elements (dynamic monthly pricing lock)
- Trust micro-badges pattern
- Sticky mobile CTA bars
- Social proof placement strategy
- Section ordering philosophy (objection handling before conversion)

### 9. Shared Components
CartDrawer, AnimatedCTA, SharedFooter, MobileMenu, TrustBadges, EarlyTestersCarousel, ScrollToTop -- what each does and where it's used.

### 10. Key Messaging and Copy
Hero taglines, guarantee language, MODS Max description, GLP-1 crisis messaging.

### 11. Testimonials and Social Proof
All testimonial data with quotes, clinical results, and co-founder statements.

### 12. Legal and Compliance
Disclaimers, Methylene Blue caution, HIPAA, manufacturing standards.

## File Location
`SITE-MASTER-REFERENCE.md` in the project root.

## Approach
This is a single new file creation. No existing files will be modified. The content will be sourced from the existing `BEST365LABS-REFERENCE.md` (which remains untouched), the codebase, and design tokens from `src/index.css`.
