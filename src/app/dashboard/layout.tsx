"use client";

/**
 * DashboardLayout — Mobile-first client shell
 *
 * Desktop (md+): sidebar + content side-by-side
 * Mobile (<md):  sidebar fully hidden; a top topbar with a hamburger icon
 *                slides out an off-canvas nav drawer over the page.
 */

import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import DashboardNav from "./components/DashboardNav";

const NAV_LINKS = [
  { name: "Vault Overview",    href: "/dashboard" },
  { name: "Order Concierge",   href: "/dashboard/orders" },
  { name: "Address Directory", href: "/dashboard/addresses" },
  { name: "Security Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router   = useRouter();
  const logout   = useAuthStore((state) => state.logout);

  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Lock body scroll when drawer is open on mobile */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* Close drawer whenever the route changes */
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  function handleSignOut() {
    logout();
    router.push("/");
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-140px)]">

      {/* ── Desktop Sidebar (hidden on mobile) ──────────────────────────── */}
      <div className="hidden md:flex">
        <DashboardNav />
      </div>

      {/* ── Mobile Top-bar (visible only below md) ──────────────────────── */}
      <div className="md:hidden flex items-center justify-between bg-brand-navy px-4 py-3 sticky top-0 z-40 border-b border-white/10">
        {/* Brand identity */}
        <div>
          <span
            className="text-brand-gold text-lg font-semibold leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Alankar
          </span>
          <span className="block text-[8px] tracking-[0.2em] text-champagne-accent/50 uppercase mt-0.5">
            Client Vault
          </span>
        </div>

        {/* Page label — shows the current section name */}
        <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400">
          {NAV_LINKS.find((l) => l.href === pathname)?.name ?? "Dashboard"}
        </span>

        {/* Hamburger button */}
        <button
          type="button"
          aria-label={drawerOpen ? "Close vault menu" : "Open vault menu"}
          aria-expanded={drawerOpen}
          aria-controls="dashboard-mobile-nav"
          onClick={() => setDrawerOpen((o) => !o)}
          className="flex items-center justify-center w-11 h-11 text-champagne-accent hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
        >
          {drawerOpen
            ? <X className="w-5 h-5" strokeWidth={1.5} />
            : <Menu className="w-5 h-5" strokeWidth={1.5} />
          }
        </button>
      </div>

      {/* ── Mobile Off-canvas Nav Drawer ────────────────────────────────── */}
      {/*
        slide-in from the left over the content area.
        top-[108px] = header (88px) + mobile top-bar (≈56px).
        Using an approximation here; sticky top-bar is position:sticky so
        the fixed drawer should start below both bars.
      */}
      <>
        <div
          id="dashboard-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Vault navigation"
          className={`
            fixed inset-0 z-50 bg-brand-navy flex flex-col pt-8 pb-10
            transition-transform duration-300 ease-in-out
            md:hidden
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-8 mb-10">
            <div>
              <span
                className="text-brand-gold text-2xl font-semibold leading-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Alankar
              </span>
              <span className="block text-[9px] tracking-[0.2em] text-champagne-accent/60 uppercase mt-1">
                Client Vault
              </span>
            </div>
            <button
              type="button"
              aria-label="Close vault menu"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center w-11 h-11 text-champagne-accent hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col w-full space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`py-5 pl-8 pr-6 text-[12px] tracking-[0.15em] uppercase transition-all duration-200 ${
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

          {/* Sign out at bottom */}
          <div className="mt-auto px-8">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-sm py-2"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
              Secure Sign Out
            </button>
          </div>
        </div>

        {/* Scrim — click to close */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 bg-[#FAFAFA] min-h-full w-full">
        {children}
      </main>

    </div>
  );
}
