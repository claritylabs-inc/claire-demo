"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const actions = [
  {
    label: "Copy link",
    hint: "Share this page",
    action: () => {
      navigator.clipboard.writeText(window.location.href);
    },
    toast: "Link copied",
  },
  {
    label: "Email us",
    hint: "hello@claritylabs.inc",
    action: () => {
      window.location.href = "mailto:hello@claritylabs.inc";
    },
  },
  {
    label: "View source",
    hint: "GitHub",
    action: () => {
      window.open("https://www.youtube.com/watch?v=q-Y0bnx6Ndw&list=RDq-Y0bnx6Ndw&start_radio=1", "_blank");
    },
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [close]);

  const run = (idx: number) => {
    const item = filtered[idx];
    if (!item) return;
    item.action();
    if (item.toast) {
      setToast(item.toast);
      setTimeout(() => setToast(null), 2000);
    }
    close();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(selected);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[10000]"
              style={{ background: "rgba(0,0,0,0.08)", backdropFilter: "blur(2px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={close}
            />
            {/* Palette */}
            <motion.div
              className="fixed top-[28%] left-1/2 z-[10001] w-[90vw] max-w-[420px]"
              initial={{ opacity: 0, y: -8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -8, x: "-50%" }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="rounded-xl overflow-hidden shadow-2xl"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* Input */}
                <div className="flex items-center px-4 h-12" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="text-[13px] mr-3" style={{ color: "#bbb" }}>⌘</span>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelected(0);
                    }}
                    onKeyDown={handleKey}
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-gray-300"
                    style={{ color: "#1a1a1a" }}
                  />
                  <kbd
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: "#f5f5f5", color: "#999", border: "1px solid #eee" }}
                  >
                    esc
                  </kbd>
                </div>
                {/* Results */}
                <div className="py-1.5">
                  {filtered.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() => run(i)}
                      onMouseEnter={() => setSelected(i)}
                      className="w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors"
                      style={{
                        background: i === selected ? "rgba(0,0,0,0.03)" : "transparent",
                      }}
                    >
                      <span className="text-[13px]" style={{ color: "#1a1a1a" }}>
                        {item.label}
                      </span>
                      <span className="text-[11px]" style={{ color: "#bbb" }}>
                        {item.hint}
                      </span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div className="px-4 py-3 text-[13px]" style={{ color: "#bbb" }}>
                      No results
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-8 left-1/2 z-[10002] px-4 py-2 rounded-lg text-[13px]"
            style={{
              background: "#1a1a1a",
              color: "#fff",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}
            initial={{ opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 8, x: "-50%" }}
            transition={{ duration: 0.2 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
