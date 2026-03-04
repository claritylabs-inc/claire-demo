# CLAUDE.md

This file provides guidance to Claude Code when working with this repository. See also `AGENTS.md` for a mirror of this guidance (used by Warp and other tools).

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

There is no test suite configured.

## Project Overview

Marketing/demo web app for **Claire**, an AI commercial insurance management product by Clarity Labs. Fully static, client-side interactive demo — no backend, no auth, no API calls. All "data" is hardcoded mock content.

**Tech stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, dayjs. React Compiler is enabled (`next.config.ts`).

## Architecture

### Pages

- `src/app/page.tsx` — Main demo. Three-step state machine (`upload → coverage → chat`). Chat overlay renders on top of coverage step via frosted glass backdrop, not a separate route.
- `src/app/explore/page.tsx` — Static "use cases" gallery page linked from the main demo.

### Demo Step Flow

1. **PolicyUploadStep** (`src/components/demo/PolicyUploadStep.tsx`): Animated onboarding with 4-phase animation (`scanning → extracting → analyzing → ready`). Scroll locked during animation.
2. **CoverageStep** / **CoverageStepMobile**: Insurance dashboard with policy groups, coverage lines, context source badges. Desktop and mobile are separate components due to different layouts. Clicking stat cards or policy rows opens chat overlay.
3. **ChatStep** (`src/components/demo/ChatStep.tsx`): Simulated iPhone mockup with scripted, auto-advancing chat driven by `useChatScript`.

### Data Layer

- **`src/data/demoData.ts`**: All mock policies, coverage lines, chat prompts, context sources, use cases. Chat prompts keyed by `ChatMode` and `PolicyId`.
- **`src/lib/demoDates.ts`**: Policy dates computed relative to `dayjs()` so the demo never shows stale dates. GL policy expires exactly 2 weeks from today. Import `formatPolicyDate` from here — never hardcode dates.

### Chat Scripting (`useChatScript`)

`src/components/demo/chat/useChatScript.ts` — core chat animation logic:
- Accepts `mode: ChatMode`, `policyId: PolicyId | null`, `promptIndex`, `userFirst`
- Builds `ScriptStep[]` timeline with absolute delays
- Auto-loops after `SCRIPT_END_PAUSE = 5500ms`
- `ChatMode` values: `"contact"` | `"renew"` | `"overview"` | `"premiums"` | `"renewal"` | `"integrations"` | `"prompt"`

## Styling

### Design Tokens

All tokens defined as CSS custom properties in `src/app/globals.css` and mapped into Tailwind via `@theme inline`.

#### Colors

| Token                  | Value                          | Usage                        |
|------------------------|--------------------------------|------------------------------|
| `--background`         | `#faf8f4`                      | Page background              |
| `--foreground`         | `#111827` (gray-900)           | Default body text            |
| `--foreground-highlight` | `#000000`                    | Emphasized/important text    |
| `--muted`              | `#4b5563` (gray-600)           | Secondary text               |
| `--accent`             | `#6b7280` (gray-500)           | Tertiary/accent text         |
| `--divider`            | `#e5e7eb` (gray-200)           | Borders, separators          |
| `--footer-muted`       | `#8a8578`                      | Footer text (warm gray)      |
| `--primary`            | `#2a97ff`                      | Main brand blue              |
| `--primary-light`      | `#a0d2fa`                      | Light blue for accents       |
| `--primary-muted`      | `#5ba3d9`                      | Slightly darker blue         |
| `--success`            | `#059669` (emerald-600)        | Connected/success states     |
| `--success-muted`      | `#10b981` (emerald-500)        | Success badges               |
| `--warning`            | `#b45309` (amber-700)          | Warning states               |
| `--integration`        | `#2ca01c`                      | QuickBooks green             |

Use semantic classes (`text-muted`, `bg-background`, `text-foreground-highlight`, `text-success`, `text-warning`) — avoid raw hex or arbitrary Tailwind values.

