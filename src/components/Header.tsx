"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingBag, Menu, X } from "lucide-react";
import { useGoldRateStore } from "@/store/useGoldRateStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

/* ─────────────────────────────────────────────────────────────────────────────
   Category links shared between desktop nav & mobile menu
───────────────────────────────────────────────────────────────────────────── */

const NAV_CATEGORIES = [
  { label: "Rings",     href: "/category/rings"     },
  { label: "Necklaces", href: "/category/necklaces" },
  { label: "Bracelets", href: "/category/bracelets" },
  { label: "Earrings",  href: "/category/earrings"  },
  { label: "Pendants",  href: "/category/pendants"  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Header — Mobile-first with hamburger slide-out
───────────────────────────────────────────────────────────────────────────── */

export default function Header() {
  const { rates, fetchLiveRates, isLoading } = useGoldRateStore();
  const getCartSummary = useCartStore((state) => state.getCartSummary);
  const toggleCart    = useCartStore((state) => state.toggleCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [mounted, setMounted]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchLiveRates();
  }, [fetchLiveRates]);

  // Close mobile menu on route change (any click on a Link inside it)
  function closeMobile() { setMobileOpen(false); }

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const totalQuantity = mounted ? getCartSummary().totalQuantity : 0;

  return (
    <>
      <header className="w-full flex flex-col sticky top-0 z-50 bg-white shadow-card">

        {/* ── 1. Gold Ticker Banner ──────────────────────────────────────── */}
        <div className="bg-brand-navy text-champagne-accent py-2 overflow-hidden flex items-center justify-center px-4">
          {isLoading ? (
            <span className="luxury-tracking text-[10px] animate-pulse">
              Fetching Live Market Rates...
            </span>
          ) : (
            <div className="flex items-center gap-3 sm:gap-6">
              <span className="luxury-tracking text-[10px]">
                24K ₹{rates["24K"]}/g
              </span>
              <span className="text-brand-gold/50 text-[10px]">|</span>
              <span className="luxury-tracking text-[10px]">
                22K ₹{rates["22K"]}/g
              </span>
              <span className="text-brand-gold/50 text-[10px] hidden sm:inline">|</span>
              <span className="luxury-tracking text-[10px] hidden sm:inline">
                18K ₹{rates["18K"]}/g
              </span>
            </div>
          )}
        </div>

        {/* ── 2. Main Navigation Bar ────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-luxury">

          {/* Desktop nav — hidden below md */}
          <nav
            aria-label="Category navigation"
            className="hidden md:flex flex-1 items-center space-x-6 lg:space-x-8"
          >
            {NAV_CATEGORIES.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium hover:text-brand-gold transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger — visible below md, replaces desktop nav space */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-brand-navy hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm -ml-2"
          >
            {mobileOpen
              ? <X className="w-5 h-5" strokeWidth={1.5} />
              : <Menu className="w-5 h-5" strokeWidth={1.5} />
            }
          </button>

          {/* Logo — left-aligned on mobile, centered on desktop */}
          <div className="flex justify-start md:justify-center flex-1">
            <Link
              href="/"
              className="relative h-8 w-24 md:h-10 md:w-36 flex items-center justify-center rounded-md overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Alankar — Return to homepage"
            >
              <Image
                src="/Alankar-logo.jpg"
                alt="Alankar Luxury Commerce"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 96px, 144px"
                priority
              />
            </Link>
          </div>

          {/* Right utility icons */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-3">

            {/* SIGN UP — hidden on mobile to save space (accessible via hamburger) */}
            {mounted && !isAuthenticated && (
              <Link
                href="/login"
                className="luxury-tracking text-[10px] text-brand-navy hover:text-brand-gold uppercase transition-colors hidden sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-1"
                aria-label="Sign up for an Alankar account"
              >
                Sign Up
              </Link>
            )}

            {/* User icon */}
            <Link
              href={mounted && isAuthenticated ? "/dashboard" : "/login"}
              className="flex items-center justify-center w-11 h-11 text-brand-navy hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              aria-label={mounted && isAuthenticated ? "Go to Client Vault" : "Sign in to your account"}
            >
              <User className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            {/* Cart icon */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative flex items-center justify-center w-11 h-11 text-brand-navy hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              aria-label={`Shopping Cart — ${totalQuantity} item${totalQuantity !== 1 ? "s" : ""}`}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {mounted && totalQuantity > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-brand-gold text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm pointer-events-none">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── 3. Mobile Slide-down Nav Drawer ──────────────────────────────── */}
      {/*
        Rendered outside the sticky header so it doesn't push page content down.
        Uses fixed positioning to overlay the page without affecting layout.
        z-40 (below the header's z-50 so the header shadow sits on top).
      */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`
          fixed inset-0 top-[88px] z-40 bg-white flex flex-col
          transition-transform duration-300 ease-in-out
          md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Category links */}
        <nav className="flex flex-col divide-y divide-gray-100 px-6 pt-4">
          {NAV_CATEGORIES.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMobile}
              className="py-5 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth / account links */}
        <div className="mt-auto px-6 pb-10 pt-6 border-t border-gray-100 flex flex-col gap-4">
          {mounted && !isAuthenticated && (
            <Link
              href="/login"
              onClick={closeMobile}
              className="w-full py-4 text-center bg-brand-navy text-brand-gold tracking-[0.2em] text-[11px] uppercase font-semibold"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Sign In / Create Account
            </Link>
          )}
          {mounted && isAuthenticated && (
            <Link
              href="/dashboard"
              onClick={closeMobile}
              className="w-full py-4 text-center border border-brand-navy text-brand-navy tracking-[0.2em] text-[11px] uppercase font-semibold"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              My Vault
            </Link>
          )}
          <Link
            href="/shop"
            onClick={closeMobile}
            className="text-center luxury-tracking text-[10px] text-gray-400 hover:text-brand-gold transition-colors"
          >
            Browse Full Collection
          </Link>
        </div>

        {/* Backdrop behind the drawer (on the right of the 100% wide sheet) */}
        <div
          className="absolute inset-0 -z-10 bg-white"
          onClick={closeMobile}
          aria-hidden="true"
        />
      </div>

      {/* Full-screen scrim click-to-close on mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </>
  );
}
