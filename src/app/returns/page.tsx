import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Alankar Fine Jewellery",
  description:
    "Alankar's 15-day no-questions-asked return policy, lifetime exchange guarantee, and secure buyback programme at prevailing gold market rates. BIS hallmark and GIA certificate conditions apply.",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Shared section header component
───────────────────────────────────────────────────────────────────────────── */

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 pt-10 border-t border-gray-100 first:border-none first:pt-0">
      <h2
        className="text-xl text-brand-navy leading-snug"
        style={{ fontFamily: "var(--font-domine)" }}
      >
        {title}
      </h2>
      <div
        className="text-sm text-gray-600 leading-loose space-y-4"
        style={{ fontFamily: "var(--font-mulish)" }}
      >
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Returns & Exchanges Page
───────────────────────────────────────────────────────────────────────────── */

export default function ReturnsPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Editorial Banner ────────────────────────────────────────────── */}
      <section className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Client Assurance Policy
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Returns &amp; Exchanges
          </h1>
          <p
            className="text-sm text-brand-navy/60 leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            At Alankar, we stand completely behind every piece that leaves our
            atelier. Our return and exchange policies are designed with one
            purpose — your absolute peace of mind.
          </p>
        </div>
      </section>

      {/* ── Policy Body ─────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto py-20 px-8 space-y-0">

        <PolicySection title="15-Day No-Questions-Asked Return Policy">
          <p>
            We believe that a jewellery purchase of this significance deserves
            time — to be worn, to be admired, and to be certain. Should you, for
            any reason, wish to return your Alankar creation within{" "}
            <strong className="text-brand-navy font-semibold">
              15 calendar days
            </strong>{" "}
            of the confirmed delivery date, we will process a full refund to your
            original payment method without question, condition, or restocking fee.
          </p>
          <p>
            To initiate a return, contact our Concierge team at{" "}
            <a
              href="mailto:returns@alankar.com"
              className="text-brand-gold underline underline-offset-2 hover:text-burnished-gold transition-colors"
            >
              returns@alankar.com
            </a>{" "}
            with your order number. You will receive a pre-paid, fully insured
            return courier label within 24 business hours. Refunds are credited
            within 5–7 working days of our quality team inspecting the returned
            piece at our Jaipur atelier.
          </p>
          <p className="text-[11px] text-gray-400 italic">
            Note: Custom-commissioned bespoke pieces are non-returnable, though
            they remain fully eligible for our Lifetime Exchange Programme below.
          </p>
        </PolicySection>

        <PolicySection title="Lifetime Exchange Guarantee">
          <p>
            An Alankar jewellery piece is an asset — and we treat it as one.
            Every creation we sell qualifies for our{" "}
            <strong className="text-brand-navy font-semibold">
              Lifetime Exchange Programme
            </strong>
            , allowing you to exchange your piece for a new design at any point
            in time, with full credit given for the gold and diamond content at
            the{" "}
            <strong className="text-brand-navy font-semibold">
              prevailing market gold rate
            </strong>{" "}
            on the day of exchange.
          </p>
          <p>
            Gold retains and frequently appreciates in value across time.
            Jewellery you purchased today in 22K hallmarked gold will be valued
            precisely on the live market rate at the moment you choose to
            exchange — not at the price you originally paid. This ensures your
            Alankar collection works as a genuine store of value alongside its
            aesthetic beauty.
          </p>
          <p>
            To exercise your exchange right, visit any authorised Alankar studio
            or contact your dedicated Concierge advisor. A fresh invoice will be
            generated for the value differential of your new chosen piece.
          </p>
        </PolicySection>

        <PolicySection title="Lifetime Buyback Programme">
          <p>
            Should you ever wish to liquidate your Alankar jewellery, our{" "}
            <strong className="text-brand-navy font-semibold">
              Lifetime Buyback Programme
            </strong>{" "}
            guarantees that Alankar will repurchase any piece at the prevailing
            22K or 18K gold market rate for the gold content, plus a fair
            appraised value for any certified diamonds, stones, and craftsmanship.
          </p>
          <p>
            Buyback valuations are performed transparently in the presence of the
            client at our studios by our certified gemologists, with a detailed
            breakdown provided in writing before any transaction is completed. We
            believe you should always know exactly what your jewellery is worth.
          </p>
        </PolicySection>

        <PolicySection title="Certificate &amp; Condition Requirements">
          <p>
            To qualify for returns, exchanges, or buybacks, all Alankar pieces
            must be returned with the following documentation and in the specified
            condition:
          </p>
          <ul className="space-y-2 list-none">
            {[
              "BIS Hallmarking Certificate must be present and undamaged.",
              "GIA Diamond Grading Certificate (where applicable) must be intact and accompanied.",
              "The original Alankar tamper-proof packaging must be included.",
              "The jewellery must show no signs of alteration, resizing by a third party, or physical damage beyond normal wear.",
              "The Alankar Certificate of Authenticity included with your order must be returned.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2.5" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-gray-400 italic">
            Any piece returned without the original BIS certificate or GIA
            documentation will be assessed at a reduced valuation reflecting the
            loss of certified provenance.
          </p>
        </PolicySection>

        <PolicySection title="Secure Return Shipping">
          <p>
            All returns and exchanges are conducted via our dedicated insured
            courier network. We strongly advise against using uninsured or
            non-tracked postal services to return high-value jewellery. Alankar
            accepts no liability for pieces lost or damaged in transit when
            shipped through methods not arranged by our Concierge team.
          </p>
          <p>
            When we arrange your return shipment, each parcel is:
          </p>
          <ul className="space-y-2 list-none">
            {[
              "Fully insured at the declared retail value of the piece.",
              "Dispatched via GPS-tracked, tamper-evident secure courier.",
              "Photographed and logged at our receiving warehouse upon arrival.",
              "Inspected by a certified gemologist within 48 hours of receipt.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2.5" />
                {item}
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* CTA */}
        <div className="pt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="btn-gold w-fit"
          >
            Browse the Collection
          </Link>
          <Link
            href="/faq"
            className="btn-gold-outline w-fit"
          >
            Read our FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
