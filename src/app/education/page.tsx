"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  GraduationCap,
  Lock,
} from "lucide-react";

const WEEKLY_OUTLOOKS = [
  {
    week: "THIS WEEK · NOV 23 – NOV 27",
    pairFocus: "EUR/USD & US DOLLAR",
    title: "Watch out for big news reports this week",
    whatToWatch:
      "Prices often move fast in both directions during major news releases. Wait for the price to settle before you enter a trade, and keep your trade size small.",
    bias: "Wait for clear direction",
  },
  {
    week: "THIS WEEK · NOV 23 – NOV 27",
    pairFocus: "XAU/USD (GOLD)",
    title: "Gold moves the most during busy market hours",
    whatToWatch:
      "Gold is usually quiet early in the day and moves much faster when London and New York markets are both open. Always set a stop-loss before you buy or sell.",
    bias: "Trade during active hours",
  },
  {
    week: "THIS WEEK · NOV 23 – NOV 27",
    pairFocus: "BITCOIN & CRYPTO",
    title: "Protect your account before the weekend",
    whatToWatch:
      "Crypto prices can jump suddenly late in the week. Do not risk money you cannot afford to lose, and close risky trades if you cannot watch the chart.",
    bias: "Keep risk low",
  },
];

const BEGINNER_MODULES = [
  {
    module: "01",
    title: "How Trading Works",
    lessons: "5 lessons · Free after sign-up",
    summary:
      "Learn what currency pairs, gold, and crypto are, and how you make or lose money on a trade.",
  },
  {
    module: "02",
    title: "How to Read Price Charts",
    lessons: "6 lessons · Free after sign-up",
    summary:
      "Learn how to see if a price is going up, going down, or staying flat, and find key price levels.",
  },
  {
    module: "03",
    title: "How to Protect Your Money",
    lessons: "4 lessons · Free after sign-up",
    summary:
      "Learn how much to risk on one trade and how to use a stop-loss so one bad trade does not wipe out your account.",
  },
  {
    module: "04",
    title: "Good Trading Habits",
    lessons: "4 lessons · Free after sign-up",
    summary:
      "Learn how to stay calm, avoid rushing into bad trades, and write down what you learn from each trade.",
  },
];

