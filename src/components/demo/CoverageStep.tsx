"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiQuickbooks } from "react-icons/si";
import { LogoIcon } from "@/components/LogoIcon";
import { POLICY_GROUPS, CONTEXT_SOURCES } from "@/data/demoData";
import type { ChatMode } from "./chat";
import {
  NEXT_RENEWAL_FORMATTED,
  parsePolicyDate,
  isExpiringSoon,
  now as demoNow,
} from "@/lib/demoDates";
import { FixedActionFooter } from "./FixedActionFooter";
import { BrandName } from "@/components/BrandName";
import { FadeIn } from "@/components/FadeIn";

/* ---------- Greystar logo ---------- */
function GreystarIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/greystar-logo.png"
      alt="Greystar"
      className={className}
    />
  );
}

/* ---------- California state seal ---------- */
function CaliforniaSealIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/california-seal.png"
      alt="California"
      className={className}
    />
  );
}

type PolicyId = "gl" | "cp" | "wc" | "ca";

interface CoverageStepProps {
  onOpenChat: (mode: ChatMode, policyId?: PolicyId) => void;
}

/* ---------- Integration icons (FontAwesome + Simple Icons) ---------- */

const CONNECTION_ICONS = [
  () => <GreystarIcon className="w-3.5 h-3.5 shrink-0" />,
  () => <CaliforniaSealIcon className="w-3.5 h-3.5 shrink-0" />,
  () => <SiQuickbooks className="w-3.5 h-3.5 text-[#2ca01c] shrink-0" />,
];

/* ---------- MCP-style connection badge ---------- */

