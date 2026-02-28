"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendar } from "react-icons/fa";

const EASE = [0.33, 1, 0.68, 1] as const;
const DURATION = 0.32;

interface BookDemoButtonProps {
  onClick: () => void;
}

export function BookDemoButton({ onClick }: BookDemoButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gap = isHovered ? 10 : 0;

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`fixed top-5 right-4 sm:right-6 z-50 h-9 rounded-full bg-background/70 backdrop-blur-md border border-foreground/6 text-foreground/80 hover:bg-background/80 flex flex-row items-center overflow-hidden cursor-pointer text-sm font-medium ${isHovered ? "justify-end" : "justify-center"}`}
      aria-label="Book a Demo"
      animate={{
        width: isHovered ? 152 : 36,
        paddingLeft: isHovered ? 16 : 10,
        paddingRight: isHovered ? 16 : 10,
        color: isHovered ? "var(--foreground)" : "color-mix(in srgb, var(--foreground) 70%, transparent)",
      }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      <motion.span
        className={`flex flex-row items-center min-w-0 ${isHovered ? "justify-end" : "justify-center"}`}
        animate={{ gap: `${gap}px` }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <motion.span
          className="whitespace-nowrap text-left overflow-hidden"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            width: isHovered ? 92 : 0,
          }}
          transition={{ duration: DURATION, ease: EASE, opacity: { delay: isHovered ? 0.06 : 0 } }}
        >
          Book a Demo
        </motion.span>
        <FaCalendar className="w-3 h-3 shrink-0" />
      </motion.span>
    </motion.button>
  );
}
