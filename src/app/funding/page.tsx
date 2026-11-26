"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  Gauge,
  Layers,
  Lock,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Target,
} from "lucide-react";

type AccountOption = {
  id: string;
  label: string;
  balance: number;
  goalPct: number;
  dailyLossPct: number;
  maxLossPct: number;
};

const ACCOUNT_OPTIONS: AccountOption[] = [
  {
    id: "25k",
    label: "$25,000",
    balance: 25000,
    goalPct: 8,
    dailyLossPct: 5,
    maxLossPct: 10,
  },
  {
    id: "50k",
    label: "$50,000",
    balance: 50000,
    goalPct: 8,
    dailyLossPct: 5,
    maxLossPct: 10,
  },
  {
    id: "100k",
    label: "$100,000",
    balance: 100000,
    goalPct: 8,
    dailyLossPct: 5,
    maxLossPct: 10,
  },
  {
    id: "200k",
    label: "$200,000",
    balance: 200000,
    goalPct: 8,
    dailyLossPct: 5,
    maxLossPct: 10,
  },
];

const STAGES = [
  {
    step: "STEP 01",
    title: "First Test Goal (8% to 10%)",
    riskMode: "0.75% to 1.0% risk per trade",
    focus: "Steady growth",
    description:
      "Look for a few good trades during busy market hours. Keep your total risk for the day under 2.0%.",
    rules: [
      "Stop trading for the day after 2 losses in a row",
      "Do not gamble during major news reports",
      "Only take trades where the possible gain is at least 2.5 times the risk",
    ],
  },
  {
    step: "STEP 02",
    title: "Second Check Goal (5%)",
    riskMode: "0.50% to 0.75% risk per trade",
    focus: "Protect your gains",
    description:
      "Lower your trade size after you pass Step 1. A smaller goal means you can take smaller, safer steps.",
    rules: [
      "Cut your trade size by about one-fourth to one-third",
      "Lock in part of your profit early when a trade moves in your favor",
      "Do not give back your gains late in the week",
    ],
  },
  {
    step: "FUNDED",
    title: "Funded Account & Payouts",
    riskMode: "0.25% to 0.50% risk per trade",
    focus: "Keep your account safe",
    description:
      "Focus on keeping your money safe and taking regular payouts. Build a small profit cushion before you raise your trade size.",
    rules: [
      "Never risk more than 1.0% in one day",
      "Take out profits on a regular schedule",
      "Save every trade in EarnRave AI-Analytics to spot mistakes",
    ],
  },
];

const SAFETY_RULES = [
  {
    code: "01 / DAILY LIMIT",
    title: "2% Personal Daily Stop",
    metric: "Extra safety room",
    description:
      "Even if a funding firm allows a 5% loss in one day, EarnRave sets your personal stop at 2%. This helps prevent one bad day from ending your test.",
    icon: ShieldAlert,
  },
  {
    code: "02 / LOSING STREAK ROOM",
    title: "Room for 13+ Losses in a Row",
    metric: "0.75% per trade",
    description:
      "Risking 0.75% per trade gives you room for more than 13 losses before hitting a 10% total loss limit. Smaller risk helps you stay calm.",
    icon: Gauge,
  },
  {
    code: "03 / ACCOUNT RULES",
    title: "Follow Funding Firm Rules",
    metric: "Your own trades only",
    description:
      "Funding firms can close accounts if someone else trades for you or uses banned tools. We give you clear trade sizes and rules so you trade on your own.",
    icon: Lock,
  },
  {
    code: "04 / HABIT CHECK",
    title: "Check Mistakes Before Payout",
    metric: "Clear trade log",
    description:
      "Review your trade size, rule habits, and wins vs. losses before you ask for a payout.",
    icon: Layers,
  },
];

