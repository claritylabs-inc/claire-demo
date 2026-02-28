"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

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
      className="pointer-events-auto"
    >
      {button}
    </motion.div>
  ) : (
    <div className="pointer-events-auto">{button}</div>
  );

  return (
    <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <AnimatePresence>
        {visible && content}
      </AnimatePresence>
    </div>
  );
}
