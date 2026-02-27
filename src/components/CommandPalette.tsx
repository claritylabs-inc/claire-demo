"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Action shown in the command palette. */
export interface CommandAction {
  /** Display label (primary text) */
  label: string;
  /** Secondary hint text (e.g. shortcut, URL) */
  hint: string;
  /** Callback when the action is selected */
  action: () => void;
  /** Optional toast message shown after execution */
  toast?: string;
}

export interface CommandPaletteProps {
  /** List of commands to display. Pass your own for full control. */
  actions?: CommandAction[];
  /** Placeholder for the search input. */
  placeholder?: string;
  /** Shortcut key combo (default: ⌘K / Ctrl+K). */
  shortcut?: string;
  /** Called when the palette opens. */
  onOpen?: () => void;
  /** Called when the palette closes. */
  onClose?: () => void;
  /** Custom filter for actions. Receives query and actions, returns filtered list. */
  filterActions?: (query: string, actions: CommandAction[]) => CommandAction[];
}

const DEFAULT_PLACEHOLDER = "Type a command...";
const TOAST_DURATION_MS = 2000;
const SCROLL_CLOSE_THRESHOLD_PX = 80;

const defaultFilter = (query: string, actions: CommandAction[]): CommandAction[] =>
  query.trim() === ""
    ? actions
    : actions.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase())
      );

export function CommandPalette({
  actions: actionsProp,
  placeholder = DEFAULT_PLACEHOLDER,
  shortcut = "⌘",
  onOpen,
  onClose,
  filterActions = defaultFilter,
}: CommandPaletteProps) {
  const defaultActions: CommandAction[] = [
    {
      label: "Copy link",
      hint: "Share this page",
      action: () => navigator.clipboard.writeText(window.location.href),
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

  const actions = actionsProp ?? defaultActions;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const scrollYRef = useRef(0);

  const filtered = filterActions(query, actions);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
    onClose?.();
  }, [onClose]);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelected(0);
    scrollYRef.current = typeof window !== "undefined" ? window.scrollY : 0;
    onOpen?.();
  }, [onOpen]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - scrollYRef.current);
      if (delta >= SCROLL_CLOSE_THRESHOLD_PX) close();
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, [open, close]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          close();
        } else {
          openPalette();
        }
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [close, open, openPalette]);

  const run = (idx: number) => {
    const item = filtered[idx];
    if (!item) return;
    item.action();
    if (item.toast) {
      setToast(item.toast);
      setTimeout(() => setToast(null), TOAST_DURATION_MS);
    }
    close();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(
        (s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered.length > 0) run(selected);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-modal-backdrop bg-black/8 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              onClick={close}
            />
            <motion.div
              className="fixed top-[28%] left-1/2 z-modal w-[90vw] max-w-[420px] -translate-x-1/2"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl bg-background backdrop-blur-sm border border-black/8">
                <div className="flex items-center h-12 px-4 border-b border-black/6">
                  <span className="text-[13px] mr-3 text-gray-400">{shortcut}</span>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelected(0);
                    }}
                    onKeyDown={handleKey}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-gray-300"
                  />
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                    esc
                  </kbd>
                </div>
                <div className="py-1.5">
                  {filtered.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() => run(i)}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                        i === selected ? "bg-black/3" : ""
                      }`}
                    >
                      <span className="text-[13px] text-foreground">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {item.hint}
                      </span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div className="px-4 py-3 text-[13px] text-gray-400">
                      No results
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-8 left-1/2 z-toast -translate-x-1/2 px-4 py-2 rounded-lg text-[13px] bg-foreground text-white shadow-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
