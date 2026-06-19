/**
 * useCartStore.ts
 *
 * Alankar Luxury Commerce — Shopping Cart State Controller
 *
 * Manages the jewelry cart with full purity-variation awareness.
 * A CartItem is a unique combination of (product id + selected purity),
 * so the same product in 18K and 22K counts as two distinct line items.
 *
 * Controls the slide-out cart sheet via `isOpen` so the UI layer
 * never needs local state for cart visibility.
 *
 * @module store/useCartStore
 */

import { create } from "zustand";

/* ─────────────────────────────────────────────────────────────────────────────
   Type Definitions
───────────────────────────────────────────────────────────────────────────── */

/**
 * Supported gold purity selections for a jewelry product variant.
 * Intentionally lowercase to match the `product_variants.purity` column
 * in the Supabase schema (ALANKAR-PRD.md §3).
 */
export type SelectedPurity = "18k" | "22k";

/**
 * CartItem — A single line item in the Alankar shopping cart.
 *
 * Identity is determined by the composite key (id + selectedPurity).
 * This allows the same product SKU to appear in multiple purities as
 * separate, independently quantifiable items.
 */
export interface CartItem {
  /** Unique product identifier. Maps to `products.id` in Supabase. */
  id: string;

  /** Human-readable product name, e.g., "Cascade Diamond Ring". */
  name: string;

  /**
   * Stock Keeping Unit — the specific variant SKU.
   * Maps to the encoded string from `product_variants`.
   * Example: "RING-SOL-22K-1.5G"
   */
  sku: string;

  /**
   * Jewelry category for analytics, filtering, and display grouping.
   * Example: "Rings" | "Necklaces" | "Bracelets" | "Earrings"
   */
  category: string;

  /**
   * The purity grade the customer has selected for this line item.
   * Drives pricing — the finalPrice must be pre-calculated against
   * the gold rate at the time of cart addition.
   */
  selectedPurity: SelectedPurity;

  /**
   * Final computed price for ONE unit of this item in INR (₹).
   * Calculation (from ALANKAR-PRD.md §2.A):
   *   (Gold Weight × Purity Rate) + Stone Costs + Making Charges + 3% GST
   *
   * This is stored at add-time so cart totals reflect the rate at
   * selection, not a fluctuating live rate post-addition.
   */
  finalPrice: number;

  /** Number of units of this specific variant in the cart. */
  quantity: number;

  /**
   * URL of the primary product image for cart UI rendering.
   * Maps to `product_variants.image_url`.
   */
  imageUrl: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Derived Helpers — Computed from cart state (not stored in state)
───────────────────────────────────────────────────────────────────────────── */

/**
 * CartSummary — A snapshot of aggregate cart values.
 * Computed on-demand rather than stored to avoid stale cached totals.
 */
export interface CartSummary {
  /** Total number of line items (distinct product+purity combinations). */
  lineItemCount: number;

  /** Total unit count across all line items (sum of quantities). */
  totalQuantity: number;

  /** Subtotal before any discounts or additional charges. */
  subtotal: number;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Store State Interface
───────────────────────────────────────────────────────────────────────────── */

export interface CartState {
  /** The array of distinct cart line items. */
  cart: CartItem[];

  /**
   * Controls visibility of the slide-out cart sheet.
   * When true, the CartSheet component renders and animates in from the right.
   */
  isOpen: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Store Actions Interface
───────────────────────────────────────────────────────────────────────────── */

export interface CartActions {
  /**
   * Adds an item to the cart.
   *
   * Identity check: if a line item with the same `id` AND `selectedPurity`
   * already exists, its quantity is incremented by the incoming item's
   * quantity (defaulting to +1). Otherwise the item is pushed as a new
   * line item.
   *
   * @param item - The CartItem to add. Must have quantity >= 1.
   */
  addItem: (item: CartItem) => void;

  /**
   * Removes a specific product+purity combination from the cart entirely.
   *
   * @param id - The product id of the line item to remove.
   * @param purity - The purity grade of the line item to remove.
   */
  removeItem: (id: string, purity: SelectedPurity) => void;

  /**
   * Sets the quantity for a specific product+purity combination.
   *
   * If `quantity` is set to 0 or below, the item is automatically removed
   * from the cart (consistent with standard e-commerce UX).
   *
   * @param id - The product id to update.
   * @param purity - The purity grade to update.
   * @param quantity - The new absolute quantity. Must be a non-negative integer.
   */
  updateQuantity: (id: string, purity: SelectedPurity, quantity: number) => void;

