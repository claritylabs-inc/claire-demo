"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaFile } from "react-icons/fa";
import { MOCK_POLICIES } from "@/data/demoData";
import {
  SourcesStack,
  PolicySourceIcon,
  IntegrationSourcesStack,
} from "@/components/views/ContextSources";
import { FadeIn } from "@/components/ui/FadeIn";
import { ThinkingDots } from "./ThinkingDots";
import { ClaireGlobe } from "./ClaireGlobe";
import { EMAIL_GL_DATE, EMAIL_CA_DATE, EMAIL_WC_DATE, EMAIL_CP_DATE } from "@/lib/demoDates";

export type Phase = "scanning" | "extracting" | "analyzing" | "ready";

export type ClaireStatusItem = {
  id: string;
  label: string;
  sources?: "policies" | "integrations";
};

export const EMAILS = [
  { subject: "Policy Renewal – GL", from: "agent@hartford.com", date: EMAIL_GL_DATE },
  { subject: "Your Auto Policy", from: "noreply@progressive.com", date: EMAIL_CA_DATE },
  { subject: "Workers Comp Certificate", from: "certs@employers.com", date: EMAIL_WC_DATE },
  { subject: "Commercial Property Update", from: "service@travelers.com", date: EMAIL_CP_DATE },
];

export function EmailBucketContent({
  phase,
  scannedEmails,
}: {
  phase: Phase;
  scannedEmails: number[];
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden divide-y divide-foreground/6">
      <AnimatePresence>
        {scannedEmails.map((idx, i) => (
          <FadeIn
            key={idx}
            when={true}
            staggerIndex={i}
            duration={0.35}
            className="flex items-start gap-2.5 px-2 py-3"
          >
            {phase === "scanning" &&
            idx === scannedEmails[scannedEmails.length - 1] ? (
              <motion.span
                className="w-4 h-6 flex items-center justify-center shrink-0 rounded text-primary-light"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <FaEnvelope className="w-4 h-3" />
              </motion.span>
            ) : (
              <span className="w-4 h-6 flex items-center justify-center shrink-0 rounded text-primary-light">
                <FaEnvelope className="w-4 h-3" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-label-sm mb-0.5">
                <span className="font-medium text-muted/70">Subject:</span>{" "}
                <span className="text-foreground">{EMAILS[idx].subject}</span>
              </p>
              <p className="text-caption text-muted/50">
                <span className="font-medium text-muted/60">From:</span>{" "}
                <span className="font-mono">{EMAILS[idx].from}</span>
                <span className="text-muted/40 mx-1.5">·</span>
                <span className="text-muted/40">{EMAILS[idx].date}</span>
              </p>
            </div>
          </FadeIn>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function PolicyBucketContent({
  extractedPolicies,
}: {
  extractedPolicies: number[];
}) {
  if (extractedPolicies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 pt-4">
          <div className="h-14 flex items-center justify-center">
            <ClaireGlobe size={44} spinning={true} />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-label text-muted/60"
          >
            Waiting for email scan...
          </motion.p>
        </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 overflow-hidden divide-y divide-foreground/6">
      <AnimatePresence>
        {extractedPolicies.map((idx, i) => (
          <FadeIn
            key={idx}
            when={true}
            staggerIndex={i}
            duration={0.35}
            className="flex items-start gap-2.5 px-2 py-3"
          >
            <span className="w-4 h-6 flex items-center justify-center shrink-0 rounded text-primary-light">
              <FaFile className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-label-sm flex flex-wrap items-center gap-1.5 w-full justify-between">
                <span className="text-foreground">{MOCK_POLICIES[idx].type}</span>
                <span className="rounded-md bg-foreground/4 px-2 py-0.5 font-mono text-caption text-muted/70">
                  documents/pdf
                </span>
              </p>
              <p className="text-caption text-muted/50">
                {MOCK_POLICIES[idx].carrier}
                <span className="text-muted/40 mx-1.5">·</span>
                <span className="font-mono">{MOCK_POLICIES[idx].policyNumber}</span>
              </p>
            </div>
          </FadeIn>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ClaireBucketContent({
  phase,
  claireStatus,
}: {
  phase: Phase;
  claireStatus: ClaireStatusItem[];
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-4 relative">
      {phase === "analyzing" || phase === "ready" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center gap-4 md:gap-5 relative z-10"
        >
          {/* Radial glow behind globe */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(160,210,250,0.15) 0%, rgba(160,210,250,0.04) 50%, transparent 70%)",
            }}
            animate={phase === "analyzing" ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : { scale: 1, opacity: 0.6 }}
            transition={phase === "analyzing" ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
          />

          {/* Globe */}
          <div className="h-14 flex items-center justify-center shrink-0 mb-2">
            <ClaireGlobe size={44} spinning={phase === "analyzing"} />
          </div>

          {/* Status items — consistent layout, Perplexity-style sources */}
          <div className="flex flex-col items-center gap-3 pb-3 min-h-18 w-[220px]">
            <AnimatePresence>
              {claireStatus.map((item, i) => {
                const isComplete = item.id === "ready";
                const isLast = i === claireStatus.length - 1;
                const showThinking = !isComplete && isLast && phase === "analyzing";

                return (
                  <FadeIn
                    key={item.id}
                    when={true}
                    staggerIndex={i}
                    duration={0.35}
                    className="flex items-center gap-2.5 w-[220px]"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isComplete ? "bg-success" : "bg-primary-light"
                      }`}
                    />
                    <div className="flex flex-col items-start gap-1.5 min-w-0 flex-1">
                      <span
                        className={`inline-flex flex-wrap items-center gap-2 text-label ${
                          isComplete
                            ? "text-success font-semibold"
                            : "text-muted/70"
                        }`}
                      >
                        {item.label}
                        {item.sources === "policies" && (
                          <SourcesStack>
                            {(["gl", "cp", "wc", "ca"] as const).map((id, j) => (
                              <PolicySourceIcon key={id} policyId={id} index={j} size="md" />
                            ))}
                          </SourcesStack>
                        )}
                        {item.sources === "integrations" && (
                          <IntegrationSourcesStack size="md" />
                        )}
                        {showThinking && <ThinkingDots />}
                      </span>
                    </div>
                  </FadeIn>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 flex items-center justify-center">
            <ClaireGlobe size={44} spinning={true} />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-label text-muted"
          >
            Waiting for policies...
          </motion.p>
        </div>
      )}
    </div>
  );
}
