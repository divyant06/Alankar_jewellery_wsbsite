import React from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────────
   Inline SVG social icons — no lucide dependency required
───────────────────────────────────────────────────────────────────────────── */

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   Inline Indian floral / mandala SVG pattern
   Rendered as an absolute-positioned tile at opacity-5 so it reads as a
   subtle texture rather than a competing graphic element.
───────────────────────────────────────────────────────────────────────────── */

function FloralPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="floral"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* Central mandala bloom */}
          <circle cx="60" cy="60" r="28" fill="none" stroke="#c5a85c" strokeWidth="0.6" />
          <circle cx="60" cy="60" r="18" fill="none" stroke="#c5a85c" strokeWidth="0.4" />
          <circle cx="60" cy="60" r="8"  fill="none" stroke="#c5a85c" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="2"  fill="#c5a85c" />

          {/* Eight petal radials */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 60 + 10 * Math.cos(rad);
            const y1 = 60 + 10 * Math.sin(rad);
            const x2 = 60 + 27 * Math.cos(rad);
            const y2 = 60 + 27 * Math.sin(rad);
            // petal tip ellipse approximated as a small circle
            const px = 60 + 32 * Math.cos(rad);
            const py = 60 + 32 * Math.sin(rad);
            return (
              <g key={deg}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c5a85c" strokeWidth="0.5" />
                <circle cx={px} cy={py} r="3.5" fill="none" stroke="#c5a85c" strokeWidth="0.5" />
              </g>
            );
          })}

          {/* Corner quarter-blooms */}
          {[
            { cx: 0,   cy: 0   },
            { cx: 120, cy: 0   },
            { cx: 0,   cy: 120 },
            { cx: 120, cy: 120 },
          ].map(({ cx, cy }) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="12" fill="none" stroke="#c5a85c" strokeWidth="0.4" />
              <circle cx={cx} cy={cy} r="5"  fill="none" stroke="#c5a85c" strokeWidth="0.35" />
            </g>
          ))}

          {/* Mid-edge diamond accents */}
          {[
            { cx: 60, cy: 0   },
            { cx: 60, cy: 120 },
            { cx: 0,  cy: 60  },
            { cx: 120,cy: 60  },
          ].map(({ cx, cy }) => (
            <polygon
              key={`d-${cx}-${cy}`}
              points={`${cx},${cy - 5} ${cx + 5},${cy} ${cx},${cy + 5} ${cx - 5},${cy}`}
              fill="none"
              stroke="#c5a85c"
              strokeWidth="0.5"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Social links — env-driven with fallback href="#"
───────────────────────────────────────────────────────────────────────────── */

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "#",
    Icon: IconInstagram,
  },
  {
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "#",
    Icon: IconYoutube,
  },
  {
    label: "X (Twitter)",
    href: process.env.NEXT_PUBLIC_SOCIAL_X ?? "#",
    Icon: IconX,
  },
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "#",
    Icon: IconLinkedin,
  },
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "#",
    Icon: IconFacebook,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className="relative bg-brand-navy text-champagne-accent pt-16 pb-8 mt-auto overflow-hidden">

      {/* Floral mandala background texture */}
      <FloralPattern />

      {/* Main grid — relative so it sits above the pattern */}
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-border/20 pb-12">

        {/* ── Brand Story Column (4 cols) ──────────────────────────────── */}
        <div className="flex flex-col space-y-6 md:col-span-4">
          <div className="relative h-12 w-32 opacity-90">
            <Image
              src="/Alankar-logo.jpg"
              alt="Alankar Luxury Commerce"
              fill
              className="object-contain object-left"
              sizes="128px"
            />
          </div>
          <p className="text-sm leading-relaxed opacity-70 pr-8" style={{ fontFamily: "var(--font-mulish)" }}>
            Discover our curated collection of handcrafted luxury jewellery.
            Meticulously designed fine diamond rings, gold necklaces, and bespoke
            pieces crafted to absolute perfection.
          </p>
        </div>

        {/* ── Connect With Us — Social Column (2 cols) ─────────────────── */}
        <div className="flex flex-col space-y-6 md:col-span-2">
          <h5
            className="text-[10px] tracking-[0.2em] text-brand-gold uppercase"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Connect With Us
          </h5>
          <div className="flex flex-col space-y-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Alankar on ${label}`}
                className="flex items-center gap-3 text-sm opacity-60 hover:text-brand-gold hover:opacity-100 transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 shrink-0 group-hover:text-brand-gold transition-colors" />
                <span style={{ fontFamily: "var(--font-mulish)" }}>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Luxury Services Column (3 cols) ──────────────────────────── */}
        <div className="flex flex-col space-y-5 md:col-span-3">
          <h5
            className="luxury-tracking text-brand-gold text-xs"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Luxury Services
          </h5>
          <nav className="flex flex-col space-y-3">
            <Link href="/services/bespoke"      className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Bespoke Design</Link>
            <Link href="/services/cleaning"     className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Jewellery Cleaning</Link>
            <Link href="/services/valuation"    className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Expert Valuation</Link>
            <Link href="/services/restoration"  className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Restoration &amp; Repair</Link>
          </nav>
        </div>

        {/* ── Customer Care Column (3 cols) ─────────────────────────────── */}
        <div className="flex flex-col space-y-5 md:col-span-3">
          <h5
            className="luxury-tracking text-brand-gold text-xs"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Customer Care
          </h5>
          <nav className="flex flex-col space-y-3">
            <Link href="/contact"           className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Contact Us</Link>
            <Link href="/dashboard/orders"  className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Shipping &amp; Delivery</Link>
            <Link href="/returns"           className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Returns &amp; Exchanges</Link>
            <Link href="/faq"               className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">FAQ</Link>
          </nav>
        </div>

      </div>

      {/* ── Footer Bottom Bar ────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-8 pt-8 flex flex-col md:flex-row items-center justify-between opacity-50 text-xs">
        <p>&copy; {new Date().getFullYear()} Alankar Luxury Commerce. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-brand-gold hover:opacity-100 transition-colors">Privacy Policy</Link>
          <Link href="/terms"   className="hover:text-brand-gold hover:opacity-100 transition-colors">Terms of Service</Link>
        </div>
      </div>

    </footer>
  );
}
