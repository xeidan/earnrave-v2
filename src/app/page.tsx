
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  ShieldCheck,
  Target,
  RefreshCcw,
  Radio,
  Rocket,
  Lightbulb,
  Sparkles,
  Check,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardPreview from "@/components/sections/DashboardPreview";

const needs = [
  {
    number: "01",
    icon: Target,
    title: "EDGE",
    headline: "Find your advantage.",
    description:
      "Identify what works. Understand your strongest setups, market conditions, and the patterns behind your performance.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "RISK",
    headline: "Protect your capital.",
    description:
      "Manage exposure, control drawdown, calculate position sizes, and protect yourself from decisions that put your account at risk.",
  },
  {
    number: "03",
    icon: Brain,
    title: "DISCIPLINE",
    headline: "Execute with intention.",
    description:
      "Build consistency, follow your trading plan, and reduce the emotional decisions that undermine good trading.",
  },
  {
    number: "04",
    icon: RefreshCcw,
    title: "FEEDBACK",
    headline: "Learn. Adapt. Improve.",
    description:
      "Review your trades, uncover weaknesses, understand your mistakes, and turn experience into actionable improvement.",
  },
];

const products = [
  {
    number: "01",
    name: "AI-ANALYTICS",
    headline: "Know your edge.",
    description:
      "Trading journal, performance analytics, AI diagnostics and behavioral tracking.",
    icon: Brain,
    href: "/analytics",
  },
  {
    number: "02",
    name: "SIGNALS",
    headline: "Find the opportunity.",
    description:
      "Trade setups, alerts, entry zones, invalidation and risk parameters.",
    icon: Radio,
    href: "/signals",
  },
  {
    number: "03",
    name: "FUNDING",
    headline: "Get funded. Stay funded.",
    description:
      "Prop firm preparation, evaluation planning, drawdown management and challenge tracking.",
    icon: Rocket,
    href: "/funding",
  },
  {
    number: "04",
    name: "INSIGHTS",
    headline: "Understand the market.",
    description:
      "Weekly research, macro analysis, educational breakdowns and trade walkthroughs.",
    icon: Lightbulb,
    href: "/insights",
  },
];

const ecosystemSteps = [
  {
    title: "Understand",
    description: "Build market context and find opportunities.",
  },
  {
    title: "Prepare",
    description: "Plan your trade and define your risk.",
  },
  {
    title: "Execute",
    description: "Follow your strategy with discipline.",
  },
  {
    title: "Review",
    description: "Learn from your performance and refine your edge.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold tracking-[.2em] text-[#00d2b1]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* HERO */}
        <section className="relative px-5 pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-[220px]">
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
              Everything you need to become a more informed, disciplined and
              consistent trader. One ecosystem built around the four things
              that matter most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="#ecosystem"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00d2b1] px-6 text-sm font-semibold text-[#03110e] transition hover:bg-[#50e7ce]"
              >
                Explore the ecosystem
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#needs"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 text-sm font-medium text-white transition hover:bg-white/[0.06]"
              >
                Our approach
                <ArrowRight size={15} />
              </a>
            </motion.div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-600">
              <ShieldCheck size={13} />
              Built around better trading decisions
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto mt-16 max-w-[1100px] sm:mt-20">
            <DashboardPreview />
          </div>
        </section>

        {/* FOUR TRADER NEEDS */}
        <section
          id="needs"
          className="border-y border-white/[0.05] bg-[#080a0a] px-5 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="THE FOUNDATION"
              title="Four things every trader needs."
              description="Trading is more than finding entries. Long-term improvement requires an edge, risk control, discipline, and a feedback loop."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {needs.map((need, index) => {
                const Icon = need.icon;

                return (
                  <motion.article
                    key={need.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group rounded-2xl border border-white/[0.06] bg-[#0d1010] p-6 transition duration-300 hover:border-[#00d2b1]/25 hover:bg-[#101414]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[.15em] text-neutral-600">
                        {need.number}
                      </span>

                      <Icon
                        size={19}
                        strokeWidth={1.7}
                        className="text-[#00d2b1]"
                      />
                    </div>

                    <p className="mt-6 text-xs font-semibold tracking-[.18em] text-[#00d2b1]">
                      {need.title}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold tracking-[-.035em] text-white">
                      {need.headline}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                      {need.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOUR PRODUCTS */}
        <section id="ecosystem" className="px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="THE EARNRAVE ECOSYSTEM"
              title="One ecosystem. Every part of your trading."
              description="Four connected products designed to support your trading journey—from understanding the market to reviewing your performance."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {products.map((product, index) => {
                const Icon = product.icon;

                return (
                  <motion.a
                    key={product.name}
                    href={product.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#101313] to-[#090b0b] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00d2b1]/25 sm:p-8"
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#00d2b1]/[0.035] blur-[70px] transition group-hover:bg-[#00d2b1]/[0.07]" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[.15em] text-neutral-600">
                          {product.number}
                        </span>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00d2b1]/10 bg-[#00d2b1]/[0.06] text-[#00d2b1]">
                          <Icon size={20} strokeWidth={1.7} />
                        </div>
                      </div>

                      <p className="mt-6 text-xs font-semibold tracking-[.18em] text-[#00d2b1]">
                        {product.name}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold tracking-[-.04em] text-white sm:text-3xl">
                        {product.headline}
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">
                        {product.description}
                      </p>

                      <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition group-hover:text-[#00d2b1]">
                        Explore product
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONNECTED WORKFLOW */}
        <section className="border-y border-white/[0.05] bg-[#080a0a] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="CONNECTED BY DESIGN"
              title="Trading is a continuous process."
              description="Your market understanding informs your plan. Your execution creates data. Your feedback helps you improve the next decision."
            />

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ecosystemSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-white/[0.06] bg-[#0d1010] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[.15em] text-neutral-600">
                      STEP 0{index + 1}
                    </span>

                    {index < ecosystemSteps.length - 1 && (
                      <ArrowRight
                        size={15}
                        className="hidden text-neutral-700 lg:block"
                      />
                    )}
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="get-started" className="px-5 py-20 sm:py-28">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-[#00d2b1]/15 bg-[#0b1110] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,177,.14),transparent_65%)]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00d2b1]/20 bg-[#00d2b1]/[0.08] text-[#00d2b1]">
                <Sparkles size={21} />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-[-.05em] text-white sm:text-5xl">
                Trade with purpose.
                <br />
                Improve with every decision.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
                Start building a more structured approach to trading with
                EarnRave.
              </p>

              <a
                href="mailto:hello@earnrave.com?subject=EarnRave%20early%20access"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#00d2b1] px-6 text-sm font-semibold text-[#03110e] transition hover:bg-[#50e7ce]"
              >
                Get early access
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
        <Footer />
    </>
  );
}