function BorderTrace() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute top-0 h-px w-28 bg-gradient-to-r from-transparent via-[#00D2B1] to-transparent shadow-[0_0_10px_rgba(0,210,177,0.5)]"
        animate={{ x: ["-140px", "calc(100% + 140px)"] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function FundingPage() {
  const [selectedAccount, setSelectedAccount] = useState<AccountOption>(
    ACCOUNT_OPTIONS[2]
  );
  const [riskPct, setRiskPct] = useState<number>(0.75);
  const [rewardMultiple, setRewardMultiple] = useState<number>(3);

  const plan = useMemo(() => {
    const { balance, goalPct, dailyLossPct, maxLossPct } = selectedAccount;

    const riskDollars = balance * (riskPct / 100);
    const goalDollars = balance * (goalPct / 100);
    const dailyLimitDollars = balance * (dailyLossPct / 100);
    const maxLimitDollars = balance * (maxLossPct / 100);

    const winDollars = riskDollars * rewardMultiple;
    const netWinsNeeded = Math.ceil(goalDollars / winDollars);
    const lossesBeforeDailyLimit = Math.floor(dailyLimitDollars / riskDollars);
    const lossesBeforeMaxLimit = Math.floor(maxLimitDollars / riskDollars);

    return {
      riskDollars,
      goalDollars,
      dailyLimitDollars,
      maxLimitDollars,
      winDollars,
      netWinsNeeded,
      lossesBeforeDailyLimit,
      lossesBeforeMaxLimit,
    };
  }, [selectedAccount, riskPct, rewardMultiple]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#080A0A] text-white">
        {/* HERO */}
        <section className="relative px-5 pb-20 pt-36 lg:pb-28 lg:pt-52">
          <div className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-[#00D2B1]/[0.04] blur-[130px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_.92fr]">
              {/* LEFT HERO TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                  EARNRAVE / FUNDING HELP
                </div>

                <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-.07em] sm:text-7xl lg:text-[82px]">
                  Pass with care.
                  <br />
                  <span className="text-neutral-500">Keep your gains.</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
                  Many traders fail funding tests because they trade too big.
                  EarnRave helps you pick safe trade sizes, follow clear loss
                  limits, and protect your account from start to payout.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#calculator"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#00D2B1] px-6 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                  >
                    Try the risk calculator
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="#steps"
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/[0.12] px-6 text-sm text-neutral-300 transition hover:border-[#00D2B1]/40 hover:text-white"
                  >
                    See the 3 steps
                    <ArrowRight size={15} />
                  </a>
                </div>

                <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.07] pt-7">
                  <div>
                    <p className="text-xl font-medium tracking-tight text-white">
                      2.0% Cap
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Daily loss limit
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight text-[#00D2B1]">
                      13+ Trades
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Loss cushion
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight text-white">
                      Your Rules
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Safe trade habits
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT SAMPLE ACCOUNT CARD */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0F0F] p-6 sm:p-8 lg:mt-24"
              >
                <BorderTrace />

                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div>
                    <p className="text-xs font-medium text-white">
                      Sample Account Check
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      Example on a $100,000 account
                    </p>
                  </div>

                  <span className="rounded-md border border-[#00D2B1]/20 bg-[#00D2B1]/[0.06] px-2.5 py-1 text-[10px] font-medium tracking-wider text-[#00D2B1]">
                    ON TRACK
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        Step 1 Profit Goal ($8,000)
                      </span>
                      <span className="font-mono font-medium text-[#00D2B1]">
                        +$5,400 (67.5%)
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[67.5%] rounded-full bg-[#00D2B1]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        Today&apos;s Loss Limit ($5,000 max)
                      </span>
                      <span className="font-mono text-neutral-300">
                        $750 used · $4,250 left
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[15%] rounded-full bg-amber-400/80" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        Total Loss Limit ($10,000 max)
                      </span>
                      <span className="font-mono text-neutral-300">
                        $9,250 safety room left
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[92.5%] rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
                  <div className="rounded-xl border border-white/[0.05] bg-[#090C0B] p-3.5">
                    <p className="text-[10px] tracking-wider text-neutral-500">
                      RISK PER TRADE (0.75%)
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium text-white">
                      $750 per trade
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.05] bg-[#090C0B] p-3.5">
                    <p className="text-[10px] tracking-wider text-neutral-500">
                      LEFT TO REACH GOAL
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium text-[#00D2B1]">
                      About 1.2 good wins
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 01 / INTERACTIVE RISK CALCULATOR */}
        <section
          id="calculator"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#090C0C] px-5 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  01 / RISK CALCULATOR
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] text-white sm:text-5xl">
                  Plan your numbers.
                  <span className="text-neutral-500"> Before you trade.</span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-neutral-400">
                Pick your account size and how much you risk on one trade. See
                how many wins you need and how many losses you can absorb.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              {/* CONTROLS */}
              <div className="rounded-3xl border border-white/[0.07] bg-[#0D1110] p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-medium text-white">
                  <SlidersHorizontal size={15} className="text-[#00D2B1]" />
                  Choose Your Settings
                </div>

                {/* ACCOUNT SIZE */}
                <div className="mt-6">
                  <label className="text-[11px] font-medium tracking-[.14em] text-neutral-500">
                    ACCOUNT SIZE
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {ACCOUNT_OPTIONS.map((option) => {
                      const active = option.id === selectedAccount.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedAccount(option)}
                          className={`rounded-xl border py-3 font-mono text-xs font-medium transition ${
                            active
                              ? "border-[#00D2B1]/50 bg-[#00D2B1]/[0.1] text-[#00D2B1]"
                              : "border-white/[0.07] bg-[#090C0B] text-neutral-400 hover:border-white/[0.15] hover:text-white"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* RISK PER TRADE */}
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium tracking-[.14em] text-neutral-500">
                      RISK ON ONE TRADE (%)
                    </label>
                    <span className="font-mono text-xs font-semibold text-[#00D2B1]">
                      {riskPct.toFixed(2)}% ($
                      {plan.riskDollars.toLocaleString()})
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2.5">
                    {[0.5, 0.75, 1.0, 1.5].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setRiskPct(pct)}
                        className={`rounded-xl border py-2.5 font-mono text-xs transition ${
                          riskPct === pct
                            ? "border-[#00D2B1]/50 bg-[#00D2B1]/[0.1] text-[#00D2B1]"
                            : "border-white/[0.07] bg-[#090C0B] text-neutral-400 hover:border-white/[0.15] hover:text-white"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* GAIN SIZE */}
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium tracking-[.14em] text-neutral-500">
                      TARGET GAIN PER WIN
                    </label>
                    <span className="font-mono text-xs font-semibold text-white">
                      {rewardMultiple}x risk (+$
                      {plan.winDollars.toLocaleString()} per win)
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2.5">
                    {[2, 2.5, 3].map((mult) => (
                      <button
                        key={mult}
                        type="button"
                        onClick={() => setRewardMultiple(mult)}
                        className={`rounded-xl border py-2.5 font-mono text-xs transition ${
                          rewardMultiple === mult
                            ? "border-[#00D2B1]/50 bg-[#00D2B1]/[0.1] text-[#00D2B1]"
                            : "border-white/[0.07] bg-[#090C0B] text-neutral-400 hover:border-white/[0.15] hover:text-white"
                        }`}
                      >
                        {mult}x risk
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-white/[0.05] bg-[#090C0B] p-4 text-xs leading-6 text-neutral-400">
                  Uses common test rules:{" "}
                  <span className="text-neutral-200">
                    {selectedAccount.goalPct}% profit goal
                  </span>
                  ,{" "}
                  <span className="text-neutral-200">
                    {selectedAccount.dailyLossPct}% daily loss limit
                  </span>
                  , and{" "}
                  <span className="text-neutral-200">
                    {selectedAccount.maxLossPct}% total loss limit
                  </span>
                  .
                </div>
              </div>

              {/* RESULTS */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#00D2B1]/20 bg-[#0D1211] p-6 sm:p-8">
                <BorderTrace />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[.18em] text-[#00D2B1]">
                      YOUR NUMBERS
                    </span>
                    <Calculator size={16} className="text-[#00D2B1]" />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/[0.06] bg-[#090C0B] p-5">
                      <p className="text-xs text-neutral-500">
                        Wins Needed for Step 1
                      </p>
                      <p className="mt-2 font-mono text-3xl font-semibold text-[#00D2B1]">
                        {plan.netWinsNeeded} wins
                      </p>
                      <p className="mt-1.5 text-[11px] text-neutral-500">
                        Goal: +${plan.goalDollars.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#090C0B] p-5">
                      <p className="text-xs text-neutral-500">
                        Total Loss Cushion
                      </p>
                      <p className="mt-2 font-mono text-3xl font-semibold text-white">
                        {plan.lossesBeforeMaxLimit} losses
                      </p>
                      <p className="mt-1.5 text-[11px] text-neutral-500">
                        Before ${plan.maxLimitDollars.toLocaleString()} limit
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#090C0B] p-5">
                      <p className="text-xs text-neutral-500">
                        Daily Loss Cushion
                      </p>
                      <p className="mt-2 font-mono text-2xl font-semibold text-white">
                        {plan.lossesBeforeDailyLimit} losses
                      </p>
                      <p className="mt-1.5 text-[11px] text-neutral-500">
                        ${plan.dailyLimitDollars.toLocaleString()} daily limit
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-[#090C0B] p-5">
                      <p className="text-xs text-neutral-500">
                        Profit on One Win
                      </p>
                      <p className="mt-2 font-mono text-2xl font-semibold text-[#00D2B1]">
                        +${plan.winDollars.toLocaleString()}
                      </p>
                      <p className="mt-1.5 text-[11px] text-neutral-500">
                        At {rewardMultiple}x your trade risk
                      </p>
                    </div>
                  </div>
                </div>

                {/* SIMPLE TIP */}
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-[#090C0B]/90 p-4">
                  {riskPct > 1 ? (
                    <>
                      <AlertTriangle
                        size={17}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <p className="text-xs leading-6 text-neutral-300">
                        <span className="font-medium text-amber-300">
                          High Risk Tip:
                        </span>{" "}
                        At {riskPct}% per trade, {plan.lossesBeforeDailyLimit}{" "}
                        losses in a row hits your daily limit. Consider{" "}
                        <span className="text-[#00D2B1]">0.50% to 0.75%</span>{" "}
                        to give yourself more room.
                      </p>
                    </>
                  ) : (
                    <>
                      <ShieldCheck
                        size={17}
                        className="mt-0.5 shrink-0 text-[#00D2B1]"
                      />
                      <p className="text-xs leading-6 text-neutral-300">
                        <span className="font-medium text-[#00D2B1]">
                          Balanced Risk Tip:
                        </span>{" "}
                        You have room for {plan.lossesBeforeMaxLimit} losses
                        before the total limit, and you need{" "}
                        {plan.netWinsNeeded} net wins at {rewardMultiple}x risk
                        to hit Step 1.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / THREE STEPS */}
        <section id="steps" className="scroll-mt-24 px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                02 / THE 3 STAGES
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] text-white sm:text-5xl">
                Three stages.
                <span className="text-neutral-500"> Clear rules for each.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-400">
                Do not use the exact same trade size in every stage. Adjust your
                risk as you move from passing a test to keeping profits.
              </p>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {STAGES.map((stage, index) => (
                <div
                  key={stage.step}
                  className={`relative flex flex-col justify-between rounded-3xl border p-7 sm:p-8 ${
                    index === 2
                      ? "border-[#00D2B1]/25 bg-[#0D1312]"
                      : "border-white/[0.07] bg-[#0C0F0F]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                        {stage.step}
                      </span>
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-neutral-300">
                        {stage.riskMode}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-medium tracking-tight text-white">
                      {stage.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                      {stage.description}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6 text-xs text-neutral-300">
                      {stage.rules.map((rule) => (
                        <li key={rule} className="flex items-start gap-2.5">
                          <Check
                            size={14}
                            className="mt-0.5 shrink-0 text-[#00D2B1]"
                          />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-white/[0.05] pt-4 text-[11px]">
                    <span className="text-neutral-500">Main goal</span>
                    <span className="font-medium text-white">
                      {stage.focus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 / SAFETY RULES */}
        <section className="border-y border-white/[0.06] bg-[#090C0C] px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  03 / SAFETY HABITS
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] text-white sm:text-5xl">
                  Built to handle rough days.
                  <span className="text-neutral-500"> Made to last.</span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-neutral-400">
                Every habit here helps you follow funding firm rules and stay in
                control when markets move fast.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {SAFETY_RULES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.code}
                    className="rounded-3xl border border-white/[0.07] bg-[#0D1110] p-7 sm:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[.18em] text-neutral-500">
                        {item.code}
                      </span>
                      <span className="rounded-full border border-[#00D2B1]/15 bg-[#00D2B1]/[0.05] px-3 py-1 text-[10px] font-medium text-[#00D2B1]">
                        {item.metric}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02]">
                        <Icon size={18} className="text-[#00D2B1]" />
                      </div>
                      <h3 className="text-xl font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 04 / GET STARTED */}
        <section className="px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0C100F] px-7 py-14 sm:px-14 sm:py-20">
              <BorderTrace />

              <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00D2B1]/15 bg-[#00D2B1]/[0.05] px-3 py-1 text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                    <Target size={13} />
                    FUNDING HELP
                  </div>

                  <h2 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-.055em] text-white sm:text-5xl">
                    Ready to start your next funding test?
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
                    Get trade ideas sized for funding rules, news alerts, weekly
                    market updates, and early access to EarnRave AI-Analytics.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="mailto:hello@earnrave.com?subject=EARNRAVE%20Funding%20Help"
                      className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#00D2B1] px-6 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_28px_rgba(0,210,177,0.2)]"
                    >
                      Join Funding Help
                      <ArrowUpRight size={16} />
                    </a>

                    <a
                      href="/signals"
                      className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.02] px-6 text-sm font-medium text-neutral-300 transition hover:border-[#00D2B1]/35 hover:text-white"
                    >
                      See Signals
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-[#090C0B] p-6 sm:p-7">
                  <p className="text-[10px] font-medium tracking-[.18em] text-neutral-500">
                    WHAT YOU GET
                  </p>

                  <ul className="mt-5 space-y-3.5 text-sm text-neutral-300">
                    {[
                      "Trade size guides for Step 1, Step 2, and funded accounts",
                      "Trade ideas with clear stop and target levels",
                      "Alerts for big news days to watch out for",
                      "Weekly market updates in Education",
                      "Early access to EarnRave AI-Analytics",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          size={15}
                          className="mt-1 shrink-0 text-[#00D2B1]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}