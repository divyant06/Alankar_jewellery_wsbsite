# Alankar Luxury Commerce - Product Requirement Document (MVP)

## 1. System Core Architecture
- Framework: Next.js 14/15 App Router (TypeScript)
- Styling: Tailwind CSS + shadcn/ui components
- State Management: Zustand (For Cart, Global Live Gold Rates, and Client Context)
- Database & Backend: Supabase (PostgreSQL for complex relational jewelry variations)
- Payments: Razorpay Custom Checkout Sheet

## 2. Core Feature & Layout Specification

### A. Dynamic Live Gold Rate Engine
- Implementation: Global state controller (`src/store/useGoldRateStore.ts`) tracking live 24K, 22K, and 18K gold pricing per gram.
- Application Layer: Product catalog structures must calculate dynamic product pricing live on runtime using the formula:
  `Final Price = (Gold Weight * Current Purity Rate) + Diamond/Stone Costs + Making Charges + 3% GST`
- Interface: A minimalist, high-luxury ticking header banner displaying current market pricing across structural views.

### B. Scaled User Account Dashboard (`/dashboard`)
- Integration: Driven via Supabase Auth.
- Functional Views:
  * Order Timeline History: Clean vertical stepper tracking payment validation, manufacturing status, quality check, shipping tracking codes.
  * Vault / Saved Address Directory: Highly secure checkout routing profiles.
  * Profile Settings: Secure password modifications and demographic structures.

### C. Catalog Strategy (Rings, Necklaces, Bracelets, Earrings)
- Dynamic pricing variation adjustments changing automatically when structural variables alter (e.g., swapping a product viewing layout from 18K to 22K purity).

## 3. Database Schema Blueprint (Supabase relational layout)
- `products`: id, name, description, category, base_making_charge, stone_cost_flat, design_type, created_at
- `product_variants`: id, product_id, metal_type (gold/platinum), purity (18k/22k), weight_grams, diamond_carat, stock_count, image_url
- `live_rates`: id, metal_type, purity, price_per_gram, updated_at