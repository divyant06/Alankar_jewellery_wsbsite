import React from "react";
import Link from "next/link";

const SAVED_ADDRESSES = [
  {
    id: "addr_1",
    label: "Primary Residence",
    name: "Isabella Sterling",
    line1: "The Imperial Residence, Apt 402",
    line2: "Altamount Road, Cumballa Hill",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400026",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Private Office",
    name: "Isabella Sterling",
    line1: "Sterling Holdings, 14th Floor",
    line2: "Maker Maxity, BKC",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    isDefault: false,
  },
];

export default function AddressBookPage() {
  return (
    <div className="p-12 space-y-16 max-w-5xl">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <header className="space-y-3 pb-8 border-b border-gray-200/60">
        <h1 
          className="text-4xl text-brand-navy tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Secure Address Directory
        </h1>
        <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
          Manage your verified delivery locations for insured high-value couriers.
        </p>
      </header>

      {/* ── Saved Locations Grid ──────────────────────────────────────────── */}
      <section className="space-y-8">
        <h2 className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
          Verified Locations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SAVED_ADDRESSES.map((addr) => (
            <div 
              key={addr.id}
              className="bg-white border-[0.5px] border-gray-200/60 p-10 flex flex-col h-full shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)] relative group hover:border-brand-gold/30 transition-colors duration-500"
            >
              {/* Card Label */}
              <div className="flex justify-between items-start mb-8">
                <span className="block text-[10px] tracking-[0.2em] text-brand-gold uppercase font-semibold">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="px-3 py-1 bg-brand-navy text-white text-[9px] tracking-[0.15em] uppercase">
                    Default
                  </span>
                )}
              </div>

              {/* Calling Card Typography */}
              <div className="space-y-2 grow">
                <h3 className="text-lg text-brand-navy mb-4" style={{ fontFamily: "var(--font-domine)" }}>
                  {addr.name}
                </h3>
                <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
                  {addr.line1}
                </p>
                <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "var(--font-mulish)" }}>
                  {addr.line2}
                </p>
                <p className="text-sm text-gray-500 tracking-wide pt-2" style={{ fontFamily: "var(--font-mulish)" }}>
                  {addr.city}, {addr.state} {addr.pincode}
                </p>
              </div>

              {/* Card Actions */}
              <div className="mt-10 flex gap-6 border-t border-gray-100 pt-6">
                <button className="text-[10px] tracking-[0.15em] text-gray-400 hover:text-brand-navy uppercase transition-colors">
                  Edit
                </button>
                <button className="text-[10px] tracking-[0.15em] text-gray-400 hover:text-red-500 uppercase transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Add New Secure Location Form ──────────────────────────────────── */}
      <section className="bg-white border-[0.5px] border-gray-200/60 p-12 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
        <div className="mb-10 space-y-2">
          <h2 className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
            Add Secure Location
          </h2>
          <p className="text-xs text-gray-500" style={{ fontFamily: "var(--font-mulish)" }}>
            New locations require secondary verification before high-value dispatch.
          </p>
        </div>

        <form className="space-y-12 max-w-2xl">
          {/* Form Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col relative group">
              <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                Location Label
              </label>
              <input 
                type="text" 
                placeholder="e.g. Summer House"
                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors font-medium"
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>
            
            <div className="flex flex-col relative group">
              <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                Recipient Name
              </label>
              <input 
                type="text" 
                placeholder="Authorised receiver"
                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors font-medium"
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>
          </div>

          {/* Form Row 2 */}
          <div className="flex flex-col relative group">
            <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
              Address Line 1
            </label>
            <input 
              type="text" 
              placeholder="Building, street, or complex"
              className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors font-medium"
              style={{ fontFamily: "var(--font-mulish)" }}
            />
          </div>

          {/* Form Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col relative group">
              <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                City
              </label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy transition-colors font-medium"
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>
            
            <div className="flex flex-col relative group">
              <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                State
              </label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy transition-colors font-medium"
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>

            <div className="flex flex-col relative group">
              <label className="text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors">
                Pincode
              </label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy transition-colors font-medium"
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="button"
              className="border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-500 tracking-[0.15em] text-xs py-4 px-10 uppercase font-medium"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Verify & Add Location
            </button>
          </div>
        </form>
      </section>
      
      {/* Back link */}
      <div className="pt-4 pb-12">
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
