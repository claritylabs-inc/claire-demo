"use client";

import { useState, useRef } from "react";

export function SignOff() {
  const [text, setText] = useState("— Adyan & Terry");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revert = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    timer.current = setTimeout(() => {
      setText("— built different");
      revert.current = setTimeout(() => {
        setText("— Adyan & Terry");
      }, 2000);
    }, 1000);
  };

  const handleLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    if (revert.current) clearTimeout(revert.current);
    setText("— Adyan & Terry");
  };

  return (
    <p
      className="pt-4 font-semibold tracking-wide transition-opacity duration-500"
      style={{ color: "#8a8578", fontFamily: "var(--font-instrument-serif)" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {text}
    </p>
  );
}
