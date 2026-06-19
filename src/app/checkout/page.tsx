"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck, Lock, Truck, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { CartItem } from "@/store/useCartStore";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

/** Razorpay window object type augmentation */
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
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

/* ─────────────────────────────────────────────────────────────────────────────
   Checkout Page — Client Component
───────────────────────────────────────────────────────────────────────────── */

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const getCartSummary = useCartStore((state) => state.getCartSummary);
  const clearCart = useCartStore((state) => state.clearCart);

  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  /* ── Form state ──────────────────────────────────────────────────────── */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const { subtotal, totalQuantity } = getCartSummary();

  /* ── Derived pricing ─────────────────────────────────────────────────── */
  const shippingCost = subtotal > 50000 ? 0 : 500;
  const grandTotal = subtotal + shippingCost;

  /* ── Form field updater ──────────────────────────────────────────────── */
  function updateField(field: keyof typeof formData, value: string): void {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  /* ── Razorpay payment handler ────────────────────────────────────────── */
  async function handlePayment(): Promise<void> {
    if (totalQuantity === 0) return;

    // Basic form validation
    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];

    const emptyFields = requiredFields.filter((f) => !formData[f].trim());
    if (emptyFields.length > 0) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    setIsProcessing(true);

    try {
      /* Step 1 — Create Razorpay order via our API route */
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order.");
      }

      const data = await response.json();

      /* Step 2 — Initialize Razorpay checkout overlay */
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: data.amount,
        currency: data.currency,
        name: "Alankar Luxury Jewellery",
        description: `${totalQuantity} piece${totalQuantity > 1 ? "s" : ""} — Heritage Collection`,
        order_id: data.order_id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#020b1e",
        },
        handler: (razorpayResponse: RazorpayResponse) => {
          console.log("[Alankar] Payment successful:", razorpayResponse);
          setPaymentSuccess(true);
          clearCart();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("[Alankar] Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  /* ── Success state ───────────────────────────────────────────────────── */
  if (paymentSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-8 py-20 bg-champagne-bg">
        <div className="bg-white border-[0.5px] border-gray-200/60 p-16 max-w-lg w-full text-center space-y-6 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.03)]">
          <div className="w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
          </div>
          <h1
            className="text-3xl text-brand-navy"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Payment Confirmed
          </h1>
          <p
            className="text-sm text-gray-500 leading-relaxed"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Your order has been secured. Our master artisans will begin
            crafting your bespoke pieces immediately. You will receive a
            confirmation email with tracking details shortly.
          </p>
          <Link
            href="/"
            className="inline-block border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-500 tracking-[0.15em] text-xs py-4 px-10 uppercase font-medium mt-4"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Return to Alankar
          </Link>
        </div>
      </div>
    );
  }

  /* ── Empty cart state ─────────────────────────────────────────────────── */
  if (totalQuantity === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-8 py-20 bg-champagne-bg">
        <div className="bg-white border-[0.5px] border-gray-200/60 p-16 max-w-lg w-full text-center space-y-6 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.03)]">
          <h1
            className="text-3xl text-brand-navy"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Vault is Empty
          </h1>
          <p
            className="text-sm text-gray-500 leading-relaxed"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Browse our heritage collection and add a masterpiece to your cart
            before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-500 tracking-[0.15em] text-xs py-4 px-10 uppercase font-medium mt-4"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form input field config ─────────────────────────────────────────── */
  const BILLING_FIELDS: {
    key: keyof typeof formData;
    label: string;
    placeholder: string;
    type?: string;
    colSpan?: string;
  }[] = [
    { key: "firstName", label: "First Name", placeholder: "Isabella" },
    { key: "lastName", label: "Last Name", placeholder: "Sterling" },
    { key: "email", label: "Email Address", placeholder: "isabella@example.com", type: "email", colSpan: "md:col-span-2" },
    { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel", colSpan: "md:col-span-2" },
  ];

  const SHIPPING_FIELDS: {
    key: keyof typeof formData;
    label: string;
    placeholder: string;
    colSpan?: string;
  }[] = [
    { key: "addressLine1", label: "Address Line 1", placeholder: "Building, street, or complex", colSpan: "md:col-span-2" },
    { key: "addressLine2", label: "Address Line 2", placeholder: "Landmark or additional detail (optional)", colSpan: "md:col-span-2" },
    { key: "city", label: "City", placeholder: "Mumbai" },
    { key: "state", label: "State", placeholder: "Maharashtra" },
    { key: "pincode", label: "Pincode", placeholder: "400026" },
  ];

  return (
    <>
      {/* Razorpay checkout script — loaded lazily to avoid blocking */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="flex flex-col w-full">

        {/* ── Checkout Header ──────────────────────────────────────────────── */}
        <div className="bg-white border-b border-[0.5px] border-gray-200/60 py-6 px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-gray-400 uppercase hover:text-brand-gold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              Continue Shopping
            </Link>
            <h1
              className="text-2xl text-brand-navy"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Secure Checkout
            </h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.15em] uppercase">
                256-bit Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* ── Split Layout: Form (60%) + Summary (40%) ─────────────────────── */}
        <div className="max-w-7xl mx-auto w-full px-8 py-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Billing & Shipping Form (3/5) ──────────────────────── */}
          <div className="lg:col-span-3 space-y-14">

            {/* Billing Details Section */}
            <section className="space-y-8">
              <div className="space-y-2">
                <h2
                  className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                >
                  Billing Details
                </h2>
                <div className="h-px bg-gray-200/60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {BILLING_FIELDS.map(({ key, label, placeholder, type, colSpan }) => (
                  <div
                    key={key}
                    className={`flex flex-col relative group ${colSpan ?? ""}`}
                  >
                    <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                      {label}
                    </label>
                    <input
                      type={type ?? "text"}
                      value={formData[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors font-medium"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address Section */}
            <section className="space-y-8">
              <div className="space-y-2">
                <h2
                  className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                >
                  Shipping Address
                </h2>
                <div className="h-px bg-gray-200/60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SHIPPING_FIELDS.map(({ key, label, placeholder, colSpan }) => (
                  <div
                    key={key}
                    className={`flex flex-col relative group ${colSpan ?? ""}`}
                  >
                    <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={formData[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors font-medium"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Secure Shipping Notice */}
            <div className="flex items-start gap-4 bg-champagne-bg border-[0.5px] border-gray-200/60 p-6">
              <Truck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="space-y-1">
                <p
                  className="text-xs font-semibold text-brand-navy"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Free Insured Shipping on orders above ₹2,000
                </p>
                <p
                  className="text-[11px] text-gray-500"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  All Alankar orders are dispatched via tamper-proof, GPS-tracked secure courier with full insurance coverage.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary Sidebar (2/5) ───────────────────────── */}
          <aside className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="bg-champagne-bg border-[0.5px] border-gray-200/60 overflow-hidden shadow-[0_4px_40px_-2px_rgba(0,0,0,0.03)]">

              {/* Summary header */}
              <div className="px-8 pt-8 pb-6 border-b border-gray-200/40">
                <h2 className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                  Order Summary
                </h2>
              </div>

              {/* Line items */}
              <div className="px-8 py-6 space-y-6 max-h-[360px] overflow-y-auto">
                {cart.map((item: CartItem) => (
                  <div
                    key={`${item.id}-${item.selectedPurity}`}
                    className="flex gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-20 shrink-0 bg-white border-[0.5px] border-gray-200/60">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3
                        className="text-sm text-brand-navy font-medium truncate"
                        style={{ fontFamily: "var(--font-domine)" }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-[10px] text-gray-400 tracking-wide"
                        style={{ fontFamily: "var(--font-mulish)" }}
                      >
                        {item.selectedPurity.toUpperCase()} Gold · Qty: {item.quantity}
                      </p>
                      <p
                        className="text-sm font-semibold text-brand-navy"
                        style={{ fontFamily: "var(--font-mulish)" }}
                      >
                        {formatINR(item.finalPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="px-8 py-6 border-t border-gray-200/40 space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    Subtotal ({totalQuantity} piece{totalQuantity > 1 ? "s" : ""})
                  </span>
                  <span
                    className="text-sm font-medium text-brand-navy"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {formatINR(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    Secure Shipping
                  </span>
                  <span
                    className="text-sm font-medium text-brand-navy"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {shippingCost === 0 ? (
                      <span className="text-brand-gold">Complimentary</span>
                    ) : (
                      formatINR(shippingCost)
                    )}
                  </span>
                </div>

                <div className="h-px bg-gray-200/40" />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
                    Grand Total
                  </span>
                  <span
                    className="text-xl font-bold text-brand-navy"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Payment CTA */}
              <div className="px-8 pb-8 pt-2">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-brand-navy text-brand-gold hover:bg-brand-navy/90 transition-all duration-500 tracking-[0.15em] text-xs uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  <Lock className="w-4 h-4" strokeWidth={1.5} />
                  {isProcessing ? "Processing..." : "Secure Checkout"}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  {["Razorpay Secured", "PCI DSS Compliant", "256-bit SSL"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="text-[9px] text-gray-400 tracking-wide"
                        style={{ fontFamily: "var(--font-mulish)" }}
                      >
                        {badge}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
