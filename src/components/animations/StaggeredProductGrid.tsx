"use client";

/**
 * StaggeredProductGrid — Animated product listing grid
 *
 * Wraps the product grid in framer-motion stagger so each card
 * fades in slightly after the previous one, creating a cascading
 * reveal effect. This is a client component so the server-rendered
 * ShopPage remains a Server Component.
 *
 * Stagger profile:
 *   container → staggerChildren: 0.08s
 *   card      → opacity 0 → 1, y 24 → 0, duration 0.5, easeOut
 */

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { MockProduct } from "@/lib/mockData";

interface StaggeredProductGridProps {
  products: MockProduct[];
  className?: string;
}

/* Animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function StaggeredProductGrid({
  products,
  className,
}: StaggeredProductGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {products.map((product, index) => (
        <motion.div key={product.id} variants={cardVariants}>
          {/*
           * ProductCard already wraps itself in a ScrollReveal.
           * We override by wrapping in a motion.div here instead —
           * the stagger container drives the timing, not ScrollReveal's
           * whileInView. ProductCard is still fully functional.
           */}
          <ProductCard product={product} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
