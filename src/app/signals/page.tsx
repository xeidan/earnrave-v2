"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Calculator,
  Check,
  Clock,
  Crosshair,
  Layers,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";

type MarketType = "All" | "Forex" | "Crypto" | "Gold";

type TradeIdea = {
  id: string;
  pair: string;
  market: Exclude<MarketType, "All">;
  action: "BUY" | "SELL";
  entry: string;
  stopLoss: string;
  takeProfit: string;
  stopSteps: number;
  valuePerUnit: number;
  chartView: string;
  bestTime: string;
  rewardText: string;
  status: "OPEN" | "RUNNING" | "PART PROFIT";
  postedAgo: string;
  simpleReason: string;
  stopRule: string;
};

const TRADE_IDEAS: TradeIdea[] = [
  {
    id: "SIG-409",
    pair: "EUR/USD",
    market: "Forex",
    action: "BUY",
    entry: "1.08420",
    stopLoss: "1.08120",
    takeProfit: "1.09320",
    stopSteps: 30,
    valuePerUnit: 10,
    chartView: "4-Hour & 15-Min",
    bestTime: "London hours",
    rewardText: "3x your risk",
    status: "OPEN",
    postedAgo: "18m ago",
    simpleReason:
      "The price pulled back to a level where buyers stepped in before. We look for the price to move back up toward the next high area.",
    stopRule: "Exit if the price closes below 1.08120 so a small loss stays small.",
  },
  {
    id: "SIG-408",
    pair: "XAU/USD (GOLD)",
    market: "Gold",
    action: "BUY",
    entry: "2,642.50",
    stopLoss: "2,627.50",
    takeProfit: "2,687.50",
    stopSteps: 150,
    valuePerUnit: 10,
    chartView: "4-Hour & 1-Hour",
    bestTime: "New York open",
    rewardText: "3x your risk",
    status: "RUNNING",
    postedAgo: "1h ago",
    simpleReason:
      "Gold dipped below a recent low and pushed strongly upward. We look to buy on a small pullback in the new upward move.",
    stopRule: "Stop loss sits below the recent low at 2,627.50.",
  },
  {
    id: "SIG-407",
    pair: "BTC/USDT",
    market: "Crypto",
    action: "SELL",
    entry: "91,450",
    stopLoss: "92,650",
    takeProfit: "87,850",
    stopSteps: 1200,
    valuePerUnit: 1,
    chartView: "4-Hour",
    bestTime: "Busy US hours",
    rewardText: "3x your risk",
    status: "OPEN",
    postedAgo: "3h ago",
    simpleReason:
      "Bitcoin spiked above its recent range and stalled. We look for a move back down toward the middle of the range.",
    stopRule: "Stop loss sits above 92,650 if buyers keep pushing higher.",
  },
  {
    id: "SIG-406",
    pair: "GBP/USD",
    market: "Forex",
    action: "SELL",
    entry: "1.27150",
    stopLoss: "1.27450",
    takeProfit: "1.26250",
    stopSteps: 30,
    valuePerUnit: 10,
    chartView: "1-Hour",
    bestTime: "London hours",
    rewardText: "3x your risk",
    status: "PART PROFIT",
    postedAgo: "5h ago",
    simpleReason:
      "Price turned downward after failing to hold a higher level. Part of the profit is already locked in and the stop is moved to safety.",
    stopRule: "Stop loss is now at entry so the trade cannot lose money.",
  },
];