#### Typography Scale

| Class          | Size         | Usage                              |
|----------------|--------------|-------------------------------------|
| `text-micro`   | 7px (0.4375rem)  | Tiny badges, policy numbers    |
| `text-caption` | 10px (0.625rem)  | Tiny labels, step numbers      |
| `text-label-sm`| 11px (0.6875rem) | Small labels, uppercase tags   |
| `text-label`   | 12px (0.75rem)   | Labels, compact UI             |
| `text-body-sm` | 13px (0.8125rem) | Compact body, chat bubbles     |

Use these instead of `text-xs`/`text-sm` for UI text. Headings (h1–h6) have responsive sizes defined in CSS.

#### Z-Index

| Class              | Value | Usage              |
|--------------------|-------|--------------------|
| `z-header`         | 50    | Fixed header       |
| `z-modal-backdrop` | 100   | Modal overlays     |
| `z-modal`          | 110   | Modal content      |
| `z-toast`          | 120   | Toast notifications|

Always use semantic utility classes. Do not use arbitrary `z-[N]` values.

### Fonts

| Font               | CSS Variable                  | Usage                                    |
|--------------------|-------------------------------|------------------------------------------|
| Geist Sans         | `--font-sans` / `--font-geist-sans` | Body/UI text (default)             |
| Geist Mono         | `--font-mono` / `--font-geist-mono` | Code, policy numbers               |
| Playfair Display   | `--font-serif` / `--font-playfair`  | All headings (h1–h6, set in CSS)   |
| Instrument Serif   | `--font-instrument-serif`           | Brand name (via `BrandName` / `.serif`) |

## Navigation

- **Internal links**: Always use Next.js `<Link>` from `next/link` for links to pages within the app (e.g. `/`, `/explore`). Never use `<a href>` with hardcoded domains like `claire.claritylabs.inc`.
- **Programmatic navigation**: Use `useRouter()` from `next/navigation` and call `router.push()`.
- **External links**: Plain `<a>` tags (with `target="_blank"` and `rel="noopener noreferrer"`) are fine for truly external URLs (mailto, phone, third-party sites).

## Key Components

| Component | File | Description |
|-----------|------|-------------|
| `Logo` | `src/components/Logo.tsx` | Brand logo with size variants (sm/md/lg). Renders as `<Link href="/">` or `<span>` via `asSpan` prop. |
| `BrandName` | `src/components/BrandName.tsx` | Renders brand text in Instrument Serif as `<Link href="/">`. Use wherever the product name appears. |
| `Header` | `src/components/Header.tsx` | Fixed top nav with `Logo` and `<Link href="/">` Demo button. |
| `FadeIn` | `src/components/FadeIn.tsx` | Framer Motion entrance animation wrapper. Props: `when`, `staggerIndex`, `direction`, `as`, `duration`. |
| `CTAButton` | `src/components/CTAButton.tsx` | Animated CTA with Framer Motion hover effects. Uses `<motion.a>` for external `href`, `<motion.button>` otherwise. |
| `CommandPalette` | `src/components/CommandPalette.tsx` | Global `⌘K` command palette rendered in root layout. |
| `BackToClarityButton` | `src/components/demo/BackToClarityButton.tsx` | Expandable back button. Uses `router.push()` for internal paths, `window.location.href` for external. |
| `FixedActionFooter` | `src/components/demo/FixedActionFooter.tsx` | Animated CTA fixed to viewport bottom via React Portal. |

## Conventions

- **Path alias**: `@/*` resolves to `src/*` (configured in `tsconfig.json`). Always use `@/` imports.
- **Client components**: Most interactive components use `"use client"`. Server components are the exception (Logo, Header, BrandName).
- **Framer Motion easing**: Common curves are `[0.16, 1, 0.3, 1]` and `[0.33, 1, 0.68, 1]`.
- **Portal rendering**: `FixedActionFooter` and `PolicyUploadStep` use `createPortal()` for fixed-position elements.
