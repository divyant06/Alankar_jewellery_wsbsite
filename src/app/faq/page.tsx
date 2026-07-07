import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Alankar Fine Jewellery",
  description:
    "Answers to your most important questions about Alankar's jewellery — insured delivery, live gold pricing, conflict-free diamonds, custom sizing, BIS hallmarking, and more.",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────────────── */

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const ORDERS_SHIPPING: FaqItem[] = [
  {
    question: "How long will it take to receive my order?",
    answer: (
      <>
        <p>
          Because every Alankar piece is crafted to order by our master artisans
          in Jaipur, production timelines vary by complexity. Most pieces from
          our heritage catalogue are completed within{" "}
          <strong className="text-brand-navy font-semibold">
            10–15 working days
          </strong>
          . Custom-commissioned bespoke creations may require 4–8 weeks
          depending on design intricacy and stone sourcing.
        </p>
        <p className="mt-3">
          Once your piece passes quality inspection and BIS hallmarking, it is
          dispatched via GPS-tracked, fully insured courier. You will receive a
          dispatch notification with a live tracking link.
        </p>
      </>
    ),
  },
  {
    question: "Is my delivery fully insured?",
    answer: (
      <p>
        Yes — absolutely. Every Alankar shipment is insured at the full retail
        value of the piece from the moment it leaves our atelier until it is
        safely signed for at your delivery address. We partner exclusively with
        certified high-value goods couriers who use tamper-evident, GPS-monitored
        packaging. In the extraordinarily unlikely event of loss or damage in
        transit, you are fully covered. We will replace or refund your piece at
        no cost to you.
      </p>
    ),
  },
  {
    question: "How does the live gold pricing work? Why might the price I see differ from yesterday?",
    answer: (
      <>
        <p>
          Gold is a globally traded commodity whose spot price fluctuates
          continuously with international markets. The price displayed on every
          Alankar product page is calculated in real time using the formula:
        </p>
        <div className="my-4 px-5 py-4 bg-champagne-bg border-l-2 border-brand-gold text-[11px] text-brand-navy/80 leading-relaxed">
          <strong>Final Price</strong> = (Gold Weight × Live Purity Rate) +
          (Gold Weight × Making Charge) + Stone Cost + 3% GST
        </div>
        <p>
          The gold rate is refreshed automatically each time you load the page.
          Your cart locks in the price at the moment of adding a piece. The
          final invoice amount is confirmed when your payment is processed via
          our secure Razorpay gateway. We recommend completing your purchase in
          the same session to secure the rate displayed.
        </p>
      </>
    ),
  },
  {
    question: "Can I cancel my order after placing it?",
    answer: (
      <p>
        Orders may be cancelled within{" "}
        <strong className="text-brand-navy font-semibold">
          24 hours of payment confirmation
        </strong>{" "}
        for a full refund, as our artisans begin crafting shortly thereafter.
        Beyond this window, cancellations are not possible for custom orders,
        but you may exercise our 15-Day Return Policy or Lifetime Exchange
        Programme once the piece is delivered. To request a cancellation,
        contact your Concierge advisor immediately at{" "}
        <a
          href="mailto:concierge@alankar.com"
          className="text-brand-gold underline underline-offset-2 hover:text-burnished-gold transition-colors"
        >
          concierge@alankar.com
        </a>
        .
      </p>
    ),
  },
];

