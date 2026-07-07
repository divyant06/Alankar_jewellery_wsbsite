"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared field styles
───────────────────────────────────────────────────────────────────────────── */

const INPUT_BASE =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 text-sm text-brand-navy placeholder:text-gray-300 transition-colors duration-200 font-medium";

const LABEL_BASE =
  "text-[10px] tracking-[0.2em] text-brand-navy uppercase mb-4 opacity-70 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors block";

/* ─────────────────────────────────────────────────────────────────────────────
   Restoration & Repair Page
───────────────────────────────────────────────────────────────────────────── */

export default function RestorationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    itemCount: "",
    description: "",
    hasDiamonds: false,
    needsReplating: false,
  });

  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof formData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("[Alankar] Restoration request:", formData);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── Editorial Banner ────────────────────────────────────────────── */}
      <section className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Luxury Services · Artisan Restoration
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Heritage Restoration &amp; Repair
          </h1>
          <p
            className="text-sm text-brand-navy/70 leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Every piece of jewellery carries memory. A broken clasp, a lost
            stone, a bent prong — these are not endings but invitations to
            our master kaarigars, who have spent decades learning the art of
            breathing new life into heirloom gold. Whether your piece is an
            Alankar creation or a family treasure passed down through
            generations, our restoration atelier treats it with the reverence
            it deserves. We restore structure, repolish surfaces, re-set
            stones, and return pieces to a condition their original makers would
            recognise.
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
              Restoration &amp; Repair
            </span>
          </nav>
        </div>
      </section>

      {/* ── Split Layout ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto w-full px-8 py-20 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

        {/* ── Left: Restoration capabilities ──────────────────────────────── */}
        <aside className="lg:col-span-2 space-y-10">
          <div className="space-y-3">
            <h2
              className="text-xl text-brand-navy"
              style={{ fontFamily: "var(--font-domine)" }}
            >
              Repairs We Specialise In
            </h2>
            <div className="h-px bg-gray-200/60" />
          </div>

          <ul className="space-y-6">
            {[
              {
                title: "Clasp & Chain Repair",
                body: "Broken lobster claws, box clasps, ring shanks, and snapped chains restored and reinforced to exceed original strength.",
              },
              {
                title: "Stone Re-Setting",
                body: "Missing, loose, or chipped stones replaced with certified, grade-matched diamonds or coloured gemstones and secured under professional prong setting.",
              },
              {
                title: "Ring Resizing",
                body: "Up or down sizing while preserving stone integrity, pattern continuity, and surface hallmarking — even on eternity band and patterned shanks.",
              },
              {
                title: "Antique & Heirloom Restoration",
                body: "Pieces with historical or sentimental significance handled with extreme care — old gold evaluated, documented, and restored using period-appropriate techniques.",
              },
              {
                title: "Surface Refinishing",
                body: "Scratched and worn surfaces machine-buffed and hand-polished back to mirror finish without removing hallmarks or engraving.",
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
              Non-Alankar Pieces Welcome
            </p>
            <p
              className="text-sm text-brand-navy"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Our restoration team works on jewellery from any source. Family
              heirlooms, vintage pieces, and pieces from other jewellers are
              all accepted.
            </p>
          </div>
        </aside>

        {/* ── Right: Restoration Request Form ─────────────────────────────── */}
        <main className="lg:col-span-3">
          {submitted ? (
            <div className="bg-white border-[0.5px] border-gray-200/60 p-12 text-center space-y-6 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-full bg-champagne-bg flex items-center justify-center mx-auto">
                <div className="h-2 w-2 rounded-full bg-brand-gold" />
              </div>
              <h2
                className="text-2xl text-brand-navy"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Request Received
              </h2>
              <p
                className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                Our master artisan team will assess your restoration description
                and send a detailed quotation to{" "}
                <strong className="text-brand-navy">{formData.email}</strong>{" "}
                within 24–48 business hours.
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
                  Describe Your Restoration
                </h2>
                <p
                  className="text-xs text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  The more detail you provide, the more accurate your bespoke
                  quotation will be. Our artisans will review your description
                  before responding.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Contact Fields */}
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

                {/* Item Count */}
                <div className="flex flex-col relative group">
                  <label className={LABEL_BASE}>Number of Items to Restore</label>
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

                {/* Restoration Description — the key differentiator from Cleaning */}
                <div className="flex flex-col relative group">
                  <label className={LABEL_BASE}>
                    Describe the Damage or Restoration Required
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="e.g., Broken lobster clasp on a 22K gold necklace. One pavé diamond missing from the central cluster of a solitaire ring. Requires resizing from US size 6 to US size 7.5 without disturbing the engraving on the inner band."
                    className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-3 pt-1 text-sm text-brand-navy placeholder:text-gray-300 transition-colors duration-200 resize-none leading-relaxed"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                  <span
                    className="mt-2 text-[10px] text-gray-400"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    The more specific you are, the more precise your quotation will be.
                  </span>
                </div>

                {/* Additional options */}
                <div className="space-y-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 block">
                    Additional Information
                  </span>

                  {[
                    {
                      key: "hasDiamonds" as const,
                      label: "Contains Diamonds or Precious Gemstones",
                      sub: "Allows our gemologist team to prepare appropriate replacement stones in advance",
                    },
                    {
                      key: "needsReplating" as const,
                      label: "May Require Re-plating or Refinishing",
                      sub: "Surface condition suggests rhodium, gold, or finishing work may be needed",
                    },
                  ].map(({ key, label, sub }) => (
                    <label
                      key={key}
                      className="flex items-start gap-4 cursor-pointer"
                    >
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          checked={formData[key] as boolean}
                          onChange={(e) => update(key, e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 border transition-all duration-200 ${
                            formData[key]
                              ? "border-brand-gold bg-brand-gold"
                              : "border-gray-300"
                          }`}
                        />
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
                  A master artisan will review your request within 48 business hours.
                </p>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
