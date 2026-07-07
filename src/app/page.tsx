import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import ScrollReveal from "@/components/animations/ScrollReveal";

/* ─────────────────────────────────────────────────────────────────────────────
   Page-level SEO Metadata
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Alankar — Handcrafted Luxury Jewellery & Bespoke Diamond Collections",
  description:
    "Discover Alankar's heritage collection of handcrafted luxury jewellery. Shop bespoke diamond rings, 22K gold necklaces, and heirloom bracelets crafted by master artisans using ethically sourced gemstones.",
  keywords: [
    "handcrafted luxury jewellery",
    "bespoke diamond jewellery",
    "heritage craftsmanship",
    "22K gold jewellery India",
    "diamond necklace",
    "luxury gold rings",
    "fine jewellery",
    "Alankar jewellery",
  ],
  openGraph: {
    title: "Alankar — Handcrafted Luxury Jewellery",
    description:
      "Bespoke diamond jewellery and heritage gold collections crafted to perfection by Alankar's master artisans.",
    images: [{ url: "/assets/necklace-1.jpeg", width: 1200, height: 630, alt: "Alankar Heritage Collection" }],
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Category Collection Data
───────────────────────────────────────────────────────────────────────────── */

interface CategoryBlock {
  label: string;
  href: string;
  image: string;
  alt: string;
}