function ConnectionBadge({
  source,
  icon: Icon,
  index,
  expanded,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isLast,
  compact = false,
}: {
  source: (typeof CONTEXT_SOURCES)[0];
  icon: () => React.JSX.Element;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isLast: boolean;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center gap-2 rounded-lg border font-medium transition-all cursor-pointer touch-manipulation ${
          compact
            ? "min-h-[44px] min-w-[44px] px-2.5 py-2 text-[11px]"
            : "px-3 py-1.5 text-[12px]"
        } ${
          expanded
            ? "border-emerald-500/30 bg-emerald-500/6 text-foreground"
            : "border-foreground/8 bg-white/80 text-muted hover:border-foreground/15 hover:text-foreground/80"
        }`}
      >
        <span className="flex items-center">
          <Icon />
        </span>
        {source.label}
      </button>

      {/* Expanded detail dropdown — right-align for last badge to prevent cutoff */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 min-w-72 max-w-md rounded-lg border border-foreground/8 bg-white shadow-lg shadow-black/[0.06] p-3 z-50 ${
              isLast ? "right-0 left-auto" : "left-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                Connected
              </span>
            </div>
            <p className="text-[10px] text-muted/70 mb-2">
              via {source.integration}
            </p>
            <p className="text-[12px] leading-relaxed text-muted break-words">
              {source.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Tabs ---------- */

const TABS = [
  { id: "all", label: "All Policies" },
  ...POLICY_GROUPS.map((g) => ({ id: g.id, label: g.type })),
];

/* ---------- Summary stat cards ---------- */

const SUMMARY_STATS: { id: ChatMode; label: string; value: string }[] = [
  { id: "overview", label: "Active Policies", value: "4" },
  { id: "premiums", label: "Annual Premiums", value: "$18,200" },
  { id: "renewal", label: "Next Renewal", value: NEXT_RENEWAL_FORMATTED },
  { id: "integrations", label: "Integrations", value: "3 Connectors" },
];

/* ---------- Main component ---------- */

const HOVER_LEAVE_DELAY_MS = 150;

export function CoverageStep({ onOpenChat }: CoverageStepProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedConnection, setExpandedConnection] = useState<number | null>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const hoverLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (badgesRef.current && !badgesRef.current.contains(e.target as Node)) {
        setExpandedConnection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearHoverLeaveTimeout();
    };
  }, []);

  const clearHoverLeaveTimeout = () => {
    if (hoverLeaveTimeoutRef.current) {
      clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = null;
    }
  };

  const visibleGroups =
    activeTab === "all"
      ? POLICY_GROUPS
      : POLICY_GROUPS.filter((g) => g.id === activeTab);

  // Flatten all coverages for the "all" view table
  const allRows = visibleGroups.flatMap((group) =>
    group.coverages.map((cov) => ({
      ...cov,
      policyId: group.id as PolicyId,
      policy: group.type,
      carrier: group.carrier,
      policyNumber: group.policyNumber,
      effective: group.effective,
      expires: group.expires,
    }))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top bar — title + context sources */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="shrink-0 border-b border-foreground/6 bg-white/60 backdrop-blur-sm overflow-visible"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-visible">
          <div className="flex items-center gap-4">            
            <div>
              <BrandName className="text-2xl inline-flex items-center gap-1.5">
                <LogoIcon size={20} className="shrink-0 text-foreground/80" />
                Claire
              </BrandName>
              <p className="text-xs text-muted mt-1">
                Rosario&rsquo;s Italian Kitchen &middot; 4 active policies
              </p>
            </div>
          </div>
          {/* Desktop: full badges with hover expand */}
          <div
            ref={badgesRef}
            className="flex items-center gap-2 overflow-visible"
          >
            <div className="hidden md:flex items-center gap-2 overflow-visible">
              {CONTEXT_SOURCES.map((source, i) => (
                <ConnectionBadge
                  key={`desktop-${source.label}`}
                  source={source}
                  icon={CONNECTION_ICONS[i]}
                  index={i}
                  expanded={expandedConnection === i}
                  onToggle={() =>
                    setExpandedConnection(expandedConnection === i ? null : i)
                  }
                  onMouseEnter={() => {
                    clearHoverLeaveTimeout();
                    setExpandedConnection(i);
                  }}
                  onMouseLeave={() => {
                    hoverLeaveTimeoutRef.current = setTimeout(() => {
                      setExpandedConnection(null);
                      hoverLeaveTimeoutRef.current = null;
                    }, HOVER_LEAVE_DELAY_MS);
                  }}
                  isLast={i === CONTEXT_SOURCES.length - 1}
                />
              ))}
            </div>
            {/* Mobile: clickable badges (tap to expand, no hover) */}
            <div className="flex md:hidden items-center gap-1.5 overflow-visible">
              {CONTEXT_SOURCES.map((source, i) => (
                <ConnectionBadge
                  key={`mobile-${source.label}`}
                  source={source}
                  icon={CONNECTION_ICONS[i]}
                  index={i}
                  expanded={expandedConnection === i}
                  onToggle={() =>
                    setExpandedConnection(expandedConnection === i ? null : i)
                  }
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  isLast={i === CONTEXT_SOURCES.length - 1}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 pb-20">
          {/* Summary stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6">
            {SUMMARY_STATS.map((stat, i) => (
              <motion.button
                key={stat.id}
                type="button"
                onClick={() => onOpenChat(stat.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group rounded-lg border border-foreground/6 bg-white/60 px-3 py-2.5 sm:px-4 sm:py-3 text-left cursor-pointer transition-all duration-200 hover:border-foreground/20 hover:bg-white hover:shadow-md hover:shadow-black/8"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-foreground-highlight mt-1 font-mono">
                      {stat.value}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 rounded-full bg-foreground/4 p-1 text-foreground/35 transition-colors group-hover:bg-foreground/8 group-hover:text-foreground/55">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center gap-1 mb-4 border-b border-foreground/6 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted hover:text-foreground/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="rounded-lg border border-foreground/6 bg-white/60 overflow-hidden"
          >
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
              <table className="w-full text-left min-w-min">
                <thead>
                  <tr className="bg-foreground/2">
                    {activeTab === "all" && (
                      <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider whitespace-nowrap min-w-28">
                        Policy
                      </th>
                    )}
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider whitespace-nowrap min-w-32">
                      Coverage
                    </th>
                    {activeTab === "all" && (
                      <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider hidden md:table-cell whitespace-nowrap min-w-20">
                        Carrier
                      </th>
                    )}
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right whitespace-nowrap min-w-20">
                      Limit
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right whitespace-nowrap min-w-20">
                      Deductible
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right whitespace-nowrap min-w-24">
                      Actions
                    </th>
                    {activeTab !== "all" && (
                      <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right hidden md:table-cell whitespace-nowrap min-w-28">
                        Period
                      </th>
                    )}
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <motion.tbody
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeTab === "all"
                      ? allRows.map((row, i) => (
                          <FadeIn
                            key={`${row.policy}-${row.name}`}
                            as="tr"
                            when={true}
                            delay={i * 0.02}
                            duration={0.35}
                            direction="none"
                            className="border-t border-foreground/4 hover:bg-foreground/1.5 transition-colors"
                          >
                            <td className="px-4 py-2.5 whitespace-nowrap min-w-28">
                              <p className="text-[13px] text-foreground font-medium">
                                {row.policy}
                              </p>
                              <p className="text-[11px] text-muted/60 font-mono">
                                {row.policyNumber}
                              </p>
                            </td>
                            <td className="px-4 py-2.5 text-[13px] text-foreground whitespace-nowrap min-w-32">
                              {row.name}
                            </td>
                            <td className="px-4 py-2.5 text-[13px] text-muted hidden md:table-cell whitespace-nowrap min-w-20">
                              {row.carrier}
                            </td>
                            <td className="px-4 py-2.5 text-[13px] font-mono font-medium text-foreground text-right whitespace-nowrap min-w-20">
                              {row.limit}
                            </td>
                            <td className="px-4 py-2.5 text-[13px] font-mono text-muted text-right whitespace-nowrap min-w-20">
                              {row.deductible}
                            </td>
                            <td className="px-4 py-2.5 text-right whitespace-nowrap min-w-24">
                              <button
                                type="button"
                                onClick={() => onOpenChat("contact", row.policyId)}
                                className="px-2.5 py-1 rounded-md border border-foreground/12 bg-white/80 text-[11px] font-medium text-foreground hover:border-foreground/20 hover:bg-foreground/3 transition-colors cursor-pointer"
                              >
                                Contact
                              </button>
                            </td>
                          </FadeIn>
                        ))
                      : visibleGroups.flatMap((group, groupIdx) =>
                          group.coverages.map((cov, covIdx) => {
                            const rowIndex = visibleGroups
                              .slice(0, groupIdx)
                              .reduce((acc, g) => acc + g.coverages.length, 0) + covIdx;
                            return (
                              <FadeIn
                                key={`${group.id}-${cov.name}`}
                                as="tr"
                                when={true}
                                delay={rowIndex * 0.02}
                                duration={0.35}
                                direction="none"
                                className="border-t border-foreground/4 hover:bg-foreground/1.5 transition-colors"
                              >
                                <td className="px-4 py-2.5 text-[13px] text-foreground whitespace-nowrap min-w-32">
                                  {cov.name}
                                </td>
                                <td className="px-4 py-2.5 text-[13px] font-mono font-medium text-foreground text-right whitespace-nowrap min-w-20">
                                  {cov.limit}
                                </td>
                                <td className="px-4 py-2.5 text-[13px] font-mono text-muted text-right whitespace-nowrap min-w-20">
                                  {cov.deductible}
                                </td>
                                <td className="px-4 py-2.5 text-[13px] text-muted text-right hidden md:table-cell whitespace-nowrap min-w-28">
                                  {group.effective} &ndash; {group.expires}
                                </td>
                                <td className="px-4 py-2.5 text-right whitespace-nowrap min-w-24">
                                  <button
                                    type="button"
                                    onClick={() => onOpenChat("contact", group.id as PolicyId)}
                                    className="px-2.5 py-1 rounded-md border border-foreground/12 bg-white/80 text-[11px] font-medium text-foreground hover:border-foreground/20 hover:bg-foreground/3 transition-colors cursor-pointer"
                                  >
                                    Contact
                                  </button>
                                </td>
                              </FadeIn>
                            );
                          })
                        )}
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>

            {/* Table footer */}
            <div className="border-t border-foreground/[0.04] px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 bg-foreground/[0.01]">
              <p className="text-[11px] text-muted/60">
                {allRows.length} coverage lines &middot;{" "}
                {visibleGroups.length} {visibleGroups.length === 1 ? "policy" : "policies"}
              </p>
              <p className="text-[11px] text-muted/60">
                Last updated {demoNow.format("MMM D, YYYY")}
              </p>
            </div>
          </motion.div>

          {/* Policy detail cards — shown when a specific tab is selected (animate after table rows) */}
          <AnimatePresence>
            {activeTab !== "all" &&
              (() => {
                const rowCount = visibleGroups.reduce(
                  (acc, g) => acc + g.coverages.length,
                  0
                );
                const carrierCardDelay =
                  Math.max(0, rowCount - 1) * 0.02 + 0.35;
                return visibleGroups.map((group) => (
                  <FadeIn
                    key={group.id}
                    when={true}
                    delay={carrierCardDelay}
                    direction="up"
                    className="mt-4"
                  >
                  <div className="rounded-lg border border-foreground/6 bg-white/60 px-4 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      {[
                        { label: "Carrier", value: group.carrier, className: "font-medium" },
                        { label: "Policy #", value: group.policyNumber, className: "font-mono" },
                        { label: "Effective", value: group.effective, className: "" },
                        { label: "Expires", value: group.expires, className: "" },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className={`text-[13px] text-foreground ${item.className}`}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {(() => {
                        const expiresDate = parsePolicyDate(group.expires);
                        const expiringSoon = isExpiringSoon(expiresDate);
                        return (
                          <>
                            {expiringSoon && (
                              <button
                                type="button"
                                onClick={() => onOpenChat("renew", group.id as PolicyId)}
                                className="px-3 py-1.5 rounded-md border border-foreground/12 bg-white/80 text-[12px] font-medium text-amber-700 hover:border-amber-500/30 hover:bg-amber-500/10 transition-colors cursor-pointer"
                              >
                                Renew Policy
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => onOpenChat("contact", group.id as PolicyId)}
                              className="px-3 py-1.5 rounded-md border border-foreground/12 bg-white/80 text-[12px] font-medium text-foreground hover:border-foreground/20 hover:bg-foreground/3 transition-colors cursor-pointer"
                            >
                              Contact Agent
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </FadeIn>
                ));
              })()}
          </AnimatePresence>

        </div>
      </div>

      <FixedActionFooter
        label="Talk to Claire"
        onClick={() => onOpenChat("contact")}
        animateIn
      />
    </div>
  );
}
