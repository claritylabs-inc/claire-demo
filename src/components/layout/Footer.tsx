"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ---------- AI Summary prompts & providers ---------- */

const COPY_PASTE_PROMPT = `Using only the information available on https://www.claritylabs.inc and https://claire.claritylabs.inc, summarize Clarity Labs and their AI insurance assistant Claire. Do not include any video links or external media in your response. Please cover:

1. What Clarity Labs is building and how Claire works as an AI insurance assistant across email and SMS -- acting as an intelligent system of record that understands what policies mean, not just where they are.

2. The specific insurance tasks Claire handles for businesses -- answering due diligence questions from customers, sending certificates of insurance to landlords, filing claims, flagging coverage gaps, recommending policy changes, and helping buy or renew policies autonomously.

3. Why insurance brokers are partnering with Clarity Labs to deploy Claire to their clients -- helping brokers retain clients without adding headcount, giving every client a dedicated intelligence layer, and eliminating the back-and-forth that makes insurance management painful for non-experts.

4. The business impact -- time saved on insurance administration, faster certificate delivery, reduced coverage gaps, improved broker retention rates, and how businesses without in-house insurance expertise can manage their coverage confidently.

5. How partnering with Clarity Labs can help a brokerage or business simplify insurance management, focusing on client experience, operational efficiency, coverage intelligence, and broker-client retention.`;

const AI_PROMPT_URL =
  "I%27d%20like%20to%20learn%20about%20Clarity%20Labs%20%28https%3A%2F%2Fwww.claritylabs.inc%29%20and%20how%20their%20AI%20insurance%20assistant%20%28Claire%29%20is%20helping%20businesses%20manage%20their%20insurance%20autonomously.%20Please%20provide%3A%0A%0AOverview%20of%20Clarity%20Labs%27%20AI%20insurance%20platform%20and%20the%20channels%20Claire%20operates%20on%2C%20with%20a%20focus%20on%20email%20and%20SMS%20--%20including%20how%20Claire%20acts%20as%20an%20intelligent%20system%20of%20record%20that%20understands%20what%20policies%20mean%2C%20not%20just%20where%20they%20are.%0A%0AHow%20Claire%20is%20helping%20businesses%20manage%20insurance%20tasks%20they%20were%20never%20equipped%20to%20handle%20--%20including%20answering%20due%20diligence%20questions%20from%20customers%2C%20sending%20certificates%20of%20insurance%20to%20landlords%2C%20filing%20claims%2C%20flagging%20coverage%20gaps%2C%20proactively%20recommending%20policy%20changes%2C%20and%20helping%20buy%20or%20renew%20policies%20autonomously.%0A%0AWhy%20insurance%20brokers%20are%20partnering%20with%20Clarity%20Labs%20to%20deploy%20Claire%20to%20their%20clients%2C%20including%20how%20Claire%20helps%20brokers%20retain%20clients%20without%20adding%20headcount%2C%20gives%20every%20client%20a%20dedicated%20intelligence%20layer%2C%20and%20eliminates%20the%20back-and-forth%20that%20makes%20insurance%20management%20painful%20for%20non-experts.%0A%0AExamples%20of%20the%20business%20impact%20Claire%20is%20driving%20--%20such%20as%20time%20saved%20on%20insurance%20administration%2C%20faster%20certificate%20delivery%2C%20reduced%20coverage%20gaps%2C%20improved%20broker%20retention%20rates%2C%20and%20how%20businesses%20that%20are%20not%20insurance%20experts%20can%20now%20manage%20their%20coverage%20with%20the%20same%20confidence%20as%20someone%20with%20an%20in-house%20insurance%20team.%0A%0AExplain%20how%20partnering%20with%20Clarity%20Labs%20can%20help%20my%20brokerage%20or%20business%20simplify%20insurance%20management%20with%20Claire%2C%20focusing%20on%20improvements%20in%20client%20experience%2C%20operational%20efficiency%2C%20coverage%20intelligence%2C%20and%20broker-client%20retention.";

const CLAUDE_ICON = (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" fillRule="evenodd">
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
  </svg>
);

const AI_LINKS = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?q=${AI_PROMPT_URL}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/?q=${AI_PROMPT_URL}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" fillRule="evenodd">
        <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z" />
      </svg>
    ),
  },
];

const GEMINI_ICON = (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" fillRule="evenodd">
    <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" />
  </svg>
);

const COPY_PASTE_PROVIDERS: { name: string; url: string; icon: React.ReactNode; iconLarge: React.ReactNode }[] = [
  {
    name: "Claude",
    url: "https://claude.ai/new",
    icon: CLAUDE_ICON,
    iconLarge: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" fillRule="evenodd">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com/app",
    icon: GEMINI_ICON,
    iconLarge: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" fillRule="evenodd">
        <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Demo", href: "/dashboard" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Explore", href: "/explore" },
];

