
"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  Paperclip,
  Plus,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

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

function BorderTrace() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-[#00D2B1] to-transparent shadow-[0_0_8px_rgba(0,210,177,0.5)]"
        animate={{ x: ["-120px", "calc(100% + 120px)"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

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
  const demoPrompts = [
  "Why am I losing money?",
  "Analyse my risk management",
  "What are my biggest trading mistakes?",
];

const faqCategories = ["All", "AI-Analytics", "Signals", "Funding", "Insights"] as const;

const faqItems = [
  {
    id: "what-is-earnrave",
    category: "AI-Analytics",
    question: "What is EARNRAVE, and how does it improve trading performance?",
    answer:
      "EARNRAVE is a multi-asset performance analytics and trading workflow platform built around four measurable pillars: Edge, Risk, Discipline, and Feedback. Instead of stopping at surface-level win rates, it normalizes trades into R-multiples, highlights session and setup expectancy, and surfaces behavioral leaks like oversized losses or revenge entries.",
    highlight: "Edge · Risk · Discipline · Feedback",
  },
  {
    id: "markets-and-syncing",
    category: "AI-Analytics",
    question: "Which markets, brokers, and APIs are supported?",
    answer:
      "EARNRAVE is designed from the ground up for Forex, prop firms, crypto, stocks, and futures. You can start immediately via smart CSV imports and manual trade logging while automated read-only exchange and broker API syncing rolls out across major crypto venues and trading platforms.",
    highlight: "Multi-asset + Read-only APIs",
  },
  {
    id: "fund-safety",
    category: "AI-Analytics",
    question: "Does EARNRAVE ever hold funds or execute trades on my account?",
    answer:
      "Never. EARNRAVE is strictly non-custodial and analytical. Your capital stays with your chosen broker or exchange, and connected integrations use read-only permissions—meaning EARNRAVE cannot withdraw funds, transfer balances, or place unauthorized orders.",
    highlight: "100% Non-custodial & read-only",
  },
  {
    id: "how-signals-work",
    category: "Signals",
    question: "How are EARNRAVE Signals structured?",
    answer:
      "Every signal is framed around defined market context, entry zones, invalidation levels, and asymmetric risk-to-reward rather than hype. The goal is disciplined execution and position sizing—never blind copying without understanding risk.",
  },
  {
    id: "prop-firm-funding",
    category: "Funding",
    question: "How does Funding help with prop firm evaluations?",
    answer:
      "Funding focuses on evaluation readiness, risk calibration, daily and max drawdown discipline, and structured trade execution aligned with prop firm rules—helping you protect your account parameters rather than over-leveraging to rush targets.",
  },
  {
    id: "weekly-insights",
    category: "Insights",
    question: "What is included in Weekly Insights?",
    answer:
      "Insights delivers weekly macro context, key liquidity and price levels, and post-week breakdowns so you understand the market environment behind price action and build sharper independent decision-making over time.",
  },
  {
    id: "getting-started",
    category: "AI-Analytics",
    question: "How do I get early access or ask a specific question?",
    answer:
      "You can request early access directly from the CTA on this page or reach out to our team via email for onboarding, broker/CSV questions, or partnership inquiries.",
  },
];

const [activeFaqCategory, setActiveFaqCategory] =
  useState<(typeof faqCategories)[number]>("All");
const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0].id);

const filteredFaqItems =
  activeFaqCategory === "All"
    ? faqItems
    : faqItems.filter((item) => item.category === activeFaqCategory);

const [activeBrokerIndex, setActiveBrokerIndex] = useState<number | null>(null);

const demoAnswers = [
  {
    title: "Your losses are concentrated in poor timing.",
    body: "Your trading data suggests that late-session trades and impulsive entries are contributing disproportionately to your negative results.",
    metrics: [
      ["Primary issue", "Late entries"],
      ["Risk pattern", "Inconsistent sizing"],
    ],
    recommendation:
      "Focus on your planned session and stop taking trades after your daily risk threshold is reached.",
  },
  {
    title: "Your risk isn't consistent across trades.",
    body: "You are risking different amounts depending on how confident you feel about a setup. This makes your performance difficult to evaluate and increases drawdown volatility.",
    metrics: [
      ["Risk consistency", "Needs improvement"],
      ["Main concern", "Variable exposure"],
    ],
    recommendation:
      "Define a fixed risk model before entering the market and avoid increasing exposure based on emotion.",
  },
  {
    title: "You're repeating the same execution mistakes.",
    body: "Your biggest performance leak is taking trades outside your planned conditions. These trades make it harder to distinguish whether your strategy has an edge.",
    metrics: [
      ["Main mistake", "Plan deviation"],
      ["Priority", "Execution discipline"],
    ],
    recommendation:
      "Journal every trade that violates your rules. Review those trades separately from valid strategy executions.",
  },
];

const [chatMessages, setChatMessages] = useState<any[]>([]);
const [isThinking, setIsThinking] = useState(false);
const [visibleAssistantText, setVisibleAssistantText] = useState("");
const [typedQuestion, setTypedQuestion] = useState("");
const transitionCompletionRef = useRef<{ completed: number; resolve?: () => void }>({ completed: 0 });

const markTransitionAnimationComplete = () => {
  transitionCompletionRef.current.completed += 1;
  if (transitionCompletionRef.current.completed >= 2) {
    transitionCompletionRef.current.resolve?.();
  }
};

const [demoPhase, setDemoPhase] = useState<
  "idle" | "typing-question" | "moving-question" | "submitted" | "thinking" | "typing-answer" | "complete"
>("idle");

useEffect(() => {
  let cancelled = false;
  let questionIndex = 0;
  let timeout: ReturnType<typeof setTimeout>;

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      timeout = setTimeout(resolve, ms);
    });

  const cycle = async () => {
    if (cancelled) return;

    const index = questionIndex % demoPrompts.length;
    const question = demoPrompts[index];
    const answer = demoAnswers[index];

    // RESET
    setChatMessages([]);
    setTypedQuestion("");
    setVisibleAssistantText("");
    setIsThinking(false);
    setDemoPhase("idle");

    // SHORT PAUSE BEFORE TYPING
    await wait(1200);
    if (cancelled) return;

    // TYPE QUESTION INTO THE CENTERED COMPOSER
    setDemoPhase("typing-question");

    for (let i = 1; i <= question.length; i++) {
      if (cancelled) return;

      setTypedQuestion(question.slice(0, i));
      await wait(45);
    }

    if (cancelled) return;

    // HOLD THE COMPLETED QUESTION BRIEFLY
    await wait(500);
    if (cancelled) return;

    // MOVE QUESTION TO TOP-RIGHT AND COMPOSER TO BOTTOM TOGETHER
    transitionCompletionRef.current = { completed: 0 };
    const transitionFinished = new Promise<void>((resolve) => {
      transitionCompletionRef.current.resolve = resolve;
    });
    setChatMessages([
      {
        type: "user",
        text: question,
      },
    ]);
    setDemoPhase("moving-question");
    setTypedQuestion("");

    // WAIT FOR BOTH LAYOUT ANIMATIONS TO COMPLETE
    await transitionFinished;
    if (cancelled) return;

    setDemoPhase("submitted");

    // THINKING
    await wait(1000);
    if (cancelled) return;

    setIsThinking(true);
    setDemoPhase("thinking");

    await wait(1400);
    if (cancelled) return;

    // START AI RESPONSE
    setIsThinking(false);

    setChatMessages((prev) => [
      ...prev,
      {
        type: "assistant",
        answer,
      },
    ]);

    setDemoPhase("typing-answer");

    // WAIT FOR ANSWER TYPING TO FINISH
    const answerTypingDuration = Math.ceil(answer.body.length / 2) * 18;
    await wait(answerTypingDuration + 800);

    if (cancelled) return;

    setDemoPhase("complete");

    // HOLD COMPLETE ANSWER BEFORE NEXT CYCLE
    await wait(5000);
    if (cancelled) return;

    questionIndex++;
    cycle();
  };

  cycle();

  return () => {
    cancelled = true;
    clearTimeout(timeout);
  };
}, []);



