"use client";

import { motion } from "framer-motion";

export function ThinkingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-0.5 align-middle">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-primary-light"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