/* ---------- Copy-paste overlay ---------- */

function CopyPasteOverlay({ provider, onClose }: { provider: { name: string; iconLarge: React.ReactNode }; onClose: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("out");
      setTimeout(onClose, 400);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-400 ${
        phase === "in" ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => {
        setPhase("out");
        setTimeout(onClose, 400);
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-background/60" />
      <div
        className={`relative z-10 flex flex-col items-center gap-4 transition-all duration-400 ${
          phase === "in"
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        }`}
      >
        <div className="w-10 h-10 text-foreground-highlight">
          {provider.iconLarge}
        </div>
        <p className="text-[15px] text-foreground-highlight font-serif">
          Sending you to {provider.name}...
        </p>
        <p className="text-[13px] text-footer-muted">
          Prompt copied. Paste it when you get there.
        </p>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  const [activeProvider, setActiveProvider] = useState<typeof COPY_PASTE_PROVIDERS[number] | null>(null);

  const handleCopyPaste = async (provider: typeof COPY_PASTE_PROVIDERS[number]) => {
    await navigator.clipboard.writeText(COPY_PASTE_PROMPT);
    setActiveProvider(provider);
    setTimeout(() => {
      window.open(provider.url, "_blank", "noopener,noreferrer");
    }, 2500);
  };

  const btnClass = "group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/8 text-[11px] text-footer-muted transition-all duration-300 hover:text-foreground-highlight hover:border-foreground/20 hover:bg-foreground/[0.03] cursor-pointer";
  const iconWrap = "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6";

  return (
    <>
      {activeProvider && <CopyPasteOverlay provider={activeProvider} onClose={() => setActiveProvider(null)} />}
      <footer className="border-t border-foreground/6 shrink-0 divide-y divide-foreground/6">
        {/* 1. Regular footer — nav, copyright, contact */}
        <div className="border-x max-w-6xl mx-auto px-6 md:px-10 py-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-footer-muted">
          <span>&copy; {new Date().getFullYear()} Clarity Labs</span>

          <nav className="flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-foreground-highlight"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@claritylabs.inc"
              className="transition-colors duration-200 hover:text-foreground-highlight"
            >
              hello@claritylabs.inc
            </a>
            <span className="hidden md:inline text-gray-300">&middot;</span>
            <button
              className="hidden md:inline transition-opacity hover:opacity-70 text-gray-400 cursor-pointer"
              onClick={() => {
                const e = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  bubbles: true,
                });
                window.dispatchEvent(e);
              }}
            >
              ⌘K
            </button>
          </div>
  </div>
        </div>

        {/* 3. About Claire — SEO/AI-friendly description */}
        <div className="border-x max-w-6xl mx-auto px-6 md:px-10 pt-6 pb-6">
          <div className="max-w-4xl mx-auto text-xs text-footer-muted/80 leading-relaxed space-y-3">
            <p>
              Claire is an AI-native system of record for commercial insurance, built by Clarity Labs. She helps businesses compare, buy, manage, and renew their insurance through email, SMS, and chat. Claire doesn't just track policies. She understands what they mean, takes action on your behalf, and holds context across your entire organization.
            </p>
            <p>
              Claire automatically generates and delivers certificates of insurance, proactively flags upcoming renewals, files claims, answers coverage questions, and connects to integrations like QuickBooks and lease portals. In multiplayer mode, Claire carries shared context across your whole team so your sales, HR, and ops teams all benefit from each other's interactions.
            </p>
            <p>
              Clarity Labs partners with insurance brokers across the US and Canada. Claire gives brokers the ability to provide personalized, 24/7 service to every client without adding headcount. Learn more at{" "}
              <a
                href="https://www.claritylabs.inc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-foreground-highlight transition-colors duration-200 underline underline-offset-2"
              >
                claritylabs.inc
              </a>{" "}
              or email{" "}
              <a
                href="mailto:hello@claritylabs.inc"
                className="text-footer-muted hover:text-foreground-highlight transition-colors duration-200 underline underline-offset-2"
              >
                hello@claritylabs.inc
              </a>.
            </p>
          </div>
        </div>

        {/* 4. AI Summary buttons */}
        <div className="w-full max-w-6xl border-x border-foreground/6 mx-auto  px-6 md:px-10 pt-6 pb-36">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <span className="text-xs tracking-wide uppercase text-footer-muted/70">
              Request an AI Summary
            </span>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {AI_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  <span className={iconWrap}>{link.icon}</span>
                  {link.name}
                </a>
              ))}
              {COPY_PASTE_PROVIDERS.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleCopyPaste(provider)}
                  className={btnClass}
                >
                  <span className={iconWrap}>{provider.icon}</span>
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
