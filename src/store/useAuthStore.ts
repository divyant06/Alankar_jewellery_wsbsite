/**
 * useAuthStore.ts — Alankar Global Authentication State
 *
 * Lightweight Zustand store tracking whether the current browser session
 * has an authenticated client. In production, pair with Supabase's
 * onAuthStateChange listener to keep this in sync with the JWT session.
 *
 * @module store/useAuthStore
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

export interface AuthState {
  /** true when a client session is active */
  isAuthenticated: boolean;
}

export interface AuthActions {
  /** Mark the session as authenticated (call after successful sign-in) */
  login: () => void;
  /** Destroy the session state (call on sign-out) */
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;

/* ─────────────────────────────────────────────────────────────────────────────
   Store
   Uses `persist` so that a page refresh doesn't log the user out.
   In production, replace the localStorage flag with Supabase's session cookie.
───────────────────────────────────────────────────────────────────────────── */

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: () => set({ isAuthenticated: true }),

      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "alankar-auth", // localStorage key
    }
  )
);
