import dayjs from "dayjs";

export function Footer() {
  return (
    <footer className="border-t border-foreground/6">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-label-sm text-footer-muted">
        <span>&copy; {dayjs().year()} Clarity Labs</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@claritylabs.inc"
            className="transition-all duration-300 hover:text-foreground-highlight"
            style={{ textShadow: "none" }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.textShadow =
                "0 0 12px rgba(160,210,250,0.6), 0 0 4px rgba(160,210,250,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.textShadow = "none";
            }}
          >
            hello@claritylabs.inc
          </a>
          <span className="hidden md:inline text-muted/50">·</span>
          <button
            className="hidden md:inline transition-opacity hover:opacity-70 text-muted"
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
