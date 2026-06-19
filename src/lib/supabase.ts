/**
 * supabase.ts
 *
 * Alankar Luxury Commerce — Supabase Client Singleton
 *
 * Provides a single, reusable Supabase client instance for use across
 * the application. Reads connection credentials from environment variables
 * defined in `.env.local`.
 *
 * @module lib/supabase
 */

import { createClient } from "@supabase/supabase-js";

/* ─────────────────────────────────────────────────────────────────────────────
   Environment Validation
───────────────────────────────────────────────────────────────────────────── */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "[Alankar] Missing Supabase environment variables. " +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Supabase Client Singleton
───────────────────────────────────────────────────────────────────────────── */

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ─────────────────────────────────────────────────────────────────────────────
   Database Schema Reference (ALANKAR-PRD.md §3)
   ─────────────────────────────────────────────────────────────────────────

   Provision these tables in Supabase SQL Editor before production launch:

   -- ═══════════════════════════════════════════════════════════════════════
   -- products — Master product catalogue
   -- ═══════════════════════════════════════════════════════════════════════
   CREATE TABLE IF NOT EXISTS products (
     id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name            TEXT NOT NULL,
     slug            TEXT NOT NULL UNIQUE,
     category        TEXT NOT NULL CHECK (category IN ('Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Pendants')),
     description     TEXT,
     base_weight_g   DECIMAL(8, 2) NOT NULL,
     making_charge   DECIMAL(10, 2) NOT NULL,
     stone_cost      DECIMAL(12, 2) NOT NULL DEFAULT 0,
     image_url       TEXT NOT NULL,
     is_featured     BOOLEAN NOT NULL DEFAULT false,
     created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
     updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   CREATE INDEX idx_products_category ON products (category);
   CREATE INDEX idx_products_featured ON products (is_featured) WHERE is_featured = true;

   -- ═══════════════════════════════════════════════════════════════════════
   -- product_variants — Purity-specific SKUs for each product
   -- ═══════════════════════════════════════════════════════════════════════
   CREATE TABLE IF NOT EXISTS product_variants (
     id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
     purity          TEXT NOT NULL CHECK (purity IN ('18k', '22k')),
     sku             TEXT NOT NULL UNIQUE,
     image_url       TEXT,
     is_available     BOOLEAN NOT NULL DEFAULT true,
     created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

     UNIQUE (product_id, purity)
   );

   CREATE INDEX idx_variants_product ON product_variants (product_id);

   -- ═══════════════════════════════════════════════════════════════════════
   -- live_rates — Current gold rates per gram by purity
   -- ═══════════════════════════════════════════════════════════════════════
   CREATE TABLE IF NOT EXISTS live_rates (
     id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     purity          TEXT NOT NULL UNIQUE CHECK (purity IN ('24K', '22K', '18K')),
     rate_per_gram   DECIMAL(10, 2) NOT NULL,
     updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   -- Seed with initial market rates
   INSERT INTO live_rates (purity, rate_per_gram) VALUES
     ('24K', 7150.00),
     ('22K', 6550.00),
     ('18K', 5362.50)
   ON CONFLICT (purity) DO UPDATE SET rate_per_gram = EXCLUDED.rate_per_gram;

   -- ═══════════════════════════════════════════════════════════════════════
   -- orders — Transactional order records
   -- ═══════════════════════════════════════════════════════════════════════
   CREATE TABLE IF NOT EXISTS orders (
     id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     razorpay_order_id TEXT NOT NULL UNIQUE,
     razorpay_payment_id TEXT,
     customer_name   TEXT NOT NULL,
     customer_email  TEXT NOT NULL,
     customer_phone  TEXT NOT NULL,
     shipping_address JSONB NOT NULL,
     line_items      JSONB NOT NULL,
     subtotal        DECIMAL(12, 2) NOT NULL,
     gst_amount      DECIMAL(10, 2) NOT NULL,
     grand_total     DECIMAL(12, 2) NOT NULL,
     payment_status  TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
     created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
   );

   CREATE INDEX idx_orders_status ON orders (payment_status);
   CREATE INDEX idx_orders_email ON orders (customer_email);

───────────────────────────────────────────────────────────────────────────── */
