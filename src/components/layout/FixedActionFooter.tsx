"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";
import { GradientFade } from "@/components/ui/GradientFade";

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
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="relative">
        <GradientFade direction="up" className="absolute inset-0 -top-16" />
        <div className="relative flex justify-center pb-6 pt-2">
          <AnimatePresence>
              {visible && content}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
