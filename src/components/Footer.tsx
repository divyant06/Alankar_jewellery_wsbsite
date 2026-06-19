import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-champagne-accent pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-border/20 pb-12">
        
        {/* Brand Story Column */}
        <div className="flex flex-col space-y-6 md:col-span-4">
          <div className="relative h-12 w-32 filter brightness-0 invert opacity-90">
            <Image
              src="/Alankar-logo.jpg"
              alt="Alankar Luxury Commerce"
              fill
              className="object-contain object-left"
              sizes="128px"
            />
          </div>
          <p className="text-sm leading-relaxed opacity-80 pr-8">
            Discover our curated collection of handcrafted luxury jewellery. 
            Meticulously designed fine diamond rings, gold necklaces, and bespoke pieces crafted to absolute perfection.
          </p>
        </div>

        {/* Space Spacer */}
        <div className="md:col-span-2"></div>

        {/* Luxury Services Column */}
        <div className="flex flex-col space-y-5 md:col-span-3">
          <h5 className="luxury-tracking text-brand-gold text-xs">Luxury Services</h5>
          <nav className="flex flex-col space-y-3">
            <Link href="/services/bespoke" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Bespoke Design</Link>
            <Link href="/services/cleaning" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Jewellery Cleaning</Link>
            <Link href="/services/valuation" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Expert Valuation</Link>
            <Link href="/services/repair" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Restoration & Repair</Link>
          </nav>
        </div>

        {/* Customer Care Column */}
        <div className="flex flex-col space-y-5 md:col-span-3">
          <h5 className="luxury-tracking text-brand-gold text-xs">Customer Care</h5>
          <nav className="flex flex-col space-y-3">
            <Link href="/contact" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Contact Us</Link>
            <Link href="/shipping" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Shipping & Delivery</Link>
            <Link href="/returns" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">Returns & Exchanges</Link>
            <Link href="/faq" className="text-sm opacity-70 hover:text-brand-gold hover:opacity-100 transition-colors">FAQ</Link>
          </nav>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-8 pt-8 flex flex-col md:flex-row items-center justify-between opacity-50 text-xs">
        <p>&copy; {new Date().getFullYear()} Alankar Luxury Commerce. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-brand-gold hover:opacity-100 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-gold hover:opacity-100 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
