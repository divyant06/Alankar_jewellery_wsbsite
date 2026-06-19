"use client";

import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useGoldRateStore } from "@/store/useGoldRateStore";
import { useCartStore } from "@/store/useCartStore";
import type { MockProduct } from "@/lib/mockData";
import type { SelectedPurity } from "@/store/useCartStore";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

interface ProductDetailsProps {
  product: MockProduct;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Purity label used in the GoldRateStore is uppercase ("22K", "18K").
 * The CartStore SelectedPurity is lowercase ("22k", "18k").
 * This maps between the two systems cleanly.
 */
const PURITY_RATE_KEY: Record<SelectedPurity, "22K" | "18K"> = {
  "22k": "22K",
  "18k": "18K",
};

/* ─────────────────────────────────────────────────────────────────────────────
   ProductDetails — Client Component
   All Zustand state, purity toggle, and cart logic lives here.
───────────────────────────────────────────────────────────────────────────── */

export default function ProductDetails({ product }: ProductDetailsProps) {
  const rates = useGoldRateStore((state) => state.rates);
  const isLoadingRates = useGoldRateStore((state) => state.isLoading);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [selectedPurity, setSelectedPurity] = useState<SelectedPurity>("22k");
  const [addedToCart, setAddedToCart] = useState(false);

  /* ── Live dynamic pricing engine ─────────────────────────────────────── */
  const rateKey = PURITY_RATE_KEY[selectedPurity];
  const currentGoldRate = rates[rateKey];

  const goldCost = product.baseWeight * currentGoldRate;
  const makingCost = product.baseWeight * product.baseMakingCharge;
  const priceBeforeGST = goldCost + makingCost + product.stoneCost;
  const gstAmount = priceBeforeGST * 0.03;
  const finalPrice = priceBeforeGST + gstAmount;

  /* ── Add to cart handler ──────────────────────────────────────────────── */
  function handleAddToCart(): void {
    addItem({
      id: product.id,
      name: product.name,
      sku: `${product.id.toUpperCase()}-${selectedPurity.toUpperCase()}-${product.baseWeight}G`,
      category: product.category,
      selectedPurity,
      finalPrice,
      quantity: 1,
      imageUrl: product.imageUrl,
    });

    setAddedToCart(true);
    openCart();

    // Reset the confirmation state after 2.5s
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  }

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* ── Category label ──────────────────────────────────────────────── */}
      <span className="luxury-tracking text-brand-gold text-[10px]">
        {product.category}
      </span>

      {/* ── Product title — Playfair Display ────────────────────────────── */}
      <h1
        className="text-4xl xl:text-5xl font-semibold text-brand-navy leading-tight"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {product.name}
      </h1>

      {/* ── Weight & specification strip ────────────────────────────────── */}
      <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-border/40">
        <span style={{ fontFamily: "var(--font-mulish)" }}>
          {product.baseWeight}g net gold weight
        </span>
        <span className="text-slate-300">·</span>
        <span style={{ fontFamily: "var(--font-mulish)" }}>
          {selectedPurity.toUpperCase()} Hallmarked Gold
        </span>
        {product.stoneCost > 0 && (
          <>
            <span className="text-slate-300">·</span>
            <span style={{ fontFamily: "var(--font-mulish)" }}>
              Diamond Set
            </span>
          </>
        )}
      </div>

      {/* ── Purity Toggle (18K / 22K) ───────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <span className="luxury-tracking text-[9px] text-slate-400">
          Select Purity
        </span>
        <div className="flex gap-3" role="radiogroup" aria-label="Gold purity selection">
          {(["22k", "18k"] as SelectedPurity[]).map((purity) => (
            <button
              key={purity}
              type="button"
              role="radio"
              aria-checked={selectedPurity === purity}
              onClick={() => setSelectedPurity(purity)}
              className={`px-5 py-2.5 text-sm font-medium rounded-sm border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1 ${
                selectedPurity === purity
                  ? "border-brand-gold bg-brand-gold text-white shadow-sm"
                  : "border-slate-border/60 text-slate-500 hover:border-brand-gold/50 hover:text-brand-navy bg-white"
              }`}
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {purity.toUpperCase()} Gold
            </button>
          ))}
        </div>
      </div>

      {/* ── Live Pricing Breakdown ──────────────────────────────────────── */}
      <div className="flex flex-col gap-0 border border-slate-border/50 rounded-sm overflow-hidden">

