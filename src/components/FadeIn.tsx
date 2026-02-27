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
  /** When true, animate immediately. When false, stay at initial. Omit to use whileInView. */
  when?: boolean;
}

export function FadeIn({
  children,
  className = "",
  delay,
  staggerIndex,
  direction = "up",
  when,
}: FadeInProps) {
  const resolvedDelay =
    delay ?? (staggerIndex !== undefined ? staggerIndex * STAGGER_INTERVAL : 0.05);
  const initial = {
    opacity: 0,
    y: direction === "up" ? 18 : 0,
    filter: "blur(4px)",
  };
  const animate = {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  };

  return (
    <motion.div
      initial={initial}
      {...(when !== undefined
        ? { animate: when ? animate : initial }
        : { whileInView: animate, viewport: { once: true, margin: "-100px" } })}
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