const PAST_TRADES = [
  {
    id: "SIG-405",
    pair: "EUR/USD",
    market: "Forex",
    action: "BUY",
    goalLabel: "3x risk",
    resultLabel: "+2.4x gain",
    date: "Nov 23",
    won: true,
  },
  {
    id: "SIG-404",
    pair: "SOL/USDT",
    market: "Crypto",
    action: "BUY",
    goalLabel: "2.8x risk",
    resultLabel: "+2.8x gain",
    date: "Nov 22",
    won: true,
  },
  {
    id: "SIG-403",
    pair: "XAU/USD",
    market: "Gold",
    action: "SELL",
    goalLabel: "3x risk",
    resultLabel: "-1.0x loss",
    date: "Nov 21",
    won: false,
  },
  {
    id: "SIG-402",
    pair: "USD/JPY",
    market: "Forex",
    action: "SELL",
    goalLabel: "3.2x risk",
    resultLabel: "+3.2x gain",
    date: "Nov 20",
    won: true,
  },
  {
    id: "SIG-401",
    pair: "GBP/USD",
    market: "Forex",
    action: "BUY",
    goalLabel: "2.5x risk",
    resultLabel: "+1.9x gain",
    date: "Nov 19",
    won: true,
  },
];

const PROGRESS_POINTS = [
  0, 2.1, 1.1, 3.8, 6.2, 5.2, 8.4, 11.2, 10.2, 14.0, 17.5, 21.8, 26.4, 32.8,
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

function ProgressChart() {
  const maxVal = Math.max(...PROGRESS_POINTS);
  const points = PROGRESS_POINTS.map((val, idx) => {
    const x = (idx / (PROGRESS_POINTS.length - 1)) * 1000;
    const y = 215 - (val / maxVal) * 185;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 1000 230"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="signalsCurveFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00D2B1" stopOpacity=".18" />
          <stop offset="100%" stopColor="#00D2B1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[40, 95, 150, 205].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="1000"
          y2={y}
          stroke="rgba(255,255,255,.05)"
          strokeDasharray="4 6"
        />
      ))}

      <polygon points={`0,230 ${points} 1000,230`} fill="url(#signalsCurveFill)" />

      <polyline
        points={points}
        fill="none"
        stroke="#00D2B1"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SignalsPage() {
  const [selectedMarket, setSelectedMarket] = useState<MarketType>("All");
  const [selectedIdea, setSelectedIdea] = useState<TradeIdea | null>(null);
  const [accountBalance, setAccountBalance] = useState<string>("5000");
  const [riskPercent, setRiskPercent] = useState<string>("1");

  const visibleIdeas = useMemo(() => {
    if (selectedMarket === "All") return TRADE_IDEAS;
    return TRADE_IDEAS.filter((item) => item.market === selectedMarket);
  }, [selectedMarket]);

  const sizePlan = useMemo(() => {
    const balance = Math.max(0, parseFloat(accountBalance) || 0);
    const riskPct = Math.max(0, parseFloat(riskPercent) || 0);
    const riskMoney = balance * (riskPct / 100);
    const goalMoney = riskMoney * 3;

    if (!selectedIdea || selectedIdea.stopSteps <= 0) {
      return { riskMoney, goalMoney, tradeSize: "—" };
    }

    const rawSize =
      riskMoney / (selectedIdea.stopSteps * selectedIdea.valuePerUnit);

    const tradeSize =
      selectedIdea.market === "Crypto"
        ? `${rawSize.toFixed(3)} BTC`
        : `${rawSize.toFixed(2)} lots`;

    return { riskMoney, goalMoney, tradeSize };
  }, [accountBalance, riskPercent, selectedIdea]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,177,0.06),transparent_42%),#080A0A] text-white">
        {/* HERO */}
        <section className="relative px-5 pb-20 pt-36 lg:pb-28 lg:pt-52">
          <div className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-[#00D2B1]/[0.04] blur-[130px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]">
              {/* LEFT HERO TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                  EARNRAVE / SIGNALS
                </div>

                <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-.07em] sm:text-7xl lg:text-[82px]">
                  Clear trade ideas.
                  <br />
                  <span className="text-neutral-500">Set risk first.</span>
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-8 text-neutral-400 sm:text-base">
                  See where we plan to enter, where we exit if wrong, and where
                  we take profit. Everything is explained in plain words so you
                  do not have to guess.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#live-ideas"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#00D2B1] px-6 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                  >
                    See trade ideas
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="#pricing"
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/[0.12] px-6 text-sm text-neutral-300 transition hover:border-[#00D2B1]/40 hover:text-white"
                  >
                    $20 / month plan
                    <ArrowRight size={15} />
                  </a>
                </div>

                <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.07] pt-7">
                  <div>
                    <p className="text-xl font-medium tracking-tight text-white">
                      $20 / mo
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Simple monthly plan
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight text-[#00D2B1]">
                      3x Goal
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Aim to win more than risk
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight text-white">
                      Stop Set
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Loss limit on every trade
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT SAMPLE LIST CARD */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0F0F] p-6 sm:p-7"
              >
                <BorderTrace />

                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#00D2B1]" />
                    <span className="text-xs font-medium text-white">
                      Sample Trade Ideas
                    </span>
                  </div>
                  <span className="rounded-md border border-[#00D2B1]/15 bg-[#00D2B1]/[0.06] px-2.5 py-1 text-[10px] font-medium tracking-wider text-[#00D2B1]">
                    PREVIEW
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {TRADE_IDEAS.slice(0, 3).map((idea) => {
                    const isBuy = idea.action === "BUY";
                    return (
                      <button
                        key={idea.id}
                        type="button"
                        onClick={() => setSelectedIdea(idea)}
                        className="group flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-[#101414] p-4 text-left transition hover:border-[#00D2B1]/30"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-medium text-white">
                              {idea.pair}
                            </span>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                                isBuy
                                  ? "bg-[#00D2B1]/10 text-[#00D2B1]"
                                  : "bg-red-400/10 text-red-400"
                              }`}
                            >
                              {idea.action}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-neutral-500">
                            Start {idea.entry} · {idea.rewardText} ·{" "}
                            {idea.bestTime}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-neutral-400 transition group-hover:text-[#00D2B1]">
                          <span className="hidden sm:inline">Open</span>
                          <ArrowUpRight size={15} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.05] bg-[#090C0B] p-4">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-[#00D2B1]"
                  />
                  <p className="text-xs leading-5 text-neutral-400">
                    Each idea shows a stop-loss price, a plain reason why, and a
                    calculator to help pick a safe trade size.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 01 / TRADE IDEAS */}
        <section
          id="live-ideas"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#090C0C] px-5 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  01 / TRADE IDEAS
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] text-white sm:text-5xl">
                  Simple plans.
                  <span className="text-neutral-500"> No guessing.</span>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(["All", "Forex", "Crypto", "Gold"] as MarketType[]).map(
                  (market) => (
                    <button
                      key={market}
                      type="button"
                      onClick={() => setSelectedMarket(market)}
                      className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
                        selectedMarket === market
                          ? "border-[#00D2B1]/40 bg-[#00D2B1]/[0.08] text-[#00D2B1]"
                          : "border-white/[0.07] bg-[#0D1110] text-neutral-400 hover:border-white/[0.15] hover:text-white"
                      }`}
                    >
                      {market}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {visibleIdeas.map((idea) => {
                const isBuy = idea.action === "BUY";

                return (
                  <div
                    key={idea.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0D1110] p-6 transition-all duration-200 hover:border-[#00D2B1]/25 sm:p-7"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-neutral-600">
                            {idea.id}
                          </span>
                          <h3 className="text-xl font-medium tracking-tight text-white">
                            {idea.pair}
                          </h3>
                          <span
                            className={`rounded-md px-2.5 py-0.5 text-[10px] font-semibold tracking-wider ${
                              isBuy
                                ? "bg-[#00D2B1]/10 text-[#00D2B1]"
                                : "bg-red-400/10 text-red-400"
                            }`}
                          >
                            {idea.action}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                            <Clock size={12} />
                            {idea.postedAgo}
                          </span>
                          <span className="flex items-center gap-1.5 rounded-full border border-[#00D2B1]/20 bg-[#00D2B1]/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-[#00D2B1]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                            {idea.status}
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-neutral-400">
                        {idea.simpleReason}
                      </p>

                      <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-white/[0.05] bg-[#090C0B] p-4">
                        <div>
                          <p className="text-[10px] tracking-wider text-neutral-600">
                            START PRICE
                          </p>
                          <p className="mt-1.5 font-mono text-xs font-medium text-white sm:text-sm">
                            {idea.entry}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-wider text-neutral-600">
                            STOP LOSS
                          </p>
                          <p className="mt-1.5 font-mono text-xs font-medium text-red-400 sm:text-sm">
                            {idea.stopLoss}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-wider text-neutral-600">
                            PROFIT GOAL
                          </p>
                          <p className="mt-1.5 font-mono text-xs font-medium text-[#00D2B1] sm:text-sm">
                            {idea.takeProfit}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span>{idea.chartView}</span>
                        <span>·</span>
                        <span>{idea.bestTime}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedIdea(idea)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white transition hover:border-[#00D2B1]/40 hover:bg-[#00D2B1] hover:text-[#04110E]"
                      >
                        <Calculator size={13} />
                        Size &amp; details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 02 / HOW YOU PLACE TRADES + BOT COMING SOON */}
        <section className="px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_.85fr] lg:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  02 / HOW YOU TRADE
                </p>
                <h2 className="mt-4 text-3xl font-medium leading-[1.1] tracking-[-.05em] text-white sm:text-5xl">
                  Place trades yourself today.
                  <span className="block text-neutral-500">
                    Trading bot coming soon.
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-neutral-400">
                Start by placing trades yourself in your trading app. We are
                also building an optional trading bot to help place trades for
                you with safety limits you set.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#00D2B1]/40 bg-[#0D1312] p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00D2B1]/20 bg-[#00D2B1]/[0.06]">
                    <Crosshair size={18} className="text-[#00D2B1]" />
                  </div>
                  <span className="rounded-full border border-[#00D2B1]/20 bg-[#00D2B1]/[0.08] px-3 py-1 text-[10px] font-medium text-[#00D2B1]">
                    AVAILABLE NOW
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-medium tracking-tight text-white">
                  Do It Yourself (Manual)
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">
                  Get a clear alert with the start price, stop-loss, and profit
                  goal. You decide if you want to take the trade and enter it on
                  your own account.
                </p>

                <div className="mt-7 flex items-center gap-2 text-xs font-medium text-[#00D2B1]">
                  <Check size={14} /> Included with Signals
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#0C0F0F] p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <Bot size={18} className="text-[#00D2B1]" />
                  </div>
                  <span className="rounded-full border border-[#00D2B1]/20 bg-[#00D2B1]/[0.06] px-3 py-1 text-[10px] font-medium text-[#00D2B1]">
                    COMING SOON
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-medium tracking-tight text-white">
                  Auto Trading Bot — Coming Soon
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">
                  Soon, you will be able to connect a supported account and let
                  our bot place matching trades automatically and only up to the
                  daily loss limit you set.
                </p>

                <div className="mt-7 flex items-center gap-2 text-xs font-medium text-neutral-400">
                  In development · You stay in control of your risk limits
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 / PAST RESULTS */}
        <section
          id="results"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#090C0C] px-5 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  03 / PAST RESULTS
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] text-white sm:text-5xl">
                  Wins and losses.
                  <span className="text-neutral-500"> Shown plainly.</span>
                </h2>
              </div>

              <span className="rounded-lg border border-white/[0.08] bg-[#0D1110] px-3.5 py-2 text-[11px] text-neutral-400">
                Sample past trades · Based on 1x risk per trade
              </span>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                {
                  label: "Total Net Gain",
                  value: "+32.8x",
                  sub: "If risking 1x per trade",
                  accent: true,
                },
                {
                  label: "Average Per Trade",
                  value: "+0.84x",
                  sub: "Average result across trades",
                  accent: true,
                },
                {
                  label: "Winning Trades",
                  value: "61.5%",
                  sub: "Out of 146 past trades",
                  accent: false,
                },
                {
                  label: "Biggest Dip",
                  value: "-3.2x",
                  sub: "Largest drop from a peak",
                  accent: false,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.07] bg-[#0D1110] p-6"
                >
                  <p className="text-xs text-neutral-500">{stat.label}</p>
                  <p
                    className={`mt-3 text-3xl font-medium tracking-[-.04em] ${
                      stat.accent ? "text-[#00D2B1]" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-neutral-600">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0D1110] p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Sample Growth Line
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Shows how small wins and small losses add up over time
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-[#00D2B1]/15 bg-[#00D2B1]/[0.06] px-2.5 py-1 text-xs text-[#00D2B1]">
                    <TrendingUp size={13} />
                    +32.8x
                  </div>
                </div>

                <div className="mt-8 h-[220px]">
                  <ProgressChart />
                </div>

                <div className="mt-4 flex justify-between text-[10px] tracking-wider text-neutral-600">
                  <span>TRADE 1</span>
                  <span>TRADE 50</span>
                  <span>TRADE 100</span>
                  <span>TRADE 146</span>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0D1110] p-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Recent Finished Trades
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Includes both wins and losses
                      </p>
                    </div>
                    <Layers size={15} className="text-neutral-500" />
                  </div>

                  <div className="mt-2 divide-y divide-white/[0.05]">
                    {PAST_TRADES.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-3.5 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">
                              {item.pair}
                            </span>
                            <span
                              className={`text-[10px] ${
                                item.action === "BUY"
                                  ? "text-[#00D2B1]"
                                  : "text-red-400"
                              }`}
                            >
                              {item.action}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-neutral-600">
                            {item.date} · Goal {item.goalLabel}
                          </p>
                        </div>

                        <span
                          className={`rounded-md px-2.5 py-1 font-mono font-semibold ${
                            item.won
                              ? "bg-[#00D2B1]/10 text-[#00D2B1]"
                              : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {item.resultLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-4 border-t border-white/[0.05] pt-4 text-[11px] leading-5 text-neutral-600">
                  Trading carries risk. Past trades are examples and do not mean
                  future trades will have the same results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 / $20 PER MONTH PLAN */}
        <section id="pricing" className="scroll-mt-24 px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                04 / PRICING
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] text-white sm:text-5xl">
                Signals for $20 a month.
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-400">
                One clear price for trade ideas, simple notes, and a trade size
                calculator.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
              {/* SIGNALS $20/MO */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#00D2B1]/30 bg-[#0D1312] p-8 sm:p-10">
                <BorderTrace />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[.18em] text-[#00D2B1]">
                      SIGNALS PLAN
                    </span>
                    <span className="rounded-full bg-[#00D2B1]/15 px-3 py-1 text-xs font-semibold text-[#00D2B1]">
                      $20 / month
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-medium tracking-tight text-white">
                    Signals
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Get trade ideas for Forex, Crypto, and Gold with clear stop
                    and profit levels.
                  </p>

                  <ul className="mt-8 space-y-4 border-t border-white/[0.07] pt-7 text-sm text-neutral-200">
                    {[
                      "Trade ideas with start, stop-loss, and profit levels",
                      "Plain reasons explaining each trade idea",
                      "Trade size calculator to help you risk safely",
                      "Early access to the trading bot when it launches",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check size={15} className="shrink-0 text-[#00D2B1]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="mailto:hello@earnrave.com?subject=EARNRAVE%20Signals%20(%2420%2Fmonth)"
                  className="mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_28px_rgba(0,210,177,0.2)]"
                >
                  Start Signals — $20/mo
                  <ArrowUpRight size={15} />
                </a>
              </div>

              {/* BOT COMING SOON CARD */}
              <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0C0F0F] p-8 sm:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[.18em] text-neutral-500">
                      AUTOMATION
                    </span>
                    <span className="rounded-full border border-[#00D2B1]/20 bg-[#00D2B1]/[0.06] px-3 py-1 text-[10px] font-medium text-[#00D2B1]">
                      COMING SOON
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-medium tracking-tight text-white">
                    Trading Bot
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    We are building a bot that can place trades for you based on
                    your own safety rules.
                  </p>

                  <ul className="mt-8 space-y-4 border-t border-white/[0.06] pt-7 text-sm text-neutral-300">
                    {[
                      "Set your own max risk per trade",
                      "Set a daily stop so losses stay capped",
                      "Turn auto-trading on or off anytime",
                      "Signals members get notified first when ready",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check size={15} className="shrink-0 text-[#00D2B1]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/education"
                  className="mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] text-sm font-medium text-white transition hover:border-[#00D2B1]/40 hover:bg-white/[0.06]"
                >
                  Learn basics in Education first
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE-OUT DETAILS & TRADE SIZE CALCULATOR */}
        <AnimatePresence>
          {selectedIdea && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdea(null)}
              className="fixed inset-0 z-[100] flex items-center justify-end bg-black/75 backdrop-blur-sm"
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto border-l border-white/[0.1] bg-[#0B0E0E] p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-neutral-500">
                          {selectedIdea.id}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                            selectedIdea.action === "BUY"
                              ? "bg-[#00D2B1]/10 text-[#00D2B1]"
                              : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {selectedIdea.action}
                        </span>
                      </div>
                      <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">
                        {selectedIdea.pair} Details
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedIdea(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-neutral-400 transition hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/[0.06] bg-[#101414] p-3.5">
                      <p className="text-[10px] text-neutral-500">START</p>
                      <p className="mt-1.5 font-mono text-sm font-semibold text-white">
                        {selectedIdea.entry}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-[#101414] p-3.5">
                      <p className="text-[10px] text-neutral-500">STOP LOSS</p>
                      <p className="mt-1.5 font-mono text-sm font-semibold text-red-400">
                        {selectedIdea.stopLoss}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-[#101414] p-3.5">
                      <p className="text-[10px] text-neutral-500">PROFIT GOAL</p>
                      <p className="mt-1.5 font-mono text-sm font-semibold text-[#00D2B1]">
                        {selectedIdea.takeProfit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 rounded-2xl border border-white/[0.06] bg-[#101414] p-5">
                    <div>
                      <p className="text-[10px] font-medium tracking-[.15em] text-[#00D2B1]">
                        WHY THIS TRADE
                      </p>
                      <p className="mt-2 text-xs leading-6 text-neutral-300">
                        {selectedIdea.simpleReason}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.06] pt-3.5">
                      <p className="text-[10px] font-medium tracking-[.15em] text-neutral-500">
                        EXIT IF WRONG
                      </p>
                      <p className="mt-1.5 text-xs text-neutral-400">
                        {selectedIdea.stopRule}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[#00D2B1]/20 bg-[#00D2B1]/[0.03] p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#00D2B1]">
                      <Calculator size={15} />
                      Trade Size Helper
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] tracking-wider text-neutral-500">
                          YOUR ACCOUNT ($)
                        </label>
                        <input
                          type="number"
                          value={accountBalance}
                          onChange={(e) => setAccountBalance(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-white/[0.1] bg-[#0A0D0D] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#00D2B1]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-wider text-neutral-500">
                          RISK PER TRADE (%)
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          value={riskPercent}
                          onChange={(e) => setRiskPercent(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-white/[0.1] bg-[#0A0D0D] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[#00D2B1]/50"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4 text-xs">
                      <div>
                        <p className="text-[10px] text-neutral-500">
                          MAX LOSS ($)
                        </p>
                        <p className="mt-1 font-mono font-semibold text-white">
                          $
                          {sizePlan.riskMoney.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500">
                          TRADE SIZE
                        </p>
                        <p className="mt-1 font-mono font-semibold text-[#00D2B1]">
                          {sizePlan.tradeSize}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500">
                          3X GAIN ($)
                        </p>
                        <p className="mt-1 font-mono font-semibold text-[#00D2B1]">
                          +$
                          {sizePlan.goalMoney.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-5">
                  <p className="text-[11px] leading-5 text-neutral-500">
                    For learning and planning only. Always check your account
                    balance and risk rules before placing a trade.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}