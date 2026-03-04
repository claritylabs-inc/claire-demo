"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { MOCK_POLICIES } from "@/data/demoData";
import { FadeIn } from "@/components/ui/FadeIn";
import { MeetClaireHeader } from "@/components/layout/MeetClaireHeader";
import { FixedActionFooter } from "@/components/layout/FixedActionFooter";
import { Footer } from "@/components/layout/Footer";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { GradientFade } from "@/components/ui/GradientFade";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  FlowArrow,
  EmailBucketContent,
  PolicyBucketContent,
  ClaireBucketContent,
  CollapsedBucket,
  MobileStepLabel,
  EMAILS,
} from "@/components/views/onboarding";
import type { Phase, ClaireStatusItem } from "@/components/views/onboarding";

interface OnboardingViewProps {
  onComplete: () => void;
  onBookDemo?: () => void;
}

/* ---------- Which mobile bucket is "active" for accordion ---------- */

function getActiveBucket(phase: Phase): number {
  if (phase === "scanning") return 0;
  if (phase === "extracting") return 1;
  return 2; // analyzing + ready
}

/* ---------- Main component ---------- */

export function OnboardingView({ onComplete, onBookDemo }: OnboardingViewProps) {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [showSteps, setShowSteps] = useState(false);
  const isMobile = useIsMobile();
  const [scannedEmails, setScannedEmails] = useState<number[]>([]);
  const [extractedPolicies, setExtractedPolicies] = useState<number[]>([]);
  const [claireStatus, setClaireStatus] = useState<ClaireStatusItem[]>([]);
  const [scannedEmailCount, setScannedEmailCount] = useState(0);

  const activeBucket = getActiveBucket(phase);

  // Show text first, then steps after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowSteps(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Count-up animation for emails scanned (runs during scanning phase)
  useEffect(() => {
    if (!showSteps) return;
    const controls = animate(0, 5237, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setScannedEmailCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [showSteps]);

  // Bucket animation timeline (starts after steps are shown)
  useEffect(() => {
    if (!showSteps) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Scanning — emails appear one by one
    EMAILS.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setScannedEmails((prev) => [...prev, i]);
          },
          400 + i * 400,
        ),
      );
    });

    // Phase 2: Extracting — starts at 2.2s
    timers.push(setTimeout(() => setPhase("extracting"), 2200));

    MOCK_POLICIES.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setExtractedPolicies((prev) => [...prev, i]);
          },
          2400 + i * 450,
        ),
      );
    });

    // Phase 3: Analyzing — starts at 4.5s
    timers.push(setTimeout(() => setPhase("analyzing"), 4500));

    const statusItems: ClaireStatusItem[] = [
      { id: "policies", label: "4 policies loaded", sources: "policies" },
      { id: "crossref", label: "Cross-referencing coverage" },
      { id: "integrations", label: "Connecting integrations", sources: "integrations" },
      { id: "ready", label: "Ready" },
    ];
    statusItems.forEach((item, i) => {
      timers.push(
        setTimeout(
          () => setClaireStatus((prev) => [...prev, item]),
          4700 + i * 500,
        ),
      );
    });

    // Phase 4: Ready — at 7.2s (after integrations step)
    timers.push(setTimeout(() => setPhase("ready"), 7200));

    return () => timers.forEach(clearTimeout);
  }, [showSteps]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <BackButton />
      {onBookDemo && <BookDemoButton onClick={onBookDemo} />}
      {/* Single scroll container — header sticky inside so content scrolls behind for translucency. Disable scroll until animation completes. */}
      <div
        className={`flex-1 min-h-0 overflow-x-hidden scrollbar-hide overscroll-none transition-[overflow] duration-300 ${
          phase === "ready" ? "overflow-y-auto" : "overflow-hidden touch-none"
        }`}
        style={
          phase === "ready"
            ? ({ WebkitOverflowScrolling: "touch" } as React.CSSProperties)
            : undefined
        }
      >
        <div className="fixed top-0 left-0 right-0 z-10 shrink-0">
          <div className="relative pt-16 pb-8">
            <GradientFade direction="down" className="absolute inset-0 -bottom-12" />
            <div className="relative">
              <MeetClaireHeader
                subtitle="An AI-native system of record for your business's insurance. Claire understands your coverage and takes action without letting anything slip."
                logoSize={isMobile ? 32 : 40}
              />
            </div>
          </div>
        </div>
        {/* ── CONTENT — centered on desktop, top-aligned on mobile (scrollable) ── */}
        <div className="flex-1 flex flex-col justify-start md:justify-center min-h-dvh pt-32 px-4 md:px-8">

        {/* ── MIDDLE — bucket content (always in DOM to reserve space; fades in after header) ── */}
        <motion.div
          initial={false}
          animate={{ opacity: showSteps ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-start md:items-center justify-center min-h-0 shrink-0"
        >
          <div className="w-full max-w-6xl">
          {/* ═══════════════════════════════════════════
              DESKTOP: Original 3-column horizontal layout
              ═══════════════════════════════════════════ */}
          <div className="hidden md:flex items-stretch gap-0">
            {/* ── BUCKET 1 — Your Email ── */}
            <FadeIn
              when={showSteps}
              delay={0}
              className={`flex-1 min-w-0 rounded-xl border p-5 transition-colors duration-500 flex flex-col h-[340px] shrink-0 ${
                phase === "scanning"
                  ? "border-primary-light/40 bg-primary-light/4"
                  : "border-foreground/6 bg-white/30"
              }`}
            >
              <div className="shrink-0 mb-3">
                <p className="text-label-sm font-semibold text-muted tracking-wider uppercase">
                  Your Email
                </p>
                <p className="text-caption text-muted/50 mt-0.5">
                  Inbox · {scannedEmailCount.toLocaleString()} emails scanned
                </p>
              </div>
              <div className="h-[260px] flex flex-col overflow-hidden">
                <EmailBucketContent phase={phase} scannedEmails={scannedEmails} />
              </div>
            </FadeIn>

            {/* Arrow 1 */}
            <FlowArrow active={phase === "extracting"} />

            {/* ── BUCKET 2 — Your Policies ── */}
            <FadeIn
              when={showSteps}
              delay={0.4}
              className={`flex-1 min-w-0 rounded-xl border p-5 transition-colors duration-500 flex flex-col h-[340px] shrink-0 ${
                phase === "extracting"
                  ? "border-primary-light/40 bg-primary-light/4"
                  : "border-foreground/6 bg-white/30"
              }`}
            >
              <div className="shrink-0 mb-3">
                <p className="text-label-sm font-semibold text-muted tracking-wider uppercase">
                  Your Policies
                </p>
                <p className="text-caption text-muted/50 mt-0.5">Policy documents extracted</p>
              </div>
              <div className="h-[260px] flex flex-col overflow-hidden">
                <PolicyBucketContent extractedPolicies={extractedPolicies} />
              </div>
            </FadeIn>

            {/* Arrow 2 */}
            <FlowArrow active={phase === "analyzing"} />

            {/* ── BUCKET 3 — Claire ── */}
            <FadeIn
              when={showSteps}
              delay={0.8}
              className={`flex-1 min-w-0 rounded-xl border p-5 transition-colors duration-500 flex flex-col h-[340px] shrink-0 ${
                phase === "analyzing" || phase === "ready"
                  ? "border-primary-light/40 bg-primary-light/4"
                  : "border-foreground/6 bg-white/30"
              }`}
            >
              <div className="shrink-0 mb-3">
                <p className="text-label-sm font-semibold text-muted tracking-wider uppercase">
                  Claire
                </p>
                <p className="text-caption text-muted/50 mt-0.5">Reads, organizes, advises</p>
              </div>
              <div className="h-[260px] flex flex-col overflow-hidden">
                <ClaireBucketContent phase={phase} claireStatus={claireStatus} />
              </div>
            </FadeIn>
          </div>

          {/* ═══════════════════════════════════════════
              MOBILE: Accordion — one bucket at a time
              ═══════════════════════════════════════════ */}
          <div className="md:hidden flex flex-col pt-40">
            {/* Collapsed: Email (when past scanning) */}
            <AnimatePresence>
              {activeBucket > 0 && (
                <CollapsedBucket
                  stepNumber={1}
                  label="Your Email"
                  summary={`${scannedEmailCount.toLocaleString()} emails scanned`}
                />
              )}
            </AnimatePresence>

            {/* Collapsed: Policies (when past extracting) */}
            <AnimatePresence>
              {activeBucket > 1 && (
                <CollapsedBucket
                  stepNumber={2}
                  label="Your Policies"
                  summary={`${extractedPolicies.length} policies found`}
                />
              )}
            </AnimatePresence>

            {/* Active bucket */}
            <AnimatePresence mode="wait">
              {activeBucket === 0 && (
                <motion.div
                  key="mobile-email"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="rounded-xl border border-primary-light/40 bg-primary-light/4 p-4 flex flex-col shrink-0"
                >
                  <MobileStepLabel stepNumber={1} label="Your Email" />
                  <EmailBucketContent
                    phase={phase}
                    scannedEmails={scannedEmails}
                  />
                </motion.div>
              )}

              {activeBucket === 1 && (
                <motion.div
                  key="mobile-policies"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="rounded-xl border border-primary-light/40 bg-primary-light/4 p-4 flex flex-col shrink-0"
                >
                  <MobileStepLabel stepNumber={2} label="Your Policies" />
                  <PolicyBucketContent extractedPolicies={extractedPolicies} />
                </motion.div>
              )}

              {activeBucket === 2 && (
                <motion.div
                  key="mobile-clair"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="rounded-xl border border-primary-light/40 bg-primary-light/4 p-4 flex flex-col shrink-0"
                >
                  <MobileStepLabel stepNumber={3} label="Claire" />
                  <div className="w-full flex flex-1 justify-center items-center">
                    <ClaireBucketContent
                      phase={phase}
                      claireStatus={claireStatus}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </motion.div>
        </div>

        <Footer />
      </div>

      <FixedActionFooter
        label="See what Claire can do"
        onClick={onComplete}
      />
    </div>
  );
}