useEffect(() => {
  const lastMessage = chatMessages[chatMessages.length - 1];

  if (lastMessage?.type !== "assistant") {
    setVisibleAssistantText("");
    return;
  }

  const text = lastMessage.answer.body;
  setVisibleAssistantText("");
  setDemoPhase("typing-answer");

  let index = 0;

  const interval = setInterval(() => {
    index += 2;
    setVisibleAssistantText(text.slice(0, index));

    if (index >= text.length) {
      clearInterval(interval);
      setDemoPhase("complete");
    }
  }, 18);

  return () => clearInterval(interval);
}, [chatMessages]);
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#080A0A] text-white">
        {/* HERO */}
        <section className="relative px-5 lg:pb-10 pt-36 lg:pt-56">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-end gap-12 md:grid-cols-[1.15fr_.85fr]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.16em] text-[#00D2B1]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                  AI-POWERED TRADING ANALYTICS
                </div>

                <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-.07em] sm:text-7xl lg:text-[88px]">
                  Trade your edge.
                  <br />
                  <span className="text-neutral-500">Build Mastery.</span>
                </h1>

                <p className="mt-8 max-w-xl text-sm leading-8 text-neutral-400 sm:text-base">
                  Find your edge. Understand your mistakes. Make better trading
                  decisions with performance analytics and AI that goes beyond the
                  numbers.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#analytics"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#00D2B1] px-6 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                  >
                    Explore demo
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="#intelligence"
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/[0.12] px-6 text-sm text-neutral-300 transition hover:border-[#00D2B1]/40 hover:text-white"
                  >
                    Connect broker
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="pb-3 md:pl-16"
              >
                <div className="border-l border-white/10 pl-6 py-2">
                  <p className="text-xs tracking-wide text-neutral-500">
                    BETTER TRADING STARTS WITH
                  </p>

                  <div className="mt-6 space-y-5">
                    {[
                      ["01", "Finding your edge"],
                      ["02", "Managing your risk"],
                      ["03", "Improving discipline"],
                      ["04", "Learning from feedback"],
                    ].map(([num, label]) => (
                      <div key={num} className="flex items-center gap-5">
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
        <section id="analytics" className="sm:py-24 py-20 px-5">
          <div className="mx-auto max-w-7xl">
            {/* Dashboard frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0F0F]"
            >
              <BorderTrace />
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

      {/* AI INTELLIGENCE */}
      <section id="intelligence" className="px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">

            {/* LEFT CONTENT */}
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

            {/* AI DEMO CARD */}
            <motion.div
              layout
              transition={{
                layout: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="relative flex h-[620px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C100F] shadow-[0_20px_80px_rgba(0,0,0,.25)]"
            >
              <BorderTrace />

              {/* HEADER */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00D2B1]/15 bg-[#00D2B1]/[0.06]">
                    <Brain size={15} className="text-[#00D2B1]" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-white">
                      EARNRAVE AI
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                      <p className="text-[10px] text-neutral-500">
                        Trading intelligence
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAT CONTENT */}
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 py-5 sm:px-6">

                {/* MESSAGE VIEWPORT */}
                <div
                  className={`relative flex min-h-0 flex-1 ${
                    chatMessages.length > 0
                      ? "items-start justify-start"
                      : "items-center justify-center"
                  }`}
                >

                  {chatMessages.length === 0 ? (
                    <div className="flex w-full items-center justify-center">

                      {/* EMPTY STATE */}
                      {demoPhase === "idle" && (
                        <motion.div
                          key="empty-state"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Sparkles size={14} className="text-[#00D2B1]" />
                          <p className="text-xs text-neutral-500">
                            Ask anything about your performance
                          </p>
                        </motion.div>
                      )}

                      {/* CENTERED QUESTION COMPOSER */}
                      {demoPhase === "typing-question" && (
                        <motion.div
                          layoutId="demo-composer"
                          transition={{
                            layout: {
                              duration: 1.2,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }}
                          className="w-full"
                        >
                          <div className="flex items-center gap-3 rounded-2xl border border-[#00D2B1]/20 bg-[#111315] px-4 py-4 shadow-[0_0_30px_rgba(0,210,177,.04)]">
                            <Paperclip
                              size={17}
                              className="shrink-0 text-white/30"
                            />

                            <div className="min-h-[24px] flex-1 text-sm text-neutral-200">
                              <motion.span layoutId="demo-question">{typedQuestion}</motion.span>

                              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[#00D2B1]" />
                            </div>

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D2B1]/10">
                              <Sparkles size={16} className="text-[#00D2B1]" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </div>
                  ) : (
                    <div className="flex w-full flex-col gap-5">

                      {chatMessages.map((message, index) => (
                        <div key={index}>
                          {message.type === "user" ? (
                            <div className="flex justify-end self-start">
                              <motion.div layoutId="demo-question" onLayoutAnimationComplete={markTransitionAnimationComplete} className="max-w-[85%] rounded-2xl rounded-br-md border border-[#00D2B1]/10 bg-[#00D2B1]/[0.06] px-4 py-3">
                              <p className="text-sm leading-6 text-neutral-200">
                                {message.text}
                              </p>
                              </motion.div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#00D2B1]/15 bg-[#00D2B1]/[0.05]">
                                <Sparkles size={13} className="text-[#00D2B1]" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="mb-2 text-[10px] font-medium tracking-wide text-[#00D2B1]">
                                  EARNRAVE ANALYSIS
                                </p>

                                <h3 className="text-sm font-medium leading-6 text-white">
                                  {message.answer.title}
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-neutral-400">
                                  {visibleAssistantText}
                                  {visibleAssistantText.length <
                                    message.answer.body.length && (
                                    <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-[#00D2B1]" />
                                  )}
                                </p>

                                {visibleAssistantText.length >=
                                  message.answer.body.length && (
                                  <>
                                    {/* METRICS */}
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                      {message.answer.metrics.map(
                                        ([label, value]: [string, string]) => (
                                          <div
                                            key={label}
                                            className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
                                          >
                                            <p className="text-[10px] text-neutral-600">
                                              {label}
                                            </p>

                                            <p className="mt-1.5 text-xs font-medium text-neutral-300">
                                              {value}
                                            </p>
                                          </div>
                                        ),
                                      )}
                                    </div>

                                    {/* RECOMMENDATION */}
                                    <div className="mt-3 rounded-xl border border-[#00D2B1]/10 bg-[#00D2B1]/[0.025] p-3.5">
                                      <p className="mb-1 text-[10px] font-medium text-[#00D2B1]">
                                        SUGGESTED FOCUS
                                      </p>

                                      <p className="text-xs leading-6 text-neutral-400">
                                        {message.answer.recommendation}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* THINKING INDICATOR */}
                      {isThinking && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00D2B1]/15 bg-[#00D2B1]/[0.05]">
                            <Sparkles size={13} className="text-[#00D2B1]" />
                          </div>

                          <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-3">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00D2B1]/70 [animation-delay:-0.2s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00D2B1]/70 [animation-delay:-0.1s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00D2B1]/70" />
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>

                {/* CHAT COMPOSER */}
                {demoPhase === "typing-question" ? (
                  <div className="mt-5 h-[58px] shrink-0" />
                ) : demoPhase === "idle" ? (
                  <div className="mt-5 flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111315] px-4 py-3.5">
                    <Paperclip
                      size={17}
                      className="shrink-0 text-white/30"
                    />

                    <div className="flex-1 select-none text-sm text-white/30">
                      Ask Earnrave anything...
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D2B1]/10">
                      <Sparkles size={16} className="text-[#00D2B1]" />
                    </div>
                  </div>
                ) : (
                  <motion.div
                    layoutId="demo-composer"
                    onLayoutAnimationComplete={markTransitionAnimationComplete}
                    transition={{
                      layout: {
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className="mt-5 flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111315] px-4 py-3.5"
                  >
                    <Paperclip
                      size={17}
                      className="shrink-0 text-white/30"
                    />

                    <div className="flex-1 select-none text-sm text-white/30">
                      Ask Earnrave anything...
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D2B1]/10">
                      <Sparkles size={16} className="text-[#00D2B1]" />
                    </div>
                  </motion.div>
                )}

                {/* DEMO DISCLAIMER */}
                <p className="mt-3 shrink-0 pb-1 text-center text-[10px] leading-5 text-neutral-600">
                  Illustrative demo · Sample trading data · Not connected to a live account
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* BROKER CONNECTION ECOSYSTEM */}
      <section className="relative overflow-hidden border-y border-white/[0.05] bg-[#080A0A] px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl">

          {/* INTRO */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium tracking-[.2em] text-[#00D2B1]">
              CONNECT YOUR TRADING ACCOUNTS
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-[1.1] tracking-[-.055em] text-white sm:text-5xl lg:text-6xl">
              Your trades.
              <span className="text-neutral-500"> One connected view.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
              Connect your brokers, exchanges and trading platforms. Bring your
              trading history together into one place. No fragmented data.
              No manual tracking.
            </p>
          </div>

          {/* PLATFORM ECOSYSTEM */}
          <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">

      {/* BROKER LOGOS */}
            <div className="relative z-10 grid grid-cols-3 gap-x-5 gap-y-8 sm:grid-cols-6 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-12 lg:gap-x-4">
              {[
                { name: "Binance", slug: "binance", color: "F0B90B", category: "Crypto" },
                { name: "OKX", slug: "okx", color: "FFFFFF", category: "Crypto" },
                { name: "Bybit", slug: "bybit", color: "F7A600", category: "Crypto" },
                { name: "Coinbase", slug: "coinbase", color: "0052FF", category: "Crypto" },
                { name: "Kraken", slug: "kraken", color: "5741D9", category: "Crypto" },
                { name: "Bitget", slug: "bitget", color: "00F0FF", category: "Crypto" },
                { name: "KuCoin", slug: "kucoin", color: "23AF91", category: "Crypto" },
                { name: "MEXC", slug: "mexc", color: "00B897", category: "Crypto" },
                { name: "Gate.io", slug: "gateio", color: "E60023", category: "Crypto" },
                { name: "Hyperliquid", slug: "hyperliquid", color: "00D2B1", category: "Crypto" },
                { name: "MetaTrader 5", slug: "metatrader5", color: "00A95C", category: "Forex" },
                { name: "cTrader", slug: "ctrader", color: "3C8DBC", category: "Forex" },
              ].map((broker, idx) => {
                const isActive = idx === activeBrokerIndex;

                return (
                  <button
                    key={broker.name}
                    type="button"
                    onMouseEnter={() => setActiveBrokerIndex(idx)}
                    onMouseLeave={() => setActiveBrokerIndex(null)}
                    onClick={() =>
                      setActiveBrokerIndex((prev) => (prev === idx ? null : idx))
                    }
                    className="group flex flex-col items-center gap-3 focus:outline-none"
                  >
                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 sm:h-14 sm:w-14 ${
                        isActive
                          ? "border-[#00D2B1]/40 bg-[#111616] shadow-[0_0_20px_rgba(0,210,177,0.12)]"
                          : "border-white/[0.055] bg-[#0D1010] group-hover:border-white/[0.12] group-hover:bg-[#111414]"
                      }`}
                    >
                      <span className="text-[10px] font-medium text-neutral-500">
                        {broker.name.slice(0, 2).toUpperCase()}
                      </span>

                      <img
                        src={`https://cdn.simpleicons.org/${broker.slug}/${broker.color}`}
                        alt={broker.name}
                        className="absolute inset-0 h-full w-full object-contain p-3"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    <span
                      className={`text-center text-[10px] transition-colors duration-200 sm:text-xs ${
                        isActive
                          ? "font-medium text-white"
                          : "text-neutral-500 group-hover:text-neutral-300"
                      }`}
                    >
                      {broker.name}
                    </span>
                  </button>
                );
              })}
            </div>

      {/* CIRCUIT-BUS DATA PATHWAYS — DESKTOP */}
            <div className="relative mx-auto hidden h-[112px] w-full max-w-[1152px] lg:block">
              <svg
                viewBox="0 0 1152 112"
                fill="none"
                className="h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="busLineGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="112"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.06" />
                  </linearGradient>

                  <linearGradient
                    id="activeBusGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="112"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#00D2B1" stopOpacity="0.35" />
                    <stop offset="55%" stopColor="#00D2B1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00D2B1" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {(() => {
                  const centerX = 576;
                  const busY = 54;
                  const radius = 14;

                  const getPath = (i: number) => {
                    const startX = 40.67 + i * 97.33;
                    const dx = centerX - startX;
                    const absDx = Math.abs(dx);

                    if (absDx < 1) {
                      return `M ${centerX} 0 L ${centerX} 112`;
                    }

                    const dir = dx > 0 ? 1 : -1;
                    const r = Math.min(radius, absDx / 2);

                    return [
                      `M ${startX} 0`,
                      `L ${startX} ${busY - r}`,
                      `Q ${startX} ${busY}, ${startX + dir * r} ${busY}`,
                      `L ${centerX - dir * r} ${busY}`,
                      `Q ${centerX} ${busY}, ${centerX} ${busY + r}`,
                      `L ${centerX} 112`,
                    ].join(" ");
                  };

                  return (
                    <>
                      {Array.from({ length: 12 }).map((_, i) => {
                        if (i === activeBrokerIndex) return null;
                        return (
                          <path
                            key={i}
                            d={getPath(i)}
                            stroke="url(#busLineGradient)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        );
                      })}

                      {activeBrokerIndex !== null && (
                        <path
                          d={getPath(activeBrokerIndex)}
                          stroke="url(#activeBusGradient)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* MOBILE SPACING — NO CONNECTOR GRAPHIC */}
            <div className="h-12 sm:h-16 lg:hidden" />

            {/* CONNECTED WORKSPACE */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0B0E0E] sm:rounded-3xl">

              {/* Fine top accent */}
              <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00D2B1]/25 to-transparent" />

              {/* Ambient background */}
              <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#00D2B1]/[0.025] blur-[100px]" />

              <div className="grid lg:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-20">

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                    <span className="text-[10px] tracking-[.16em] text-neutral-600">
                      UNIFIED TRADING DATA
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-medium leading-tight tracking-[-.045em] text-white sm:text-4xl">
                    Every account.
                    <span className="block text-neutral-500">
                      Every trade. Together.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-neutral-400">
                    Your accounts stay where they are. EARNRAVE brings your
                    trading history into one unified view so you can analyze
                    performance across platforms.
                  </p>

                  <div className="mt-8 flex items-center gap-2.5">
                    <ShieldCheck
                      size={16}
                      strokeWidth={1.6}
                      className="text-neutral-500"
                    />
                    <span className="text-xs text-neutral-500">
                      Secure, read-only data access
                    </span>
                  </div>
                </div>

                {/* RIGHT SIDE — CONNECTION MANAGER */}
                <div className="relative flex items-center justify-center px-5 pb-7 sm:px-8 sm:pb-10 lg:p-10">

                  <div className="w-full max-w-[430px] rounded-2xl border border-white/[0.055] bg-[#111414] p-5 sm:p-6">

                    {/* MANAGER HEADER */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-neutral-200">
                          Connection Manager
                        </h4>
                        <p className="mt-1 text-xs text-neutral-600">
                          Your trading accounts
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.055] bg-white/[0.02]">
                        <Activity
                          size={15}
                          strokeWidth={1.5}
                          className="text-neutral-500"
                        />
                      </div>
                    </div>

                    {/* PORTFOLIO GROUP */}
                    <div className="mt-7">
                      <p className="mb-3 text-[10px] tracking-[.12em] text-neutral-600">
                        PORTFOLIOS
                      </p>

      {/* CRYPTO */}
                      <div
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                          activeBrokerIndex !== null && activeBrokerIndex < 10
                ? "bg-white/[0.03]"
                : "hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.04] bg-[#0B0D0D]">
                          <img
                            src="https://cdn.simpleicons.org/binance/F0B90B"
                            alt="Crypto"
                            className="h-4 w-4 object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-neutral-300">
                            Crypto
                          </p>
                          <p className="mt-1 text-[10px] text-neutral-600">
                            Binance · Bybit · OKX
                          </p>
                        </div>

                        <span
                          className={`text-[10px] ${
                            activeBrokerIndex !== null && activeBrokerIndex < 10
                          ? "text-[#00D2B1]"
                          : "text-neutral-500"
                          }`}
                        >
                          Connected
                        </span>
                      </div>

                      {/* FOREX */}
                      <div
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                         activeBrokerIndex !== null && activeBrokerIndex < 10
                          ? "text-[#00D2B1]"
                          : "text-neutral-500"
                        }`}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.04] bg-[#0B0D0D]">
                          <img
                            src="https://cdn.simpleicons.org/metatrader5/00A95C"
                            alt="Forex"
                            className="h-4 w-4 object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-neutral-300">
                            Forex
                          </p>
                          <p className="mt-1 text-[10px] text-neutral-600">
                            MT5 · cTrader
                          </p>
                        </div>

                        <span
                          className={`text-[10px] ${
                            activeBrokerIndex !== null && activeBrokerIndex < 10
                            ? "text-[#00D2B1]"
                            : "text-neutral-500"
                          }`}
                        >
                          Connected
                        </span>
                      </div>

                      {/* ADD ACCOUNT */}
                      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.07] py-3.5 text-neutral-500 transition-colors hover:border-[#00D2B1]/20 hover:text-neutral-300">
                        <span className="text-base leading-none">+</span>
                        <span className="text-xs">Connect account</span>
                      </div>
                    </div>

                    {/* SECURITY */}
                    <div className="mt-5 border-t border-white/[0.04] pt-4">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck
                          size={14}
                          strokeWidth={1.6}
                          className="mt-0.5 shrink-0 text-neutral-600"
                        />
                        <p className="text-[10px] leading-5 text-neutral-600">
                          Your accounts remain yours. EARNRAVE accesses trading
                          data without controlling your funds.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


{/* WHY EARNRAVE */}
<section
  id="ecosystem"
  className="relative overflow-hidden border-y border-white/[0.06] bg-[#080A0A] px-5 py-24 sm:py-32"
>
  <div className="mx-auto max-w-7xl">
    {/* HEADER */}
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.2em] text-[#00D2B1]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
          WHY EARNRAVE
        </div>

        <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.08] tracking-[-.055em] text-white sm:text-6xl">
          Built for consistency.
          <span className="block text-neutral-500">
            Not vanity charts.
          </span>
        </h2>
      </div>

      <p className="max-w-lg text-sm leading-7 text-neutral-400 lg:pb-1">
        Most platforms drown you in raw logs without telling you what to fix.
        EARNRAVE turns your own execution history into clear evidence—uncovering
        where your edge lives, where capital is leaking, and how to improve.
      </p>
    </div>

    {/* VALUE GRID */}
    <div className="mt-16 grid gap-4 lg:grid-cols-12">
      {/* PRIMARY FEATURE (7 COLS) */}
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0D1110] p-7 sm:p-10 lg:col-span-7 lg:p-12">
        <BorderTrace />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#00D2B1]/[0.035] blur-[100px]" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[.17em] text-neutral-500">
              01 / PERSONALIZED INTELLIGENCE
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <Brain
                size={16}
                strokeWidth={1.5}
                className="text-[#00D2B1]"
              />
            </div>
          </div>

          <h3 className="mt-8 max-w-lg text-2xl font-medium leading-tight tracking-[-.04em] text-white sm:text-3xl">
            From raw execution logs to clear, actionable edge.
            <span className="text-neutral-500"> Not generic advice.</span>
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
            Every trade is normalized into R-multiples and evaluated across
            strategy expectancy, drawdown discipline, and session timing—so
            you see what your actual results support.
          </p>

          {/* ANALYSIS VISUAL */}
          <div className="mt-9 rounded-2xl border border-white/[0.05] bg-[#090C0B] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Performance observation
              </span>

              <span className="rounded-md border border-[#00D2B1]/15 bg-[#00D2B1]/[0.05] px-2 py-1 text-[9px] tracking-wider text-[#00D2B1]">
                DATA-BASED
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="mt-1 h-9 w-[2px] shrink-0 bg-[#00D2B1]/60" />

              <div>
                <p className="text-sm leading-6 text-neutral-200">
                  Your EUR/USD setups generate +14% higher expectancy during the
                  London session than after 15:00.
                </p>

                <p className="mt-1.5 text-xs leading-5 text-neutral-600">
                  Derived directly from your normalized R-multiple history.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              {[35, 48, 30, 65, 42, 80, 53, 70, 46, 92, 60, 75].map(
                (height, i) => (
                  <div key={i} className="flex h-14 flex-1 items-end">
                    <div
                      className={`w-full rounded-sm transition-all duration-300 ${
                        i === 9
                          ? "bg-[#00D2B1]/60 shadow-[0_0_12px_rgba(0,210,177,0.25)]"
                          : "bg-white/[0.07] group-hover:bg-white/[0.1]"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* COMPACT CONTRAST STRIP */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.04] bg-[#090C0B]/70 px-4 py-3.5">
              <p className="text-[10px] tracking-[.14em] text-neutral-600">
                STANDARD JOURNALS
              </p>
              <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                Surface-level win rates, fragmented CSVs, and zero risk context.
              </p>
            </div>

            <div className="rounded-xl border border-[#00D2B1]/15 bg-[#00D2B1]/[0.03] px-4 py-3.5">
              <p className="text-[10px] tracking-[.14em] text-[#00D2B1]">
                THE EARNRAVE STANDARD
              </p>
              <p className="mt-1.5 text-xs leading-5 text-neutral-300">
                R-multiple expectancy, AI leak detection, and prop drawdown guardrails.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SUPPORTING FEATURES (5 COLS) */}
      <div className="grid gap-4 lg:col-span-5">
        {/* 02 / EDGE & OBJECTIVITY */}
        <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.07] bg-[#0D1110] p-6 transition-colors duration-300 hover:border-white/[0.12] sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[.17em] text-neutral-500">
              02 / EDGE & OBJECTIVITY
            </span>

            <Target
              size={17}
              strokeWidth={1.5}
              className="text-neutral-500 transition-colors group-hover:text-[#00D2B1]"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-medium tracking-tight text-white">
              Replace assumptions with evidence.
            </h3>

            <p className="mt-2.5 text-sm leading-6 text-neutral-400">
              Stop relying on memory or isolated wins. Separate true statistical
              expectancy from luck across Forex, Crypto, Prop, Futures, and Stocks.
            </p>
          </div>
        </div>

        {/* 03 / RISK & DISCIPLINE */}
        <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.07] bg-[#0D1110] p-6 transition-colors duration-300 hover:border-white/[0.12] sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[.17em] text-neutral-500">
              03 / RISK & DISCIPLINE
            </span>

            <ShieldCheck
              size={17}
              strokeWidth={1.5}
              className="text-neutral-500 transition-colors group-hover:text-[#00D2B1]"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-medium tracking-tight text-white">
              Protect your consistency.
            </h3>

            <p className="mt-2.5 text-sm leading-6 text-neutral-400">
              Catch oversized losses, revenge trades, and rule deviations early—before
              destructive habits breach your prop limits or wipe out weeks of progress.
            </p>
          </div>
        </div>

        {/* 04 / CONTINUOUS FEEDBACK */}
        <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.07] bg-[#0D1110] p-6 transition-colors duration-300 hover:border-white/[0.12] sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[.17em] text-neutral-500">
              04 / CONTINUOUS FEEDBACK
            </span>

            <Activity
              size={17}
              strokeWidth={1.5}
              className="text-neutral-500 transition-colors group-hover:text-[#00D2B1]"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-medium tracking-tight text-white">
              Progress you can measure.
            </h3>

            <p className="mt-2.5 text-sm leading-6 text-neutral-400">
              Close the loop with weekly diagnostics, structured setups, and
              market intelligence—verifying that every adjustment actually moves
              your equity curve.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* BOTTOM STATEMENT */}
    <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6 text-neutral-500">
        <span>Less guesswork. Better awareness. More informed decisions.</span>
        <span className="hidden text-neutral-700 sm:inline">·</span>
        <span className="text-neutral-600">
          Edge · Risk · Discipline · Feedback
        </span>
      </div>

      <a
        href="#intelligence"
        className="inline-flex items-center gap-2 text-xs font-medium text-[#00D2B1] transition-colors hover:text-[#5CEBD2]"
      >
        Explore EARNRAVE AI
        <ArrowUpRight size={14} />
      </a>
    </div>
  </div>
</section>

{/* FAQ */}
<section
  id="faq"
  className="relative overflow-hidden border-b border-white/[0.06] bg-[#080A0A] px-5 py-24 sm:py-32"
>
  <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[#00D2B1]/[0.025] blur-[120px]" />

  <div className="relative mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
      {/* LEFT STICKY COLUMN */}
      <div className="lg:sticky lg:top-28">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.2em] text-[#00D2B1]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
          FREQUENTLY ASKED QUESTIONS
        </div>

        <h2 className="mt-5 text-4xl font-medium leading-[1.08] tracking-[-.055em] text-white sm:text-5xl">
          Clear answers.
          <span className="block text-neutral-500">Zero guesswork.</span>
        </h2>

        <p className="mt-5 max-w-md text-sm leading-7 text-neutral-400">
          Everything you need to know about EARNRAVE&apos;s analytics engine,
          multi-market workflow, signals, funding preparation, and weekly market
          insights.
        </p>

        {/* CATEGORY FILTER PILLS */}
        <div className="mt-8 flex flex-wrap gap-2">
          {faqCategories.map((category) => {
            const isSelected = activeFaqCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveFaqCategory(category);
                  const firstMatch =
                    category === "All"
                      ? faqItems[0]
                      : faqItems.find((item) => item.category === category);
                  setOpenFaqId(firstMatch ? firstMatch.id : null);
                }}
                className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? "border-[#00D2B1]/40 bg-[#00D2B1]/[0.08] text-[#00D2B1]"
                    : "border-white/[0.07] bg-[#0C0F0F] text-neutral-400 hover:border-white/[0.14] hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* DIRECT SUPPORT CARD */}
        <div className="mt-8 rounded-2xl border border-white/[0.07] bg-[#0C100F] p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00D2B1]/15 bg-[#00D2B1]/[0.06]">
              <ShieldCheck size={16} className="text-[#00D2B1]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">
                Still have a question?
              </p>
              <p className="mt-1 text-xs leading-6 text-neutral-400">
                Reach out directly for early access, broker support, or custom
                inquiries.
              </p>

              <a
                href="mailto:hello@earnrave.com?subject=EARNRAVE%20Question"
                className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#00D2B1] transition hover:text-white"
              >
                hello@earnrave.com
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT ACCORDION LIST */}
      <div className="space-y-3">
        {filteredFaqItems.map((item, idx) => {
          const isOpen = openFaqId === item.id;

          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                isOpen
                  ? "border-[#00D2B1]/25 bg-[#0D1211]"
                  : "border-white/[0.07] bg-[#0C0F0F] hover:border-white/[0.13]"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                }
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 font-mono text-[11px] text-neutral-600">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <span className="inline-block text-[10px] font-medium tracking-[.16em] text-[#00D2B1]/80">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="mt-1.5 text-base font-medium leading-snug tracking-[-0.02em] text-white sm:text-lg">
                      {item.question}
                    </h3>
                  </div>
                </div>

                <span
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-[#00D2B1]/30 bg-[#00D2B1]/10 text-[#00D2B1]"
                      : "border-white/[0.08] bg-white/[0.02] text-neutral-400"
                  }`}
                >
                  <Plus size={15} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-t border-white/[0.05] px-5 pb-6 pt-4 sm:px-7 sm:pl-14">
                      <p className="text-sm leading-7 text-neutral-400">
                        {item.answer}
                      </p>

                      {item.highlight && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#00D2B1]/15 bg-[#00D2B1]/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#00D2B1]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
                          {item.highlight}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section className="relative overflow-hidden bg-[#080A0A] px-5 py-24 sm:py-32">
  {/* Ambient background glow */}
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D2B1]/[0.03] blur-[130px]" />

  <div className="relative mx-auto max-w-7xl">
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0C100F] px-7 py-14 sm:px-14 sm:py-20 lg:px-20">
      <BorderTrace />

      {/* Top hairline highlight */}
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00D2B1]/40 to-transparent" />

      {/* Subtle corner grid / radial accent */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#00D2B1]/[0.04] blur-[90px]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        {/* LEFT COPY */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D2B1]/15 bg-[#00D2B1]/[0.05] px-3 py-1 text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
            TRADE WITH INTENTION
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-medium leading-[1.06] tracking-[-.055em] text-white sm:text-5xl lg:text-6xl">
            Stop guessing.
            <span className="block text-neutral-500">
              Start understanding.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
            Your next level starts with clear evidence from your own execution.
            Join early access for AI-Analytics or tap into live Signals,
            Funding prep, and weekly Insights today.
          </p>

          {/* TRUST & PILLAR STRIP */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-6 text-xs text-neutral-500">
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#00D2B1]" />
              Read-only &amp; non-custodial
            </span>
            <span className="hidden text-neutral-700 sm:inline">·</span>
            <span>Forex · Prop · Crypto · Futures · Stocks</span>
          </div>
        </div>

        {/* RIGHT ACTION CARD */}
        <div className="flex flex-col justify-center rounded-2xl border border-white/[0.06] bg-[#090C0B]/90 p-6 sm:p-8 lg:ml-auto lg:w-full lg:max-w-[400px]">
          <p className="text-[10px] font-medium tracking-[.18em] text-neutral-500">
            GET STARTED WITH EARNRAVE
          </p>

          <p className="mt-2 text-sm leading-6 text-neutral-300">
            Request priority onboarding for the analytics beta or explore our
            live trading ecosystem.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="mailto:hello@earnrave.com?subject=EARNRAVE%20Early%20Access"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] px-5 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_28px_rgba(0,210,177,0.2)]"
            >
              Get early access
              <ArrowUpRight size={16} />
            </a>

            <a
              href="/signals"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.02] px-5 text-sm font-medium text-neutral-300 transition hover:border-[#00D2B1]/35 hover:bg-white/[0.04] hover:text-white"
            >
              Explore live signals
              <ArrowRight size={15} />
            </a>
          </div>

          <p className="mt-4 text-center text-[11px] text-neutral-600">
            AI-Analytics · Signals · Funding · Insights
          </p>
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
