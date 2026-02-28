"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, animate, useMotionValue } from "framer-motion";
import { FaEnvelope, FaFile, FaArrowRight, FaChevronDown, FaCheck } from "react-icons/fa";
import { MOCK_POLICIES } from "@/data/demoData";
import {
  SourcesStack,
  SourceCircle,
  PolicySourceIcon,
  IntegrationSourcesStack,
} from "@/components/demo/ContextSources";
import { EMAIL_GL_DATE, EMAIL_CA_DATE, EMAIL_WC_DATE, EMAIL_CP_DATE } from "@/lib/demoDates";
import { FadeIn } from "@/components/FadeIn";
import { MeetClaireHeader } from "./MeetClaireHeader";
import { FixedActionFooter } from "./FixedActionFooter";
import { BackToClarityButton } from "./BackToClarityButton";
import { BookDemoButton } from "./BookDemoButton";

interface PolicyUploadStepProps {
  onComplete: () => void;
  onBookDemo?: () => void;
}

type Phase = "scanning" | "extracting" | "analyzing" | "ready";

type ClaireStatusItem = {
  id: string;
  label: string;
  sources?: "policies" | "integrations";
};

/* ---------- Email data ---------- */

/* Email dates from @/lib/demoDates — span ~4 years relative to current year */
const EMAILS = [
  { subject: "Policy Renewal – GL", from: "agent@hartford.com", date: EMAIL_GL_DATE },
  { subject: "Your Auto Policy", from: "noreply@progressive.com", date: EMAIL_CA_DATE },
  { subject: "Workers Comp Certificate", from: "certs@employers.com", date: EMAIL_WC_DATE },
  { subject: "Commercial Property Update", from: "service@travelers.com", date: EMAIL_CP_DATE },
];

/* ---------- Flow arrows (FontAwesome) ---------- */

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="hidden md:flex items-center justify-center w-12 shrink-0">
      <motion.span
        className="flex items-center justify-center"
        animate={{ color: active ? ["var(--divider)", "var(--primary-light)", "var(--divider)"] : "var(--divider)" }}
        transition={
          active
            ? { duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
            : { duration: 0.5 }
        }
      >
        <FaArrowRight className="w-4 h-3" />
      </motion.span>
    </div>
  );
}

