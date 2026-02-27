export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div
        className="max-w-3xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-[11px]"
        style={{ color: "#8a8578" }}
      >
        <span>&copy; {new Date().getFullYear()} Clarity Labs</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@claritylabs.inc"
            className="transition-all duration-300 hover:text-[#1a1a1a]"
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
          <span className="hidden md:inline" style={{ color: "#ccc" }}>·</span>
          <button
            className="hidden md:inline transition-opacity hover:opacity-70"
            style={{ color: "#bbb" }}
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
