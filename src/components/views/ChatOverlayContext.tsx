"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatStep } from "@/components/chat/ChatStep";
import { BackButton } from "@/components/layout/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ChatMode, PolicyId } from "@/components/chat";

interface ChatOverlayContextValue {
  openChat: (
    mode?: ChatMode,
    policyId?: PolicyId,
    promptIndex?: number,
    userFirst?: boolean
  ) => void;
  closeChat: () => void;
  showChat: boolean;
}

const ChatOverlayContext = createContext<ChatOverlayContextValue | null>(null);

export function useChatOverlay() {
  const ctx = useContext(ChatOverlayContext);
  if (!ctx) throw new Error("useChatOverlay must be used within ChatOverlayProvider");
  return ctx;
}

export function ChatOverlayProvider({ children }: { children: React.ReactNode }) {
  const [showChat, setShowChat] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("contact");
  const [chatPolicyId, setChatPolicyId] = useState<PolicyId | null>(null);
  const [chatPromptIndex, setChatPromptIndex] = useState(0);
  const [chatUserFirst, setChatUserFirst] = useState(false);

  const openChat = useCallback(
    (
      mode: ChatMode = "contact",
      policyId?: PolicyId,
      promptIndex?: number,
      userFirst?: boolean
    ) => {
      setChatMode(mode);
      setChatPolicyId(policyId ?? null);
      setChatPromptIndex(promptIndex ?? 0);
      setChatUserFirst(userFirst ?? false);
      setShowChat(true);
    },
    []
  );

  const closeChat = useCallback(() => setShowChat(false), []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && showChat) {
        setShowChat(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showChat]);

  return (
    <ChatOverlayContext.Provider value={{ openChat, closeChat, showChat }}>
      {children}

      {/* Chat overlay — frosted backdrop */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            key="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Frosted backdrop — click to close */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-background/60"
              onClick={closeChat}
            />

            <BackButton />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              type="button"
              onClick={closeChat}
              className="group absolute top-5 right-4 sm:right-6 z-50 h-9 rounded-full bg-background/70 backdrop-blur-md border border-foreground/6 text-foreground/80 hover:bg-background/80 flex flex-row-reverse items-center gap-2 pl-2.5 pr-2.5 hover:pl-4 overflow-hidden w-9 hover:w-22 transition-[width,padding] duration-300 ease-out cursor-pointer text-sm font-medium"
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                Close
              </span>
            </motion.button>

            {/* Chat content */}
            <FadeIn
              when={true}
              delay={0.1}
              duration={0.5}
              className="relative flex-1 flex flex-col min-h-0 pt-14"
            >
              <ChatStep
                mode={chatMode}
                policyId={chatPolicyId}
                promptIndex={chatPromptIndex}
                userFirst={chatUserFirst}
              />
            </FadeIn>
          </motion.div>
        )}
      </AnimatePresence>
    </ChatOverlayContext.Provider>
  );
}
