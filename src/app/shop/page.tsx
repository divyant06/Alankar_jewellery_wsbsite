import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";

/* ─────────────────────────────────────────────────────────────────────────────
   SEO Metadata — Server-rendered, fully static
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Fine Jewellery Collection | Alankar",
  description:
    "Browse Alankar's complete catalogue of handcrafted luxury jewellery. Discover bespoke diamond rings, heritage gold necklaces, artisan bracelets, and solitaire pendants — each piece ethically sourced and BIS hallmark certified.",
  keywords: [
    "fine jewellery collection",
    "luxury gold jewellery India",
    "handcrafted diamond rings",
    "22K gold necklace",
    "heritage craftsmanship jewellery",
    "bespoke jewellery online",
    "Alankar jewellery catalogue",
  ],
  openGraph: {
    title: "Fine Jewellery Collection | Alankar",
    description:
      "Explore Alankar's complete fine jewellery catalogue — handcrafted with ethically sourced diamonds and hallmarked 22K gold.",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Filter Sidebar Data
───────────────────────────────────────────────────────────────────────────── */

const CATEGORY_FILTERS = [
  "All",
  "Rings",
  "Necklaces",
  "Bracelets",
  "Earrings",
  "Pendants",
];

const PRICE_FILTERS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "Above ₹2,50,000",
];

/* ─────────────────────────────────────────────────────────────────────────────
   Shop / Catalog Page — Server Component
───────────────────────────────────────────────────────────────────────────── */

export default function ShopPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Editorial Banner ─────────────────────────────────────────────── */}
      <section
        aria-label="Shop collection banner"
        className="bg-champagne-bg py-16 px-8 border-b border-slate-border/40"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
          <span className="luxury-tracking text-brand-gold text-[10px]">
            Handcrafted in India · BIS Hallmarked · Ethically Sourced
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy"
            style={{ fontFamily: "var(--font-domine)" }}
          >
            The Complete Collection
          </h1>
          <p
            className="max-w-xl text-sm text-brand-navy/60 leading-relaxed mt-2"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Every piece in our catalogue is an original — born from centuries of
            Indian goldsmithing heritage and finished to world-class standards by
            our master kaarigars.
          </p>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 mt-2">
            <Link
              href="/"
              className="luxury-tracking text-[9px] text-brand-navy/40 hover:text-brand-gold transition-colors"
            >
              Home
            </Link>
            <span className="text-brand-navy/20 text-[9px]">/</span>
            <span className="luxury-tracking text-[9px] text-brand-gold">
              Shop
            </span>
          </nav>
        </div>
      </section>

      {/* ── Main Content — Sidebar + Grid ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-8 py-14 flex flex-col lg:flex-row gap-10 items-start">

        {/* Left Sidebar — Filters (25%) */}
        <aside
          aria-label="Filter sidebar"
          className="w-full lg:w-[22%] shrink-0 flex flex-col gap-8 sticky top-28"
        >
          {/* Result count */}
          <p
            className="text-xs text-slate-400"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            {MOCK_PRODUCTS.length} pieces
          </p>

          {/* Categories filter group */}
          <div className="flex flex-col gap-4">
            <h2 className="luxury-tracking text-brand-gold text-[10px]">
              Categories
            </h2>
            <div
              className="h-px bg-slate-border/50"
              role="separator"
              aria-hidden="true"
            />
            <ul className="flex flex-col gap-2" role="list">
              {CATEGORY_FILTERS.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    className={`text-sm text-left w-full py-1 transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:text-brand-gold ${
                      cat === "All"
                        ? "text-brand-navy font-semibold"
                        : "text-slate-500"
                    }`}
                    style={{ fontFamily: "var(--font-mulish)" }}
                    aria-current={cat === "All" ? "true" : undefined}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter group */}
          <div className="flex flex-col gap-4">
            <h2 className="luxury-tracking text-brand-gold text-[10px]">
              Price
            </h2>
            <div
              className="h-px bg-slate-border/50"
              role="separator"
              aria-hidden="true"
            />
            <ul className="flex flex-col gap-2" role="list">
              {PRICE_FILTERS.map((range) => (
                <li key={range}>
                  <button
                    type="button"
                    className="text-sm text-left w-full py-1 text-slate-500 transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:text-brand-gold"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {range}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Metal purity filter group */}
          <div className="flex flex-col gap-4">
            <h2 className="luxury-tracking text-brand-gold text-[10px]">
              Gold Purity
            </h2>
            <div
              className="h-px bg-slate-border/50"
              role="separator"
              aria-hidden="true"
            />
            <ul className="flex flex-col gap-2" role="list">
              {["22K Gold", "18K Gold"].map((purity) => (
                <li key={purity}>
                  <button
                    type="button"
                    className="text-sm text-left w-full py-1 text-slate-500 transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:text-brand-gold"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {purity}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Main Grid — Products (75%) */}
        <main
          aria-label="Product listing grid"
          className="flex-1 min-w-0"
        >
          {/* Sort row */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-border/40">
            <p
              className="text-xs text-slate-400"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Showing{" "}
              <span className="font-semibold text-brand-navy">
                {MOCK_PRODUCTS.length}
              </span>{" "}
              of {MOCK_PRODUCTS.length} pieces
            </p>
            <div className="flex items-center gap-2">
              <span
                className="luxury-tracking text-[9px] text-slate-400"
              >
                Sort by
              </span>
              <select
                className="text-xs text-brand-navy border border-slate-border/60 rounded-sm px-2 py-1 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                style={{ fontFamily: "var(--font-mulish)" }}
                defaultValue="featured"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
