"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingBag } from "lucide-react";
import { useGoldRateStore } from "@/store/useGoldRateStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const { rates, fetchLiveRates, isLoading } = useGoldRateStore();
  const getCartSummary = useCartStore((state) => state.getCartSummary);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Prevent hydration mismatch for the cart counter by tracking mounted state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Automatically invoke fetchLiveRates on initial layout render per PRD
    fetchLiveRates();
  }, [fetchLiveRates]);

  const totalQuantity = mounted ? getCartSummary().totalQuantity : 0;

  const NAV_CATEGORIES = [
    "Rings",
    "Necklaces",
    "Bracelets",
    "Earrings",
    "Pendants",
  ];

  return (
    <header className="w-full flex flex-col sticky top-0 z-50 bg-white shadow-card">
      {/* 1. Top Luxury Ticker Banner */}
      <div className="bg-brand-navy text-champagne-accent py-2 overflow-hidden flex items-center justify-center">
        <div className="w-full flex justify-center space-x-8">
          {isLoading ? (
            <span className="luxury-tracking text-[10px] animate-pulse">
              Fetching Live Market Rates...
            </span>
          ) : (
            <div className="flex space-x-6 items-center">
              <span className="luxury-tracking text-[10px]">
                24K GOLD: ₹{rates["24K"]}/g
              </span>
              <span className="text-brand-gold opacity-50 text-[10px]">|</span>
              <span className="luxury-tracking text-[10px]">
                22K GOLD: ₹{rates["22K"]}/g
              </span>
              <span className="text-brand-gold opacity-50 text-[10px]">|</span>
              <span className="luxury-tracking text-[10px]">
                18K GOLD: ₹{rates["18K"]}/g
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Brand Navigation Bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-luxury">
        {/* Left-aligned clean menu link categories */}
        <nav className="flex-1 flex items-center space-x-8">
          {NAV_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* Centered placement of the logo image */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="relative h-10 w-40 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm">
            <Image
              src="/Alankar-logo.jpg"
              alt="Alankar Luxury Commerce"
              fill
              className="object-contain"
              sizes="160px"
              priority
            />
          </Link>
        </div>

        {/* Right-aligned utility triggers */}
        <div className="flex-1 flex items-center justify-end space-x-5">

          {/* SIGN UP — visible only when not authenticated */}
          {mounted && !isAuthenticated && (
            <Link
              href="/login"
              className="luxury-tracking text-[10px] text-brand-navy hover:text-brand-gold uppercase transition-colors hidden sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
              aria-label="Sign up for an Alankar account"
            >
              Sign Up
            </Link>
          )}

          {/* User icon — routes to /login when guest, /dashboard when authenticated */}
          <Link
            href={mounted && isAuthenticated ? "/dashboard" : "/login"}
            className="text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm p-1"
            aria-label={mounted && isAuthenticated ? "Go to Client Vault" : "Sign in to your account"}
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          <button
            onClick={toggleCart}
            className="text-brand-navy hover:text-brand-gold transition-colors relative flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm p-1"
            aria-label={`Shopping Cart with ${totalQuantity} items`}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {mounted && totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
