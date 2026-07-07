"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Shield, AlertTriangle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared styles — 16px (text-base) prevents iOS zoom on focus
───────────────────────────────────────────────────────────────────────────── */

const INPUT_CLASS =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 pt-1 text-base text-brand-navy placeholder:text-gray-300 transition-colors duration-200 font-medium";

const LABEL_CLASS =
  "block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3 group-focus-within:text-brand-gold transition-colors";

/* ─────────────────────────────────────────────────────────────────────────────
   Mock active sessions — in production, fetch from Supabase auth.admin.listSessions
───────────────────────────────────────────────────────────────────────────── */

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  Icon: React.FC<{ className?: string; strokeWidth?: number }>;
}

const SESSIONS: Session[] = [
  {
    id: "s1",
    device: "MacBook Pro",
    browser: "Chrome 126",
    location: "Mumbai, IN",
    lastActive: "Now — Active session",
    isCurrent: true,
    Icon: Monitor,
  },
  {
    id: "s2",
    device: "iPhone 15",
    browser: "Safari Mobile",
    location: "Mumbai, IN",
    lastActive: "3 hours ago",
    isCurrent: false,
    Icon: Smartphone,
  },
  {
    id: "s3",
    device: "Android Device",
    browser: "Chrome Mobile",
    location: "Jaipur, IN",
    lastActive: "2 days ago",
    isCurrent: false,
    Icon: Smartphone,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Security Settings Page
───────────────────────────────────────────────────────────────────────────── */

export default function SecuritySettingsPage() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  /* Password form state */
  const [pwForm, setPwForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError]     = useState("");

  /* Session revocation state */
  const [revoked, setRevoked] = useState(false);

  function updatePw(field: keyof typeof pwForm, value: string) {
    setPwForm((p) => ({ ...p, [field]: value }));
    setPwError("");
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) {
      setPwError("New password and confirmation do not match.");
      return;
    }
    if (pwForm.next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    // In production: call Supabase auth.updateUser({ password: pwForm.next })
    setPwSuccess(true);
    setPwForm({ current: "", next: "", confirm: "" });
  }

  function handleRevokeAll() {
    // In production: call Supabase auth.admin.signOut(userId, "others")
    setRevoked(true);
  }

  function handleGlobalSignOut() {
    // In production: call Supabase auth.signOut({ scope: "global" })
    logout();
    router.push("/");
  }

  return (
    <div className="p-4 md:p-12 space-y-8 md:space-y-12 max-w-3xl w-full">

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <header className="space-y-3">
        <h1
          className="text-2xl md:text-4xl text-brand-navy tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Security Preferences
        </h1>
        <p
          className="text-sm text-gray-500 leading-relaxed"
          style={{ fontFamily: "var(--font-mulish)" }}
        >
          Manage your Alankar Vault credentials and active device sessions.
          All changes take effect immediately and are logged for your security.
        </p>
      </header>

      {/* ── Password Update Card ─────────────────────────────────────── */}
      <section
        aria-label="Update password"
        className="bg-white border-[0.5px] border-gray-200/60 p-5 md:p-10 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)] space-y-8"
      >
        {/* Card header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="space-y-1">
            <h2
              className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium"
            >
              Vault Credentials
            </h2>
            <p
              className="text-xs text-gray-400 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Use a strong, unique password. We recommend 12+ characters with a
              mix of symbols, numbers, and capitalisation.
            </p>
          </div>
          <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.5} />
        </div>

        {pwSuccess ? (
          <div className="py-6 text-center space-y-3">
            <p
              className="text-sm text-brand-navy font-medium"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              ✓ Your credentials have been updated successfully.
            </p>
            <button
              type="button"
              onClick={() => setPwSuccess(false)}
              className="luxury-tracking text-[9px] text-brand-gold border border-brand-gold px-6 py-2.5 hover:bg-brand-gold hover:text-white transition-colors duration-200"
            >
              Update Again
            </button>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-8">
            {/* Current password */}
            <div className="flex flex-col group">
              <label htmlFor="sec-current" className={LABEL_CLASS}>
                Current Password
              </label>
              <input
                id="sec-current"
                type="password"
                required
                autoComplete="current-password"
                value={pwForm.current}
                onChange={(e) => updatePw("current", e.target.value)}
                placeholder="••••••••••••"
                className={INPUT_CLASS}
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>

            {/* New password */}
            <div className="flex flex-col group">
              <label htmlFor="sec-new" className={LABEL_CLASS}>
                New Password
              </label>
              <input
                id="sec-new"
                type="password"
                required
                autoComplete="new-password"
                value={pwForm.next}
                onChange={(e) => updatePw("next", e.target.value)}
                placeholder="••••••••••••"
                className={INPUT_CLASS}
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>

            {/* Confirm new password */}
            <div className="flex flex-col group">
              <label htmlFor="sec-confirm" className={LABEL_CLASS}>
                Confirm New Password
              </label>
              <input
                id="sec-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={pwForm.confirm}
                onChange={(e) => updatePw("confirm", e.target.value)}
                placeholder="••••••••••••"
                className={INPUT_CLASS}
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>

            {/* Inline error */}
            {pwError && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  {pwError}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full md:w-auto min-h-[44px] px-10 bg-brand-navy text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-colors duration-500 tracking-[0.2em] text-[10px] uppercase font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Update Credentials
            </button>
          </form>
        )}
      </section>

      {/* ── Session Management Card ──────────────────────────────────── */}
      <section
        aria-label="Active sessions"
        className="bg-white border-[0.5px] border-gray-200/60 p-5 md:p-10 shadow-[0_4px_40px_-2px_rgba(0,0,0,0.02)] space-y-8"
      >
        {/* Card header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="space-y-1">
            <h2 className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
              Active Sessions
            </h2>
            <p
              className="text-xs text-gray-400 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              These devices currently have an active Alankar Vault session.
              If you don't recognise a device, sign it out immediately.
            </p>
          </div>
        </div>

        {/* Session list */}
        <div className="flex flex-col divide-y divide-gray-100">
          {SESSIONS.map(({ id, device, browser, location, lastActive, isCurrent, Icon }) => (
            <div
              key={id}
              className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
            >
              {/* Device icon */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isCurrent ? "bg-brand-navy" : "bg-gray-100"
              }`}>
                <Icon
                  className={`w-4 h-4 ${isCurrent ? "text-brand-gold" : "text-gray-400"}`}
                  strokeWidth={1.5}
                />
              </div>

              {/* Session detail */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="text-sm font-medium text-brand-navy"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {device}
                  </span>
                  {isCurrent && (
                    <span className="luxury-tracking text-[8px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-sm">
                      This device
                    </span>
                  )}
                </div>
                <p
                  className="text-xs text-gray-400 leading-relaxed"
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  {browser} · {location}
                </p>
                <p
                  className={`text-[10px] mt-1 tracking-wide ${
                    isCurrent ? "text-brand-gold" : "text-gray-300"
                  }`}
                  style={{ fontFamily: "var(--font-mulish)" }}
                >
                  {lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Session actions */}
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
          {!revoked ? (
            <button
              type="button"
              onClick={handleRevokeAll}
              className="w-full py-4 text-left luxury-tracking text-[10px] text-amber-600 hover:text-amber-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              Sign out of all other devices
            </button>
          ) : (
            <p
              className="luxury-tracking text-[10px] text-green-600 py-4"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              ✓ All other sessions have been terminated.
            </p>
          )}

          <button
            type="button"
            onClick={handleGlobalSignOut}
            className="w-full py-4 text-left luxury-tracking text-[10px] text-red-500 hover:text-red-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded-sm border-t border-gray-100"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Sign out of ALL devices — including this one
          </button>
        </div>
      </section>

    </div>
  );
}
