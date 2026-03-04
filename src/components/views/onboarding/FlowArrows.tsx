"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

export function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="hidden md:flex items-center justify-center w-12 shrink-0">
      <motion.span
        className="flex items-center justify-center"
        animate={{ color: active ? ["var(--divider)", "var(--primary-light)", "var(--divider)"] : "var(--divider)" }}
        transition={
          active
            ? { duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
            : { duration: 0.5 }
        }
      >
        <FaArrowRight className="w-4 h-3" />
      </motion.span>
    </div>
  );
}

export function FlowArrowVertical({ active }: { active: boolean }) {
  return (
    <div className="md:hidden flex justify-center h-8">
      <motion.span
        className="flex items-center justify-center"
        animate={{ color: active ? ["var(--divider)", "var(--primary-light)", "var(--divider)"] : "var(--divider)" }}
        transition={
          active
            ? { duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
            : { duration: 0.5 }
        }
      >
        <FaChevronDown className="w-3 h-4" />
      </motion.span>
    </div>
  );
}