  /**
   * Toggles the cart slide-out sheet open/closed.
   * Flips `isOpen` between true and false.
   */
  toggleCart: () => void;

  /**
   * Programmatically opens the cart sheet.
   * Safe to call even when already open.
   */
  openCart: () => void;

  /**
   * Programmatically closes the cart sheet.
   * Safe to call even when already closed.
   */
  closeCart: () => void;

  /**
   * Removes all items from the cart and resets it to an empty state.
   * Does NOT close the cart sheet — that is a separate UI concern.
   */
  clearCart: () => void;

  /**
   * Computes an aggregate summary of the current cart state.
   * Returns a CartSummary object with count and subtotal values.
   * Computed on each call so values always reflect the latest state.
   */
  getCartSummary: () => CartSummary;
}

/** Combined store type passed to create(). */
export type CartStore = CartState & CartActions;

/* ─────────────────────────────────────────────────────────────────────────────
   Internal Utilities
───────────────────────────────────────────────────────────────────────────── */

/**
 * isMatchingLineItem — Composite key equality check for cart items.
 *
 * Two cart line items are considered the "same" if and only if
 * they share both the product `id` AND the `selectedPurity`.
 * This enforces the rule that 18K and 22K variants are distinct line items.
 */
const isMatchingLineItem = (
  item: CartItem,
  id: string,
  purity: SelectedPurity
): boolean => item.id === id && item.selectedPurity === purity;

/* ─────────────────────────────────────────────────────────────────────────────
   Store Factory
───────────────────────────────────────────────────────────────────────────── */

/**
 * useCartStore
 *
 * Global Zustand store for the Alankar shopping cart.
 *
 * @example
 * // Adding a product variant to the cart:
 * const { addItem, openCart } = useCartStore();
 * addItem({ id: "prod_01", name: "Diamond Solitaire Ring", sku: "DSR-22K-2G",
 *            category: "Rings", selectedPurity: "22k", finalPrice: 48900,
 *            quantity: 1, imageUrl: "/products/dsr-22k.jpg" });
 * openCart();
 *
 * @example
 * // Reading cart summary in a header badge:
 * const totalQuantity = useCartStore(
 *   (s) => s.getCartSummary().totalQuantity
 * );
 *
 * @example
 * // Checking if cart is open for conditional rendering:
 * const isOpen = useCartStore((s) => s.isOpen);
 */
export const useCartStore = create<CartStore>((set, get) => ({
  /* ── Initial State ─────────────────────────────────────────────────────── */

  cart: [],
  isOpen: false,

  /* ── Actions ───────────────────────────────────────────────────────────── */

  addItem: (item: CartItem): void => {
    set((state) => {
      const existingIndex = state.cart.findIndex((cartItem) =>
        isMatchingLineItem(cartItem, item.id, item.selectedPurity)
      );

      if (existingIndex !== -1) {
        // Line item exists — increment quantity
        const updatedCart = state.cart.map((cartItem, index) => {
          if (index === existingIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + (item.quantity ?? 1),
            };
          }
          return cartItem;
        });

        return { cart: updatedCart };
      }

      // New line item — push to end of cart array
      return {
        cart: [...state.cart, { ...item, quantity: item.quantity ?? 1 }],
      };
    });
  },

  removeItem: (id: string, purity: SelectedPurity): void => {
    set((state) => ({
      cart: state.cart.filter(
        (cartItem) => !isMatchingLineItem(cartItem, id, purity)
      ),
    }));
  },

  updateQuantity: (
    id: string,
    purity: SelectedPurity,
    quantity: number
  ): void => {
    // If quantity reaches 0 or below, remove the item entirely
    if (quantity <= 0) {
      get().removeItem(id, purity);
      return;
    }

    set((state) => ({
      cart: state.cart.map((cartItem) => {
        if (isMatchingLineItem(cartItem, id, purity)) {
          return { ...cartItem, quantity };
        }
        return cartItem;
      }),
    }));
  },

  toggleCart: (): void => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  openCart: (): void => {
    set({ isOpen: true });
  },

  closeCart: (): void => {
    set({ isOpen: false });
  },

  clearCart: (): void => {
    set({ cart: [] });
  },

  getCartSummary: (): CartSummary => {
    const { cart } = get();

    const lineItemCount = cart.length;

    const totalQuantity = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const subtotal = cart.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0
    );

    return {
      lineItemCount,
      totalQuantity,
      subtotal,
    };
  },
}));
