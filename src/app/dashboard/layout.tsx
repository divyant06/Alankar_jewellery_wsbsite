import React from "react";
import type { Metadata } from "next";
import DashboardNav from "./components/DashboardNav";

export const metadata: Metadata = {
  title: "Client Vault | Alankar Luxury Commerce",
  description: "Secure client dashboard for Alankar concierge services, active orders, and saved profiles.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-[calc(100vh-140px)]">
      {/* Sidebar Navigation */}
      <DashboardNav />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#FAFAFA] min-h-full">
        {children}
      </main>
    </div>
  );
}
