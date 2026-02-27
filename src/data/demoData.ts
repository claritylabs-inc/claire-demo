/* =============================================================================
   Demo Mock Data
   Consolidated data for the Claire product demo.
   ============================================================================= */

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
    policyNumber: "CGL-2024-88412",
  },
  {
    id: "cp",
    type: "Commercial Property",
    carrier: "Travelers",
    policyNumber: "CP-2024-55109",
  },
  {
    id: "wc",
    type: "Workers' Compensation",
    carrier: "EMPLOYERS",
    policyNumber: "WC-2024-71003",
  },
  {
    id: "ca",
    type: "Commercial Auto",
    carrier: "Progressive",
    policyNumber: "CA-2024-30287",
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
    policyNumber: "CGL-2024-88412",
    effective: "01/15/2025",
    expires: "01/15/2026",
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
    policyNumber: "CP-2024-55109",
    effective: "03/01/2025",
    expires: "03/01/2026",
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
    policyNumber: "WC-2024-71003",
    effective: "06/01/2025",
    expires: "06/01/2026",
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
    policyNumber: "CA-2024-30287",
    effective: "04/01/2025",
    expires: "04/01/2026",
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
    details:
      "Lease with Greystar Properties \u00b7 412 Congress Ave \u00b7 Expires March 2026 \u00b7 Landlord requires AI as certificate holder \u00b7 $8,500/mo rent",
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
      "I\u2019ve got this. Your lease with Greystar Properties requires you to list them as an additional insured on your General Liability policy. Your Hartford CGL policy (CGL-2024-88412) is active through January 2026 and meets their $1M per-occurrence requirement.\n\nI\u2019ve generated the Certificate of Insurance with Greystar Properties listed as the certificate holder and sent it to your landlord\u2019s email on file. You\u2019re all set \u2014 no action needed on your end.",
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
      "I\u2019m sorry to hear that. Here\u2019s what you need to do right now:\n\n1. Make sure the customer gets medical attention if needed\n2. Document everything \u2014 take photos of the area, get witness names and contact info, and write down exactly what happened while it\u2019s fresh\n3. Don\u2019t admit fault or make promises about covering expenses\n\nThis falls under your General Liability policy with Hartford (CGL-2024-88412). Your per-occurrence limit is $1,000,000 with a $2,500 deductible. I can start the claims process with Hartford right now if you\u2019d like \u2014 I just need the customer\u2019s name and a brief description of the incident.",
  },
  {
    question:
      "Does our property insurance cover the new kitchen equipment we just bought?",
    answer:
      "Yes \u2014 your new kitchen equipment is covered under the Business Personal Property (BPP) section of your Travelers Commercial Property policy (CP-2024-55109). Your current BPP limit is $250,000.\n\nThat said, if this purchase is significant, you may be getting close to that limit. Do you know the value of the new equipment? I can check whether you need to increase your BPP coverage to make sure everything\u2019s fully protected.",
  },
];

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

export const CTA_PHONE = "(672) 203-6730";
export const CTA_PHONE_HREF = "sms:+16722036730";
export const CTA_EMAIL = "claire@claritylabs.inc";
export const CTA_EMAIL_HREF = "mailto:claire@claritylabs.inc";
