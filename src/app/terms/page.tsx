import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Alankar Fine Jewellery",
  description:
    "Alankar's Terms of Service governing purchases, live gold market pricing, intellectual property, liability, and dispute resolution for all transactions on the Alankar platform.",
};

const EFFECTIVE_DATE = "1 October 2024";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared section component
───────────────────────────────────────────────────────────────────────────── */

function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 pt-12 border-t border-gray-100">
      <div className="flex items-baseline gap-4">
        <span className="luxury-tracking text-brand-gold text-[10px] shrink-0">
          {number}
        </span>
        <h2
          className="text-xl text-brand-navy leading-snug"
          style={{ fontFamily: "var(--font-domine)" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="text-sm text-gray-600 leading-loose space-y-4 pl-10"
        style={{ fontFamily: "var(--font-mulish)" }}
      >
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Terms of Service Page
───────────────────────────────────────────────────────────────────────────── */

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full">

      {/* Banner */}
      <section className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="luxury-tracking text-brand-gold text-[10px] block">
            Legal Documentation
          </span>
          <h1
            className="text-4xl lg:text-5xl text-brand-navy leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Terms of Service
          </h1>
          <p
            className="text-sm text-brand-navy/60"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-3xl mx-auto py-20 px-8 space-y-0 w-full">

        {/* Preamble */}
        <div
          className="text-sm text-gray-600 leading-loose pb-12"
          style={{ fontFamily: "var(--font-mulish)" }}
        >
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally
            binding agreement between you (&ldquo;Client&rdquo;) and Alankar
            Luxury Commerce Private Limited (&ldquo;Alankar&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, &ldquo;us&rdquo;), a company incorporated under
            the Companies Act, 2013, governing your access to and use of the
            Alankar website, mobile applications, and related services
            (collectively, the &ldquo;Platform&rdquo;). By placing an order or
            creating an account on the Platform, you confirm that you have read,
            understood, and agree to be bound by these Terms in their entirety.
            If you do not agree, you must not use the Platform.
          </p>
        </div>

        <LegalSection number="01" title="Product Descriptions &amp; Accuracy">
          <p>
            We take extraordinary care to represent our jewellery accurately.
            Product images are captured under controlled studio lighting to
            reproduce the true appearance of each piece as faithfully as
            possible. However, variations in monitor calibration, screen
            technology, and photographic conditions may cause the colours,
            textures, and brilliance of diamonds and gold to appear slightly
            different on your device. Such variations do not constitute a
            misrepresentation.
          </p>
          <p>
            All stated weights (gold, diamond carat) reflect the values
            confirmed on the applicable BIS Hallmark Certificate and GIA
            Grading Report respectively. Alankar reserves the right to
            correct typographical errors in pricing, descriptions, or
            specifications at any time prior to order confirmation.
          </p>
        </LegalSection>

        <LegalSection number="02" title="Live Gold Market Pricing">
          <p>
            All product prices displayed on the Alankar Platform are
            dynamically calculated in real time and are subject to the
            live spot price of gold as quoted on the Multi Commodity Exchange
            of India (MCX). Gold prices fluctuate continuously in response to
            international commodity markets, currency movements, and macroeconomic
            conditions. Alankar does not set or control the gold market rate.
          </p>
          <p>
            The price you are charged is the price confirmed at the moment your
            payment is successfully processed and your Razorpay order ID is
            generated. Prices visible on product pages or in your cart prior to
            payment completion are indicative and may change. Alankar is not
            liable for any price increase occurring between the time of browsing
            and the time of payment due to gold market fluctuations.
          </p>
          <p>
            All prices displayed include the applicable 3% Goods and Services
            Tax (GST) on precious metal jewellery as mandated by the Government
            of India. Additional taxes, duties, or customs charges applicable to
            international deliveries are the sole responsibility of the recipient.
          </p>
        </LegalSection>

        <LegalSection number="03" title="Order Confirmation &amp; Cancellation">
          <p>
            An order is only considered confirmed upon receipt of a payment
            confirmation from our payment processor (Razorpay) and the
            subsequent issuance of an Alankar Order Confirmation email containing
            your unique commission reference number. Acknowledgment of receipt
            of an order does not constitute acceptance.
          </p>
          <p>
            Alankar reserves the right to refuse or cancel any order at its
            sole discretion, including but not limited to cases of pricing
            errors, suspected fraudulent activity, or stock unavailability. In
            such cases, any amount charged will be fully refunded within 5–7
            business days.
          </p>
          <p>
            Client-initiated cancellations are accepted within 24 hours of
            order confirmation without penalty. After this window, custom and
            made-to-order pieces cannot be cancelled, as the artisan crafting
            process will have commenced.
          </p>
        </LegalSection>

        <LegalSection number="04" title="Intellectual Property">
          <p>
            All content on the Alankar Platform, including but not limited to
            jewellery designs, brand identity, photography, editorial copy,
            graphic assets, and the Alankar name and logo, is the exclusive
            intellectual property of Alankar Luxury Commerce Private Limited
            and is protected by applicable Indian and international copyright,
            trademark, and design laws.
          </p>
          <p>
            You may not reproduce, republish, distribute, sell, or exploit any
            content from the Platform without prior written consent from
            Alankar. Unauthorised use may result in civil and criminal liability.
            Requests for licensing or collaboration should be directed to{" "}
            <a
              href="mailto:legal@alankar.com"
              className="text-brand-gold underline underline-offset-2 hover:text-burnished-gold transition-colors"
            >
              legal@alankar.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection number="05" title="Limitation of Liability &amp; Governing Law">
          <p>
            To the maximum extent permitted by applicable law, Alankar's
            aggregate liability to any Client for any claim arising from use of
            the Platform or purchase of any product shall be limited to the
            amount paid for the specific transaction giving rise to that claim.
            Alankar shall not be liable for any indirect, incidental, punitive,
            or consequential damages, including loss of profits, goodwill, or
            data, even if advised of the possibility of such damages.
          </p>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India. Any dispute arising in connection with these
            Terms shall be subject to the exclusive jurisdiction of the competent
            courts located in Jaipur, Rajasthan, India.
          </p>
          <p>
            Alankar reserves the right to amend these Terms at any time. The
            revised version will be posted on this page with an updated effective
            date. Continued use of the Platform after such changes constitutes
            acceptance of the new Terms.
          </p>
        </LegalSection>

      </div>
    </div>
  );
}