const CATEGORY_BLOCKS: CategoryBlock[] = [
  {
    label: "Rings",
    href: "/category/rings",
    image: "/assets/pendant-2.jpeg",
    alt: "Handcrafted luxury gold and diamond rings by Alankar",
  },
  {
    label: "Necklaces",
    href: "/category/necklaces",
    image: "/assets/necklace-1.jpeg",
    alt: "Heritage 22K gold necklaces crafted by master artisans",
  },
  {
    label: "Bracelets",
    href: "/category/bracelets",
    image: "/assets/bracelet-1.jpeg",
    alt: "Bespoke gold bracelets from the Alankar collection",
  },
  {
    label: "Pendants",
    href: "/category/pendants",
    image: "/assets/pendant-1.jpeg",
    alt: "Diamond solitaire pendants and artisan gold pendants by Alankar",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Home Page — Alankar Luxury Storefront
───────────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">

      {/* ───────────────────────────────────────────────────────────────────────
          Section 1 — Editorial Hero Showcase
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Alankar Heritage Collection Hero"
        className="relative w-full min-h-svh lg:min-h-[92vh] grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left — Dramatic Editorial Typography */}
        <ScrollReveal direction="left" className="flex flex-col justify-center px-6 py-16 md:py-20 lg:px-16 xl:px-24 bg-champagne-bg order-2 lg:order-1">

          {/* Eyebrow label */}
          <span
            className="luxury-tracking text-brand-gold mb-8 block"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Est. Heritage Collection 1953
          </span>

          {/* Hero headline — Playfair Display for dramatic editorial impact */}
          <h1
            className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.05] tracking-tight text-brand-navy mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Alankar
            <br />
            <em className="not-italic text-brand-gold">Heritage</em>
            <br />
            Collection.
          </h1>

          {/* SEO-rich subtext — Domine editorial weight */}
          <div className="max-w-md space-y-4 mb-10">
            <p
              className="text-base md:text-lg text-brand-navy/80 leading-relaxed"
              style={{ fontFamily: "var(--font-domine)" }}
            >
              Each Alankar piece is an enduring testament to heritage
              craftsmanship — forged in ethically sourced 22K gold and set with
              conflict-free diamonds selected for extraordinary brilliance.
            </p>
            <p
              className="text-sm md:text-base text-brand-navy/60 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              From hand-engraved solitaire pendants to generational heirloom
              necklaces, every creation leaves our atelier as a timeless
              masterpiece designed to be passed down through decades.
            </p>
          </div>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/collections" className="btn-gold w-fit">
              Explore Collections
            </Link>
            <Link href="/services/bespoke" className="btn-gold-outline w-fit">
              Bespoke Design
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-slate-border/40">
            {[
              { stat: "22K+", label: "Gold Purity Certified" },
              { stat: "500+", label: "Unique Designs" },
              { stat: "15yr", label: "Heritage Craftsmanship" },
            ].map(({ stat, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-2xl font-bold text-brand-gold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat}
                </span>
                <span
                  className="luxury-tracking text-[9px] text-brand-navy/60 leading-tight"
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right — Hero Photography */}
        <ScrollReveal direction="right" delay={0.2} className="relative w-full min-h-[55vw] lg:min-h-full order-1 lg:order-2">
          <Image
            src="/assets/necklace-1.jpeg"
            alt="Royal Heritage Necklace — handcrafted 22K gold and diamond jewellery by Alankar"
            fill
            quality={100}
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle left-edge gradient to blend into the copy panel */}
          <div className="absolute inset-0 bg-linear-to-r from-champagne-bg/30 via-transparent to-transparent lg:block hidden" />
        </ScrollReveal>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────
          Section 2 — Brand Authenticity Story Banner
      ─────────────────────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up">
        <section
          aria-label="Alankar Brand Story"
          className="bg-brand-navy py-16 md:py-24 px-4 md:px-8"
        >
          <div className="max-w-5xl mx-auto">
            {/* Section label */}
            <span className="luxury-tracking text-brand-gold text-[10px] block mb-10">
              Our Philosophy
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Paragraph 1 — Ethical Sourcing */}
              <div className="flex flex-col gap-4">
                <h2
                  className="text-xl md:text-2xl text-brand-gold leading-snug"
                  style={{ fontFamily: "var(--font-domine)" }}
                >
                  Ethical Origins, Uncompromised Beauty
                </h2>
                <p
                  className="text-sm text-champagne-accent/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Every gram of gold and every carat of diamond that enters our
                  atelier is traced back to its source. Alankar partners exclusively
                  with Responsible Jewellery Council-certified mines and Kimberley
                  Process-compliant diamond suppliers, ensuring that the beauty
                  adorning you carries no shadow of harm. Ethical luxury is not a
                  compromise — it is the very foundation of our craft.
                </p>
              </div>

              {/* Paragraph 2 — Master Artisans */}
              <div className="flex flex-col gap-4">
                <h2
                  className="text-xl md:text-2xl text-brand-gold leading-snug"
                  style={{ fontFamily: "var(--font-domine)" }}
                >
                  Sixty Hands, One Masterpiece
                </h2>
                <p
                  className="text-sm text-champagne-accent/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  From the first wax-carved prototype to the final high-polish
                  finish, each Alankar creation passes through the hands of no
                  fewer than sixty master artisans — kaarigars who have inherited
                  their trade across multiple generations. Their techniques honour
                  centuries-old Jaipur and Kolkata goldsmithing traditions, while
                  our precision tooling ensures every prong, every pavé setting, and
                  every filigree strand meets the exacting tolerances of a world-class
                  fine jewellery house.
                </p>
              </div>

              {/* Paragraph 3 — Generational Wealth */}
              <div className="flex flex-col gap-4">
                <h2
                  className="text-xl md:text-2xl text-brand-gold leading-snug"
                  style={{ fontFamily: "var(--font-domine)" }}
                >
                  Jewellery as Generational Legacy
                </h2>
                <p
                  className="text-sm text-champagne-accent/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Gold is the world's oldest store of value. An Alankar piece is not
                  merely an adornment — it is a wealth asset crafted to appreciate
                  across generations. Our hallmarked 22K and 18K gold collections
                  retain intrinsic value beyond fashion cycles, and our lifetime
                  buyback and re-crafting programme ensures that your heirloom
                  remains as relevant and valuable decades from now as the day it
                  was first clasped. Invest in legacy. Invest in Alankar.
                </p>
              </div>
            </div>

            {/* Divider ornament */}
            <div className="divider-gold mt-16 opacity-30" />
          </div>
        </section>
      </ScrollReveal>

      {/* ───────────────────────────────────────────────────────────────────────
          Section 3 — Curated Collections Grid
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Curated Jewellery Collections"
        className="py-16 md:py-24 px-4 md:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <span className="luxury-tracking text-brand-gold text-[10px] block mb-4">
              Shop by Category
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl text-brand-navy"
              style={{ fontFamily: "var(--font-domine)" }}
            >
              The Curated Collections
            </h2>
          </div>

          {/* 4-block category grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_BLOCKS.map(({ label, href, image, alt }, index) => (
              <ScrollReveal key={label} direction="up" delay={index * 0.1}>
                <Link
                  href={href}
                  className="group relative overflow-hidden rounded-sm aspect-3/4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  aria-label={`Shop ${label} — Alankar Luxury Collection`}
                >
                  {/* Background photography */}
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    quality={100}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient dark overlay for text legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-navy/80 via-brand-navy/25 to-transparent transition-opacity duration-300 group-hover:from-brand-navy/90" />

                  {/* Category label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
                    <span className="luxury-tracking text-white text-sm tracking-[0.2em] mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                      {label}
                    </span>
                    <div className="divider-gold w-12 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────
          Section 4 — Trending Creations (Dynamic Product Grid)
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Trending Jewellery Creations"
        className="py-16 md:py-24 px-4 md:px-8 bg-champagne-bg"
      >
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6">
            <div>
              <span className="luxury-tracking text-brand-gold text-[10px] block mb-4">
                Featured This Season
              </span>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl text-brand-navy"
                style={{ fontFamily: "var(--font-domine)" }}
              >
                Trending Creations
              </h2>
            </div>
            <Link
              href="/collections"
              className="btn-gold-outline text-[10px] shrink-0"
            >
              View All Pieces
            </Link>
          </div>

          {/* Product grid — 4-column responsive with ProductCard components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────────
          Section 5 — Hallmark Trust Strip
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Alankar Quality Guarantees"
        className="py-12 md:py-14 px-4 md:px-8 bg-white border-t border-b border-slate-border/40"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "BIS Hallmarked", body: "All gold jewellery certified under Bureau of Indian Standards hallmarking regulations." },
            { title: "Conflict-Free Diamonds", body: "Every diamond sourced in compliance with the Kimberley Process Certification Scheme." },
            { title: "Lifetime Buyback", body: "Alankar guarantees a lifetime buyback at prevailing gold market rates on all creations." },
            { title: "Free Insured Shipping", body: "Every order dispatched with full insurance coverage and tamper-proof packaging." },
          ].map(({ title, body }) => (
            <div key={title} className="flex flex-col items-center gap-3 px-2">
              <div className="divider-gold w-8 mb-1" />
              <h3
                className="text-sm font-semibold text-brand-navy"
                style={{ fontFamily: "var(--font-domine)" }}
              >
                {title}
              </h3>
              <p
                className="text-xs text-slate-500 leading-relaxed"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
