"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  CHAT_PROMPTS,
  CTA_PHONE,
  CTA_PHONE_HREF,
  CTA_EMAIL,
  CTA_EMAIL_HREF,
} from "@/data/demoData";

/* =============================================================================
   iMessage-style bubble components
   ============================================================================= */

/** iMessage tapback reaction badge */
function TapbackReaction({ emoji, side }: { emoji: string; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className={`absolute -top-2.5 ${side === "left" ? "-right-1" : "-left-1"} w-[22px] h-[22px] rounded-full bg-white shadow-sm border border-black/8 flex items-center justify-center z-10`}
    >
      <span className="text-[11px] leading-none">{emoji}</span>
    </motion.div>
  );
}

/** Incoming (gray) bubble — Clair's messages, left-aligned */
function IncomingBubble({ children, reaction }: { children: React.ReactNode; reaction?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-start"
    >
      <div className="relative max-w-[82%] rounded-[18px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-[7px]">
        <div className="text-[13px] leading-[17px] text-black whitespace-pre-line">
          {children}
        </div>
        {reaction && <TapbackReaction emoji={reaction} side="left" />}
      </div>
    </motion.div>
  );
}

/** Outgoing (blue) bubble — user's messages, right-aligned */
function OutgoingBubble({ text, reaction }: { text: string; reaction?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-end"
    >
      <div className="relative max-w-[82%] rounded-[18px] rounded-br-[4px] bg-[#007AFF] px-3 py-[7px]">
        <p className="text-[13px] leading-[17px] text-white whitespace-pre-line">
          {text}
        </p>
        {reaction && <TapbackReaction emoji={reaction} side="right" />}
      </div>
    </motion.div>
  );
}

/** Typing indicator — three bouncing dots in a gray bubble */
function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex justify-start"
    >
      <div className="rounded-[18px] rounded-bl-[4px] bg-[#e9e9eb] px-4 py-[10px]">
        <div className="flex items-center gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[7px] h-[7px] rounded-full bg-[#8e8e93]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** CTA bubble — looks like a normal incoming message with contact links */
function CTAIncoming() {
  return (
    <IncomingBubble>
      <span>
        When something comes up — just text or email me. I&apos;m here 24/7.
      </span>
      <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-black/8">
        <a
          href={CTA_PHONE_HREF}
          className="inline-flex items-center gap-1 text-[12px] text-[#007AFF]"
        >
          {CTA_PHONE}
        </a>
        <a
          href={CTA_EMAIL_HREF}
          className="inline-flex items-center gap-1 text-[12px] text-[#007AFF]"
        >
          {CTA_EMAIL}
        </a>
      </div>
    </IncomingBubble>
  );
}

/* =============================================================================
   Scripted conversation
   ============================================================================= */

type Message =
  | { type: "incoming"; text: string; reaction?: string }
  | { type: "outgoing"; text: string; reaction?: string }
  | { type: "typing" }
  | { type: "cta"; reaction?: string };

const DEMO_PROMPTS = CHAT_PROMPTS.slice(0, 2);

// Reactions to add to Clair's responses (by message index after typing is removed)
const REACTIONS: { targetIndex: number; emoji: string; delay: number }[] = [];

interface ScriptStep {
  action: "add" | "replace-typing" | "react";
  message?: Message;
  delay: number;
  reactIndex?: number;
  reactEmoji?: string;
}

function buildScript(): ScriptStep[] {
  const steps: ScriptStep[] = [];
  let t = 0;
  let msgCount = 0;

  // Opening Clair greeting
  steps.push({
    action: "add",
    message: {
      type: "incoming",
      text: "Hi! I\u2019ve analyzed all your policies and business context. What can I help with?",
    },
    delay: t,
  });
  msgCount++;

  for (let pi = 0; pi < DEMO_PROMPTS.length; pi++) {
    const prompt = DEMO_PROMPTS[pi];

    t += 2200;
    steps.push({
      action: "add",
      message: { type: "outgoing", text: prompt.question },
      delay: t,
    });
    msgCount++;

    t += 500;
    steps.push({
      action: "add",
      message: { type: "typing" },
      delay: t,
    });
    // typing doesn't increment msgCount since it gets replaced

    t += 2000;
    const responseIdx = msgCount; // index of the incoming response after typing is removed
    steps.push({
      action: "replace-typing",
      message: { type: "incoming", text: prompt.answer },
      delay: t,
    });
    msgCount++;

    // Add a reaction to Clair's response after a short pause
    t += 800;
    const emoji = pi === 0 ? "\u2764\uFE0F" : "\uD83D\uDC4D"; // heart, then thumbs up
    steps.push({
      action: "react",
      delay: t,
      reactIndex: responseIdx,
      reactEmoji: emoji,
    });
  }

  t += 1500;
  steps.push({
    action: "add",
    message: { type: "cta" },
    delay: t,
  });

  // Heart react the CTA
  t += 1000;
  steps.push({
    action: "react",
    delay: t,
    reactIndex: msgCount, // the CTA message
    reactEmoji: "\u2764\uFE0F",
  });

  return steps;
}

