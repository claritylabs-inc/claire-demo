"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const EASE_OUT = [0.33, 1, 0.68, 1] as const;
const HOVER_DURATION = 0.33;

const BRAND_BLUE = "#A0D2FA";

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export function CTAButton({
  label,
  onClick,
  href,
  target,
  rel,
  className = "",
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (href) e.preventDefault();
    if (href) window.open(href, target ?? "_blank", "noopener,noreferrer");
    onClick?.();
  };

  const gap = isHovered ? 16 : 10;

  const buttonContent = (
    <motion.span
      className="inline-flex items-center"
      animate={{ gap: `${gap}px` }}
      transition={{ duration: HOVER_DURATION, ease: EASE_OUT }}
    >
      <span className="whitespace-nowrap">{label}</span>
      <FaArrowRight className="w-3 h-3 shrink-0" />
    </motion.span>
  );

  const commonProps = {
    onClick: handleClick,
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
    initial: false,
    animate: {
      paddingLeft: 24,
      paddingRight: 24,
      backgroundColor: "var(--foreground)",
    },
    transition: { duration: HOVER_DURATION, ease: EASE_OUT },
    whileHover: {
      paddingLeft: 28,
      paddingRight: 28,
      scale: 1.02,
      backgroundColor: BRAND_BLUE,
    },
    className: `inline-flex items-center justify-center h-9 rounded-full text-sm font-medium text-background shadow-lg shadow-black/10 cursor-pointer overflow-hidden ${className}`.trim(),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...commonProps}>
      {buttonContent}
    </motion.button>
  );
}
