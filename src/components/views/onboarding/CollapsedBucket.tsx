"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

export function CollapsedBucket({
  label,
  summary,
  stepNumber,
}: {
  label: string;
  summary: string;
  stepNumber: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-foreground/6 bg-white/30 mb-2">
        <span className="w-5 h-5 rounded-full bg-primary-light/15 text-primary-muted text-caption font-bold flex items-center justify-center shrink-0">
          {stepNumber}
        </span>
        <span className="text-label font-medium text-foreground/70">
          {label}
        </span>
        <span className="text-label-sm text-muted/50 ml-auto">{summary}</span>
        <FaCheck className="w-3 h-3 shrink-0 text-primary-light" />
      </div>
    </motion.div>
  );
}
