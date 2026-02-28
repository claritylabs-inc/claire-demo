/* =============================================================================
   Demo Mock Data
   Consolidated data for the Claire product demo.
   All dates are relative to current year via @/lib/demoDates.
   ============================================================================= */

import {
  formatPolicyDate,
  GL_EFFECTIVE,
  GL_EXPIRES,
  CP_EFFECTIVE,
  CP_EXPIRES,
  WC_EFFECTIVE,
  WC_EXPIRES,
  CA_EFFECTIVE,
  CA_EXPIRES,
  LEASE_EXPIRES_MONTH_YEAR,
  GL_ACTIVE_THROUGH,
  POLICY_NUMBERS,
  NEXT_RENEWAL_FORMATTED,
} from "@/lib/demoDates";

/* ---------- Policies (upload step) ---------- */

export interface PolicyCard {
  id: string;
  type: string;
  carrier: string;
  policyNumber: string;
}

export const MOCK_POLICIES: PolicyCard[] = [
  {
    id: "cgl",
    type: "Commercial General Liability",
    carrier: "Hartford",
    policyNumber: POLICY_NUMBERS.gl,
  },
  {
    id: "cp",
    type: "Commercial Property",
    carrier: "Travelers",
    policyNumber: POLICY_NUMBERS.cp,
  },
  {
    id: "wc",
    type: "Workers' Compensation",
    carrier: "EMPLOYERS",
    policyNumber: POLICY_NUMBERS.wc,
  },
  {
    id: "ca",
    type: "Commercial Auto",
    carrier: "Progressive",
    policyNumber: POLICY_NUMBERS.ca,
  },
];

/* ---------- Coverage (coverage step) ---------- */

export interface CoverageLine {
  name: string;
  limit: string;
  deductible: string;
}

export interface PolicyGroup {
  id: string;
  type: string;
  carrier: string;
  policyNumber: string;
  effective: string;
  expires: string;
  coverages: CoverageLine[];
}

export const POLICY_GROUPS: PolicyGroup[] = [
  {
    id: "gl",
    type: "General Liability",
    carrier: "Hartford",
    policyNumber: POLICY_NUMBERS.gl,
    effective: formatPolicyDate(GL_EFFECTIVE),
    expires: formatPolicyDate(GL_EXPIRES),
    coverages: [
      { name: "Each Occurrence", limit: "$1,000,000", deductible: "$2,500" },
      { name: "General Aggregate", limit: "$2,000,000", deductible: "\u2014" },
      {
        name: "Products/Completed Ops",
        limit: "$2,000,000",
        deductible: "\u2014",
      },
      { name: "Liquor Liability", limit: "$1,000,000", deductible: "$5,000" },
    ],
  },
  {
    id: "cp",
    type: "Commercial Property",
    carrier: "Travelers",
    policyNumber: POLICY_NUMBERS.cp,
    effective: formatPolicyDate(CP_EFFECTIVE),
    expires: formatPolicyDate(CP_EXPIRES),
    coverages: [
      { name: "Building", limit: "$850,000", deductible: "$5,000" },
      { name: "BPP (Contents)", limit: "$250,000", deductible: "$2,500" },
      {
        name: "Business Income",
        limit: "$150,000",
        deductible: "72-hr waiting",
      },
    ],
  },
  {
    id: "wc",
    type: "Workers' Compensation",
    carrier: "EMPLOYERS",
    policyNumber: POLICY_NUMBERS.wc,
    effective: formatPolicyDate(WC_EFFECTIVE),
    expires: formatPolicyDate(WC_EXPIRES),
    coverages: [
      { name: "Part One (Statutory)", limit: "Statutory", deductible: "\u2014" },
      {
        name: "Employers Liability",
        limit: "$500,000",
        deductible: "\u2014",
      },
    ],
  },
  {
    id: "ca",
    type: "Commercial Auto",
    carrier: "Progressive",
    policyNumber: POLICY_NUMBERS.ca,
    effective: formatPolicyDate(CA_EFFECTIVE),
    expires: formatPolicyDate(CA_EXPIRES),
    coverages: [
      { name: "Liability", limit: "$1,000,000 CSL", deductible: "$1,000" },
      {
        name: "Uninsured Motorist",
        limit: "$1,000,000",
        deductible: "\u2014",
      },
    ],
  },
];

