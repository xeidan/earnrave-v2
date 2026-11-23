
"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Brain,
  ChartNoAxesCombined,
  ShieldCheck,
  Target,
  Activity,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronDown,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const metrics = [
  { label: "Net P&L", value: "+$2,840.50", change: "+12.8%", positive: true },
  { label: "Win rate", value: "58.4%", change: "+4.2%", positive: true },
  { label: "Profit factor", value: "1.82", change: "+0.24", positive: true },
  { label: "Total trades", value: "126", change: "This month", positive: true },
];

const equityData = [25, 32, 28, 39, 35, 44, 41, 50, 46, 57, 53, 63, 59, 69, 65, 77, 72, 84, 81, 93];

const insights = [
  {
    type: "EDGE",
    title: "Your EUR/USD setups are outperforming.",
    description:
      "Your win rate is 14% higher during the London session compared to other sessions.",
    stat: "+14%",
    positive: true,
  },
  {
    type: "RISK",
    title: "Your losses are becoming larger.",
    description:
      "Average losing trades increased this month. Your largest losses occur when risk exceeds your planned amount.",
    stat: "−22%",
    positive: false,
  },
  {
    type: "DISCIPLINE",
    title: "You trade better after stepping away.",
    description:
      "Your performance improves when you leave at least 30 minutes between consecutive trades.",
    stat: "+18%",
    positive: true,
  },
];

const pairs = [
  { pair: "EUR/USD", trades: 42, win: 64.3, pnl: 1280 },
  { pair: "GBP/USD", trades: 36, win: 55.6, pnl: 840 },
  { pair: "XAU/USD", trades: 28, win: 46.4, pnl: -320 },
  { pair: "USD/JPY", trades: 20, win: 60.0, pnl: 1040 },
];

