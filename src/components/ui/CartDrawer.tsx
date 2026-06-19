"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { CartItem } from "@/store/useCartStore";

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

/* ─────────────────────────────────────────────────────────────────────────────
   CartDrawer — Ultra-premium slide-out shopping bag panel
───────────────────────────────────────────────────────────────────────────── */

export default function CartDrawer() {
  const cart = useCartStore((state) => state.cart);
  const isOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const getCartSummary = useCartStore((state) => state.getCartSummary);

  const { subtotal, totalQuantity } = getCartSummary();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop scrim ──────────────────────────────────────────── */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-brand-navy/30 backdrop-blur-[2px] z-40"
            onClick={toggleCart}
            aria-hidden="true"
          />

          {/* ── Drawer Panel ────────────────────────────────────────────── */}
          <motion.div
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col border-l border-[0.5px] border-gray-200/60"
          >
            {/* ── Drawer Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-[0.5px] border-gray-100">
              <div className="flex flex-col gap-1">
                <h2
                  className="text-xl text-brand-navy tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Your Shopping Bag
                </h2>
                {totalQuantity > 0 && (
                  <span
                    className="text-[10px] tracking-[0.15em] text-gray-400 uppercase"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {totalQuantity} piece{totalQuantity > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <button
                onClick={toggleCart}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-navy hover:bg-gray-50 rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1"
                aria-label="Close shopping bag"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Cart Body ─────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">

              {/* Empty state */}
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full px-8 gap-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-champagne-bg flex items-center justify-center">
                    <ShoppingBag
                      className="w-7 h-7 text-brand-gold"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="space-y-3">
                    <p
                      className="text-[10px] tracking-[0.25em] text-gray-400 uppercase"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      Your Bag is Currently Empty
                    </p>
                    <p
                      className="text-sm text-gray-400 leading-relaxed max-w-xs"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      Discover our heritage collection of handcrafted luxury
                      jewellery below.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={toggleCart}
                    className="flex items-center gap-2 border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-500 tracking-[0.15em] text-[10px] py-3.5 px-8 uppercase font-medium"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    Browse Collection
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Link>
                </div>
              )}

              {/* Cart line items stream */}
              {cart.length > 0 && (
                <ul className="divide-y divide-gray-100">
                  {cart.map((item: CartItem) => (
                    <li
                      key={`${item.id}-${item.selectedPurity}`}
                      className="flex gap-5 px-8 py-6"
                    >
                      {/* Product thumbnail */}
                      <div className="relative w-[72px] h-[90px] shrink-0 bg-champagne-bg border-[0.5px] border-gray-200/60 overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Item metadata */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div className="space-y-1.5">
                          {/* Category label */}
                          <span
                            className="block text-[9px] tracking-[0.2em] text-brand-gold uppercase"
                            style={{ fontFamily: "var(--font-mulish)" }}
                          >
                            {item.category}
                          </span>

                          {/* Product name */}
                          <h3
                            className="text-sm text-brand-navy leading-snug"
                            style={{ fontFamily: "var(--font-domine)" }}
                          >
                            {item.name}
                          </h3>

                          {/* Specs row */}
                          <p
                            className="text-[10px] text-gray-400 tracking-wide"
                            style={{ fontFamily: "var(--font-mulish)" }}
                          >
                            {item.selectedPurity.toUpperCase()} Gold
                            {" · "}
                            Qty: {item.quantity}
                          </p>
                        </div>

                        {/* Price + remove row */}
                        <div className="flex items-center justify-between mt-3">
                          <span
                            className="text-sm font-semibold text-brand-navy"
                            style={{ fontFamily: "var(--font-mulish)" }}
                          >
                            {formatINR(item.finalPrice * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id, item.selectedPurity)
                            }
                            className="text-[9px] tracking-[0.12em] uppercase text-gray-400 hover:text-red-500 transition-colors duration-200 focus-visible:outline-none"
                            style={{ fontFamily: "var(--font-mulish)" }}
                            aria-label={`Remove ${item.name} from bag`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Drawer Footer — Subtotal + Checkout CTA ─────────────── */}
            {cart.length > 0 && (
              <div className="border-t border-[0.5px] border-gray-100 px-8 pt-6 pb-8 space-y-6 bg-white">

                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-gray-400"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="text-[10px] text-gray-400"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      Shipping & taxes calculated at checkout
                    </span>
                  </div>
                  <span
                    className="text-xl font-bold text-brand-navy"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {formatINR(subtotal)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-brand-navy text-brand-gold hover:bg-brand-navy/90 transition-all duration-500 tracking-[0.2em] text-[10px] uppercase font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  style={{ fontFamily: "var(--font-mulish)" }}
                  aria-label="Proceed to secure checkout"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>

                {/* Continue shopping */}
                <button
                  type="button"
                  onClick={toggleCart}
                  className="w-full text-center text-[9px] tracking-[0.15em] uppercase text-gray-400 hover:text-brand-gold transition-colors duration-200 focus-visible:outline-none"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
