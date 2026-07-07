import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alankar Fine Jewellery",
  description:
    "Alankar's Privacy Policy — how we collect, protect, and handle your personal and payment data, including secure Razorpay processing and 256-bit SSL encryption.",
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
   Privacy Policy Page
───────────────────────────────────────────────────────────────────────────── */

export default function PrivacyPage() {
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
            Privacy Policy
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
            Alankar Luxury Commerce Private Limited (&ldquo;Alankar&rdquo;,
            &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is
            committed to protecting your personal information and your right to
            privacy. This Privacy Policy explains what information we collect,
            why we collect it, how we use and protect it, and the choices
            available to you. It applies to all information collected through
            our website, mobile applications, and any related services,
            including all transactions processed via the Platform.
          </p>
          <p className="mt-4">
            By using the Alankar Platform, you acknowledge and consent to the
            data practices described in this Policy. If you do not agree with
            any part of this Policy, you must discontinue use of the Platform.
          </p>
        </div>

        <LegalSection number="01" title="Information We Collect">
          <p>
            We collect personal information that you voluntarily provide when
            using our Platform. This includes:
          </p>
          <ul className="space-y-2 list-none">
            {[
              "Identity data: full legal name, date of birth (for account verification purposes).",
              "Contact data: email address, phone number, and delivery address(es).",
              "Transaction data: details of products purchased, order amounts, and payment references.",
              "Technical data: IP address, browser type, device identifiers, pages visited, and session duration, collected automatically via server logs and analytics tools.",
              "Communication data: records of correspondence with our Concierge team via email or chat.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            We do not collect or store any sensitive personal data such as
            racial or ethnic origin, political opinions, religious beliefs, or
            biometric data.
          </p>
        </LegalSection>

        <LegalSection number="02" title="Payment Processing &amp; Financial Data Security">
          <p>
            All payment transactions on the Alankar Platform are processed
            exclusively through{" "}
            <strong className="text-brand-navy font-semibold">Razorpay</strong>,
            a PCI DSS Level 1 certified payment gateway regulated by the Reserve
            Bank of India (RBI). Alankar does not at any point collect, store,
            process, or transmit your credit card number, debit card number,
            UPI credentials, or net banking credentials.
          </p>
          <p>
            When you initiate a payment, you are transacting directly with
            Razorpay's secure payment infrastructure. All payment data is
            encrypted in transit using{" "}
            <strong className="text-brand-navy font-semibold">
              256-bit TLS/SSL encryption
            </strong>{" "}
            and tokenised at rest on Razorpay's PCI-compliant servers. Alankar
            receives only the payment confirmation status and a transaction
            reference ID — never the underlying financial credentials.
          </p>
          <p>
            The only financial record held by Alankar is the order amount, the
            Razorpay Order ID, and the payment confirmation timestamp — data
            necessary for order fulfilment, statutory accounting, and refund
            processing. This data is stored on our Supabase cloud database
            instance, which is protected by row-level security policies,
            encrypted at rest, and accessible only to authorised internal
            systems.
          </p>
        </LegalSection>

        <LegalSection number="03" title="How We Use Your Information">
          <p>
            We use your personal information for the following lawful purposes:
          </p>
          <ul className="space-y-2 list-none">
            {[
              "To process and fulfil your jewellery orders, including liaison with our artisan teams and dispatch partners.",
              "To communicate order status updates, dispatch notifications, and delivery tracking information.",
              "To operate our Concierge service and respond to your enquiries, returns, or exchange requests.",
              "To personalise your experience on the Platform and make product recommendations relevant to your purchase history.",
              "To comply with applicable Indian legal and statutory obligations, including GST invoicing and anti-money laundering regulations.",
              "To detect and prevent fraudulent transactions or misuse of the Platform.",
              "To send marketing communications about new collections, exclusive events, and concierge appointments — strictly only where you have opted in. You may unsubscribe at any time.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection number="04" title="Data Sharing &amp; Third Parties">
          <p>
            Alankar does not sell, rent, or trade your personal information to
            any third party for marketing or commercial purposes. We share your
            data only with the following categories of trusted service providers
            under strict confidentiality agreements and only to the extent
            necessary for the stated purpose:
          </p>
          <ul className="space-y-2 list-none mt-2">
            {[
              "Razorpay Financial Solutions Pvt. Ltd. — for secure payment processing.",
              "Supabase Inc. — for encrypted cloud database storage and account management.",
              "Authorised logistics and courier partners — solely for order dispatch and delivery, receiving only the minimum necessary shipping information.",
              "Legal and regulatory authorities — where required by law, court order, or regulatory obligation.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection number="05" title="Your Rights &amp; Data Retention">
          <p>
            In accordance with the Information Technology Act, 2000 and the
            Digital Personal Data Protection Act, 2023 (India), you have the
            following rights regarding your personal information held by
            Alankar:
          </p>
          <ul className="space-y-2 list-none mt-2">
            {[
              "Right of access: to request a copy of all personal data we hold about you.",
              "Right of correction: to request correction of any inaccurate or incomplete data.",
              "Right of erasure: to request deletion of your personal data, subject to our statutory retention obligations.",
              "Right to withdraw consent: to withdraw consent to marketing communications at any time by clicking 'unsubscribe' in any email or writing to us.",
              "Right to grievance redressal: to lodge a complaint with our Data Protection Officer if you believe your data has been mishandled.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-gold shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            We retain personal data only for as long as necessary to fulfil the
            purpose for which it was collected, or as required by applicable
            law. Transaction records are retained for a minimum of 8 years to
            comply with Indian financial and taxation regulations.
          </p>
          <p>
            To exercise any of your rights or to contact our Data Protection
            Officer, write to us at{" "}
            <a
              href="mailto:privacy@alankar.com"
              className="text-brand-gold underline underline-offset-2 hover:text-burnished-gold transition-colors"
            >
              privacy@alankar.com
            </a>
            . We will respond to all verified requests within 30 days.
          </p>
        </LegalSection>

      </div>
    </div>
  );
}
