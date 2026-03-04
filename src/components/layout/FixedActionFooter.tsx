"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

interface FixedActionFooterProps {
  label: string;
  onClick: () => void;
  visible?: boolean;
  animateIn?: boolean;
}

export function FixedActionFooter({
  label,
  onClick,
  visible = true,
  animateIn = false,
}: FixedActionFooterProps) {
  const button = <CTAButton label={label} onClick={onClick} />;

  const content = animateIn ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
    >
      {button}
    </motion.div>
  ) : (
    <div>{button}</div>
  );

  return (
    <div className="shrink-0 relative z-40">
      {/* Gradient fade above — softens scroll content into the CTA bar */}
      <div
        className="absolute left-0 right-0 -top-16 h-16 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--background))`,
        }}
      />
      <div className="flex justify-center pb-6 pt-2 bg-background">
        <AnimatePresence>{visible && content}</AnimatePresence>
      </div>
    </div>
  );
}