const SCRIPT = buildScript();
const SCRIPT_DURATION = SCRIPT[SCRIPT.length - 1].delay + 3000; // last step + 3s pause

/* =============================================================================
   iOS Messages-style iPhone mockup
   ============================================================================= */

function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[260px] h-[540px] sm:w-[300px] sm:h-[620px]">
      {/* Phone outer shell */}
      <div
        className="absolute inset-0 rounded-[48px] bg-black overflow-hidden"
        style={{
          boxShadow:
            "0 0 0 2px #1a1a1a, 0 20px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Screen area with iOS-white bg */}
        <div className="absolute inset-[3px] rounded-[45px] bg-[#f2f2f7] overflow-hidden flex flex-col">
          {/* Dynamic Island */}
          <div className="h-[44px] flex items-start justify-center pt-[10px] bg-[#f2f2f7] relative z-10">
            <div className="w-[90px] h-[25px] rounded-full bg-black" />
          </div>

          {/* iOS Messages nav bar — compact */}
          <div className="h-[36px] flex items-center px-3 bg-[#f2f2f7]/90 backdrop-blur-sm relative z-10">
            {/* Back chevron */}
            <div className="flex items-center gap-0.5 text-[#007AFF] w-8">
              <svg
                width="9"
                height="14"
                viewBox="0 0 10 18"
                fill="none"
              >
                <path
                  d="M9 1L1 9l8 8"
                  stroke="#007AFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Center: Clarity Labs logo + name */}
            <div className="flex-1 flex flex-col items-center">
              {/* LogoIcon globe as contact picture */}
              <div className="w-[24px] h-[24px] rounded-full bg-[#E8F4FD] flex items-center justify-center overflow-hidden">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="32.5" cy="32.5" r="31" fill="none" stroke="#A0D2FA" strokeWidth="1.25" strokeOpacity="0.5" />
                  <path d="M31.1839 0H33.7892C33.7984 0.00163511 33.8076 0.00327022 33.8168 0.00490534C35.7548 0.103479 37.6654 0.343031 39.5637 0.756107C47.2996 2.48727 54.1398 6.97839 58.8034 13.3888C61.8198 17.5301 63.8104 22.3281 64.6122 27.3885C64.7439 28.1992 64.8423 29.015 64.907 29.8338C64.9314 30.1443 64.9549 30.873 65 31.1436V33.8838C64.9343 34.504 64.9168 35.1609 64.8518 35.7998C64.709 37.0884 64.5017 38.3687 64.2307 39.6364C62.6136 46.7854 58.6333 53.1803 52.9331 57.7875C48.8608 61.0864 44.0473 63.3455 38.908 64.3703C37.9425 64.5626 36.9691 64.7137 35.9909 64.8235C35.6881 64.8565 34.4008 64.9499 34.204 65H30.7301C30.435 64.9295 29.5167 64.8727 29.1607 64.8346C28.2788 64.7448 27.4013 64.616 26.5308 64.4487C21.7957 63.5756 17.3165 61.6519 13.4231 58.8193C7.00216 54.1649 2.50137 47.3265 0.766127 39.5884C0.345341 37.6771 0.106663 35.7729 0.00478197 33.8248C0.00318798 33.8159 0.00159399 33.8073 0 33.7984V31.2061C0.0720288 30.9269 0.0875815 29.9317 0.115877 29.5899C0.193066 28.7192 0.307883 27.8523 0.460005 26.9916C1.32508 21.9138 3.39165 17.1164 6.48737 12.9994C11.1318 6.80142 17.8355 2.4641 25.3926 0.767676C26.9685 0.426121 28.6008 0.184783 30.2088 0.0716999C30.5151 0.0501601 30.8518 0.0500306 31.1532 0.004891L31.1839 0ZM19.7861 19.7919C19.5136 21.1315 19.273 22.4775 19.0646 23.8286C18.3129 29.0375 18.2464 34.3224 18.8669 39.5488C19.1155 41.7139 19.5523 44.3961 20.1022 46.5156C24.3291 47.3313 28.499 47.8328 32.8114 47.7915C33.6004 47.7839 34.3979 47.7382 35.1844 47.736C36.8653 47.5931 38.3894 47.5208 40.0966 47.3161C42.1532 47.0495 44.1956 46.6819 46.216 46.2144C47.6884 39.5078 48.1958 33.1157 47.4583 26.2705C47.2402 24.2463 46.9523 22.0642 46.5058 20.0795C42.5972 19.1519 38.6061 18.6144 34.5912 18.4747C33.4598 18.4339 32.1725 18.4032 31.0377 18.4553C27.8976 18.5347 24.7684 18.857 21.6781 19.4194C21.1033 19.5278 20.3348 19.6515 19.7861 19.7919ZM25.3374 4.56708C23.9751 7.13654 22.8051 9.80342 21.8368 12.5457C21.5941 13.2294 21.3756 13.9445 21.1476 14.6342C21.0244 15.007 20.9145 15.5026 20.7788 15.8537C24.4615 15.1073 28.651 14.7912 32.4 14.7844C33.2389 14.7829 34.5408 14.769 35.3485 14.8499C37.627 14.8983 39.7773 15.1637 42.0221 15.4831C42.8489 15.5925 43.6716 15.7305 44.4888 15.8968C44.7916 15.9562 45.234 16.0326 45.5219 16.1151C44.665 13.0635 43.5598 10.0872 42.217 7.21608C41.9523 6.64949 41.4115 5.48282 41.0916 4.97155C40.685 4.81771 40.1537 4.69155 39.7271 4.57945C37.3417 3.95614 34.8842 3.65187 32.4184 3.67456C32.0354 3.67472 31.4734 3.66184 31.1019 3.69751C29.2399 3.80612 27.138 4.07116 25.3374 4.56708ZM6.37482 20.3486C6.76584 20.2134 7.19447 19.984 7.58418 19.823C8.26627 19.5414 8.96245 19.2398 9.65247 18.9819C11.4942 18.2806 13.366 17.6609 15.2624 17.1245C15.7537 16.9822 16.2521 16.8786 16.7333 16.742C17.6046 13.5679 18.5257 10.4937 19.8717 7.47821C19.9434 7.3177 20.3434 6.45588 20.3373 6.3494C19.4564 6.77828 18.6777 7.16796 17.8311 7.67232C13.8325 10.0484 10.4621 13.3489 8.00262 17.2968C7.44507 18.2006 6.78787 19.3442 6.37209 20.3168L6.37482 20.3486ZM60.0107 41.1046C60.1713 40.752 60.4059 39.7592 60.5103 39.3453C61.3996 35.6846 61.5669 31.8859 61.0029 28.1613C60.8785 27.3011 60.6877 26.1877 60.4338 25.3539C59.8105 24.917 58.7936 24.5139 58.0931 24.161C55.6274 22.9192 53.0582 22.0531 50.4566 21.1611C51.6385 27.7058 51.7867 34.3954 50.8958 40.9862C50.7194 42.2944 50.4997 43.8391 50.2014 45.1353C52.4335 44.4587 55.2383 43.4135 57.3523 42.4087C58.1509 42.037 59.2471 41.5419 60.0107 41.1046ZM20.3735 58.665C19.9852 57.718 19.5704 56.8172 19.1829 55.8476C18.5607 54.268 18.0044 52.6633 17.5154 51.0374C17.3813 50.588 17.1915 50.0141 17.0829 49.5669C13.8915 48.8211 10.7625 47.7179 7.74125 46.4629C7.5413 46.3801 7.33345 46.2798 7.13207 46.2052C9.53469 50.6391 13.0529 54.3689 17.3388 57.0264C18.0358 57.4634 19.6146 58.3642 20.3735 58.665ZM58.6727 20.3657C58.2458 19.5111 57.8662 18.7418 57.378 17.9112C55.3684 14.5014 52.6846 11.5374 49.4901 9.20051C48.5643 8.52322 47.2243 7.6362 46.202 7.13229C47.4897 9.97639 48.8741 14.0345 49.5765 17.0852C51.548 17.6071 53.9237 18.4172 55.8238 19.1709C56.3948 19.3991 56.9632 19.6343 57.5288 19.8764C57.8252 20.0065 58.3864 20.2764 58.6727 20.3657ZM49.2451 49.2467C48.492 51.8657 47.6801 54.4229 46.6102 56.935C46.5489 57.0784 46.2325 57.7478 46.2401 57.8468L46.2468 57.8535C50.4153 55.5118 53.9262 52.4002 56.5592 48.3898C56.7284 48.1321 57.824 46.4172 57.8373 46.2274L57.8262 46.216C55.7861 47.1488 53.5933 47.9042 51.4604 48.5945C50.7517 48.8236 49.9307 49.0074 49.2451 49.2467ZM45.0633 50.2233C44.1226 50.3788 43.2021 50.58 42.2535 50.7181C37.229 51.4887 32.1309 51.6598 27.0662 51.2278C25.6436 51.0974 24.2247 50.9291 22.811 50.7235C22.3015 50.6505 21.65 50.5064 21.1655 50.4559C21.7651 52.2364 22.3537 54.0103 23.1056 55.7356C23.3327 56.2564 23.7126 57.1911 23.9735 57.6783C24.3129 58.4048 24.9426 59.7781 25.3536 60.4392C29.7579 61.5551 34.3621 61.6256 38.7985 60.6449C39.4002 60.5084 40.5165 60.2326 41.0938 60.0266C41.4724 59.376 41.9221 58.4095 42.2421 57.723C43.2342 55.6001 44.0934 53.4174 44.8148 51.1878C44.8751 50.9952 45.1039 50.3617 45.1134 50.2271L45.0633 50.2233ZM7.96526 42.561C8.50459 42.7803 9.03874 43.0333 9.5816 43.258C10.6311 43.6938 11.6932 44.0984 12.7665 44.472C13.908 44.8741 15.006 45.1591 16.1115 45.5251C14.9091 39.7224 14.5106 33.7822 14.9273 27.8709C15.0112 26.7461 15.1248 25.6236 15.2679 24.5047C15.3159 24.1381 15.828 20.8417 15.8094 20.7949C12.746 21.6716 9.76104 22.8023 6.88565 24.1753C6.3122 24.4456 5.08298 25.0183 4.56666 25.349C3.61017 29.106 3.41948 33.017 4.00604 36.8491C4.20072 38.1751 4.5547 39.8242 4.97447 41.1058C5.68899 41.4686 6.40377 41.8422 7.13302 42.1738C7.37039 42.2817 7.73246 42.4715 7.96526 42.561Z" fill="#A0D2FA" />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-black mt-[1px]">
                Clair
              </span>
            </div>

            {/* Right spacer to balance the back chevron */}
            <div className="w-8" />
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-hidden relative bg-[#f2f2f7]">
            {children}
          </div>

          {/* Home indicator */}
          <div className="h-[20px] flex items-center justify-center bg-[#f2f2f7]">
            <div className="w-[120px] h-[4px] rounded-full bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Main ChatStep
   ============================================================================= */

export function ChatStep() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cycle, setCycle] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Run the scripted demo, loop on cycle change
  useEffect(() => {
    setMessages([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const step of SCRIPT) {
      timers.push(
        setTimeout(() => {
          if (step.action === "react" && step.reactIndex !== undefined && step.reactEmoji) {
            setMessages((prev) =>
              prev.map((m, i) =>
                i === step.reactIndex && m.type !== "typing"
                  ? { ...m, reaction: step.reactEmoji }
                  : m
              )
            );
          } else if (step.action === "replace-typing" && step.message) {
            const msg = step.message;
            setMessages((prev) => {
              const withoutTyping = prev.filter((m) => m.type !== "typing");
              return [...withoutTyping, msg];
            });
          } else if (step.message) {
            const msg = step.message;
            setMessages((prev) => [...prev, msg]);
          }
        }, step.delay)
      );
    }

    // After the full script plays + pause, restart
    timers.push(
      setTimeout(() => setCycle((c) => c + 1), SCRIPT_DURATION)
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-4 sm:py-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* iPhone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <IPhoneMockup>
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto px-2.5 py-1 flex flex-col gap-[6px]"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => {
                  if (msg.type === "incoming") {
                    return (
                      <IncomingBubble key={`${cycle}-in-${i}`} reaction={msg.reaction}>
                        {msg.text}
                      </IncomingBubble>
                    );
                  }
                  if (msg.type === "outgoing") {
                    return (
                      <OutgoingBubble key={`${cycle}-out-${i}`} text={msg.text} reaction={msg.reaction} />
                    );
                  }
                  if (msg.type === "typing") {
                    return <TypingBubble key={`${cycle}-typing`} />;
                  }
                  if (msg.type === "cta") {
                    return <CTAIncoming key={`${cycle}-cta`} />;
                  }
                  return null;
                })}
              </AnimatePresence>
            </div>
          </IPhoneMockup>
        </motion.div>

        {/* QR code + CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <p
            className="text-xl md:text-2xl font-normal text-foreground-highlight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Try Clair yourself
          </p>
          <p className="text-sm text-muted max-w-xs">
            Scan to text Clair directly. Ask about your policies,
            file a claim, or get a certificate — all over iMessage.
          </p>

          {/* QR Code — hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:block p-4 rounded-2xl border border-foreground/6 bg-white/50">
            <QRCodeSVG
              value="sms:+15125550199"
              size={140}
              level="M"
              bgColor="transparent"
              fgColor="#111827"
            />
          </div>

          <p className="text-xs text-muted/60">
            Text{" "}
            <a
              href={CTA_PHONE_HREF}
              className="text-foreground hover:text-foreground-highlight transition-colors"
            >
              {CTA_PHONE}
            </a>{" "}
            or email{" "}
            <a
              href={CTA_EMAIL_HREF}
              className="text-foreground hover:text-foreground-highlight transition-colors"
            >
              {CTA_EMAIL}
            </a>
          </p>

          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground-highlight transition-colors mt-2"
          >
            Book a Demo
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
