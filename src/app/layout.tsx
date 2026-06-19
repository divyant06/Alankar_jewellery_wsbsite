/**
 * layout.tsx — Alankar Root Layout
 *
 * Registers the Domine (heading serif) and Mulish (body sans) Google Fonts,
 * injects them as CSS custom properties consumed by globals.css @theme,
 * and sets the document-wide metadata for the Alankar luxury platform.
 */

import type { Metadata, Viewport } from "next";
import { Domine, Mulish, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

/* ─────────────────────────────────────────────────────────────────────────────
   Font Registration — matches globals.css @theme font token names
───────────────────────────────────────────────────────────────────────────── */

/** Domine — editorial serif for headings, brand display, and product names */
const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-domine-loaded",
  display: "swap",
  preload: true,
});

/** Mulish — clean geometric sans for body, pricing, labels, and forms */
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish-loaded",
  display: "swap",
  preload: true,
});

/** Playfair Display — dramatic editorial hero statements and large pull-quotes only */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair-loaded",
  display: "swap",
  preload: false,
});

/* ─────────────────────────────────────────────────────────────────────────────
   Metadata
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: "Alankar — Luxury Jewellery",
    template: "%s | Alankar Jewellery",
  },
  description:
    "Discover Alankar's curated collection of handcrafted luxury jewellery — fine diamond rings, gold necklaces, and bespoke pieces crafted to perfection.",
  keywords: [
    "luxury jewellery",
    "diamond rings",
    "gold necklaces",
    "fine jewellery India",
    "22K gold jewellery",
    "18K diamond jewellery",
    "Alankar",
  ],
  authors: [{ name: "Alankar Jewellery" }],
  creator: "Alankar Jewellery",
  metadataBase: new URL("https://alankar.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Alankar Jewellery",
    title: "Alankar — Luxury Jewellery",
    description:
      "Discover Alankar's curated collection of handcrafted luxury jewellery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020b1e",
  width: "device-width",
  initialScale: 1,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        domine.variable,
        mulish.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-navy">
        <Header />
        {/* CartDrawer lives here so it is globally accessible on every route */}
        <CartDrawer />
        <main className="grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
