import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import ProductDetails from "@/components/ProductDetails";

/* ─────────────────────────────────────────────────────────────────────────────
   Params Type
───────────────────────────────────────────────────────────────────────────── */

interface PageProps {
  params: Promise<{ id: string }>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Dynamic Metadata — Generated per product for optimal SEO indexing
───────────────────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Alankar",
      description: "The jewellery piece you are looking for could not be found.",
    };
  }

  return {
    title: `${product.name} | ${product.category} | Alankar Fine Jewellery`,
    description: `Shop the ${product.name} — a masterwork of heritage craftsmanship in ${product.baseWeight}g of hallmarked gold. Explore Alankar's ${product.category.toLowerCase()} collection featuring ethically sourced, bespoke luxury jewellery.`,
    keywords: [
      product.name,
      product.category.toLowerCase(),
      "luxury jewellery India",
      "handcrafted gold jewellery",
      "bespoke diamond jewellery",
      "heritage craftsmanship",
      "Alankar jewellery",
    ],
    openGraph: {
      title: `${product.name} | Alankar Fine Jewellery`,
      description: `Discover the ${product.name} — handcrafted in ${product.baseWeight}g of ethically sourced gold by Alankar's master artisans.`,
      images: [
        {
          url: product.imageUrl,
          alt: `${product.name} — Alankar ${product.category}`,
        },
      ],
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Static Params — Pre-renders all known product routes at build time
───────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams(): Array<{ id: string }> {
  return MOCK_PRODUCTS.map((product) => ({ id: product.id }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   Product Detail Page — Server Component Shell
   Handles routing, notFound(), and the static image/layout frame.
   All interactive client logic is delegated to <ProductDetails />.
───────────────────────────────────────────────────────────────────────────── */

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  // If no matching product is found in the catalogue, return a 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">

      {/* Breadcrumb navigation */}
      <nav
        aria-label="breadcrumb"
        className="max-w-7xl mx-auto w-full px-8 py-4 flex items-center gap-2"
      >
        <Link
          href="/"
          className="luxury-tracking text-[9px] text-slate-400 hover:text-brand-gold transition-colors"
        >
          Home
        </Link>
        <span className="text-slate-300 text-[9px]">/</span>
        <Link
          href="/shop"
          className="luxury-tracking text-[9px] text-slate-400 hover:text-brand-gold transition-colors"
        >
          Shop
        </Link>
        <span className="text-slate-300 text-[9px]">/</span>
        <span className="luxury-tracking text-[9px] text-brand-gold">
          {product.name}
        </span>
      </nav>

      {/* ── Split-screen PDP layout ──────────────────────────────────────── */}
      <section
        aria-label={`${product.name} product detail`}
        className="max-w-7xl mx-auto w-full px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
      >

        {/* ── Left — High-fidelity product photography ─────────────────── */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-28">
          {/* Primary image — massive, razor-sharp, portrait ratio */}
          <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-champagne-bg border-luxury">
            <Image
              src={product.imageUrl}
              alt={`${product.name} — handcrafted luxury ${product.category.toLowerCase()} by Alankar`}
              fill
              quality={100}
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Category badge overlay */}
            <div className="absolute top-4 left-4">
              <span className="luxury-tracking text-[8px] bg-white/90 backdrop-blur-sm text-brand-navy px-2.5 py-1.5 rounded-sm border border-slate-border/30 shadow-sm">
                {product.category}
              </span>
            </div>
          </div>

          {/* Image meta strip */}
          <div className="flex items-center justify-between px-1">
            <span
              className="text-[10px] text-slate-400"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Photography may vary slightly from the finished piece.
            </span>
            <span className="luxury-tracking text-[9px] text-brand-gold">
              BIS Hallmarked
            </span>
          </div>
        </div>

        {/* ── Right — Interactive Conversion Panel (Client Component) ─────── */}
        <div className="flex flex-col pt-2 lg:pt-0">
          {/*
            ProductDetails is a "use client" component.
            It receives the static product data as a prop and manages
            all Zustand state internally (gold rates, cart, purity toggle).
          */}
          <ProductDetails product={product} />
        </div>
      </section>
    </div>
  );
}