const JEWELLERY_CARE: FaqItem[] = [
  {
    question: "Are Alankar's diamonds conflict-free?",
    answer: (
      <>
        <p>
          Without exception. Every diamond used in an Alankar creation is
          sourced in full compliance with the{" "}
          <strong className="text-brand-navy font-semibold">
            Kimberley Process Certification Scheme (KPCS)
          </strong>
          , the international framework established to prevent conflict diamonds
          from entering the legitimate trade.
        </p>
        <p className="mt-3">
          Beyond regulatory compliance, we work exclusively with suppliers who
          hold Responsible Jewellery Council (RJC) certification, ensuring our
          supply chain meets the highest ethical standards for environmental
          practice, labour rights, and sourcing transparency. All significant
          diamonds above 0.18ct are accompanied by a GIA grading certificate,
          which details the stone's cut, colour, clarity, and carat weight.
        </p>
      </>
    ),
  },
  {
    question: "What does BIS Hallmarking mean, and why does it matter?",
    answer: (
      <p>
        BIS (Bureau of Indian Standards) Hallmarking is India's official
        quality certification for precious metals. A BIS hallmark stamped on
        your Alankar piece is a government-guaranteed assurance that the gold
        content is exactly as stated — whether 22K (91.6% pure gold) or 18K
        (75% pure gold). This certification is critical for the integrity of
        our Lifetime Buyback and Exchange Programmes, as it provides
        irrefutable proof of metal purity to any buyer or valuer. All Alankar
        gold jewellery is hallmarked at a NABL-accredited BIS Assaying and
        Hallmarking Centre before dispatch.
      </p>
    ),
  },
  {
    question: "Can Alankar customise the ring size or bracelet length of a piece?",
    answer: (
      <>
        <p>
          Yes — sizing is a standard part of our service. When placing an
          order, a{" "}
          <strong className="text-brand-navy font-semibold">
            &ldquo;Custom Size&rdquo; request
          </strong>{" "}
          can be noted in the order remarks field at checkout, and our
          Concierge team will reach out to confirm precise measurements. We
          provide an Alankar Ring Sizer Kit free of charge upon request before
          purchase if you are uncertain of your size.
        </p>
        <p className="mt-3">
          For pieces already received, sizing alterations on most rings are
          complimentary within the first 30 days of delivery. Complex resizing
          involving stone-set shanks or significant size changes (more than 2
          full sizes) may incur a nominal master artisan fee, communicated
          transparently upfront.
        </p>
      </>
    ),
  },
  {
    question: "How should I care for my Alankar jewellery at home?",
    answer: (
      <>
        <p>
          Your Alankar piece is crafted to endure decades, but a little care
          preserves its brilliance:
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "Store pieces individually in the provided Alankar pouches or a fabric-lined compartment to prevent surface scratching.",
            "Remove jewellery before swimming, bathing, or exercising. Chlorine and saltwater can degrade gold alloys over time.",
            "Clean with a soft, lint-free cloth after wearing. For deeper cleaning, use a gentle dish soap diluted in warm water with a baby toothbrush.",
            "Have your diamonds professionally cleaned and prong-checked annually — we offer this service complimentary at any Alankar studio.",
            "Avoid direct contact with perfume, hairspray, and cosmetics, which can dull the surface of both gold and diamonds.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */

function FaqEntry({ item }: { item: FaqItem }) {
  return (
    <div className="py-8 border-b border-gray-100 last:border-none space-y-4">
      <h3
        className="text-base text-brand-navy font-semibold leading-snug"
        style={{ fontFamily: "var(--font-domine)" }}
      >
        {item.question}
      </h3>
      <div
        className="text-sm text-gray-600 leading-loose"
        style={{ fontFamily: "var(--font-mulish)" }}
      >
        {item.answer}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ Page
───────────────────────────────────────────────────────────────────────────── */

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Banner ──────────────────────────────────────────────────────── */}
      <section className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Client Knowledge Centre
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="text-sm text-brand-navy/60 leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Everything you need to know about ordering, our jewellery, and what
            to expect from the Alankar experience.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto py-20 px-8 space-y-20 w-full">

        {/* Category 1 */}
        <section className="space-y-0">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="luxury-tracking text-brand-gold text-[10px]">
              Orders &amp; Shipping
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {ORDERS_SHIPPING.map((item) => (
            <FaqEntry key={item.question} item={item} />
          ))}
        </section>

        {/* Category 2 */}
        <section className="space-y-0">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="luxury-tracking text-brand-gold text-[10px]">
              Jewellery Care &amp; Certification
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {JEWELLERY_CARE.map((item) => (
            <FaqEntry key={item.question} item={item} />
          ))}
        </section>

        {/* Concierge CTA */}
        <section className="bg-champagne-bg border-[0.5px] border-gray-200/60 p-10 space-y-4">
          <h2
            className="text-xl text-brand-navy"
            style={{ fontFamily: "var(--font-domine)" }}
          >
            Still have a question?
          </h2>
          <p
            className="text-sm text-gray-600 leading-relaxed"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Our Concierge team is available Monday through Saturday, 10am–7pm
            IST. Reach us directly at{" "}
            <a
              href="mailto:concierge@alankar.com"
              className="text-brand-gold underline underline-offset-2 hover:text-burnished-gold transition-colors"
            >
              concierge@alankar.com
            </a>{" "}
            or via our WhatsApp Concierge Line.
          </p>
          <Link href="/shop" className="btn-gold inline-block w-fit mt-2">
            Browse the Collection
          </Link>
        </section>

      </div>
    </div>
  );
}
