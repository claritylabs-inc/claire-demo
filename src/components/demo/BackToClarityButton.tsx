"use client";

const CLARITY_URL = "https://claritylabs.inc";

export function BackToClarityButton() {
  return (
    <button
      onClick={() => (window.location.href = CLARITY_URL)}
      className="group fixed top-5 left-4 sm:left-6 z-50 h-9 rounded-full bg-background/70 backdrop-blur-md border border-foreground/6 text-foreground/80 hover:bg-background/80 flex items-center gap-2 pl-2.5 pr-2.5 hover:pr-4 overflow-hidden w-9 hover:w-46 transition-[width,padding] duration-300 ease-out cursor-pointer text-sm font-medium"
      aria-label="Back to Clarity Labs"
    >
      <svg
        className="shrink-0"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
        Back to Clarity Labs
      </span>
    </button>
  );
}
