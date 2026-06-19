import React from "react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  return (
    <div className="p-12 space-y-12 max-w-5xl">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <header className="space-y-3">
        <h1 
          className="text-4xl text-brand-navy tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Welcome to your Alankar Vault.
        </h1>
        <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
          Manage your bespoke commissions, secure shipping profiles, and private concierge appointments.
        </p>
      </header>

      {/* ── Profile Card ──────────────────────────────────────────────────── */}
      <div className="bg-white border-[0.5px] border-gray-200/60 p-12 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)] space-y-10">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <h2 className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
            Primary Profile
          </h2>
          <span className="text-xs text-brand-gold uppercase tracking-widest font-semibold">
            Platinum Tier
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
          <div className="space-y-2">
            <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              Full Legal Name
            </span>
            <span className="block text-brand-navy text-lg font-medium" style={{ fontFamily: "var(--font-domine)" }}>
              Isabella Sterling
            </span>
          </div>

          <div className="space-y-2">
            <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              Secure Email
            </span>
            <span className="block text-brand-navy text-base tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
              isabella.sterling@example.com
            </span>
          </div>

          <div className="space-y-2">
            <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              Verified Contact
            </span>
            <span className="block text-brand-navy text-base tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
              +91 98765 43210
            </span>
          </div>

          <div className="space-y-2">
            <span className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              Vault Established
            </span>
            <span className="block text-brand-navy text-base tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
              October 2024
            </span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-8 flex">
          <Link 
            href="/services/bespoke"
            className="border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-500 tracking-[0.15em] text-xs py-4 px-10 uppercase font-medium"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Book Concierge Appointment
          </Link>
        </div>

      </div>
    </div>
  );
}
