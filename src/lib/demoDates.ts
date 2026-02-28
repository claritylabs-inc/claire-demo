/**
 * Demo date utilities — all dates relative to current day for a logical, evergreen demo.
 * Next renewal is always exactly 2 weeks out.
 * Uses dayjs for consistent formatting and calculations.
 */

import dayjs from "dayjs";

const now = dayjs();

/* ---------- Next renewal (always exactly 2 weeks from today) ---------- */

const WEEKS_UNTIL_RENEWAL = 2;
export const NEXT_RENEWAL = now.add(WEEKS_UNTIL_RENEWAL, "week");
export const NEXT_RENEWAL_FORMATTED = NEXT_RENEWAL.format("MMM D, YYYY");

/* ---------- Policy dates (MM/DD/YYYY for display) — all relative to today ---------- */

/** GL: expires in 2 weeks (next renewal), effective 1 year before expiry */
export const GL_EXPIRES = NEXT_RENEWAL;
export const GL_EFFECTIVE = GL_EXPIRES.subtract(1, "year");

/** CP: effective Mar 15, expires Mar 15 next year (spread across months) */
const cpEffectiveCandidate = now.month(2).date(15);
export const CP_EFFECTIVE =
  cpEffectiveCandidate.isAfter(now) ? cpEffectiveCandidate.subtract(1, "year") : cpEffectiveCandidate;
export const CP_EXPIRES = CP_EFFECTIVE.add(1, "year");

/** WC: effective Jun 8, expires Jun 8 next year */
const wcEffectiveCandidate = now.month(5).date(8);
export const WC_EFFECTIVE =
  wcEffectiveCandidate.isAfter(now) ? wcEffectiveCandidate.subtract(1, "year") : wcEffectiveCandidate;
export const WC_EXPIRES = WC_EFFECTIVE.add(1, "year");

/** CA: effective Apr 22, expires Apr 22 next year */
const caEffectiveCandidate = now.month(3).date(22);
export const CA_EFFECTIVE =
  caEffectiveCandidate.isAfter(now) ? caEffectiveCandidate.subtract(1, "year") : caEffectiveCandidate;
export const CA_EXPIRES = CA_EFFECTIVE.add(1, "year");

export function formatPolicyDate(d: dayjs.Dayjs): string {
  return d.format("MM/DD/YYYY");
}

/* ---------- Email dates (each aligned with when that policy was obtained) ---------- */

/** GL renewal email: ~1 month before GL effective (renewal notice) */
export const EMAIL_GL_DATE = GL_EFFECTIVE.subtract(1, "month").format("MMM D, YYYY");

/** Auto policy email: ~1 week before CA effective (policy docs received) */
export const EMAIL_CA_DATE = CA_EFFECTIVE.subtract(7, "day").format("MMM D, YYYY");

/** Workers comp cert email: when WC cert was requested */
export const EMAIL_WC_DATE = WC_EFFECTIVE.add(3, "day").format("MMM D, YYYY");

/** Commercial property email: ~2 weeks before CP effective (renewal notice) */
export const EMAIL_CP_DATE = CP_EFFECTIVE.subtract(14, "day").format("MMM D, YYYY");

/* ---------- Lease (context source) — 4 months from today ---------- */

export const LEASE_EXPIRES_MONTH_YEAR = now.add(4, "month").format("MMMM YYYY");

/* ---------- Chat / human-readable dates ---------- */

/** GL policy "active through" (e.g. "March 2025") */
export const GL_ACTIVE_THROUGH = GL_EXPIRES.format("MMMM YYYY");

/* ---------- Helpers ---------- */

export function isExpiringSoon(expiresDate: dayjs.Dayjs, daysThreshold = 90): boolean {
  const daysUntil = expiresDate.diff(now, "day");
  return daysUntil > 0 && daysUntil <= daysThreshold;
}

export function parsePolicyDate(dateStr: string): dayjs.Dayjs {
  return dayjs(dateStr, "MM/DD/YYYY");
}

/* ---------- Policy numbers (year = issuance year from each policy's effective date) ---------- */

export const POLICY_NUMBERS = {
  gl: `CGL-${GL_EFFECTIVE.year()}-88412`,
  cp: `CP-${CP_EFFECTIVE.year()}-55109`,
  wc: `WC-${WC_EFFECTIVE.year()}-71003`,
  ca: `CA-${CA_EFFECTIVE.year()}-30287`,
} as const;

export { now };
