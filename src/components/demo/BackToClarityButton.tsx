"use client";

import { FaArrowLeft } from "react-icons/fa";

const CLARITY_URL = "https://claritylabs.inc";

export function BackToClarityButton() {
  return (
    <button
      onClick={() => (window.location.href = CLARITY_URL)}
      className="group fixed top-5 left-4 sm:left-6 z-50 h-9 rounded-full bg-background/70 backdrop-blur-md border border-foreground/6 text-foreground/80 hover:bg-background/80 flex items-center gap-2 pl-2.5 pr-2.5 hover:pr-4 overflow-hidden w-9 hover:w-46 transition-[width,padding] duration-300 ease-out cursor-pointer text-sm font-medium"
      aria-label="Back to Clarity Labs"
    >
      <FaArrowLeft className="w-4 h-4 shrink-0" />
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
        Back to Clarity Labs
      </span>
    </button>
  );
}
