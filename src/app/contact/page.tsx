"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared field styles
───────────────────────────────────────────────────────────────────────────── */

const INPUT_CLASS =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 text-sm text-brand-navy placeholder:text-gray-300 transition-colors duration-200 font-medium";

const LABEL_CLASS =
  "block text-[10px] tracking-[0.2em] uppercase text-brand-navy opacity-60 mb-3 group-focus-within:text-brand-gold group-focus-within:opacity-100 transition-colors";

/* ─────────────────────────────────────────────────────────────────────────────
   Contact Page
───────────────────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: POST to a Supabase edge function or email API
    console.log("[Alankar] Concierge message:", form);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── Editorial Banner ────────────────────────────────────────────── */}
      <section
        aria-label="Contact page header"
        className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Client Services
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contact the Concierge
          </h1>
          <p
            className="text-sm text-brand-navy/60 leading-relaxed"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Every Alankar enquiry is handled personally by a dedicated member
            of our Concierge team — not a chatbot, not a ticket queue. A
            human being who understands fine jewellery will respond to you
            within one business day.
          </p>
        </div>
      </section>

      {/* ── Two-column main layout ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto w-full px-8 py-24 grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

        {/* ── Left: Contact Information ────────────────────────────────── */}
        <aside className="lg:col-span-2 space-y-14">

          {/* Atelier Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200/60" />
              <span className="luxury-tracking text-brand-gold text-[9px]">
                Jaipur Atelier &amp; Vault
              </span>
              <div className="h-px flex-1 bg-gray-200/60" />
            </div>
            <address
              className="not-italic space-y-1"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              <p className="text-sm font-semibold text-brand-navy">
                Alankar Fine Jewellery
              </p>
              <p className="text-sm text-gray-500 leading-loose">
                The Heritage Arcade, Suite 7<br />
                Mirza Ismail Road, MI Road<br />
                Jaipur, Rajasthan 302 001<br />
                India
              </p>
            </address>
            <p
              className="text-[11px] text-gray-400 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              The atelier is open by appointment only for private consultations,
              valuation sessions, and bespoke design commissions. Walk-in
              clients are welcome in the ground-floor showroom.
            </p>
          </div>

          {/* Direct Lines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200/60" />
              <span className="luxury-tracking text-brand-gold text-[9px]">
                Direct Lines
              </span>
              <div className="h-px flex-1 bg-gray-200/60" />
            </div>
            <div className="space-y-3" style={{ fontFamily: "var(--font-mulish)" }}>
              <div>
                <span className="text-[10px] tracking-[0.12em] uppercase text-gray-400 block mb-1">
                  Concierge Telephone
                </span>
                <a
                  href="tel:+911412345678"
                  className="text-sm text-brand-navy hover:text-brand-gold transition-colors font-medium"
                >
                  +91 141 234 5678
                </a>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.12em] uppercase text-gray-400 block mb-1">
                  WhatsApp Concierge
                </span>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-navy hover:text-brand-gold transition-colors font-medium"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.12em] uppercase text-gray-400 block mb-1">
                  Secure Email
                </span>
                <a
                  href="mailto:concierge@alankar.com"
                  className="text-sm text-brand-navy hover:text-brand-gold transition-colors font-medium"
                >
                  concierge@alankar.com
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200/60" />
              <span className="luxury-tracking text-brand-gold text-[9px]">
                Operating Hours
              </span>
              <div className="h-px flex-1 bg-gray-200/60" />
            </div>
            <div
              className="space-y-3 text-sm"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {[
                { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM IST" },
                { day: "Saturday", hours: "10:00 AM – 6:00 PM IST" },
                { day: "Sunday", hours: "By private appointment only" },
              ].map(({ day, hours }) => (
                <div
                  key={day}
                  className="flex justify-between gap-4 pb-3 border-b border-gray-100 last:border-none"
                >
                  <span className="text-brand-navy font-medium">{day}</span>
                  <span className="text-gray-400 text-right">{hours}</span>
                </div>
              ))}
            </div>
            <p
              className="text-[11px] text-gray-400 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Email and WhatsApp responses are provided within one business day.
              Urgent matters related to active orders are prioritised within 4
              hours during operating hours.
            </p>
          </div>

        </aside>

        {/* ── Right: Contact Form ──────────────────────────────────────── */}
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
                Message Received
              </h2>
              <p
                className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto"
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                Thank you, {form.name ? form.name.split(" ")[0] : "valued client"}. A member of our
                Concierge team will respond to{" "}
                <strong className="text-brand-navy">{form.email}</strong> within
                one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
                className="luxury-tracking text-[9px] text-brand-gold border border-brand-gold px-6 py-3 hover:bg-brand-gold hover:text-white transition-colors duration-200 mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-white border-[0.5px] border-gray-200/60 p-10 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
              <div className="mb-10 space-y-2">
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
                  Send a Secure Message
                </h2>
                <p
                  className="text-xs text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Your message is transmitted over an encrypted connection and
                  routed directly to your Concierge advisor. We respond to every
                  enquiry personally.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Name & Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col relative group">
                    <label htmlFor="contact-name" className={LABEL_CLASS}>
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Isabella Sterling"
                      className={INPUT_CLASS}
                      style={{ fontFamily: "var(--font-mulish)" }}
                    />
                  </div>
                  <div className="flex flex-col relative group">
                    <label htmlFor="contact-email" className={LABEL_CLASS}>
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="isabella@example.com"
                      className={INPUT_CLASS}
                      style={{ fontFamily: "var(--font-mulish)" }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col relative group">
                  <label htmlFor="contact-subject" className={LABEL_CLASS}>
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="e.g. Bespoke commission enquiry, Order #ALN-8492"
                    className={INPUT_CLASS}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                </div>

                {/* Message textarea — bottom-border style */}
                <div className="flex flex-col relative group">
                  <label htmlFor="contact-message" className={LABEL_CLASS}>
                    Your Message or Inquiry
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Please share the nature of your enquiry. Our Concierge team is equipped to assist with custom commissions, sizing requests, valuation appointments, aftercare services, gifting consultations, and any other matter related to your Alankar experience."
                    className="w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 pt-1 text-sm text-brand-navy placeholder:text-gray-300 transition-colors duration-200 resize-none leading-loose"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-5 bg-brand-navy text-white hover:bg-brand-navy/90 transition-all duration-500 tracking-[0.2em] text-[10px] uppercase font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  Send Secure Message
                </button>

                <p
                  className="text-center text-[10px] text-gray-400"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  All communications are encrypted. We will never share your
                  information with third parties.
                </p>
              </form>
            </div>
          )}

          {/* Secondary links */}
          <div className="mt-8 flex items-center justify-center gap-8">
            <Link
              href="/faq"
              className="luxury-tracking text-[9px] text-gray-400 hover:text-brand-gold transition-colors"
            >
              Browse our FAQ
            </Link>
            <div className="h-3 w-px bg-gray-200" />
            <Link
              href="/services/valuation"
              className="luxury-tracking text-[9px] text-gray-400 hover:text-brand-gold transition-colors"
            >
              Book a Valuation
            </Link>
            <div className="h-3 w-px bg-gray-200" />
            <Link
              href="/returns"
              className="luxury-tracking text-[9px] text-gray-400 hover:text-brand-gold transition-colors"
            >
              Returns Policy
            </Link>
          </div>
        </main>

      </div>
    </div>
  );
}