/* ---------- Context sources (coverage step pills) ---------- */

export interface ContextSource {
  label: string;
  details: string;
  /** How we obtained this data (integration/MCP source) */
  integration: string;
}

export const CONTEXT_SOURCES: ContextSource[] = [
  {
    label: "Lease",
    details: `Lease with Greystar Properties · 412 Congress Ave · Expires ${LEASE_EXPIRES_MONTH_YEAR} · Landlord requires AI as certificate holder · $8,500/mo rent`,
    integration: "Greystar tenant portal MCP",
  },
  {
    label: "Business Profile",
    details:
      "Rosario\u2019s Italian Kitchen \u00b7 Full-service restaurant w/ bar \u00b7 22 employees \u00b7 Est. 2019 \u00b7 Serves alcohol (liquor license active)",
    integration: "California Secretary of State Business Search",
  },
  {
    label: "QuickBooks",
    details:
      "$1.8M annual revenue \u00b7 $42K/mo payroll \u00b7 2 delivery vehicles on books",
    integration: "QuickBooks Online API",
  },
];

/* ---------- Chat prompts + responses (chat step) ---------- */

export interface ChatPrompt {
  question: string;
  answer: string;
}

export const CHAT_PROMPTS: ChatPrompt[] = [
  {
    question:
      "My landlord needs proof of insurance for our lease renewal. Can you handle it?",
    answer:
      `I've got this. Your lease with Greystar Properties requires you to list them as an additional insured on your General Liability policy. Your Hartford CGL policy (${POLICY_NUMBERS.gl}) is active through ${GL_ACTIVE_THROUGH} and meets their $1M per-occurrence requirement.\n\nI've generated the Certificate of Insurance with Greystar Properties listed as the certificate holder and sent it to your landlord's email on file. You're all set — no action needed on your end.`,
  },
  {
    question:
      "We\u2019re catering for Dell and they need proof of food liability coverage. Are we covered?",
    answer:
      "I reviewed the contract requirements. Dell needs proof of Products/Completed Operations coverage and Liquor Liability \u2014 both are included in your Hartford CGL policy.\n\nYour Products/Completed Ops limit is $2,000,000 (their minimum is $1M) and your Liquor Liability limit is $1,000,000. You\u2019re fully covered. I can generate a COI naming Dell Technologies as the certificate holder \u2014 want me to send it over?",
  },
  {
    question:
      "A customer slipped on a wet floor and hurt their back. What should I do?",
    answer:
      `I'm sorry to hear that. Here's what you need to do right now:\n\n1. Make sure the customer gets medical attention if needed\n2. Document everything — take photos of the area, get witness names and contact info, and write down exactly what happened while it's fresh\n3. Don't admit fault or make promises about covering expenses\n\nThis falls under your General Liability policy with Hartford (${POLICY_NUMBERS.gl}). Your per-occurrence limit is $1,000,000 with a $2,500 deductible. I can start the claims process with Hartford right now if you'd like — I just need the customer's name and a brief description of the incident.`,
  },
  {
    question:
      "Does our property insurance cover the new kitchen equipment we just bought?",
    answer:
      `Yes — your new kitchen equipment is covered under the Business Personal Property (BPP) section of your Travelers Commercial Property policy (${POLICY_NUMBERS.cp}). Your current BPP limit is $250,000.\n\nThat said, if this purchase is significant, you may be getting close to that limit. Do you know the value of the new equipment? I can check whether you need to increase your BPP coverage to make sure everything's fully protected.`,
  },
];

/* ---------- Policy-specific chat prompts (Contact Agent) — restaurant context ---------- */

