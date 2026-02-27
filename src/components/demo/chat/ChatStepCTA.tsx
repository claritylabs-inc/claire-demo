"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  CTA_PHONE,
  CTA_PHONE_HREF,
  CTA_EMAIL,
  CTA_EMAIL_HREF,
} from "@/data/demoData";

const BOOK_DEMO_URL = "https://cal.com/team/claritylabs/demo";
const QR_VALUE = "sms:+16722036730";

function ArrowIcon() {
  return (
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
  );
}

export function ChatStepCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center gap-4 sm:gap-5 text-center"
    >
      <p
        className="text-lg sm:text-xl md:text-2xl font-normal text-foreground-highlight"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Try Claire yourself
      </p>
      <p className="text-[13px] sm:text-sm text-muted max-w-2xs">
        Scan to text Claire directly. Ask about your policies, file a claim, or get a certificate.
      </p>

      <div className="hidden sm:block p-4 rounded-2xl border border-foreground/6 bg-white/50">
        <QRCodeSVG
          value={QR_VALUE}
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
        href={BOOK_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground-highlight transition-colors mt-2"
      >
        Book a Demo
        <ArrowIcon />
      </a>
    </motion.div>
  );
}
