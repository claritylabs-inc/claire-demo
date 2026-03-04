"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const CLARITY_URL = "https://claritylabs.inc";

const EASE = [0.33, 1, 0.68, 1] as const;
const DURATION = 0.32;

const COLLAPSED_WIDTH = 36;
const PADDING_X = 16;
const GAP = 10;
const ICON_WIDTH = 16;

interface BackButtonProps {
  /** Target URL. Internal paths use router.push, external use window.location. Default: claritylabs.inc */
  href?: string;
  /** Override the hover label. */
  label?: string;
}

export function BackButton({ href = CLARITY_URL, label }: BackButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const isInternal = href.startsWith("/");
  const displayLabel = label ?? (isInternal ? "Back" : "Back to Clarity Labs");

  // Measure text width after label resolves
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.scrollWidth);
    }
  }, [displayLabel]);

  const expandedWidth = PADDING_X * 2 + ICON_WIDTH + GAP + textWidth;

  const handleClick = () => {
    if (isInternal) {
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
        width: isHovered ? expandedWidth : COLLAPSED_WIDTH,
        paddingLeft: isHovered ? PADDING_X : 10,
        paddingRight: isHovered ? PADDING_X : 10,
        color: isHovered
          ? "var(--foreground)"
          : "color-mix(in srgb, var(--foreground) 70%, transparent)",
      }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      <motion.span
        className="flex items-center min-w-0"
        animate={{ gap: isHovered ? `${GAP}px` : "0px" }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <FaArrowLeft className="w-3 h-3 shrink-0" />
        <motion.span
          ref={textRef}
          className="whitespace-nowrap overflow-hidden"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            width: isHovered ? textWidth : 0,
          }}
          transition={{
            duration: DURATION,
            ease: EASE,
            opacity: { delay: isHovered ? 0.06 : 0 },
          }}
        >
          {displayLabel}
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
