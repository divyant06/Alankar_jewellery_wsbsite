"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/* ─────────────────────────────────────────────────────────────────────────────
   Inline Jaali SVG — traditional Indian geometric lattice tile
───────────────────────────────────────────────────────────────────────────── */

function JaaliPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="jaali"
          x="0"
          y="0"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <polygon points="32,4 60,32 32,60 4,32" fill="none" stroke="#c5a85c" strokeWidth="0.8" />
          <polygon points="32,14 50,32 32,50 14,32" fill="none" stroke="#c5a85c" strokeWidth="0.5" />
          <rect x="0" y="0" width="8" height="8" fill="none" stroke="#c5a85c" strokeWidth="0.5" />
          <rect x="56" y="0" width="8" height="8" fill="none" stroke="#c5a85c" strokeWidth="0.5" />
          <rect x="0" y="56" width="8" height="8" fill="none" stroke="#c5a85c" strokeWidth="0.5" />
          <rect x="56" y="56" width="8" height="8" fill="none" stroke="#c5a85c" strokeWidth="0.5" />
          <line x1="32" y1="0" x2="32" y2="64" stroke="#c5a85c" strokeWidth="0.3" />
          <line x1="0" y1="32" x2="64" y2="32" stroke="#c5a85c" strokeWidth="0.3" />
          <line x1="0" y1="0" x2="14" y2="14" stroke="#c5a85c" strokeWidth="0.3" />
          <line x1="64" y1="0" x2="50" y2="14" stroke="#c5a85c" strokeWidth="0.3" />
          <line x1="0" y1="64" x2="14" y2="50" stroke="#c5a85c" strokeWidth="0.3" />
          <line x1="64" y1="64" x2="50" y2="50" stroke="#c5a85c" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#jaali)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared field styles
───────────────────────────────────────────────────────────────────────────── */

const INPUT_CLASS =
  "w-full bg-transparent border-b border-gray-300 focus:border-brand-gold outline-none pb-2 text-sm text-brand-navy placeholder:text-gray-300 transition-colors duration-200";

const LABEL_CLASS =
  "block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3 group-focus-within:text-brand-gold transition-colors";

/* ─────────────────────────────────────────────────────────────────────────────
   Mode type
───────────────────────────────────────────────────────────────────────────── */

type AuthMode = "signin" | "signup";

