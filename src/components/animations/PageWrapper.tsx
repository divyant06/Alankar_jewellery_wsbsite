"use client";

/**
 * PageWrapper — Global Route Transition Component
 *
 * Wraps every page in a framer-motion fade + upward slide.
 * Import this in layout.tsx or individual pages that opt in.
 *
 * Animation profile:
 *   initial  → opacity 0, y 18px
 *   animate  → opacity 1, y 0
 *   duration → 0.6s, ease "easeOut"
 *
 * Keeps the entrance premium and non-jarring — feels more like
 * an editorial magazine than an animated SaaS dashboard.
 */

import React from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
  /** Extra Tailwind classes applied to the wrapper div */
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
