"use client";

import React from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Direction → starting coordinates map
───────────────────────────────────────────────────────────────────────────── */

const DIRECTION_VARIANTS: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 40  },
  down:  { x: 0,   y: -40 },
  left:  { x: -40, y: 0   },
  right: { x: 40,  y: 0   },
};

/** Premium cubic-bezier easing — matches high-end native iOS spring feel. */
const EASE_CURVE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ─────────────────────────────────────────────────────────────────────────────
   ScrollReveal — reusable whileInView animation wrapper
───────────────────────────────────────────────────────────────────────────── */

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { x, y } = DIRECTION_VARIANTS[direction];

  return (
    <motion.div
      initial={{ x, y, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: EASE_CURVE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