function EquityChart() {
  const points = equityData
    .map((value, index) => {
      const x = (index / (equityData.length - 1)) * 1000;
      const y = 220 - value * 1.85;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 1000 250"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="equityFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00D2B1" stopOpacity=".16" />
          <stop offset="100%" stopColor="#00D2B1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[45, 100, 155, 210].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="1000"
          y2={y}
          stroke="rgba(255,255,255,.055)"
          strokeDasharray="4 6"
        />
      ))}

      <polygon points={`0,250 ${points} 1000,250`} fill="url(#equityFill)" />

      <polyline
        points={points}
        fill="none"
        stroke="#00D2B1"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MetricCard({
  label,
  value,
  change,
  positive,
}: (typeof metrics)[number]) {
  return (
    <div className="border-b border-white/[0.07] pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-6">
      <p className="text-[12px] text-neutral-500">{label}</p>

      <div className="mt-3 flex flex-wrap items-end gap-2">
        <span className="text-[26px] font-medium tracking-[-.055em] text-white">
          {value}
        </span>

        <span
          className={`mb-1 text-xs ${
            positive ? "text-[#00D2B1]" : "text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#080A0A] text-white">
        {/* HERO */}
        <section className="relative px-5 pb-12 pt-32 sm:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-end gap-8 md:grid-cols-[1.15fr_.85fr]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.16em] text-[#00D2B1]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                  AI-POWERED TRADING ANALYTICS
                </div>

                <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.08] tracking-[-.065em] sm:text-6xl lg:text-[72px]">
                  Trade your edge.
                  <br />
                  <span className="text-neutral-500">Build Mastery.</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
                  Find your edge. Understand your mistakes. Make better trading
                  decisions with performance analytics and AI that goes beyond the
                  numbers.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#analytics"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#00D2B1] px-5 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                  >
                    Explore analytics
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="#intelligence"
                    className="inline-flex h-11 items-center gap-2 text-sm text-neutral-300 transition hover:text-white"
                  >
                    Discover AI insights
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="pb-2 md:pl-12"
              >
                <div className="border-l border-white/10 pl-5">
                  <p className="text-xs tracking-wide text-neutral-500">
                    BETTER TRADING STARTS WITH
                  </p>

                  <div className="mt-4 space-y-3">
                    {[
                      ["01", "Finding your edge"],
                      ["02", "Managing your risk"],
                      ["03", "Improving discipline"],
                      ["04", "Learning from feedback"],
                    ].map(([num, label]) => (
                      <div key={num} className="flex items-center gap-4">
                        <span className="text-[10px] text-neutral-700">
                          {num}
                        </span>
                        <span className="text-sm text-neutral-300">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ANALYTICS PRODUCT */}
        <section id="analytics" className="px-4 pb-20 sm:px-5">
          <div className="mx-auto max-w-7xl">
            {/* Dashboard frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0F0F]"
            >
              {/* Dashboard header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-7">
                <div>
                  <p className="text-[10px] tracking-[.15em] text-[#00D2B1]">
                    EARNRAVE / AI-ANALYTICS
                  </p>
                  <h2 className="mt-1 text-lg font-medium tracking-tight">
                    Performance overview
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex h-9 items-center gap-2 rounded-md border border-white/[0.09] px-3 text-xs text-neutral-400">
                    This month
                    <ChevronDown size={13} />
                  </button>

                  <button className="flex h-9 items-center gap-2 rounded-md bg-[#00D2B1] px-3 text-xs font-medium text-[#04110E]">
                    <ArrowUpRight size={14} />
                    Import trades
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-5 px-5 py-6 sm:grid-cols-4 sm:gap-0 sm:px-7">
                {metrics.map((metric, index) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              {/* Chart + performance */}
              <div className="grid border-t border-white/[0.07] lg:grid-cols-[1.65fr_1fr]">
                <div className="border-b border-white/[0.07] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Account growth</p>
                      <p className="mt-2 text-2xl font-medium tracking-tight">
                        +$2,840.50
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-md border border-[#00D2B1]/10 bg-[#00D2B1]/[0.05] px-2 py-1 text-xs text-[#00D2B1]">
                      <TrendingUp size={13} />
                      12.8%
                    </div>
                  </div>

                  <div className="mt-8 h-[220px]">
                    <EquityChart />
                  </div>

                  <div className="mt-4 flex justify-between text-[10px] text-neutral-600">
                    <span>01 NOV</span>
                    <span>07 NOV</span>
                    <span>14 NOV</span>
                    <span>21 NOV</span>
                    <span>30 NOV</span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">Trade distribution</p>
                    <span className="text-[10px] text-neutral-600">126 trades</span>
                  </div>

                  <div className="mt-6 flex items-center gap-5">
                    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "conic-gradient(#00D2B1 0deg 210deg, #F87171 210deg 360deg)",
                        }}
                      />
                      <div className="absolute inset-[9px] rounded-full bg-[#0C0F0F]" />
                      <div className="relative text-center">
                        <p className="text-2xl font-medium">58.4%</p>
                        <p className="text-[10px] text-neutral-500">Win rate</p>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <span className="h-2 w-2 rounded-full bg-[#00D2B1]" />
                          Winners
                        </div>
                        <p className="mt-1 text-white">74 trades</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          Losers
                        </div>
                        <p className="mt-1 text-white">52 trades</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-white/[0.07] pt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Average R:R</span>
                      <span className="text-white">1 : 2.4</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Largest win</span>
                      <span className="text-[#00D2B1]">+$420.00</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Largest loss</span>
                      <span className="text-red-400">−$180.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pair performance */}
              <div className="border-t border-white/[0.07] p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Performance by market</h3>
                    <p className="mt-1 text-xs text-neutral-600">
                      Understand where you perform best
                    </p>
                  </div>

                  <a
                    href="#intelligence"
                    className="text-xs text-neutral-500 transition hover:text-[#00D2B1]"
                  >
                    View analysis <ArrowRight size={12} className="ml-1 inline" />
                  </a>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-xs">
                    <thead className="text-[10px] uppercase tracking-wider text-neutral-600">
                      <tr>
                        <th className="pb-3 font-medium">Market</th>
                        <th className="pb-3 font-medium">Trades</th>
                        <th className="pb-3 font-medium">Win rate</th>
                        <th className="pb-3 font-medium">Net P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pairs.map((pair) => (
                        <tr
                          key={pair.pair}
                          className="border-t border-white/[0.05]"
                        >
                          <td className="py-3.5 font-medium text-neutral-300">
                            {pair.pair}
                          </td>
                          <td className="py-3.5 text-neutral-500">
                            {pair.trades}
                          </td>
                          <td className="py-3.5 text-neutral-500">
                            {pair.win}%
                          </td>
                          <td
                            className={`py-3.5 font-medium ${
                              pair.pnl >= 0 ? "text-[#00D2B1]" : "text-red-400"
                            }`}
                          >
                            {pair.pnl >= 0 ? "+" : "−"}$
                            {Math.abs(pair.pnl).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            <p className="mt-3 text-center text-[10px] text-neutral-600">
              Illustrative dashboard · Sample trading data
            </p>
          </div>
        </section>

        {/* PRODUCT VALUE */}
        <section className="border-y border-white/[0.06] bg-[#0A0D0D] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  MORE THAN A JOURNAL
                </p>

                <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-.05em] sm:text-5xl">
                  Numbers tell you what happened.
                  <span className="text-neutral-500">
                  {" "}We help you understand why.
                  </span>
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400">
                  Most traders track their results. Few understand the behaviors,
                  conditions and decisions behind them. EARNRAVE connects your data
                  to actionable insights.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Target,
                    label: "EDGE",
                    title: "Identify your strengths",
                    body: "Discover the markets, sessions and setups that produce your best results.",
                  },
                  {
                    icon: ShieldCheck,
                    label: "RISK",
                    title: "See risk clearly",
                    body: "Understand your exposure, drawdown patterns and risk consistency.",
                  },
                  {
                    icon: Activity,
                    label: "DISCIPLINE",
                    title: "Expose behavior",
                    body: "Find emotional decisions, rule violations and patterns that cost you.",
                  },
                  {
                    icon: Brain,
                    label: "FEEDBACK",
                    title: "Get actionable feedback",
                    body: "Convert your trading history into specific areas for improvement.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="border border-white/[0.07] bg-[#0D1110] p-5 transition hover:border-[#00D2B1]/20"
                    >
                      <Icon size={17} strokeWidth={1.6} className="text-[#00D2B1]" />

                      <p className="mt-5 text-[10px] tracking-[.16em] text-neutral-600">
                        {item.label}
                      </p>

                      <h3 className="mt-2 text-base font-medium text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-neutral-500">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* AI INTELLIGENCE */}
        <section id="intelligence" className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.16em] text-[#00D2B1]">
                  <Sparkles size={14} />
                  INTELLIGENCE THAT MATTERS
                </div>

                <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-.05em] sm:text-5xl">
                  Your AI trading analyst.
                  <br />
                  <span className="text-neutral-500">Not another chatbot.</span>
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400">
                  EARNRAVE looks beyond individual trades to identify patterns
                  across your performance, behavior and risk. Insights grounded in
                  your trading data—not generic advice.
                </p>

                <a
                  href="#ecosystem"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#00D2B1] transition hover:text-white"
                >
                  Explore the EARNRAVE ecosystem
                  <ArrowUpRight size={15} />
                </a>
              </div>

              {/* AI insight panel */}
              <div className="border border-white/[0.08] bg-[#0C100F] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center border border-[#00D2B1]/15 bg-[#00D2B1]/[0.06]">
                      <Brain size={15} className="text-[#00D2B1]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        AI Performance Review
                      </p>
                      <p className="mt-1 text-[10px] text-neutral-600">
                        Sample generated analysis
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#00D2B1]">● DEMO</span>
                </div>

                <div className="mt-6">
                  <p className="text-[10px] tracking-[.15em] text-neutral-600">
                    KEY OBSERVATION
                  </p>

                  <h3 className="mt-3 text-xl font-medium leading-snug tracking-[-.035em]">
                    Your most profitable trades share one condition.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    Trades taken during the London session with a planned risk below
                    1% have shown stronger outcomes in your sample. Your late-session
                    trades have contributed disproportionately to your losses.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 border-y border-white/[0.07] py-5">
                  <div>
                    <p className="text-[10px] text-neutral-600">Best condition</p>
                    <p className="mt-2 text-sm font-medium text-[#00D2B1]">
                      London session
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-600">Weakest condition</p>
                    <p className="mt-2 text-sm font-medium text-red-400">
                      Late-session entries
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <Sparkles size={14} className="mt-0.5 shrink-0 text-[#00D2B1]" />
                  <p className="text-xs leading-6 text-neutral-400">
                    <span className="text-white">Suggested focus:</span> Review
                    late-session trades and compare them against your London-session
                    execution before adjusting your strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section id="ecosystem" className="border-y border-white/[0.06] bg-[#0A0D0D] px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  THE EARNRAVE ECOSYSTEM
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-.05em] sm:text-5xl">
                  Built for every stage
                  <br />
                  <span className="text-neutral-500">of your trading.</span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-neutral-400">
                A connected set of tools to help you analyze, prepare, execute and
                continuously improve.
              </p>
            </div>

            <div className="mt-12 grid border border-white/[0.07] sm:grid-cols-3">
              {[
                {
                  name: "SIGNALS",
                  title: "Find opportunities.",
                  description:
                    "Structured setups, market alerts, entry zones and invalidation levels.",
                  href: "/signals",
                },
                {
                  name: "FUNDING",
                  title: "Navigate funding.",
                  description:
                    "Prepare for prop firm evaluations and manage challenge risk.",
                  href: "/funding",
                },
                {
                  name: "INSIGHTS",
                  title: "Understand context.",
                  description:
                    "Market research, macro analysis and practical trading education.",
                  href: "/insights",
                },
              ].map((product, index) => (
                <a
                  href={product.href}
                  key={product.name}
                  className={`group p-6 transition hover:bg-white/[0.02] sm:p-8 ${
                    index !== 2 ? "border-b sm:border-b-0 sm:border-r border-white/[0.07]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[.17em] text-neutral-600">
                      {product.name}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-neutral-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00D2B1]"
                    />
                  </div>

                  <h3 className="mt-7 text-xl font-medium tracking-tight">
                    {product.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {product.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl border border-white/[0.08] px-6 py-12 sm:px-12 sm:py-16">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  TRADE WITH INTENTION
                </p>

                <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-.05em] sm:text-5xl">
                  Stop guessing.
                  <span className="text-neutral-500"> Start understanding.</span>
                </h2>

                <p className="mt-4 text-sm leading-6 text-neutral-400">
                  Your next level starts with understanding your current one.
                </p>
              </div>

              <a
                href="mailto:hello@earnrave.com?subject=EARNRAVE%20Early%20Access"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 bg-[#00D2B1] px-5 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
              >
                Get early access
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
