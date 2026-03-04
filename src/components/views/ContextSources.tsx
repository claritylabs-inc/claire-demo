"use client";

import { FaFile } from "react-icons/fa";
import { SiQuickbooks } from "react-icons/si";
import {
  MOCK_POLICIES,
  type PolicyId as DemoPolicyId,
  type IntegrationSource,
} from "@/data/demoData";

/* ---------- Integration icons ---------- */

export function GreystarIcon({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white shrink-0 overflow-hidden ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/greystar-logo.png"
        alt="Greystar"
        className="w-full h-full object-contain"
      />
    </span>
  );
}

export function CaliforniaSealIcon({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white shrink-0 overflow-hidden ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/california-seal.png"
        alt="California SOS"
        className="w-full h-full object-contain"
      />
    </span>
  );
}

export function QuickBooksIcon({ className }: { className?: string }) {
  return (
    <SiQuickbooks
      className={`text-integration shrink-0 ${className ?? ""}`}
      aria-hidden
    />
  );
}

/* ---------- Perplexity-style sources stack (overlayed circles) ---------- */

export function SourcesStack({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center -space-x-2.5 isolate overflow-visible ${className}`}
    >
      {children}
    </span>
  );
}

export function SourceCircle({
  children,
  title,
  index = 0,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  index?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };
  const z = index + 1;
  const circle = (
    <span
      className={`relative inline-flex items-center justify-center rounded-full bg-white border-2 border-white shadow-sm shrink-0 overflow-hidden ${sizeClasses[size]} ${className}`}
      style={{ zIndex: z }}
    >
      {children}
    </span>
  );
  return title ? (
    <span title={title} className="shrink-0 relative" style={{ zIndex: z }}>
      {circle}
    </span>
  ) : (
    circle
  );
}

/* ---------- Policy document icon (with first letter of policy number) ---------- */

const POLICY_BY_ID: Record<DemoPolicyId, (typeof MOCK_POLICIES)[0]> = {
  gl: MOCK_POLICIES[0],
  cp: MOCK_POLICIES[1],
  wc: MOCK_POLICIES[2],
  ca: MOCK_POLICIES[3],
};

export function PolicySourceIcon({
  policyId,
  index,
  size = "md",
}: {
  policyId: DemoPolicyId;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const policy = POLICY_BY_ID[policyId];
  if (!policy) return null;

  return (
    <SourceCircle
      index={index}
      title={`${policy.type} · ${policy.policyNumber}`}
      size={size}
    >
      <span className="flex flex-col items-center justify-center leading-none">
        <span className={`text-micro font-bold text-white absolute inset-0 top-[3px] flex items-center justify-center`}>
          {policy.policyNumber.charAt(0)}
        </span>
        <FaFile className={`w-3.5 h-3.5 text-primary-light shrink-0`} />
      </span>
    </SourceCircle>
  );
}

/* ---------- Integration source icon (lease / business / quickbooks) ---------- */

export function IntegrationSourceIcon({
  source,
  index,
  size = "md",
}: {
  source: IntegrationSource;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const iconSizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

  if (source === "lease") {
    return (
      <SourceCircle index={index} title="Greystar" size={size}>
        <GreystarIcon className={`${iconSizes[size]} shrink-0`} />
      </SourceCircle>
    );
  }
  if (source === "business") {
    return (
      <SourceCircle index={index} title="California SOS" size={size}>
        <CaliforniaSealIcon className={`${iconSizes[size]} shrink-0`} />
      </SourceCircle>
    );
  }
  if (source === "quickbooks") {
    return (
      <SourceCircle index={index} title="QuickBooks" size={size}>
        <QuickBooksIcon className={`${iconSizes[size]} shrink-0`} />
      </SourceCircle>
    );
  }
  return null;
}

/* ---------- Full integration stack (QuickBooks, California SOS, Greystar) ---------- */

export function IntegrationSourcesStack({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <SourcesStack>
      <SourceCircle index={0} title="QuickBooks" size={size}>
        <QuickBooksIcon className={size === "sm" ? "w-2.5 h-2.5" : size === "md" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </SourceCircle>
      <SourceCircle index={1} title="California SOS" size={size}>
        <CaliforniaSealIcon className={size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"} />
      </SourceCircle>
      <SourceCircle index={2} title="Greystar" size={size}>
        <GreystarIcon className={size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5"} />
      </SourceCircle>
    </SourcesStack>
  );
}

/* ---------- Prompt context sources (policies + integrations for chat prompts) ---------- */

export function PromptContextSources({
  sources,
  size = "md",
}: {
  sources?: { policies?: DemoPolicyId[]; integrations?: IntegrationSource[] };
  size?: "sm" | "md" | "lg";
}) {
  const policies = sources?.policies?.length
    ? sources.policies
    : (["gl"] as DemoPolicyId[]);
  const integrations = sources?.integrations ?? [];

  const circles: React.ReactNode[] = [];
  let idx = 0;

  policies.forEach((id) => {
    circles.push(<PolicySourceIcon key={id} policyId={id} index={idx++} size={size} />);
  });

  integrations.forEach((source) => {
    const icon = (
      <IntegrationSourceIcon key={source} source={source} index={idx++} size={size} />
    );
    if (icon) circles.push(icon);
  });

  if (circles.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-visible shrink-0 pl-0.5">
      <SourcesStack>{circles}</SourcesStack>
    </div>
  );
}
