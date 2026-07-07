"use client";

import React, { useState } from "react";
import type { Metadata } from "next";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared field styles — bottom-border-only, 16px (text-base) to prevent iOS zoom
───────────────────────────────────────────────────────────────────────────── */

const INPUT_CLASS =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 pt-1 text-base text-brand-navy placeholder:text-gray-300 transition-colors duration-200";

const SELECT_CLASS =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 pt-1 text-base text-brand-navy transition-colors duration-200 appearance-none cursor-pointer";

const LABEL_CLASS =
  "block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3 group-focus-within:text-brand-gold transition-colors";

/* ─────────────────────────────────────────────────────────────────────────────
   Process steps data
───────────────────────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Private Consultation",
    body:
      "Your commission begins with a private, one-on-one session with our Creative Director — in our Jaipur atelier or via a secure video call. We listen to your story, study your references, and translate your vision into a design brief that captures every nuance of what you wish to wear.",
  },
  {
    step: "02",
    title: "3D Rendering & Wax Prototyping",
    body:
      "Our master designers produce photorealistic 3D renders of your piece within five working days. Once approved, a precision wax prototype is hand-cast so you can feel the weight, proportions, and balance of your commission before a single gram of gold is poured.",
  },
  {
    step: "03",
    title: "The Kaarigar Crafting",
    body:
      "Your approved prototype is entrusted to our senior kaarigar — a master goldsmith with a minimum of twenty years of experience in Jaipur's finest atelier tradition. Every prong setting, every filigree strand, every burnished surface is worked by hand, over an average of sixty dedicated hours.",
  },
];

const BUDGET_TIERS = [
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000 – ₹5,00,000",
  "₹5,00,000 – ₹10,00,000",
  "₹10,00,000+",
];

const METAL_OPTIONS = ["22K Gold", "18K Gold", "Platinum", "White Gold", "Rose Gold"];

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function BespokePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    metal: "",
    vision: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("[Alankar] Bespoke commission request:", form);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        aria-label="Bespoke commission hero"
        className="bg-brand-navy px-4 md:px-16 py-20 md:py-28 relative overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(197,168,92,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <span
            className="luxury-tracking text-brand-gold text-[10px] block mb-6"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Alankar Atelier · Jaipur
          </span>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bespoke{" "}
            <em className="not-italic text-brand-gold">Commissions.</em>
          </h1>

          <p
            className="text-sm md:text-base text-champagne-accent/70 leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            A piece made only for you — designed around your story, shaped by
            your aesthetic, and crafted to absolute perfection by our master
            kaarigars. Begin your commission with a private consultation.
          </p>

          {/* Ornamental divider */}
          <div className="flex items-center gap-4 mt-10 w-48">
            <div className="flex-1 h-px bg-brand-gold/30" />
            <div className="h-1 w-1 rounded-full bg-brand-gold" />
            <div className="flex-1 h-px bg-brand-gold/30" />
          </div>
        </div>
      </section>

      {/* ── The Process ────────────────────────────────────────────────── */}
      <section
        aria-label="The bespoke process"
        className="bg-champagne-bg px-4 md:px-16 py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span
              className="luxury-tracking text-brand-gold text-[10px] block mb-4"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              How It Works
            </span>
            <h2
              className="text-2xl md:text-3xl text-brand-navy"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Commission Journey
            </h2>
          </div>

          {/* Steps — vertical on mobile, horizontal on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 relative">

            {/* Connecting line on desktop */}
            <div
              className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gray-200/60"
              aria-hidden="true"
            />

            {PROCESS_STEPS.map(({ step, title, body }, i) => (
              <div
                key={step}
                className="relative flex flex-row md:flex-col gap-6 md:gap-0 pb-10 md:pb-0 last:pb-0"
              >
                {/* Vertical connector on mobile */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className="md:hidden absolute left-[22px] top-12 bottom-0 w-px bg-gray-200/60"
                    aria-hidden="true"
                  />
                )}

                {/* Step number badge */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-brand-navy flex items-center justify-center z-10 relative">
                    <span
                      className="text-brand-gold text-[11px] font-semibold tracking-widest"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      {step}
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="flex-1 md:text-center md:pt-6 md:px-4">
                  <h3
                    className="text-base md:text-lg text-brand-navy mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-domine)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commission Form ─────────────────────────────────────────────── */}
      <section
        aria-label="Commission request form"
        className="bg-white px-4 md:px-16 py-16 md:py-24"
      >
        <div className="max-w-2xl mx-auto">

          {/* Section header */}
          <div className="mb-10 md:mb-14">
            <span
              className="luxury-tracking text-brand-gold text-[10px] block mb-4"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Begin Your Commission
            </span>
            <h2
              className="text-2xl md:text-3xl text-brand-navy"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Request a Private Consultation
            </h2>
            <p
              className="text-sm text-gray-400 mt-3 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Complete the form below. Our Creative Director will contact you
              personally within one business day to schedule your consultation.
            </p>
          </div>

          {submitted ? (
            /* ── Success state ─────────────────────────────────────── */
            <div className="bg-champagne-bg border-[0.5px] border-gray-200/60 p-10 text-center space-y-5">
              <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center mx-auto">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              </div>
              <h3
                className="text-xl text-brand-navy"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Request Received
              </h3>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                Thank you, {form.name ? form.name.split(" ")[0] : "valued client"}.
                Our Creative Director will contact you at{" "}
                <strong className="text-brand-navy break-all">{form.email}</strong>{" "}
                within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", phone: "", budget: "", metal: "", vision: "" });
                }}
                className="luxury-tracking text-[9px] text-brand-gold border border-brand-gold px-6 py-3 hover:bg-brand-gold hover:text-white transition-colors duration-200 mt-2"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">

              {/* Name / Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="flex flex-col group">
                  <label htmlFor="b-name" className={LABEL_CLASS}>Full Name</label>
                  <input
                    id="b-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Isabella Sterling"
                    className={INPUT_CLASS}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                </div>
                <div className="flex flex-col group">
                  <label htmlFor="b-email" className={LABEL_CLASS}>Email Address</label>
                  <input
                    id="b-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="isabella@example.com"
                    className={INPUT_CLASS}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col group">
                <label htmlFor="b-phone" className={LABEL_CLASS}>Phone Number</label>
                <input
                  id="b-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className={INPUT_CLASS}
                  style={{ fontFamily: "var(--font-mulish)" }}
                />
              </div>

              {/* Budget / Metal row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Budget Tier */}
                <div className="flex flex-col group relative">
                  <label htmlFor="b-budget" className={LABEL_CLASS}>Budget Tier</label>
                  <div className="relative">
                    <select
                      id="b-budget"
                      required
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className={`${SELECT_CLASS} pr-6`}
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      <option value="" disabled>Select budget range</option>
                      {BUDGET_TIERS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <svg
                      className="absolute right-0 bottom-3 w-3 h-3 text-gray-400 pointer-events-none"
                      viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Preferred Metal */}
                <div className="flex flex-col group relative">
                  <label htmlFor="b-metal" className={LABEL_CLASS}>Preferred Metal</label>
                  <div className="relative">
                    <select
                      id="b-metal"
                      required
                      value={form.metal}
                      onChange={(e) => update("metal", e.target.value)}
                      className={`${SELECT_CLASS} pr-6`}
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      <option value="" disabled>Select metal</option>
                      {METAL_OPTIONS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-0 bottom-3 w-3 h-3 text-gray-400 pointer-events-none"
                      viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Vision textarea */}
              <div className="flex flex-col group">
                <label htmlFor="b-vision" className={LABEL_CLASS}>
                  Describe Your Vision
                </label>
                <textarea
                  id="b-vision"
                  required
                  rows={5}
                  value={form.vision}
                  onChange={(e) => update("vision", e.target.value)}
                  placeholder="Tell us about the piece you envision — its purpose, the stones you love, the aesthetic that moves you, any heirloom references or inspirational images you'd like to discuss. The more detail you share, the more precisely we can serve you."
                  className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 pt-1 text-base text-brand-navy placeholder:text-gray-300 transition-colors duration-200 resize-none leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto min-h-[44px] px-12 bg-brand-navy text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-colors duration-500 tracking-[0.25em] text-[10px] uppercase font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Request Consultation
                </button>
                <p
                  className="text-[10px] text-gray-400 mt-4 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  We respond to every commission request personally within one business day.
                  No commitment is required until you approve the design brief.
                </p>
              </div>

            </form>
          )}
        </div>
      </section>

      {/* ── Trust footnote ──────────────────────────────────────────────── */}
      <section
        aria-label="Bespoke service guarantees"
        className="bg-champagne-bg px-4 md:px-16 py-12 border-t border-gray-200/40"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { stat: "60+", label: "Artisan hours per piece" },
            { stat: "5 days", label: "3D render delivery" },
            { stat: "Lifetime", label: "Buyback guarantee" },
          ].map(({ stat, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="text-2xl font-bold text-brand-gold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat}
              </span>
              <span
                className="luxury-tracking text-[9px] text-brand-navy/60"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
