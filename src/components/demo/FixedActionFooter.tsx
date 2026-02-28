"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const footer = (
    <div className="fixed left-0 right-0 bottom-6 flex justify-center z-50 pointer-events-none">
      <AnimatePresence>{visible && content}</AnimatePresence>
    </div>
  );

  if (!mounted || typeof document === "undefined") {
    return <div className="h-0" aria-hidden />;
  }

  return createPortal(footer, document.body);
}