function FlowArrowVertical({ active }: { active: boolean }) {
  return (
    <div className="md:hidden flex justify-center h-8">
      <motion.span
        className="flex items-center justify-center"
        animate={{ color: active ? ["var(--divider)", "var(--primary-light)", "var(--divider)"] : "var(--divider)" }}
        transition={
          active
            ? { duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
            : { duration: 0.5 }
        }
      >
        <FaChevronDown className="w-3 h-4" />
      </motion.span>
    </div>
  );
}

/* ---------- Thinking dots (chatbot-style in-progress indicator) ---------- */

function ThinkingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-0.5 align-middle">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-primary-light"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

/* ---------- Claire globe ---------- */

const GLOBE_PATH =
  "M31.1839 0H33.7892C33.7984 0.00163511 33.8076 0.00327022 33.8168 0.00490534C35.7548 0.103479 37.6654 0.343031 39.5637 0.756107C47.2996 2.48727 54.1398 6.97839 58.8034 13.3888C61.8198 17.5301 63.8104 22.3281 64.6122 27.3885C64.7439 28.1992 64.8423 29.015 64.907 29.8338C64.9314 30.1443 64.9549 30.873 65 31.1436V33.8838C64.9343 34.504 64.9168 35.1609 64.8518 35.7998C64.709 37.0884 64.5017 38.3687 64.2307 39.6364C62.6136 46.7854 58.6333 53.1803 52.9331 57.7875C48.8608 61.0864 44.0473 63.3455 38.908 64.3703C37.9425 64.5626 36.9691 64.7137 35.9909 64.8235C35.6881 64.8565 34.4008 64.9499 34.204 65H30.7301C30.435 64.9295 29.5167 64.8727 29.1607 64.8346C28.2788 64.7448 27.4013 64.616 26.5308 64.4487C21.7957 63.5756 17.3165 61.6519 13.4231 58.8193C7.00216 54.1649 2.50137 47.3265 0.766127 39.5884C0.345341 37.6771 0.106663 35.7729 0.00478197 33.8248C0.00318798 33.8159 0.00159399 33.8073 0 33.7984V31.2061C0.0720288 30.9269 0.0875815 29.9317 0.115877 29.5899C0.193066 28.7192 0.307883 27.8523 0.460005 26.9916C1.32508 21.9138 3.39165 17.1164 6.48737 12.9994C11.1318 6.80142 17.8355 2.4641 25.3926 0.767676C26.9685 0.426121 28.6008 0.184783 30.2088 0.0716999C30.5151 0.0501601 30.8518 0.0500306 31.1532 0.004891L31.1839 0ZM19.7861 19.7919C19.5136 21.1315 19.273 22.4775 19.0646 23.8286C18.3129 29.0375 18.2464 34.3224 18.8669 39.5488C19.1155 41.7139 19.5523 44.3961 20.1022 46.5156C24.3291 47.3313 28.499 47.8328 32.8114 47.7915C33.6004 47.7839 34.3979 47.7382 35.1844 47.736C36.8653 47.5931 38.3894 47.5208 40.0966 47.3161C42.1532 47.0495 44.1956 46.6819 46.216 46.2144C47.6884 39.5078 48.1958 33.1157 47.4583 26.2705C47.2402 24.2463 46.9523 22.0642 46.5058 20.0795C42.5972 19.1519 38.6061 18.6144 34.5912 18.4747C33.4598 18.4339 32.1725 18.4032 31.0377 18.4553C27.8976 18.5347 24.7684 18.857 21.6781 19.4194C21.1033 19.5278 20.3348 19.6515 19.7861 19.7919ZM25.3374 4.56708C23.9751 7.13654 22.8051 9.80342 21.8368 12.5457C21.5941 13.2294 21.3756 13.9445 21.1476 14.6342C21.0244 15.007 20.9145 15.5026 20.7788 15.8537C24.4615 15.1073 28.651 14.7912 32.4 14.7844C33.2389 14.7829 34.5408 14.769 35.3485 14.8499C37.627 14.8983 39.7773 15.1637 42.0221 15.4831C42.8489 15.5925 43.6716 15.7305 44.4888 15.8968C44.7916 15.9562 45.234 16.0326 45.5219 16.1151C44.665 13.0635 43.5598 10.0872 42.217 7.21608C41.9523 6.64949 41.4115 5.48282 41.0916 4.97155C40.685 4.81771 40.1537 4.69155 39.7271 4.57945C37.3417 3.95614 34.8842 3.65187 32.4184 3.67456C32.0354 3.67472 31.4734 3.66184 31.1019 3.69751C29.2399 3.80612 27.138 4.07116 25.3374 4.56708ZM6.37482 20.3486C6.76584 20.2134 7.19447 19.984 7.58418 19.823C8.26627 19.5414 8.96245 19.2398 9.65247 18.9819C11.4942 18.2806 13.366 17.6609 15.2624 17.1245C15.7537 16.9822 16.2521 16.8786 16.7333 16.742C17.6046 13.5679 18.5257 10.4937 19.8717 7.47821C19.9434 7.3177 20.3434 6.45588 20.3373 6.3494C19.4564 6.77828 18.6777 7.16796 17.8311 7.67232C13.8325 10.0484 10.4621 13.3489 8.00262 17.2968C7.44507 18.2006 6.78787 19.3442 6.37209 20.3168L6.37482 20.3486ZM60.0107 41.1046C60.1713 40.752 60.4059 39.7592 60.5103 39.3453C61.3996 35.6846 61.5669 31.8859 61.0029 28.1613C60.8785 27.3011 60.6877 26.1877 60.4338 25.3539C59.8105 24.917 58.7936 24.5139 58.0931 24.161C55.6274 22.9192 53.0582 22.0531 50.4566 21.1611C51.6385 27.7058 51.7867 34.3954 50.8958 40.9862C50.7194 42.2944 50.4997 43.8391 50.2014 45.1353C52.4335 44.4587 55.2383 43.4135 57.3523 42.4087C58.1509 42.037 59.2471 41.5419 60.0107 41.1046ZM20.3735 58.665C19.9852 57.718 19.5704 56.8172 19.1829 55.8476C18.5607 54.268 18.0044 52.6633 17.5154 51.0374C17.3813 50.588 17.1915 50.0141 17.0829 49.5669C13.8915 48.8211 10.7625 47.7179 7.74125 46.4629C7.5413 46.3801 7.33345 46.2798 7.13207 46.2052C9.53469 50.6391 13.0529 54.3689 17.3388 57.0264C18.0358 57.4634 19.6146 58.3642 20.3735 58.665ZM58.6727 20.3657C58.2458 19.5111 57.8662 18.7418 57.378 17.9112C55.3684 14.5014 52.6846 11.5374 49.4901 9.20051C48.5643 8.52322 47.2243 7.6362 46.202 7.13229C47.4897 9.97639 48.8741 14.0345 49.5765 17.0852C51.548 17.6071 53.9237 18.4172 55.8238 19.1709C56.3948 19.3991 56.9632 19.6343 57.5288 19.8764C57.8252 20.0065 58.3864 20.2764 58.6727 20.3657ZM49.2451 49.2467C48.492 51.8657 47.6801 54.4229 46.6102 56.935C46.5489 57.0784 46.2325 57.7478 46.2401 57.8468L46.2468 57.8535C50.4153 55.5118 53.9262 52.4002 56.5592 48.3898C56.7284 48.1321 57.824 46.4172 57.8373 46.2274L57.8262 46.216C55.7861 47.1488 53.5933 47.9042 51.4604 48.5945C50.7517 48.8236 49.9307 49.0074 49.2451 49.2467ZM45.0633 50.2233C44.1226 50.3788 43.2021 50.58 42.2535 50.7181C37.229 51.4887 32.1309 51.6598 27.0662 51.2278C25.6436 51.0974 24.2247 50.9291 22.811 50.7235C22.3015 50.6505 21.65 50.5064 21.1655 50.4559C21.7651 52.2364 22.3537 54.0103 23.1056 55.7356C23.3327 56.2564 23.7126 57.1911 23.9735 57.6783C24.3129 58.4048 24.9426 59.7781 25.3536 60.4392C29.7579 61.5551 34.3621 61.6256 38.7985 60.6449C39.4002 60.5084 40.5165 60.2326 41.0938 60.0266C41.4724 59.376 41.9221 58.4095 42.2421 57.723C43.2342 55.6001 44.0934 53.4174 44.8148 51.1878C44.8751 50.9952 45.1039 50.3617 45.1134 50.2271L45.0633 50.2233ZM7.96526 42.561C8.50459 42.7803 9.03874 43.0333 9.5816 43.258C10.6311 43.6938 11.6932 44.0984 12.7665 44.472C13.908 44.8741 15.006 45.1591 16.1115 45.5251C14.9091 39.7224 14.5106 33.7822 14.9273 27.8709C15.0112 26.7461 15.1248 25.6236 15.2679 24.5047C15.3159 24.1381 15.828 20.8417 15.8094 20.7949C12.746 21.6716 9.76104 22.8023 6.88565 24.1753C6.3122 24.4456 5.08298 25.0183 4.56666 25.349C3.61017 29.106 3.41948 33.017 4.00604 36.8491C4.20072 38.1751 4.5547 39.8242 4.97447 41.1058C5.68899 41.4686 6.40377 41.8422 7.13302 42.1738C7.37039 42.2817 7.73246 42.4715 7.96526 42.561Z";

function ClaireGlobe({
  size = 36,
  spinning,
}: {
  size?: number;
  spinning: boolean;
}) {
  const rotation = useMotionValue(0);
  const spinRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (spinning) {
      spinRef.current?.stop();
      const loop = () => {
        if (cancelled) return;
        spinRef.current = animate(rotation, 360, {
          duration: 3,
          ease: "linear",
          onComplete: () => {
            if (cancelled) return;
            rotation.set(0);
            loop();
          },
        });
      };
      loop();
    } else {
      spinRef.current?.stop();
      const current = rotation.get();
      const normalized = ((current % 360) + 360) % 360;
      const target = normalized > 180 ? 360 : 0;

      animate(rotation, target, {
        type: "spring",
        stiffness: 65,
        damping: 16,
        mass: 1.4,
        onComplete: () => {
          if (!cancelled) rotation.set(0);
        },
      });
    }

    return () => {
      cancelled = true;
      spinRef.current?.stop();
    };
  }, [spinning, rotation]);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotate: rotation }}
    >
      <circle
        cx="32.5"
        cy="32.5"
        r="31"
        fill="none"
        stroke="var(--primary-light)"
        strokeWidth="1.25"
        strokeOpacity="0.4"
      />
      <path d={GLOBE_PATH} fill="var(--primary-light)" />
    </motion.svg>
  );
}

