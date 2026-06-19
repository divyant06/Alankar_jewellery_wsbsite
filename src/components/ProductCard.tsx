"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGoldRateStore } from "@/store/useGoldRateStore";
import type { MockProduct } from "@/lib/mockData";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface ProductCardProps {
  product: MockProduct;
}

/**
 * Formats a number as Indian Rupee currency (INR).
 * Uses the en-IN locale to produce "₹1,23,456" style grouping.
 */
function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function ProductCard({ product }: ProductCardProps) {
  const rates = useGoldRateStore((state) => state.rates);

  /**
   * Dynamic pricing engine per ALANKAR-PRD.md §2.A
   * Price = (goldWeight × 22K rate) + (goldWeight × makingCharge) + stoneCost
   * Final  = Price × 1.03  (3% GST applied at surface level)
   *
   * Note: baseMakingCharge is expressed as ₹ per gram, so it scales
   * with weight identically to the gold rate itself.
   */
  const rate22K = rates["22K"];
  const basePrice =
    product.baseWeight * rate22K +
    product.baseWeight * product.baseMakingCharge +
    product.stoneCost;
  const finalPrice = basePrice * 1.03;

  return (
    <ScrollReveal direction="up" delay={0.1}>
      <article className="group flex flex-col bg-white border-luxury overflow-hidden transition-shadow duration-300 hover:shadow-ambient">
      {/* Product image — strict 4:5 portrait ratio preserves jewelry proportions */}
      <div className="relative aspect-4/5 overflow-hidden bg-champagne-bg">
        <Image
          src={product.imageUrl}
          alt={`${product.name} — handcrafted luxury jewellery by Alankar`}
          fill
          quality={100}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Category badge — top-left luxury tracking label */}
        <div className="absolute top-3 left-3">
          <span className="luxury-tracking text-[9px] bg-white/90 backdrop-blur-sm text-brand-navy px-2 py-1 rounded-sm border border-slate-border/40 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product metadata */}
      <div className="flex flex-col gap-3 p-5 border-t border-slate-border/40">
        {/* Product name — Domine serif for editorial product identity */}
        <h3
          className="text-[15px] leading-snug text-brand-navy"
          style={{ fontFamily: "var(--font-domine)" }}
        >
          {product.name}
        </h3>

        {/* Weight spec — Mulish technical copy */}
        <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-mulish)" }}>
          {product.baseWeight}g · 22K Gold
          {product.stoneCost > 0 ? " · Diamond Set" : ""}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span
              suppressHydrationWarning
              className="text-base font-semibold text-brand-navy leading-tight"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {formatINR(finalPrice)}
            </span>
            <span
              suppressHydrationWarning
              className="text-[10px] text-slate-400 mt-0.5"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              incl. 3% GST
            </span>
          </div>

          {/* CTA — luxury-tracking uppercase link */}
          <Link
            href={`/product/${product.id}`}
            className="luxury-tracking text-[9px] text-brand-gold border border-brand-gold px-3 py-2 rounded-sm hover:bg-brand-gold hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1"
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
    </ScrollReveal>
  );
}