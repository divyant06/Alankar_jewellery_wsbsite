import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expert Jewellery Valuation | Alankar Fine Jewellery",
  description:
    "Professional GIA and IGI certified jewellery appraisals for insurance, estate planning, and resale purposes. Private consultation at the Alankar vault by our master gemologists.",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Process steps data
───────────────────────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Schedule a Private Consultation",
    headline: "Booking Your Vault Appointment",
    body: [
      "An expert valuation begins not with the jewellery, but with a conversation. We invite you to book a private, one-on-one consultation at an Alankar vault studio — an appointment scheduled entirely around your availability, with no communal waiting areas and no interruptions.",
      "During this initial consultation, our Concierge advisor will listen to the purpose of your valuation — whether for insurance underwriting, estate planning, inheritance documentation, potential resale, or simply personal knowledge of your collection's current market value. Understanding your objective allows our gemologists to calibrate the depth of their assessment accordingly.",
      "You may bring any number of pieces, from a single heirloom ring to an entire generational collection. Each item will be photographed, catalogued, and handled under the secure conditions of our vault. A dedicated gemologist is assigned to your appointment and will be your single point of contact throughout the entire process.",
    ],
    detail: "Appointments available Monday through Saturday, 10am – 6pm IST. In-home consultations available for collections valued above ₹25 lakhs.",
  },
  {
    number: "02",
    title: "GIA & IGI Certified Appraisal",
    headline: "Precision Assessment by Master Gemologists",
    body: [
      "Our valuation process is conducted exclusively by GIA Graduate Gemologists (GGs) and IGI-certified diamond graders — professionals who have completed the industry's most rigorous formal qualification programmes and have years of hands-on evaluation experience with high-value Indian and international jewellery.",
      "Each diamond is assessed individually using our Sarine DiaMension HD system and GIA-calibrated master stone sets. The gemologist documents Carat weight, Cut grade, Colour grade (D–Z scale), and Clarity grade (FL to I3) with the precision required for legally binding insurance documentation. Coloured gemstones — sapphires, rubies, emeralds, and pearls — are evaluated under controlled daylight-equivalent lighting and spectroscopic analysis.",
      "Gold content is assessed using XRF (X-ray fluorescence) technology, which precisely confirms karat purity without requiring any physical alteration of the piece. Your BIS hallmark is cross-referenced for independent verification. The current live market gold rate on the day of appraisal is recorded and applied to calculate the intrinsic metal value — ensuring your certificate reflects real-world liquidity value.",
      "Where diamond parcels require laboratory confirmation beyond our in-house capabilities, we coordinate directly with GIA India's Mumbai laboratory for full regrading reports at no additional scheduling cost to the client.",
    ],
    detail: "Typical assessment duration: 45 minutes to 2 hours per appointment, depending on collection size.",
  },
  {
    number: "03",
    title: "Official Valuation Documentation",
    headline: "Legally Binding Certificates of Appraisal",
    body: [
      "Upon completion of the assessment, you will receive a comprehensive Alankar Valuation Certificate — a legally recognised document accepted by all major Indian insurance companies, estate lawyers, and court proceedings for asset declaration purposes.",
      "Each certificate contains the full grading details of every gemstone assessed, the metallurgical composition and weight of the gold, the market replacement value calculated at the live gold rate on the valuation date, and a timestamped photographic record of the piece in high resolution. The certificate carries the signature of the presiding GIA-certified gemologist and the Alankar vault director.",
      "Valuations are valid for 24 months from the date of issue, reflecting standard insurance industry practice for jewellery appraisals given gold market fluctuations. We offer a streamlined Certificate Renewal Service that re-assesses only the market rate component without requiring a full physical reassessment — available at a significantly reduced fee.",
      "Original certificates are issued in both physical form (archival-quality printed document with embossed seal) and as a digitally signed PDF, stored securely in your Alankar client vault for lifetime access. Duplicate certificates can be re-issued at any time upon identity verification.",
    ],
    detail: "Valuation certificates are accepted by: LIC, ICICI Lombard, HDFC Ergo, New India Assurance, and all major Indian private insurers.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Valuation Page — Server Component
───────────────────────────────────────────────────────────────────────────── */

export default function ValuationPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Editorial Banner ────────────────────────────────────────────── */}
      <section className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-4xl mx-auto space-y-5">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Luxury Services · Expert Appraisal
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Expert Jewellery Valuation
          </h1>
          <p
            className="text-sm text-brand-navy/70 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Knowing precisely what your jewellery is worth is not vanity — it
            is prudent stewardship of a significant asset. Alankar's expert
            valuation service provides GIA and IGI certified appraisals for
            insurance, estate planning, inheritance, and personal knowledge
            — delivered with the privacy, precision, and professionalism that
            a collection of this significance deserves.
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
              Expert Valuation
            </span>
          </nav>
        </div>
      </section>

      {/* ── Trust Strip ─────────────────────────────────────────────────── */}
      <div className="bg-brand-navy py-8 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "GIA", label: "Graduate Gemologists" },
            { stat: "IGI", label: "Certified Diamond Graders" },
            { stat: "XRF", label: "Gold Purity Analysis" },
            { stat: "24M", label: "Certificate Validity" },
          ].map(({ stat, label }) => (
            <div key={stat} className="flex flex-col gap-1">
              <span
                className="text-xl font-bold text-brand-gold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat}
              </span>
              <span className="luxury-tracking text-[8px] text-champagne-accent/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3-Step Process ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-8 py-20 space-y-0 w-full">

        <div className="mb-14 space-y-3">
          <span className="luxury-tracking text-brand-gold text-[10px]">
            The Valuation Process
          </span>
          <h2
            className="text-3xl text-brand-navy"
            style={{ fontFamily: "var(--font-domine)" }}
          >
            Three Steps to Certified Clarity
          </h2>
        </div>

        <div className="space-y-0">
          {PROCESS_STEPS.map((step, idx) => (
            <article
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 ${
                idx < PROCESS_STEPS.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              {/* Step number column */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 lg:gap-3 items-start">
                <span
                  className="text-5xl font-bold text-gray-100 leading-none select-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div className="flex flex-col gap-1 pt-1 lg:pt-0">
                  <span className="luxury-tracking text-brand-gold text-[9px]">
                    Step {step.number}
                  </span>
                  <h3
                    className="text-sm font-semibold text-brand-navy leading-snug"
                    style={{ fontFamily: "var(--font-domine)" }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Content column */}
              <div className="lg:col-span-10 space-y-6">
                <h2
                  className="text-2xl text-brand-navy leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {step.headline}
                </h2>

                <div className="space-y-4">
                  {step.body.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm text-gray-600 leading-loose"
                      style={{ fontFamily: "var(--font-mulish)" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex items-start gap-3 bg-champagne-bg border-[0.5px] border-gray-200/60 px-5 py-4 mt-4">
                  <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
                  <p
                    className="text-xs text-brand-navy/70 leading-relaxed"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Booking CTA ──────────────────────────────────────────────── */}
        <div className="pt-12 bg-white border-[0.5px] border-gray-200/60 p-12 text-center space-y-6 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)]">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Begin Your Valuation
          </span>
          <h2
            className="text-3xl text-brand-navy"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Book a Private Consultation
          </h2>
          <p
            className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Reach your dedicated Concierge advisor to schedule an appointment
            at the Alankar vault nearest to you. All consultations are private,
            by appointment only, and entirely confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="mailto:valuation@alankar.com"
              className="btn-gold w-fit mx-auto sm:mx-0"
            >
              Email Our Gemologists
            </a>
            <Link
              href="/faq"
              className="btn-gold-outline w-fit mx-auto sm:mx-0"
            >
              Read Our FAQ
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
