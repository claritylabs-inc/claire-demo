"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PolicyUploadStep } from "@/components/demo/PolicyUploadStep";
import { CoverageStep } from "@/components/demo/CoverageStep";
import { CoverageStepMobile } from "@/components/demo/CoverageStepMobile";
import { ChatStep } from "@/components/demo/ChatStep";
import { BackToClarityButton } from "@/components/demo/BackToClarityButton";
import { BookDemoButton } from "@/components/demo/BookDemoButton";
import type { ChatMode, PolicyId } from "@/components/demo/chat";

type DemoStep = "upload" | "coverage" | "chat";

const EASE = [0.16, 1, 0.3, 1] as const;

const stepVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: EASE },
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMobile(!mq.matches);
    const handler = () => setIsMobile(!mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function Home() {
  const [step, setStep] = useState<DemoStep>("upload");
  const [showChat, setShowChat] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("contact");
  const [chatPolicyId, setChatPolicyId] = useState<PolicyId | null>(null);
  const [chatPromptIndex, setChatPromptIndex] = useState(0);
  const [chatUserFirst, setChatUserFirst] = useState(false);
  const isMobile = useIsMobile();

  const goToCoverage = useCallback(() => setStep("coverage"), []);
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

  // Close chat overlay on Escape
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
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Fixed buttons outside scroll/transform container so they stay viewport-fixed */}
      {step === "coverage" && isMobile && (
        <>
          <BackToClarityButton />
          <BookDemoButton onClick={openChat} />
        </>
      )}
      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PolicyUploadStep onComplete={goToCoverage} onBookDemo={openChat} />
          </motion.div>
        )}

        {step === "coverage" && (
          <motion.div
            key="coverage"
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {isMobile ? (
              <CoverageStepMobile
                onOpenChat={openChat}
                onBookDemo={openChat}
              />
            ) : (
              <CoverageStep onOpenChat={openChat} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat overlay — frosted backdrop on top of coverage */}
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

            <BackToClarityButton />

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
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex-1 flex flex-col min-h-0 pt-14"
            >
              <ChatStep
                mode={chatMode}
                policyId={chatPolicyId}
                promptIndex={chatPromptIndex}
                userFirst={chatUserFirst}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
