"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Demo", href: "/dashboard" },
  { label: "Use Cases", href: "/coverage" },
  { label: "Explore", href: "/explore" },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground/6 shrink-0">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-footer-muted">
        <span>&copy; {new Date().getFullYear()} Clarity Labs</span>

        <nav className="flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-foreground-highlight"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@claritylabs.inc"
            className="transition-colors duration-200 hover:text-foreground-highlight"
          >
            hello@claritylabs.inc
          </a>
          <span className="hidden md:inline text-gray-300">&middot;</span>
          <button
            className="hidden md:inline transition-opacity hover:opacity-70 text-gray-400 cursor-pointer"
            onClick={() => {
              const e = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              window.dispatchEvent(e);
            }}
          >
            ⌘K
          </button>
        </div>
      </div>
    </footer>
  );
}
