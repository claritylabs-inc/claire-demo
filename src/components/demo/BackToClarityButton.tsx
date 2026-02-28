"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const CLARITY_URL = "https://claritylabs.inc";

const EASE = [0.33, 1, 0.68, 1] as const;
const DURATION = 0.32;

interface BackToClarityButtonProps {
  /** When provided, navigates here instead of Clarity Labs. Use "/" for home page. */
  href?: string;
  /** Override the hover label. Default: "Back to Clarity Labs" or "Back to demo" when href="/" */
  label?: string;
}

export function BackToClarityButton({ href = CLARITY_URL, label }: BackToClarityButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const gap = isHovered ? 10 : 0;
  const displayLabel = label ?? (href === "/" ? "Back to demo" : "Back to Clarity Labs");

  const handleClick = () => {
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed top-5 left-4 sm:left-6 z-50 h-9 rounded-full bg-background/70 backdrop-blur-md border border-foreground/6 text-foreground/80 hover:bg-background/80 flex items-center overflow-hidden cursor-pointer text-sm font-medium"
      aria-label={displayLabel}
      animate={{
        width: isHovered ? 196 : 36,
        paddingLeft: isHovered ? 16 : 10,
        paddingRight: isHovered ? 16 : 10,
        color: isHovered ? "var(--foreground)" : "color-mix(in srgb, var(--foreground) 70%, transparent)",
      }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      <motion.span
        className="flex items-center min-w-0"
        animate={{ gap: `${gap}px` }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <FaArrowLeft className="w-3 h-3 shrink-0" />
        <motion.span
          className="whitespace-nowrap overflow-hidden"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            width: isHovered ? 148 : 0,
          }}
          transition={{ duration: DURATION, ease: EASE, opacity: { delay: isHovered ? 0.06 : 0 } }}
        >
          {displayLabel}
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
