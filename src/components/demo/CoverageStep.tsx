"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiQuickbooks } from "react-icons/si";
import { LogoIcon } from "@/components/LogoIcon";
import { POLICY_GROUPS, CONTEXT_SOURCES } from "@/data/demoData";
import { FixedActionFooter } from "./FixedActionFooter";
import { BrandName } from "@/components/BrandName";

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

interface CoverageStepProps {
  onComplete: () => void;
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
}: {
  source: (typeof CONTEXT_SOURCES)[0];
  icon: () => React.JSX.Element;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isLast: boolean;
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
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all cursor-pointer ${
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

const SUMMARY_STATS = [
  { label: "Active Policies", value: "4" },
  { label: "Total Premium", value: "$18,200" },
  { label: "Next Renewal", value: "Jan 15, 2026" },
  { label: "Sources Connected", value: "3" },
];

/* ---------- Table row animation ---------- */

const rowVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.03 },
  }),
};

/* ---------- Main component ---------- */

const HOVER_LEAVE_DELAY_MS = 150;

export function CoverageStep({ onComplete }: CoverageStepProps) {
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
          {/* Desktop: full badges */}
          <div
            ref={badgesRef}
            className="hidden md:flex items-center gap-2 overflow-visible"
          >
            {CONTEXT_SOURCES.map((source, i) => (
              <ConnectionBadge
                key={source.label}
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
          {/* Mobile: compact pills */}
          <div className="flex md:hidden items-center gap-1.5">
            {CONTEXT_SOURCES.map((source, i) => {
              const Icon = CONNECTION_ICONS[i];
              return (
                <span
                  key={source.label}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-foreground/6 bg-white/80 text-[10px] font-medium text-muted"
                >
                  <Icon />
                  {source.label}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 pb-20">
          {/* Summary stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6"
          >
            {SUMMARY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-foreground/6 bg-white/60 px-3 py-2.5 sm:px-4 sm:py-3"
              >
                <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-lg sm:text-xl font-semibold text-foreground-highlight mt-1 font-mono">
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>

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
                          <motion.tr
                            key={`${row.policy}-${row.name}`}
                            custom={i}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            className="border-t border-foreground/[0.04] hover:bg-foreground/[0.015] transition-colors"
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
                          </motion.tr>
                        ))
                      : visibleGroups.flatMap((group) =>
                          group.coverages.map((cov, i) => (
                            <motion.tr
                              key={`${group.id}-${cov.name}`}
                              custom={i}
                              variants={rowVariants}
                              initial="hidden"
                              animate="visible"
                              className="border-t border-foreground/[0.04] hover:bg-foreground/[0.015] transition-colors"
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
                            </motion.tr>
                          ))
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
                Last updated today
              </p>
            </div>
          </motion.div>

          {/* Policy detail cards — shown when a specific tab is selected */}
          <AnimatePresence>
            {activeTab !== "all" &&
              visibleGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 rounded-lg border border-foreground/6 bg-white/60 px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2"
                >
                  <div>
                    <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                      Carrier
                    </p>
                    <p className="text-[13px] text-foreground font-medium">
                      {group.carrier}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                      Policy #
                    </p>
                    <p className="text-[13px] text-foreground font-mono">
                      {group.policyNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                      Effective
                    </p>
                    <p className="text-[13px] text-foreground">
                      {group.effective}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                      Expires
                    </p>
                    <p className="text-[13px] text-foreground">
                      {group.expires}
                    </p>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

        </div>
      </div>

      <FixedActionFooter
        label="Talk to Claire"
        onClick={onComplete}
        variant="floating"
        animateIn
      />
    </div>
  );
}
