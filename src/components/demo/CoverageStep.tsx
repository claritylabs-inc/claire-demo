"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { POLICY_GROUPS, CONTEXT_SOURCES } from "@/data/demoData";

interface CoverageStepProps {
  onComplete: () => void;
}

/* ---------- MCP-style connection icons ---------- */

function LeaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  );
}

function QuickBooksIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

const CONNECTION_ICONS = [LeaseIcon, ProfileIcon, QuickBooksIcon];

/* ---------- MCP-style connection badge ---------- */

function ConnectionBadge({
  source,
  icon: Icon,
  index,
  expanded,
  onToggle,
}: {
  source: (typeof CONTEXT_SOURCES)[0];
  icon: () => React.JSX.Element;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
      className="relative"
    >
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all cursor-pointer ${
          expanded
            ? "border-emerald-500/30 bg-emerald-500/[0.06] text-foreground"
            : "border-foreground/8 bg-white/80 text-muted hover:border-foreground/15 hover:text-foreground/80"
        }`}
      >
        <span className="relative flex items-center justify-center w-4 h-4">
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <span className="relative w-[6px] h-[6px] rounded-full bg-emerald-500" />
        </span>
        <span className="text-foreground/50">
          <Icon />
        </span>
        {source.label}
      </button>

      {/* Expanded detail dropdown */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-72 rounded-lg border border-foreground/8 bg-white shadow-lg shadow-black/[0.06] p-3 z-50"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                Connected
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-muted">
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

export function CoverageStep({ onComplete }: CoverageStepProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedConnection, setExpandedConnection] = useState<number | null>(null);

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
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Top bar — title + context sources */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="shrink-0 border-b border-foreground/6 bg-white/60 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p
              className="text-lg font-normal text-foreground-highlight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Coverage Summary
            </p>
            <p className="text-xs text-muted mt-0.5">
              Rosario&rsquo;s Italian Kitchen &middot; 4 active policies
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
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
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 pb-20">
          {/* Summary stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            {SUMMARY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-foreground/6 bg-white/60 px-4 py-3"
              >
                <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-xl font-semibold text-foreground-highlight mt-1 font-mono">
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
            className="flex items-center gap-1 mb-4 border-b border-foreground/6 overflow-x-auto"
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
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-foreground/[0.02]">
                    {activeTab === "all" && (
                      <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">
                        Policy
                      </th>
                    )}
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">
                      Coverage
                    </th>
                    {activeTab === "all" && (
                      <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider hidden md:table-cell">
                        Carrier
                      </th>
                    )}
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">
                      Limit
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">
                      Deductible
                    </th>
                    {activeTab !== "all" && (
                      <th className="px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider text-right hidden md:table-cell">
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
                            <td className="px-4 py-2.5">
                              <p className="text-[13px] text-foreground font-medium">
                                {row.policy}
                              </p>
                              <p className="text-[11px] text-muted/60 font-mono">
                                {row.policyNumber}
                              </p>
                            </td>
                            <td className="px-4 py-2.5 text-[13px] text-foreground">
                              {row.name}
                            </td>
                            <td className="px-4 py-2.5 text-[13px] text-muted hidden md:table-cell">
                              {row.carrier}
                            </td>
                            <td className="px-4 py-2.5 text-[13px] font-mono font-medium text-foreground text-right">
                              {row.limit}
                            </td>
                            <td className="px-4 py-2.5 text-[13px] font-mono text-muted text-right">
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
                              <td className="px-4 py-2.5 text-[13px] text-foreground">
                                {cov.name}
                              </td>
                              <td className="px-4 py-2.5 text-[13px] font-mono font-medium text-foreground text-right">
                                {cov.limit}
                              </td>
                              <td className="px-4 py-2.5 text-[13px] font-mono text-muted text-right">
                                {cov.deductible}
                              </td>
                              <td className="px-4 py-2.5 text-[13px] text-muted text-right hidden md:table-cell">
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
            <div className="border-t border-foreground/[0.04] px-4 py-2 flex items-center justify-between bg-foreground/[0.01]">
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

      {/* Floating fixed CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="absolute bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none"
      >
        <button
          type="button"
          onClick={onComplete}
          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground-highlight transition-colors cursor-pointer shadow-lg shadow-black/10"
        >
          Talk to Clair
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
        </button>
      </motion.div>
    </div>
  );
}