/* ---------- Collapsed summary bar (mobile accordion) ---------- */

function CollapsedBucket({
  label,
  summary,
  stepNumber,
}: {
  label: string;
  summary: string;
  stepNumber: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-foreground/6 bg-white/30 mb-2">
        <span className="w-5 h-5 rounded-full bg-primary-light/15 text-primary-muted text-caption font-bold flex items-center justify-center shrink-0">
          {stepNumber}
        </span>
        <span className="text-label font-medium text-foreground/70">
          {label}
        </span>
        <span className="text-label-sm text-muted/50 ml-auto">{summary}</span>
        <FaCheck className="w-3 h-3 shrink-0 text-primary-light" />
      </div>
    </motion.div>
  );
}

/* ---------- Active bucket indicator (mobile) ---------- */

function MobileStepLabel({
  stepNumber,
  label,
}: {
  stepNumber: number;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex items-center gap-2 mb-2 shrink-0"
    >
      <span className="w-5 h-5 rounded-full bg-primary-light text-white text-caption font-bold flex items-center justify-center shrink-0">
        {stepNumber}
      </span>
      <span className="text-label-sm font-semibold text-muted tracking-wider uppercase">
        {label}
      </span>
    </motion.div>
  );
}

/* ---------- Bucket content renderers (shared) ---------- */

