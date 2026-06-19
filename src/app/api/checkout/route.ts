/**
 * route.ts — POST /api/checkout
 *
 * Alankar Luxury Commerce — Razorpay Order Generation
 *
 * Server-side Next.js Route Handler that creates a Razorpay order object.
 * The client sends the cart total in INR; we convert to paise, generate
 * the order, and return the `order_id` for the frontend checkout flow.
 *
 * @module app/api/checkout/route
 */

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

/* ─────────────────────────────────────────────────────────────────────────────
   Razorpay SDK Initialisation
───────────────────────────────────────────────────────────────────────────── */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

/* ─────────────────────────────────────────────────────────────────────────────
   Request / Response Types
───────────────────────────────────────────────────────────────────────────── */

interface CheckoutRequestBody {
  /** Cart total in INR (₹). Will be converted to paise for Razorpay. */
  amount: number;
}

interface RazorpayOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   POST Handler
───────────────────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    /* ── Input Validation ─────────────────────────────────────────────────── */

    if (!body.amount || typeof body.amount !== "number" || body.amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount. Must be a positive number in INR." },
        { status: 400 }
      );
    }

    /* ── Convert INR → Paise (Razorpay requires smallest currency unit) ─── */

    const amountInPaise = Math.round(body.amount * 100);

    /* ── Generate unique receipt ID ───────────────────────────────────────── */

    const receipt =
      "receipt_" + Math.random().toString(36).substring(7);

    /* ── Create Razorpay Order ────────────────────────────────────────────── */

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
    });

    /* ── Return order metadata to client ───────────────────────────────────── */

    const response: RazorpayOrderResponse = {
      order_id: order.id,
      amount: amountInPaise,
      currency: "INR",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("[Alankar API] Razorpay order creation failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during checkout.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
