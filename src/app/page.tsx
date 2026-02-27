"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DemoAppBar, type DemoStep } from "@/components/demo/DemoAppBar";
import { PolicyUploadStep } from "@/components/demo/PolicyUploadStep";
import { CoverageStep } from "@/components/demo/CoverageStep";
import { ChatStep } from "@/components/demo/ChatStep";

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

export default function Home() {
  const [step, setStep] = useState<DemoStep>("upload");
  const [showChat, setShowChat] = useState(false);

  const goToCoverage = useCallback(() => setStep("coverage"), []);
  const openChat = useCallback(() => setShowChat(true), []);
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
      <DemoAppBar currentStep={showChat ? "chat" : step} />

      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            className="flex-1 flex flex-col min-h-0"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PolicyUploadStep onComplete={goToCoverage} />
          </motion.div>
        )}

        {step === "coverage" && (
          <motion.div
            key="coverage"
            className="flex-1 flex flex-col min-h-0"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CoverageStep onComplete={openChat} />
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

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              type="button"
              onClick={closeChat}
              className="absolute top-5 right-4 sm:right-6 z-50 w-8 h-8 rounded-full bg-foreground/8 hover:bg-foreground/15 flex items-center justify-center transition-colors cursor-pointer"
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
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Chat content */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex-1 flex flex-col min-h-0 pt-14"
            >
              <ChatStep />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