        {/* Header row */}
        <div className="bg-champagne-bg px-5 py-3 border-b border-slate-border/40">
          <div className="flex items-center justify-between">
            <span className="luxury-tracking text-[9px] text-brand-navy/60">
              Live Price Breakdown
            </span>
            {isLoadingRates ? (
              <span className="luxury-tracking text-[8px] text-slate-400 animate-pulse">
                Updating rates...
              </span>
            ) : (
              <span className="luxury-tracking text-[8px] text-brand-gold">
                Live · {rateKey} Rate
              </span>
            )}
          </div>
        </div>

        {/* Line items */}
        {[
          {
            label: `Live ${rateKey} Gold Rate`,
            sublabel: `${product.baseWeight}g × ${formatINR(currentGoldRate)}/g`,
            value: goldCost,
          },
          {
            label: "Making Charges",
            sublabel: `${product.baseWeight}g × ${formatINR(product.baseMakingCharge)}/g`,
            value: makingCost,
          },
          ...(product.stoneCost > 0
            ? [
                {
                  label: "Stone & Diamond Cost",
                  sublabel: "Conflict-free, GIA certified",
                  value: product.stoneCost,
                },
              ]
            : []),
          {
            label: "GST (3%)",
            sublabel: "As per Indian jewellery regulations",
            value: gstAmount,
          },
        ].map(({ label, sublabel, value }) => (
          <div
            key={label}
            className="flex items-center justify-between px-5 py-3.5 border-b border-slate-border/30 last:border-none"
          >
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs font-medium text-brand-navy"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                {label}
              </span>
              <span
                className="text-[10px] text-slate-400"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                {sublabel}
              </span>
            </div>
            <span
              className="text-sm font-semibold text-brand-navy"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {formatINR(value)}
            </span>
          </div>
        ))}

        {/* Final price row */}
        <div className="flex items-center justify-between px-5 py-4 bg-brand-navy">
          <div className="flex flex-col gap-0.5">
            <span className="luxury-tracking text-[9px] text-champagne-accent/60">
              Final Price
            </span>
            <span
              className="text-xs text-champagne-accent/80"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              incl. 3% GST · {selectedPurity.toUpperCase()} Gold
            </span>
          </div>
          <span
            className="text-2xl font-bold text-brand-gold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {formatINR(finalPrice)}
          </span>
        </div>
      </div>

      {/* ── Product description ─────────────────────────────────────────── */}
      <p
        className="text-sm text-slate-500 leading-relaxed"
        style={{ fontFamily: "var(--font-mulish)" }}
      >
        A masterwork of heritage craftsmanship, the {product.name} is
        individually hand-finished by our master kaarigars in{" "}
        {product.baseWeight}g of BIS-hallmarked {selectedPurity.toUpperCase()}{" "}
        gold. Every piece is ethically sourced, certified, and accompanied by
        Alankar's lifetime buyback guarantee.
      </p>

      {/* ── Add to Cart CTA ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={addedToCart}
        className={`w-full flex items-center justify-center gap-3 py-5 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${
          addedToCart
            ? "bg-green-700 text-white cursor-default"
            : "bg-brand-gold hover:bg-burnished-gold text-brand-navy"
        }`}
        style={{ fontFamily: "var(--font-mulish)" }}
        aria-label={
          addedToCart
            ? `${product.name} added to cart`
            : `Add ${product.name} in ${selectedPurity.toUpperCase()} to cart`
        }
      >
        {addedToCart ? (
          <>
            <Check className="h-5 w-5" strokeWidth={2.5} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            Add to Cart
          </>
        )}
      </button>

      {/* ── Quality assurance strip ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          "BIS Hallmark Certified",
          "Lifetime Buyback",
          "Free Insured Shipping",
          "30-Day Returns",
        ].map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-2 text-[10px] text-slate-500"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