/* ─────────────────────────────────────────────────────────────────────────────
   Login / Registration Page
───────────────────────────────────────────────────────────────────────────── */

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [mode, setMode] = useState<AuthMode>("signin");
  const [isLoading, setIsLoading] = useState(false);

  /* Sign-in fields */
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  /* Sign-up fields */
  const [signUpName, setSignUpName] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // In production: call Supabase auth.signInWithPassword / auth.signUp
    // For now: simulate a 700ms network round-trip then authenticate
    await new Promise((resolve) => setTimeout(resolve, 700));

    login();
    router.push("/dashboard");
  }

  const isSignIn = mode === "signin";

  return (
    <div className="min-h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left Panel — Brand Identity (desktop only) ──────────────────── */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-brand-navy overflow-hidden">
        <JaaliPattern />

        <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center">
          {/* Alankar logo — inverted so it reads white on navy */}
          <Image
            src="/Alankar-logo.jpg"
            alt="Alankar Fine Jewellery"
            width={120}
            height={120}
            className="object-contain rounded-sm invert opacity-90"
            priority
          />

          {/* Gold divider ornament */}
          <div className="flex items-center gap-4 w-48">
            <div className="flex-1 h-px bg-brand-gold/40" />
            <div className="h-1 w-1 rounded-full bg-brand-gold" />
            <div className="flex-1 h-px bg-brand-gold/40" />
          </div>

          {/* Tagline */}
          <p
            className="text-[13px] tracking-[0.25em] text-champagne-accent/70 uppercase leading-relaxed"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Heritage Craftsmanship.
            <br />
            Modern Elegance.
          </p>

          {/* Sub-descriptor */}
          <p
            className="text-xs text-champagne-accent/40 max-w-xs leading-relaxed mt-2"
            style={{ fontFamily: "var(--font-mulish)" }}
          >
            Your private vault — a secure portal to your bespoke commissions,
            exclusive appointments, and lifetime service records.
          </p>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-navy/60 via-transparent to-brand-navy/60 pointer-events-none" />
      </div>

      {/* ── Right Panel — Form ──────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center bg-white px-8 py-16">
        <div className="w-full max-w-md">

          {/* Mobile logo — only shown below lg */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Image
              src="/Alankar-logo.jpg"
              alt="Alankar Fine Jewellery"
              width={128}
              height={40}
              className="object-contain"
            />
          </div>

          {/* ── Mode toggle tabs ──────────────────────────────────────── */}
          <div className="flex border-b border-gray-200 mb-10">
            {(["signin", "signup"] as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 pb-4 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-none ${
                  mode === m
                    ? "text-brand-navy border-b-2 border-brand-gold -mb-px font-semibold"
                    : "text-gray-400 hover:text-brand-navy"
                }`}
                style={{ fontFamily: "var(--font-mulish)" }}
              >
                {m === "signin" ? "Secure Sign In" : "Create Vault Account"}
              </button>
            ))}
          </div>

          {/* ── Form heading ─────────────────────────────────────────── */}
          <div className="mb-8 space-y-2">
            <h1
              className="text-3xl text-brand-navy"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {isSignIn ? "Access Your Vault" : "Open Your Vault"}
            </h1>
            <p
              className="text-xs text-gray-400 leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {isSignIn
                ? "Enter your credentials to access your private Alankar client dashboard and concierge services."
                : "Create your private vault account for bespoke commissions, exclusive access, and a lifetime of artisan service."}
            </p>
          </div>

          {/* ── Form ─────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Sign-up only fields */}
            {!isSignIn && (
              <>
                <div className="flex flex-col relative group">
                  <label htmlFor="signup-name" className={LABEL_CLASS}>
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="Isabella Sterling"
                    className={INPUT_CLASS}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                </div>

                <div className="flex flex-col relative group">
                  <label htmlFor="signup-phone" className={LABEL_CLASS}>
                    Phone Number
                  </label>
                  <input
                    id="signup-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={INPUT_CLASS}
                    style={{ fontFamily: "var(--font-mulish)" }}
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="flex flex-col relative group">
              <label
                htmlFor={isSignIn ? "signin-email" : "signup-email"}
                className={LABEL_CLASS}
              >
                Secure Email
              </label>
              <input
                id={isSignIn ? "signin-email" : "signup-email"}
                type="email"
                required
                autoComplete="email"
                value={isSignIn ? signInEmail : signUpEmail}
                onChange={(e) =>
                  isSignIn
                    ? setSignInEmail(e.target.value)
                    : setSignUpEmail(e.target.value)
                }
                placeholder="isabella@example.com"
                className={INPUT_CLASS}
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative group">
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor={isSignIn ? "signin-password" : "signup-password"}
                  className={`${LABEL_CLASS} mb-0`}
                >
                  Password
                </label>
                {isSignIn && (
                  <Link
                    href="/forgot-password"
                    className="luxury-tracking text-[8px] text-gray-400 hover:text-brand-gold transition-colors duration-200"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <input
                id={isSignIn ? "signin-password" : "signup-password"}
                type="password"
                required
                autoComplete={isSignIn ? "current-password" : "new-password"}
                value={isSignIn ? signInPassword : signUpPassword}
                onChange={(e) =>
                  isSignIn
                    ? setSignInPassword(e.target.value)
                    : setSignUpPassword(e.target.value)
                }
                placeholder="••••••••••••"
                className={INPUT_CLASS}
                style={{ fontFamily: "var(--font-mulish)" }}
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 mt-2 bg-brand-navy text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-colors duration-500 tracking-[0.25em] text-[10px] uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {isLoading
                ? "Verifying…"
                : isSignIn
                ? "Enter Vault"
                : "Create Vault Account"}
            </button>
          </form>

          {/* Footer toggle prompt */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p
              className="text-xs text-gray-400"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {isSignIn ? (
                <>
                  New to Alankar?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-brand-gold hover:text-burnished-gold underline underline-offset-2 transition-colors"
                  >
                    Request an Invitation.
                  </button>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-brand-gold hover:text-burnished-gold underline underline-offset-2 transition-colors"
                  >
                    Sign in to your Vault.
                  </button>
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
