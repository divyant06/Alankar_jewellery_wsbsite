"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const NAV_LINKS = [
  { name: "Vault Overview", href: "/dashboard" },
  { name: "Order Concierge", href: "/dashboard/orders" },
  { name: "Address Directory", href: "/dashboard/addresses" },
  { name: "Security Settings", href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  function handleSignOut() {
    logout();
    router.push("/");
  }

  return (
    <aside className="w-64 bg-brand-navy min-h-full shrink-0 flex flex-col pt-16 pb-8 px-0 border-r border-slate-border/20">
      <div className="px-10 mb-16">
        <h2 
          className="text-brand-gold text-2xl font-semibold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Alankar
        </h2>
        <span className="text-[9px] tracking-[0.2em] text-champagne-accent/60 uppercase mt-1 block">
          Client Vault
        </span>
      </div>

      <nav className="flex flex-col space-y-2 w-full">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`py-4 pl-10 pr-6 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                isActive
                  ? "border-l-[3px] border-brand-gold text-brand-gold bg-white/5"
                  : "border-l-[3px] border-transparent text-gray-400 hover:text-champagne-accent hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-10">
        <button
          type="button"
          onClick={handleSignOut}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-sm"
        >
          Secure Sign Out
        </button>
      </div>
    </aside>
  );
}
