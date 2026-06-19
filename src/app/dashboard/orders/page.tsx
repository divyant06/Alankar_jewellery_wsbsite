import React from "react";
import Image from "next/image";
import Link from "next/link";

const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Payment Secured",
    description: "Funds verified and allocated to vault.",
    status: "completed",
    date: "Oct 12, 2026",
  },
  {
    id: 2,
    title: "Master Artisans Crafting",
    description: "Jaipur atelier currently shaping the 22K gold base.",
    status: "active",
    date: "In Progress",
  },
  {
    id: 3,
    title: "Quality & Hallmark Certification",
    description: "Pending BIS stamping and GIA diamond verification.",
    status: "pending",
    date: "Pending",
  },
  {
    id: 4,
    title: "Dispatched via Secure Courier",
    description: "Insured transit with GPS tracking enabled.",
    status: "pending",
    date: "Pending",
  },
];

export default function OrderConciergePage() {
  return (
    <div className="p-12 space-y-12 max-w-5xl">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <header className="space-y-3 pb-8 border-b border-gray-200/60">
        <h1 
          className="text-4xl text-brand-navy tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Active Commissions
        </h1>
        <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
          Track the artisan journey of your bespoke jewellery pieces.
        </p>
      </header>

      {/* ── Active Order Card ─────────────────────────────────────────────── */}
      <div className="bg-white border-[0.5px] border-gray-200/60 p-12 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
        
        {/* Order Meta Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <div className="flex gap-8">
            <div className="relative w-32 h-40 bg-champagne-bg border-[0.5px] border-gray-200/60">
              <Image
                src="/assets/necklace-1.jpeg"
                alt="Royal Heritage Necklace"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="space-y-4 pt-2">
              <span className="block text-[10px] tracking-[0.2em] text-brand-gold uppercase font-semibold">
                Order #ALN-8492
              </span>
              <h2 className="text-2xl text-brand-navy" style={{ fontFamily: "var(--font-domine)" }}>
                Royal Heritage Necklace
              </h2>
              <div className="space-y-1">
                <span className="block text-xs tracking-wide text-gray-500" style={{ fontFamily: "var(--font-mulish)" }}>
                  22K Hallmarked Gold · 32.0g
                </span>
                <span className="block text-xs tracking-wide text-gray-500" style={{ fontFamily: "var(--font-mulish)" }}>
                  GIA Certified Diamonds
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right pt-2 space-y-2">
            <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              Commission Value
            </span>
            <span className="block text-xl text-brand-navy font-medium" style={{ fontFamily: "var(--font-mulish)" }}>
              ₹2,84,500
            </span>
          </div>
        </div>

        {/* ── Concierge Timeline (Vertical Stepper) ────────────────────────── */}
        <div className="relative pl-4 max-w-2xl">
          {TIMELINE_STEPS.map((step, index) => {
            const isLast = index === TIMELINE_STEPS.length - 1;
            
            return (
              <div key={step.id} className="relative flex gap-10 pb-12 last:pb-0">
                
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute top-8 left-[9px] w-px h-full bg-gray-200" />
                )}

                {/* Node Status Indicator */}
                <div className="relative z-10 flex shrink-0 items-start pt-1">
                  {step.status === "completed" && (
                    <div className="w-5 h-5 rounded-full bg-brand-navy flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                  
                  {step.status === "active" && (
                    <div className="w-5 h-5 rounded-full border border-brand-gold flex items-center justify-center bg-white">
                      <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                    </div>
                  )}

                  {step.status === "pending" && (
                    <div className="w-5 h-5 rounded-full border border-gray-300 bg-white" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex flex-col space-y-2">
                  <h3 
                    className={`text-sm tracking-wide font-semibold ${
                      step.status === "pending" ? "text-gray-400" : "text-brand-navy"
                    }`}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-mulish)" }}>
                    {step.description}
                  </p>
                  <span className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mt-1 inline-block">
                    {step.date}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
        
      </div>
      
      {/* Back link */}
      <div className="pt-4">
         <Link 
            href="/dashboard"
            className="text-[11px] tracking-[0.15em] text-gray-400 uppercase hover:text-brand-gold transition-colors"
          >
            ← Back to Vault Overview
          </Link>
      </div>
    </div>
  );
}