export type PolicyId = "gl" | "cp" | "wc" | "ca";

export const CHAT_PROMPTS_BY_POLICY: Record<PolicyId, ChatPrompt[]> = {
  gl: [
    {
      question: "Greystar needs a COI for our lease renewal before we can sign — can you handle it?",
      answer: `Your Hartford CGL (${POLICY_NUMBERS.gl}) meets their $1M requirement. I've sent the COI to Greystar — you're all set to sign.`,
    },
    {
      question: "We're catering for Dell and they need proof of food liability — are we covered?",
      answer: "Yes — your Hartford CGL covers Products/Completed Ops ($2M) and Liquor Liability ($1M). I can send Dell a COI for the catering contract.",
    },
  ],
  cp: [
    {
      question: "We just bought a new commercial pizza oven — is it covered under our property policy?",
      answer: `Yes — kitchen equipment is covered under BPP in your Travelers policy (${POLICY_NUMBERS.cp}). Your BPP limit is $250K. Want me to check if you're still within limit?`,
    },
    {
      question: "We're expanding the kitchen for more catering capacity — do we need to update our BPP?",
      answer: "I'll run a valuation of your contents including the new equipment. If you're over $250K, we should increase BPP before the expansion. Want me to pull quotes?",
    },
  ],
  wc: [
    {
      question: "We need a workers comp certificate for our catering contract with Dell.",
      answer: `I've generated the certificate for your EMPLOYERS WC policy (${POLICY_NUMBERS.wc}) and sent it to Dell. You're all set for the catering gig.`,
    },
    {
      question: "One of our cooks burned their hand on the line — how do we file a claim?",
      answer: "I'm sorry to hear that. I'll start the claim with EMPLOYERS. Make sure they got medical attention. I need the date, time, and a brief description. Want me to open it now?",
    },
  ],
  ca: [
    {
      question: "Our delivery driver was in a fender bender — what's our deductible?",
      answer: `Your Progressive policy (${POLICY_NUMBERS.ca}) has a $1,000 collision deductible. I can start the claim — do you have the other driver's info?`,
    },
    {
      question: "We're adding a second delivery van for catering runs — what do we need to do?",
      answer: "I'll add the new van to your Progressive policy. I need the VIN, purchase date, and whether you're using it for delivery only or catering too. Want me to send the form?",
    },
  ],
};

/* ---------- Policy-specific RENEW prompts — restaurant context ---------- */

export const CHAT_PROMPTS_RENEW_BY_POLICY: Record<PolicyId, ChatPrompt[]> = {
  gl: [
    {
      question: "I need to renew our GL — we have a lot of catering events coming up.",
      answer: `Your Hartford GL (${POLICY_NUMBERS.gl}) expires ${NEXT_RENEWAL_FORMATTED}. I've pulled quotes — best option is Hartford at $4,200/year, same coverage. Want me to process it?`,
    },
    {
      question: "What's the timeline? Our landlord needs proof we're covered.",
      answer: `You've got 2 weeks. I can send the renewal docs to your agent today. Sign by ${NEXT_RENEWAL_FORMATTED} to avoid a gap — Greystar will need an updated COI. Want me to get started?`,
    },
  ],
  cp: [
    {
      question: "We need to renew our property policy before our kitchen expansion.",
      answer: `Your Travelers Commercial Property (${POLICY_NUMBERS.cp}) renewal is coming up. I've pulled quotes — we should discuss increasing BPP for the new equipment. Want me to send the options?`,
    },
    {
      question: "Can we bundle with our other policies?",
      answer: "I can check for multi-policy discounts across Hartford, Travelers, and Progressive. Your GL and property are with different carriers — I'll run the numbers.",
    },
  ],
  wc: [
    {
      question: "We're renewing our workers comp — we're hiring for the busy season.",
      answer: `Your EMPLOYERS WC (${POLICY_NUMBERS.wc}) renewal is due. I'll update payroll for the new hires. Your premium may adjust at audit. Want me to send the renewal docs?`,
    },
    {
      question: "Do we need to report the new servers and delivery drivers?",
      answer: "Yes — I'll add them to your policy. Restaurant payroll is typically audited annually. I can send you the new hire form to complete.",
    },
  ],
  ca: [
    {
      question: "We need to renew our auto policy — we're adding a second delivery van.",
      answer: `Your Progressive Commercial Auto (${POLICY_NUMBERS.ca}) renewal is coming up. I'll quote adding the new van. Want me to pull options for both vehicles?`,
    },
    {
      question: "Does our policy cover catering equipment in the van?",
      answer: "Your liability covers the vehicle. Equipment inside may need a rider — I'll check your BPP and auto policies to make sure the catering gear is covered in transit.",
    },
  ],
};

