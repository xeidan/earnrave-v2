"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  BookOpen,
  Blocks,
  Check,
  ChevronDown,
  GraduationCap,
  LockKeyhole,
  MousePointer2,
  Play,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import DashboardPreview from "@/components/sections/DashboardPreview";
import { products } from "@/config/products";

const faqs = [
  {
    q: "Is EarnRave a broker or prop firm?",
    a: "No. EarnRave is a trading workflow and performance platform concept. It does not execute trades, hold funds, or provide funding itself.",
  },
  {
    q: "Can I import my trades?",
    a: "Trade import integrations are planned for the product roadmap. This starter currently uses illustrative dashboard data only.",
  },
  {
    q: "Does the AI Coach give trade signals?",
    a: "The intended AI Coach focuses on reviewing your process, journal context, and patterns. It is not represented as a guaranteed signal or profit engine.",
  },
  {
    q: "Is the platform free?",
    a: "Pricing is a product decision to finalize. The pricing section is intentionally a launch placeholder until the plans and entitlements are defined.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "A journal built around your process",
    desc: "Capture the setup, execution, emotion, and outcome—not just the P&L.",
  },
  {
    icon: TrendingUp,
    title: "Analytics that reveal patterns",
    desc: "Understand expectancy, risk, consistency, and the behaviors behind results.",
  },
  {
    icon: Target,
    title: "Risk tools before the trade",
    desc: "Set position size and risk parameters before you enter the market.",
  },
  {
    icon: Brain,
    title: "AI-supported reflection",
    desc: "Turn journal context into thoughtful review prompts and next steps.",
  },
];

const productsDetails = [
  {
    id: "journal",
    icon: BookOpen,
    eyebrow: "01 / JOURNAL",
    title: "Make every trade teach you something.",
    desc: "Capture your execution and the context behind it. Build a repeatable review habit with clear analytics and an honest record of your decisions.",
    bullets: [
      "Trade logs and session notes",
      "Performance breakdowns",
      "Setup and behavior tagging",
    ],
    anchor: "journal",
  },
  {
    id: "funding",
    icon: Rocket,
    eyebrow: "02 / FUNDING",
    title: "Prepare with a plan—not pressure.",
    desc: "Organize evaluation goals, risk limits, and progress so you can approach funding challenges with structure.",
    bullets: [
      "Challenge planning workspace",
      "Drawdown and target tracking",
      "Rules and checklist library",
    ],
    anchor: "funding",
  },
  {
    id: "academy",
    icon: GraduationCap,
    eyebrow: "03 / ACADEMY",
    title: "Build skill in a deliberate sequence.",
    desc: "A home for structured lessons, learning paths, and practical exercises that support your trading process.",
    bullets: [
      "Guided learning tracks",
      "Practical review exercises",
      "Progress tracking",
    ],
    anchor: "academy",
  },
  {
    id: "tools",
    icon: Blocks,
    eyebrow: "04 / TOOLS",
    title: "Make the math part of your routine.",
    desc: "Use focused tools to plan trades, calculate risk, and keep your decision process consistent.",
    bullets: [
      "Position size calculator",
      "Risk/reward planner",
      "Session and trade checklists",
    ],
    anchor: "tools",
  },
  {
    id: "ai",
    icon: Brain,
    eyebrow: "05 / AI COACH",
    title: "Review your decisions with a sharper lens.",
    desc: "Use AI-assisted prompts to inspect journal patterns, identify questions, and reflect on process—not chase certainty.",
    bullets: [
      "Context-aware journal review",
      "Behavior pattern prompts",
      "Actionable reflection summaries",
    ],
    anchor: "ai-coach",
  },
];