function BorderTrace() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute top-0 h-px w-28 bg-gradient-to-r from-transparent via-[#00D2B1] to-transparent shadow-[0_0_10px_rgba(0,210,177,0.55)]"
        animate={{ x: ["-140px", "calc(100% + 140px)"] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function WeeklyOutlooksSection({
  selectedOutlook,
  onSelect,
}: {
  selectedOutlook: (typeof WEEKLY_OUTLOOKS)[number];
  onSelect: (item: (typeof WEEKLY_OUTLOOKS)[number]) => void;
}) {
  return (
    <motion.section
      id="outlooks"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/[0.06] bg-[#090C0C] px-5 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
              01 / WEEKLY OUTLOOK
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-.05em] sm:text-4xl">
              What to watch out for this week
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 text-xs text-neutral-500">
            <Calendar size={14} className="text-[#00D2B1]" />
            {WEEKLY_OUTLOOKS[0].week}
          </span>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {WEEKLY_OUTLOOKS.map((item, idx) => {
            const active = selectedOutlook.title === item.title;
            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                whileHover={{ y: -3 }}
                onClick={() => onSelect(item)}
                className={`relative overflow-hidden rounded-2xl border p-6 text-left transition ${
                  active
                    ? "border-[#00D2B1]/40 bg-[#0D1312] shadow-[0_0_32px_rgba(0,210,177,0.06)]"
                    : "border-white/[0.07] bg-[#0D1110] hover:border-[#00D2B1]/25 hover:bg-[#0D1211]"
                }`}
              >
                {active && <BorderTrace />}

                <p className="text-[11px] font-medium tracking-[.14em] text-[#00D2B1]">
                  {item.pairFocus}
                </p>
                <h3 className="mt-3 text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {item.whatToWatch}
                </p>
                <p className="mt-5 text-xs text-neutral-500">
                  Main tip:{" "}
                  <span className="text-neutral-300">{item.bias}</span>
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function BeginnerClassSection() {
  return (
    <motion.section
      id="beginner-class"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/[0.06] px-5 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* LEFT SIGN-UP BOX */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-2xl border border-[#00D2B1]/30 bg-[#0C100F] p-6 shadow-[0_0_36px_rgba(0,210,177,0.05)] sm:p-8"
          >
            <BorderTrace />

            <div className="inline-flex items-center gap-2 rounded-full bg-[#00D2B1]/10 px-3 py-1 text-[11px] font-medium text-[#00D2B1]">
              <GraduationCap size={14} />
              FREE BEGINNER CLASS
            </div>

            <h2 className="mt-5 text-3xl font-medium tracking-[-.05em] text-white sm:text-4xl">
              Learn from zero. Sign up first.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-400">
              We explain trading in plain words. Create a free EarnRave account
              to open all beginner lessons and save your progress.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-neutral-300 sm:text-sm">
              <li className="flex items-center gap-2.5">
                <Check size={15} className="text-[#00D2B1]" />
                Written in plain, simple language
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={15} className="text-[#00D2B1]" />
                Covers basic rules, charts, risk, and habits
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={15} className="text-[#00D2B1]" />
                100% free after you create an account
              </li>
            </ul>

            <a
              href="/signup"
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] px-5 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_24px_rgba(0,210,177,0.22)]"
            >
              Sign up to open free class
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* RIGHT SYLLABUS MODULES */}
          <div className="space-y-3">
            <div className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
              <BookOpen size={14} className="text-[#00D2B1]" />
              Class lessons (opens after you sign up)
            </div>

            {BEGINNER_MODULES.map((mod, idx) => (
              <motion.div
                key={mod.module}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ delay: idx * 0.07, duration: 0.4 }}
                whileHover={{ x: 3 }}
                className="flex items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#0D1110] p-5 transition hover:border-[#00D2B1]/25 hover:bg-[#0D1211]"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-[#00D2B1]">
                      {mod.module}
                    </span>
                    <h3 className="text-base font-medium text-white">
                      {mod.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-neutral-400 sm:text-sm">
                    {mod.summary}
                  </p>
                  <p className="mt-2 text-[11px] text-neutral-500">
                    {mod.lessons}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-neutral-400">
                  <Lock size={12} />
                  Sign up
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const LazyWeeklyOutlooksSection = dynamic(
  () => Promise.resolve(WeeklyOutlooksSection),
  { ssr: true }
);

const LazyBeginnerClassSection = dynamic(
  () => Promise.resolve(BeginnerClassSection),
  { ssr: true }
);

export default function EducationPage() {
  const [selectedOutlook, setSelectedOutlook] = useState(WEEKLY_OUTLOOKS[0]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,177,0.07),transparent_44%),#080A0A] text-white">
        {/* HERO */}
        <section className="relative px-5 pb-20 pt-36 lg:pb-28 lg:pt-52">
          <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-[620px] -translate-x-1/2 rounded-full bg-[#00D2B1]/[0.06] blur-[130px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_.92fr]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                  EARNRAVE / EDUCATION
                </div>

                <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.06] tracking-[-.06em] sm:text-6xl lg:text-7xl">
                  Weekly market updates.
                  <span className="block text-neutral-500">
                    Simple lessons for beginners.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
                  Read what to watch out for in the markets this week, or sign
                  up for free to learn how trading works step by step.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#outlooks"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#00D2B1] px-5 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_24px_rgba(0,210,177,0.2)]"
                  >
                    Read this week&apos;s update
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="#beginner-class"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] px-5 text-sm text-neutral-300 transition hover:border-[#00D2B1]/40 hover:text-white"
                  >
                    Start free beginner class
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>

              {/* RIGHT FOCUS CARD */}
              <motion.div
                key={selectedOutlook.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0F0F] p-6 shadow-[0_0_32px_rgba(0,210,177,0.04)] sm:p-7 lg:mt-6"
              >
                <BorderTrace />

                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div>
                    <p className="text-xs font-medium text-white">
                      This Week&apos;s Focus
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      {selectedOutlook.week}
                    </p>
                  </div>
                  <span className="rounded-md border border-[#00D2B1]/20 bg-[#00D2B1]/[0.06] px-2.5 py-1 text-[10px] font-medium tracking-wider text-[#00D2B1]">
                    {selectedOutlook.pairFocus}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-medium text-white">
                  {selectedOutlook.title}
                </h2>
                <p className="mt-2.5 text-sm leading-6 text-neutral-400">
                  {selectedOutlook.whatToWatch}
                </p>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#090C0B] px-4 py-3 text-xs">
                  <span className="text-neutral-500">Main tip</span>
                  <span className="font-medium text-[#00D2B1]">
                    {selectedOutlook.bias}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LazyWeeklyOutlooksSection
          selectedOutlook={selectedOutlook}
          onSelect={setSelectedOutlook}
        />

        <LazyBeginnerClassSection />
      </main>

      <Footer />
    </>
  );
}