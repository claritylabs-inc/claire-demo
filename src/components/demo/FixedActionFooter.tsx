"use client";

import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

interface FixedActionFooterProps {
  label: string;
  onClick: () => void;
  variant?: "bar" | "floating";
  visible?: boolean;
  animateIn?: boolean;
}

export function FixedActionFooter({
  label,
  onClick,
  variant = "bar",
  visible = true,
  animateIn = false,
}: FixedActionFooterProps) {
  const button = (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground-highlight transition-colors cursor-pointer ${
        variant === "floating" ? "shadow-lg shadow-black/10" : ""
      }`}
    >
      {label}
      <ArrowIcon />
    </button>
  );

  if (variant === "bar") {
    return (
      <div className="fixed bottom-12 left-0 right-0 h-20 md:h-24 flex items-center justify-center bg-background/95 backdrop-blur-sm z-40">
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              {button}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // floating variant
  const content = animateIn ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
      className="pointer-events-auto"
    >
      {button}
    </motion.div>
  ) : (
    button
  );

  return (
    <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none">
      {content}
    </div>
  );
}
