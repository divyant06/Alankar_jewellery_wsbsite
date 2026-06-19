/**
 * useGoldRateStore.ts
 *
 * Alankar Luxury Commerce — Live Gold Rate State Controller
 *
 * Manages real-time 24K, 22K, and 18K gold market prices per gram.
 * These values are consumed globally by:
 *  - The header GoldRateTicker banner
 *  - The ProductPricingEngine for dynamic variant pricing
 *  - The Checkout summary for final price validation
 *
 * Formula reference (from ALANKAR-PRD.md §2.A):
 *   Final Price = (Gold Weight × Current Purity Rate) + Stone Costs + Making Charges + 3% GST
 *
 * @module store/useGoldRateStore
 */

import { create } from "zustand";

/* ─────────────────────────────────────────────────────────────────────────────
   Type Definitions
───────────────────────────────────────────────────────────────────────────── */

/**
 * Strict union of the three supported gold purity grades.
 * Using a union (not `string`) ensures compile-time key safety when
 * referencing rate values throughout the pricing engine.
 */
export type GoldPurity = "24K" | "22K" | "18K";

/**
 * The gold rate record keyed strictly by GoldPurity.
 * Represents price-per-gram in INR (₹) for each purity grade.
 */
export type GoldRateRecord = Record<GoldPurity, number>;

/**
 * State shape of the GoldRateStore.
 */
export interface GoldRateState {
  /** Current gold prices per gram, keyed by purity grade. */
  rates: GoldRateRecord;

  /** True while an async fetch is in-flight. */
  isLoading: boolean;

  /**
   * ISO-8601 string timestamp of the last successful rate update.
   * Null on initial mount before the first fetch completes.
   */
  lastUpdated: string | null;
}

/**
 * Actions available on the GoldRateStore.
 */
export interface GoldRateActions {
  /**
   * Directly sets new gold rates (e.g., from a WebSocket push or API response).
   * Accepts a partial record so callers can update a single purity without
   * overwriting unchanged grades.
   *
   * @param newRates - A complete or partial mapping of purity → price-per-gram.
   */
  setRates: (newRates: Partial<GoldRateRecord>) => void;

  /**
   * Simulates fetching live gold rates from a market data API.
   * In production this will call the `/api/gold-rates` Next.js route
   * which proxies to the live data provider.
   *
   * Behaviour:
   *  1. Sets `isLoading: true` immediately.
   *  2. After a simulated 1.2s network delay, resolves with mock values.
   *  3. Updates `rates`, stamps `lastUpdated`, and sets `isLoading: false`.
   */
  fetchLiveRates: () => Promise<void>;
}

/** Combined store type used by create(). */
export type GoldRateStore = GoldRateState & GoldRateActions;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants — Default / Fallback Values
───────────────────────────────────────────────────────────────────────────── */

/**
 * Fallback gold rates (INR per gram) used on initial mount and in the
 * simulated fetch. Sourced from approximate market rates for June 2026.
 *
 * IMPORTANT: In production, always replace with live data from the
 * `/live_rates` Supabase table or a certified gold price API.
 */
const DEFAULT_GOLD_RATES: GoldRateRecord = {
  "24K": 7400,
  "22K": 6780,
  "18K": 5550,
};

/**
 * Simulated API response delay in milliseconds.
 * Represents a realistic ~1.2s round-trip to the market data provider.
 */
const SIMULATED_FETCH_DELAY_MS = 1200;

/* ─────────────────────────────────────────────────────────────────────────────
   Store Factory
───────────────────────────────────────────────────────────────────────────── */

/**
 * useGoldRateStore
 *
 * Global Zustand store for live gold market rate management.
 *
 * @example
 * // In a server component (read-only, no subscription):
 * const rates = useGoldRateStore.getState().rates;
 *
 * @example
 * // In a client component:
 * const { rates, isLoading, fetchLiveRates } = useGoldRateStore();
 *
 * @example
 * // Computing a product's final price:
 * const rate = rates["22K"]; // ₹6,780/gram
 * const finalPrice = (variant.weight_grams * rate) + variant.stone_cost_flat + makingCharge;
 * const finalPriceWithGST = finalPrice * 1.03;
 */
export const useGoldRateStore = create<GoldRateStore>((set, get) => ({
  /* ── Initial State ─────────────────────────────────────────────────────── */

  rates: DEFAULT_GOLD_RATES,
  isLoading: false,
  lastUpdated: null,

  /* ── Actions ───────────────────────────────────────────────────────────── */

  /**
   * setRates — Merges new rate values into the current record.
   *
   * Merging (rather than replacing) allows partial updates, e.g. a WebSocket
   * that only pushes a changed purity without resending all three grades.
   */
  setRates: (newRates: Partial<GoldRateRecord>): void => {
    set((state) => ({
      rates: {
        ...state.rates,
        ...newRates,
      },
      lastUpdated: new Date().toISOString(),
    }));
  },

  /**
   * fetchLiveRates — Simulated async market data fetch.
   *
   * Implements the gold rate fetch lifecycle:
   * loading → (delay) → success → idle
   *
   * Guard: If a fetch is already in-flight (`isLoading === true`), the
   * function returns early to prevent duplicate concurrent requests.
   *
   * TODO (Production): Replace the setTimeout simulation with a real fetch:
   *   const response = await fetch("/api/gold-rates");
   *   const data: GoldRateRecord = await response.json();
   *   get().setRates(data);
   */
  fetchLiveRates: async (): Promise<void> => {
    // Guard: prevent duplicate in-flight requests
    if (get().isLoading) {
      return;
    }

    set({ isLoading: true });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, SIMULATED_FETCH_DELAY_MS);
    });

    // Simulate slight live price variance around default values (±1–2%)
    // to mimic real market tick behaviour in the dev environment.
    const variance = (base: number, spreadPercent: number): number => {
      const spread = base * spreadPercent;
      const delta = (Math.random() - 0.5) * 2 * spread;
      return Math.round(base + delta);
    };

    const simulatedRates: GoldRateRecord = {
      "24K": variance(7400, 0.01),
      "22K": variance(6780, 0.01),
      "18K": variance(5550, 0.01),
    };

    set({
      rates: simulatedRates,
      isLoading: false,
      lastUpdated: new Date().toISOString(),
    });
  },
}));
