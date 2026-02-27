"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

let globalIndex = 0;
const getStaggerDelay = () => {
  const d = globalIndex * 0.08;
  globalIndex++;
  return d;
};

if (typeof window !== "undefined") {
  globalIndex = 0;
}

export function FadeIn({
  children,
  className = "",
  delay,
  direction = "up",
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stagger = useRef(delay ?? getStaggerDelay());

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 18 : 0,
        filter: "blur(4px)",
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: direction === "up" ? 18 : 0, filter: "blur(4px)" }
      }
      transition={{
        duration: 1.1,
        delay: stagger.current,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