function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold tracking-[.2em] text-[#00d2b1]">
        {kicker}
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-7 text-neutral-400">{copy}</p>
    </div>
  );
}

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-5 pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-[245px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,177,.12),transparent_62%)]" />

          <div className="pointer-events-none absolute left-1/2 top-32 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[#00d2b1]/[0.035] blur-[110px]" />

          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-neutral-300"
            >
              <Sparkles size={13} className="text-[#00d2b1]" />
              The complete trading ecosystem
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-7 text-5xl font-semibold leading-[1.04] tracking-[-.065em] sm:text-6xl md:text-7xl lg:text-[86px]"
            >
              Trade your edge.
              <br />
              <span className="bg-gradient-to-r from-white via-white to-[#00d2b1] bg-clip-text text-transparent">
                Build mastery.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg"
            >
              One connected workspace to journal your trades, sharpen your
              process, prepare for funding, and understand the decisions behind
              your performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="#get-started"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00d2b1] px-6 text-sm font-semibold text-[#03110e] transition hover:bg-[#50e7ce]"
              >
                Explore demo
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#platform"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 text-sm font-medium text-white transition hover:bg-white/[0.06]"
              >
                <Play size={15} />
                Get started
              </a>
            </motion.div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-600">
              <LockKeyhole size={12} />
              Designed for deliberate, data-informed trading
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-[1100px] sm:mt-20">
            <DashboardPreview />
          </div>
        </section>

        {/* Platform Section */}
        <section
          id="platform"
          className="border-y border-white/[0.05] bg-[#080a0a] px-5 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              kicker="ONE WORKSPACE. FIVE CAPABILITIES."
              title="Your trading process, connected."
              copy="Less tool-hopping. More clarity across the habits and decisions that shape your performance."
            />

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {products.map((product) => {
                const Icon = product.icon;

                return (
                  <a
                    href={product.href}
                    key={product.id}
                    className="group rounded-2xl border border-white/[0.06] bg-[#0d1010] p-5 transition hover:-translate-y-1 hover:border-[#00d2b1]/25"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00d2b1]/[0.08] text-[#00d2b1]">
                      <Icon size={19} />
                    </div>

                    <p className="mt-5 text-sm font-semibold">
                      {product.title}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-neutral-500">
                      {product.description}
                    </p>

                    <div className="mt-4 text-xs text-neutral-600 transition group-hover:text-[#00d2b1]">
                      Explore
                      <ArrowRight size={13} className="ml-1 inline" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              kicker="BUILT FOR THE PROCESS"
              title="Performance is more than a number."
              copy="EarnRave brings the full context of your trading into view—your preparation, your execution, and what you learn afterward."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#101313] to-[#080a0a] p-6 sm:p-8"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00d2b1]/10 bg-[#00d2b1]/[0.06] text-[#00d2b1]">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section
          id="analytics"
          className="bg-[#080a0a] px-5 py-20 sm:py-24"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold tracking-[.2em] text-[#00d2b1]">
                MEASURE WHAT MATTERS
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
                Find the patterns.
                <br />
                Respect the data.
              </h2>

              <p className="mt-5 text-sm leading-7 text-neutral-400">
                A useful review goes beyond wins and losses. Bring risk, setup
                quality, timing, and mindset into a single picture to identify
                what deserves your attention.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Understand your risk and reward profile",
                  "Compare setups and sessions",
                  "Spot recurring process breakdowns",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-neutral-300"
                  >
                    <Check size={16} className="text-[#00d2b1]" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#journal"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#00d2b1]"
              >
                Explore Journal
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0e0e] p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500">Sample analytics</p>
                  <p className="mt-1 text-lg font-semibold">
                    Performance by setup
                  </p>
                </div>

                <span className="rounded-lg border border-white/[0.07] px-3 py-2 text-xs text-neutral-400">
                  30 days
                  <ChevronDown size={12} className="inline" />
                </span>
              </div>

              <div className="mt-7 space-y-5">
                {[
                  ["Breakout", "78%", 78],
                  ["Pullback", "64%", 64],
                  ["Reversal", "48%", 48],
                  ["Range", "41%", 41],
                ].map(([name, percentage, value]) => (
                  <div key={name}>
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-neutral-300">{name}</span>
                      <span className="text-neutral-500">
                        {percentage} win rate
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00d2b1]/60 to-[#00d2b1]"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[10px] text-neutral-600">
                Illustrative sample values. Not a performance claim.
              </p>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              kicker="THE EARNRAVE ECOSYSTEM"
              title="Every part of your edge has a place."
              copy="Move from preparation to execution to reflection—with tools designed to support a more intentional trading routine."
            />

            <div className="mt-14 space-y-5">
              {productsDetails.map((product, index) => {
                const Icon = product.icon;

                return (
                  <article
                    id={product.anchor}
                    key={product.id}
                    className={`scroll-mt-28 grid items-center gap-8 rounded-3xl border border-white/[0.06] bg-[#0a0d0d] p-6 sm:p-9 lg:grid-cols-2 ${
                      index % 2 ? "lg:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold tracking-[.18em] text-[#00d2b1]">
                        {product.eyebrow}
                      </p>

                      <h3 className="mt-4 max-w-lg text-2xl font-semibold leading-tight tracking-[-.04em] sm:text-3xl">
                        {product.title}
                      </h3>

                      <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-400">
                        {product.desc}
                      </p>

                      <ul className="mt-5 space-y-2">
                        {product.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-center gap-2 text-sm text-neutral-300"
                          >
                            <Check size={14} className="text-[#00d2b1]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#get-started"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#00d2b1]"
                      >
                        Discover{" "}
                        {product.id === "ai"
                          ? "AI Coach"
                          : product.id.charAt(0).toUpperCase() +
                            product.id.slice(1)}
                        <ArrowUpRight size={15} />
                      </a>
                    </div>

                    <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.04] bg-[radial-gradient(ellipse_at_center,rgba(0,210,177,.07),transparent_68%)]">
                      <div className="relative flex h-40 w-40 items-center justify-center rounded-[32px] border border-[#00d2b1]/15 bg-[#00d2b1]/[0.04] shadow-[0_0_70px_rgba(0,210,177,.07)]">
                        <Icon
                          size={52}
                          strokeWidth={1.2}
                          className="text-[#00d2b1]"
                        />

                        <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#101414] text-xs text-neutral-300">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section
          id="workflow"
          className="border-y border-white/[0.05] bg-[#080a0a] px-5 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              kicker="A SIMPLE ROUTINE"
              title="Prepare. Execute. Review. Repeat."
              copy="Build a practical loop that keeps your attention on the decisions you can control."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  n: "01",
                  icon: Target,
                  title: "Prepare",
                  desc: "Define your plan, risk limits, and the conditions that make a setup valid.",
                },
                {
                  n: "02",
                  icon: MousePointer2,
                  title: "Execute",
                  desc: "Trade with intent and capture the context behind your decisions.",
                },
                {
                  n: "03",
                  icon: Zap,
                  title: "Review",
                  desc: "Use journal records and analytics to learn, adjust, and repeat.",
                },
              ].map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.n}
                    className="rounded-2xl border border-white/[0.06] bg-[#0d1010] p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[.15em] text-neutral-600">
                        STEP {step.n}
                      </span>

                      <Icon size={20} className="text-[#00d2b1]" />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/[0.06] bg-[radial-gradient(ellipse_at_top,rgba(0,210,177,.08),transparent_65%)] px-6 py-12 text-center sm:px-12">
            <p className="text-xs font-semibold tracking-[.2em] text-[#00d2b1]">
              BUILT AROUND BETTER HABITS
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
              A calmer, clearer way to take trading seriously.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
              The goal is not to promise outcomes. It is to give traders a
              better structure for learning from their own decisions.
            </p>

            <a
              href="#get-started"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black"
            >
              Join the early access list
              <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="bg-[#080a0a] px-5 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              kicker="PLANS & ACCESS"
              title="Choose the right level of support."
              copy="Plan details are being finalized. This starter keeps pricing transparent as a placeholder rather than inventing tiers or promises."
            />

            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/[0.08] bg-[#0d1010] p-7">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Early access</p>

                <span className="rounded-full border border-[#00d2b1]/20 bg-[#00d2b1]/[0.06] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#00d2b1]">
                  COMING SOON
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Be among the first to explore the EarnRave workspace as
                features roll out.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "Journal and analytics experience",
                  "Tools and learning areas",
                  "Product updates and launch information",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-neutral-300"
                  >
                    <Check size={15} className="text-[#00d2b1]" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#get-started"
                className="mt-7 flex h-11 items-center justify-center rounded-xl bg-white text-sm font-semibold text-black"
              >
                Get launch updates
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              kicker="QUESTIONS"
              title="A few things to know."
              copy="Clear expectations before you get started."
            />

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/[0.07] bg-[#0a0d0d]"
                >
                  <button
                    onClick={() =>
                      setFaqOpen(faqOpen === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-medium text-white sm:px-6"
                  >
                    {faq.q}

                    <ChevronDown
                      size={17}
                      className={`shrink-0 text-neutral-500 transition ${
                        faqOpen === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {faqOpen === index && (
                    <p className="px-5 pb-5 text-sm leading-6 text-neutral-400 sm:px-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section
          id="get-started"
          className="px-5 pb-20 sm:pb-28"
        >
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-[#00d2b1]/15 bg-[#0b1110] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,177,.14),transparent_65%)]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00d2b1]/20 bg-[#00d2b1]/[0.08] text-[#00d2b1]">
                <Sparkles size={21} />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-[-.05em] sm:text-5xl">
                Make your next trade part of a better process.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
                EarnRave is being built to help you learn from the work—not
                just watch the outcome.
              </p>

              <a
                href="mailto:hello@earnrave.com?subject=EarnRave%20early%20access"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#00d2b1] px-6 text-sm font-semibold text-[#03110e] hover:bg-[#50e7ce]"
              >
                Request early access
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">earnrave</span>
              <span className="text-xs text-neutral-600">© 2026 EarnRave</span>
            </div>

            <nav className="flex flex-wrap gap-5 text-xs text-neutral-500">
              <a href="#platform" className="hover:text-white">
                Platform
              </a>

              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>

              <a href="#faq" className="hover:text-white">
                FAQ
              </a>

              <a href="mailto:hello@earnrave.com" className="hover:text-white">
                Contact
              </a>
            </nav>
          </div>

          <p className="mx-auto mt-5 max-w-6xl text-[10px] leading-5 text-neutral-700">
            Trading involves risk. EarnRave is a trading workflow and
            educational platform concept, not a broker, investment adviser, or
            funding provider. Dashboard figures shown are illustrative and are
            not actual or promised results.
          </p>
        </footer>
      </main>
    </>
  );
}