/* ---------- Summary card chat prompts (Active Policies, Premiums, Renewal, Integrations) ---------- */

export type SummaryCardId = "overview" | "premiums" | "renewal" | "integrations";

export const CHAT_PROMPTS_BY_CARD: Record<SummaryCardId, ChatPrompt[]> = {
  overview: [
    {
      question: "Can you give me a quick summary of our coverage?",
      answer: "You have 4 active policies: Hartford GL ($1M/occurrence), Travelers Property ($850K building, $250K BPP), EMPLOYERS Workers Comp, and Progressive Auto ($1M CSL for your 2 delivery vehicles). All set for your restaurant and catering ops.",
    },
    {
      question: "Which policy covers our catering events?",
      answer: "Your Hartford GL covers catering — Products/Completed Ops ($2M) and Liquor Liability ($1M). Dell and other clients typically need proof of both. I can generate COIs anytime.",
    },
  ],
  premiums: [
    {
      question: "Can we lower our annual premiums?",
      answer: "Your total is $18,200/year across 4 carriers. I can run a bundled quote — Hartford, Travelers, and Progressive don't share a package, but we might find savings. Want me to pull options?",
    },
    {
      question: "When are our premiums due?",
      answer: "Each policy has its own billing cycle. I can send you a payment calendar — most are annual. Want me to sync the dates with your bookkeeper?",
    },
  ],
  renewal: [
    {
      question: "What's coming up for renewal?",
      answer: `Your Hartford GL expires ${NEXT_RENEWAL_FORMATTED} — that's in 2 weeks. I've got renewal quotes ready. Your other policies (Property, WC, Auto) renew later this year. Want me to walk through the GL renewal?`,
    },
    {
      question: "Can you remind me before each renewal?",
      answer: "I'll send reminders 60, 30, and 14 days before each expiry. I can also notify your bookkeeper. Want me to set that up?",
    },
  ],
  integrations: [
    {
      question: "What data do you have connected?",
      answer: "I'm connected to 3 sources: your Greystar lease (landlord COI requirements), California Secretary of State (business profile, liquor license), and QuickBooks (revenue, payroll, vehicles). I use these to keep your coverage aligned.",
    },
    {
      question: "Can you pull our payroll from QuickBooks for workers comp?",
      answer: "Yes — I'm already connected. Your $42K/mo payroll flows into your EMPLOYERS WC policy for accurate premium. I'll update it when you add the new hires.",
    },
  ],
};

/* ---------- Business info ---------- */

export const BUSINESS_NAME = "Rosario\u2019s Italian Kitchen";

/* ---------- Processing step messages ---------- */

export const PROCESSING_MESSAGES = [
  { text: "Analyzing 4 policy documents...", delay: 0 },
  { text: "Extracting coverage details...", delay: 800 },
  { text: "Cross-referencing limits and deductibles...", delay: 1600 },
  { text: "Done.", delay: 2200 },
];

/* ---------- CTA contact info ---------- */

export const CTA_PHONE = "(647) 693-0328";
export const CTA_PHONE_HREF = "sms:+16476930328";
export const CTA_EMAIL = "claire@claritylabs.inc";
export const CTA_EMAIL_HREF = "mailto:claire@claritylabs.inc";
