"use client";

import { motion } from "framer-motion";

const STAGGER_INTERVAL = 0.16;

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Index for above-fold stagger (0–4). Omit for elements that load on scroll. */
  staggerIndex?: number;
  direction?: "up" | "none";
}

export function FadeIn({
  children,
  className = "",
  delay,
  staggerIndex,
  direction = "up",
}: FadeInProps) {
  const resolvedDelay =
    delay ?? (staggerIndex !== undefined ? staggerIndex * STAGGER_INTERVAL : 0.05);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === "up" ? 18 : 0,
        filter: "blur(4px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.5,
        delay: resolvedDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
