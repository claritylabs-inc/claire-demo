"use client";

import { motion } from "framer-motion";

export function MobileStepLabel({
  stepNumber,
  label,
}: {
  stepNumber: number;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex items-center gap-2 mb-2 shrink-0"
    >
      <span className="w-5 h-5 rounded-full bg-primary-light text-white text-caption font-bold flex items-center justify-center shrink-0">
        {stepNumber}
      </span>
      <span className="text-label-sm font-semibold text-muted tracking-wider uppercase">
        {label}
      </span>
    </motion.div>
  );
}
