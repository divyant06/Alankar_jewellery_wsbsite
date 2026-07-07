"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

/** Shared bottom-border-only input style */
const INPUT_BASE =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors duration-200 font-medium";

/** Label style */
const LABEL_BASE =
  "text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors block";

/* ─────────────────────────────────────────────────────────────────────────────
   Jewellery Cleaning / Spa Page
───────────────────────────────────────────────────────────────────────────── */

export default function CleaningPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    itemCount: "",
    hasDiamonds: false,
    requiresRhodium: false,
  });

  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof formData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: POST to an API route / Supabase
    console.log("[Alankar] Cleaning quotation request:", formData);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── Editorial Banner ────────────────────────────────────────────── */}
      <section className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Luxury Services · Atelier Care
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Professional Spa &amp; Polishing
          </h1>
          <p
            className="text-sm text-brand-navy/70 leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Gold remembers every story it has witnessed — and with time, it
            carries the evidence of each one. Our master polishers use
            professional ultrasonic baths, steam-cleaning apparatus, and
            hand-polishing techniques refined over generations to return your
            22K and 18K pieces to their original radiance. Diamonds regain
            their maximum brilliance. Intricate filigree work is cleared of
            microscopic debris. And your jewellery emerges restored — not
            merely cleaned, but renewed.
          </p>
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-2 pt-2"
          >
            <Link
              href="/"
              className="luxury-tracking text-[9px] text-gray-400 hover:text-brand-gold transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-300 text-[9px]">/</span>
            <span className="luxury-tracking text-[9px] text-brand-gold">
              Cleaning &amp; Spa
            </span>
          </nav>
        </div>
      </section>

      {/* ── Split Layout ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto w-full px-8 py-20 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

        {/* ── Left: What the service covers ──────────────────────────────── */}
        <aside className="lg:col-span-2 space-y-10">
          <div className="space-y-3">
            <h2
              className="text-xl text-brand-navy"
              style={{ fontFamily: "var(--font-domine)" }}
            >
              What Our Spa Service Covers
            </h2>
            <div className="h-px bg-gray-200/60" />
          </div>

          <ul className="space-y-6">
            {[
              {
                title: "Ultrasonic Deep Cleaning",
                body: "High-frequency sound waves dislodge microscopic grime from every prong, setting, and surface — including areas no brush can reach.",
              },
              {
                title: "Steam Polishing",
                body: "High-pressure steam sterilises the metal and restores the factory surface finish to platinum, 22K, and 18K gold alloys.",
              },
              {
                title: "Diamond & Gemstone Inspection",
                body: "Our gemologists inspect every stone for prong integrity, secure setting, and surface abrasions during the cleaning process.",
              },
              {
                title: "Rhodium Re-plating",
                body: "White gold and certain diamond settings benefit from a fresh rhodium flash — restoring the brilliant white appearance and providing a protective barrier.",
              },
            ].map(({ title, body }) => (
              <li key={title} className="flex gap-4">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
                <div className="space-y-1">
                  <h3
                    className="text-sm font-semibold text-brand-navy"
                    style={{ fontFamily: "var(--font-domine)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-xs text-gray-500 leading-relaxed"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-white border-[0.5px] border-gray-200/60 p-6 space-y-2">
            <p
              className="text-[10px] tracking-[0.15em] text-brand-gold uppercase font-semibold"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Typical Turnaround
            </p>
            <p
              className="text-sm text-brand-navy"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              5–7 working days from receipt of pieces at our Jaipur atelier.
              Express 48-hour service available on request.
            </p>
          </div>
        </aside>

        {/* ── Right: Quotation Form ─────────────────────────────────────── */}
        <main className="lg:col-span-3">
          {submitted ? (
            /* Success state */
            <div className="bg-white border-[0.5px] border-gray-200/60 p-12 text-center space-y-6 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-full bg-champagne-bg flex items-center justify-center mx-auto">
                <div className="h-2 w-2 rounded-full bg-brand-gold" />
              </div>
              <h2
                className="text-2xl text-brand-navy"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Quotation Received
              </h2>
              <p
                className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                Our Concierge team will review your request and send a
                personalised cleaning quotation to{" "}
                <strong className="text-brand-navy">{formData.email}</strong>{" "}
                within 24 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="luxury-tracking text-[9px] text-brand-gold border border-brand-gold px-6 py-3 hover:bg-brand-gold hover:text-white transition-colors duration-200"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="bg-white border-[0.5px] border-gray-200/60 p-10 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
              <div className="mb-10 space-y-2">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                  Request a Custom Quotation
                </h2>
                <p
                  className="text-xs text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  All Alankar spa quotations are bespoke. Fill in the details
                  below and your dedicated Concierge advisor will respond
                  within one business day.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Name / Email / Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { key: "name" as const, label: "Full Name", placeholder: "Isabella Sterling", type: "text" },
                    { key: "email" as const, label: "Email Address", placeholder: "isabella@example.com", type: "email" },
                    { key: "phone" as const, label: "Contact Number", placeholder: "+91 98765 43210", type: "tel", colSpan: "md:col-span-2" },
                  ].map(({ key, label, placeholder, type, colSpan }) => (
                    <div
                      key={key}
                      className={`flex flex-col relative group ${colSpan ?? ""}`}
                    >
                      <label className={LABEL_BASE}>{label}</label>
                      <input
                        type={type}
                        required
                        value={formData[key] as string}
                        onChange={(e) => update(key, e.target.value)}
                        placeholder={placeholder}
                        className={INPUT_BASE}
                        style={{ fontFamily: "var(--font-mulish)" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Number of Items Dropdown */}
                <div className="flex flex-col relative group">
                  <label className={LABEL_BASE}>Number of Items</label>
                  <select
                    required
                    value={formData.itemCount}
                    onChange={(e) => update("itemCount", e.target.value)}
                    className={`${INPUT_BASE} cursor-pointer`}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    <option value="" disabled>
                      Select quantity
                    </option>
                    <option value="1-2">1 – 2 pieces</option>
                    <option value="3-5">3 – 5 pieces</option>
                    <option value="6+">6 or more pieces</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="space-y-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 block">
                    Additional Services
                  </span>

                  {[
                    {
                      key: "hasDiamonds" as const,
                      label: "Contains Diamonds or Gemstones",
                      sub: "Requires specialist ultrasonic settings and prong inspection",
                    },
                    {
                      key: "requiresRhodium" as const,
                      label: "Requires Rhodium Plating",
                      sub: "Restores brilliant white finish to white gold and platinum pieces",
                    },
                  ].map(({ key, label, sub }) => (
                    <label
                      key={key}
                      className="flex items-start gap-4 cursor-pointer group/check"
                    >
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          checked={formData[key] as boolean}
                          onChange={(e) => update(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 border border-gray-300 peer-checked:border-brand-gold peer-checked:bg-brand-gold transition-all duration-200" />
                        {(formData[key] as boolean) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-1px bg-white rotate-45 translate-y-1px" />
                            <div className="w-3 h-1px bg-white -rotate-45 translate-x-[-2px]" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span
                          className="text-sm text-brand-navy font-medium block"
                          style={{ fontFamily: "var(--font-mulish)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-[11px] text-gray-400"
                          style={{ fontFamily: "var(--font-mulish)" }}
                        >
                          {sub}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-5 bg-brand-navy text-brand-gold hover:bg-brand-navy/90 transition-all duration-500 tracking-[0.2em] text-[10px] uppercase font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Request Custom Quotation
                </button>

                <p
                  className="text-center text-[10px] text-gray-400"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Our Concierge will respond within one business day.
                </p>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