function EmailBucketContent({
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

function PolicyBucketContent({
  extractedPolicies,
}: {
  extractedPolicies: number[];
}) {
  if (extractedPolicies.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-label text-muted/30"
        >
          Waiting for scan...
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

function ClaireBucketContent({
  phase,
  claireStatus,
}: {
  phase: Phase;
  claireStatus: ClaireStatusItem[];
}) {
  const isReady = phase === "ready";

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative">
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
          <div className="h-14 flex items-center justify-center shrink-0">
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
            <ClaireGlobe size={44} spinning={false} />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-label text-muted/40"
          >
            Waiting for policies&hellip;
          </motion.p>
        </div>
      )}
    </div>
  );
}

/* ---------- Which mobile bucket is "active" for accordion ---------- */

function getActiveBucket(phase: Phase): number {
  if (phase === "scanning") return 0;
  if (phase === "extracting") return 1;
  return 2; // analyzing + ready
}

/* ---------- Main component ---------- */

function useIsMobile() {
  // Use consistent initial state for SSR hydration - avoid typeof window check
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

export function PolicyUploadStep({ onComplete, onBookDemo }: PolicyUploadStepProps) {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [showSteps, setShowSteps] = useState(false);
  const isMobile = useIsMobile();
  const [scannedEmails, setScannedEmails] = useState<number[]>([]);
  const [extractedPolicies, setExtractedPolicies] = useState<number[]>([]);
  const [claireStatus, setClaireStatus] = useState<ClaireStatusItem[]>([]);
  const [scannedEmailCount, setScannedEmailCount] = useState(0);

  const activeBucket = getActiveBucket(phase);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const bottomGradient = (
    <div
      className="fixed left-0 right-0 bottom-0 h-24 z-30 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, transparent, var(--background))`,
      }}
    />
  );

  return (
    <div className="flex flex-col min-h-0 px-4 md:px-8 relative">
      <BackToClarityButton />
      {onBookDemo && <BookDemoButton onClick={onBookDemo} />}
      {/* Sticky translucent glass header */}
      <div className="sticky top-0 z-10 -mx-4 md:-mx-8 px-4 md:px-8 pt-16 pb-6 bg-background/70 backdrop-blur-md shrink-0">
        <MeetClaireHeader
          subtitle="Claire is a system of record for your businesses' insurance. It scans your email, finds your policies, and gets to work."
          logoSize={isMobile ? 32 : 40}
        />
      </div>
      {/* ── CONTENT — centered on desktop, top-aligned on mobile (scrollable) ── */}
      <div className="flex-1 flex flex-col justify-start md:justify-center min-h-0 pt-4 pb-20">

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
          <div className="md:hidden flex flex-col">
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

      {/* Bottom gradient — fixed to viewport via portal, content fades before CTA bar */}
      {mounted && createPortal(bottomGradient, document.body)}

      <FixedActionFooter
        label="See what Claire can do"
        onClick={onComplete}
        // visible={phase === "ready"}
      />
    </div>
  );
}
