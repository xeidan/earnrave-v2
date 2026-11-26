"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  FolderPlus,
  GraduationCap,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Moon,
  Plus,
  Radio,
  Send,
  Settings as SettingsIcon,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";

type DockSection =
  | "journal"
  | "stats"
  | "signals"
  | "education"
  | "calendar"
  | "notes"
  | "settings";

type ThemeMode = "dark" | "light";

type Portfolio = {
  id: string;
  name: string;
  balance: number;
  riskPct: number;
  isDemo?: boolean;
};

type TradeEntry = {
  id: string;
  pair: string;
  side: "BUY" | "SELL";
  pnl: number;
  rMultiple: number;
  dateKey: string; // YYYY-MM-DD (Nov 2026)
  session: "London" | "New York" | "Asian";
  followedRules: boolean;
  note: string;
};

const INITIAL_PORTFOLIOS: Portfolio[] = [
  {
    id: "p-100k",
    name: "$100k Funding Test",
    balance: 100000,
    riskPct: 0.75,
  },
  {
    id: "p-50k",
    name: "$50k Step 2 Check",
    balance: 50000,
    riskPct: 0.5,
  },
];

const DEMO_PORTFOLIO: Portfolio = {
  id: "p-demo",
  name: "Demo Journal",
  balance: 100000,
  riskPct: 0.75,
  isDemo: true,
};

const SAMPLE_TRADES: TradeEntry[] = [
  {
    id: "t1",
    pair: "EUR/USD",
    side: "BUY",
    pnl: 2250,
    rMultiple: 3.0,
    dateKey: "2026-11-26",
    session: "London",
    followedRules: true,
    note: "Clean pullback into 4H demand ahead of session open.",
  },
  {
    id: "t2",
    pair: "XAU/USD",
    side: "SELL",
    pnl: -750,
    rMultiple: -1.0,
    dateKey: "2026-11-25",
    session: "New York",
    followedRules: true,
    note: "Stopped out cleanly before news spike.",
  },
  {
    id: "t3",
    pair: "GBP/JPY",
    side: "BUY",
    pnl: 1875,
    rMultiple: 2.5,
    dateKey: "2026-11-24",
    session: "London",
    followedRules: true,
    note: "Broke morning range and held above VWAP.",
  },
  {
    id: "t4",
    pair: "BTC/USD",
    side: "BUY",
    pnl: -1125,
    rMultiple: -1.5,
    dateKey: "2026-11-23",
    session: "New York",
    followedRules: false,
    note: "Entered late without waiting for candle close.",
  },
  {
    id: "t5",
    pair: "USD/JPY",
    side: "SELL",
    pnl: 1500,
    rMultiple: 2.0,
    dateKey: "2026-11-20",
    session: "Asian",
    followedRules: true,
    note: "Resistance rejection near range high.",
  },
];

const SIGNALS_LIST = [
  {
    id: "s1",
    pair: "EUR/USD",
    side: "BUY" as const,
    status: "ACTIVE",
    entry: "1.0845",
    sl: "1.0815",
    tp: "1.0935",
    rr: "1:3.0",
    note: "Wait for London pullback and keep risk inside your daily 2% cap.",
  },
  {
    id: "s2",
    pair: "XAU/USD",
    side: "SELL" as const,
    status: "READY",
    entry: "2,658.00",
    sl: "2,670.00",
    tp: "2,622.00",
    rr: "1:3.0",
    note: "Watch NY session rejection; avoid entering right before news releases.",
  },
  {
    id: "s3",
    pair: "BTC/USD",
    side: "BUY" as const,
    status: "WATCH",
    entry: "94,800",
    sl: "93,300",
    tp: "99,300",
    rr: "1:3.0",
    note: "Higher-timeframe support retest. Reduce trade size ahead of weekend.",
  },
];

const EDUCATION_MODULES = [
  {
    id: "mod-01",
    number: "01",
    title: "How Trading Works",
    duration: "25 min",
    lessons: [
      "What currency pairs, gold, and crypto are",
      "How pips, lots, and spreads work",
      "Buying vs. selling in plain English",
    ],
  },
  {
    id: "mod-02",
    number: "02",
    title: "How to Read Price Charts",
    duration: "35 min",
    lessons: [
      "Spotting uptrends, downtrends, and ranges",
      "Marking clean support and resistance zones",
      "Choosing the best time of day to trade",
    ],
  },
  {
    id: "mod-03",
    number: "03",
    title: "How to Protect Your Money",
    duration: "30 min",
    lessons: [
      "Why 0.50% to 0.75% risk keeps you alive",
      "Where to place a logical stop-loss",
      "Avoiding revenge trades after a loss",
    ],
  },
  {
    id: "mod-04",
    number: "04",
    title: "Good Trading Habits",
    duration: "20 min",
    lessons: [
      "Pre-session checklist before opening charts",
      "Logging every trade to spot patterns",
      "Preparing for funded account evaluations",
    ],
  },
];

const AI_PROMPTS = [
  {
    title: "Daily performance summary",
    desc: "Summarize recent wins and losses, check win rate and R-multiples, and highlight rule habits.",
    prompt:
      "Give me a concise summary of my recent trades, win rate, and rule compliance.",
  },
  {
    title: "Risk management review",
    desc: "Check trade size against my 2% personal daily stop and suggest safer position limits.",
    prompt:
      "Review my current trade risk and tell me if my position sizing fits a funding test.",
  },
  {
    title: "Trading strategy analysis",
    desc: "Compare performance across pairs and sessions to spot what works best.",
    prompt:
      "Analyze which pairs and sessions gave me the cleanest results.",
  },
  {
    title: "Mistake & habit check",
    desc: "Spot rule slips before requesting a payout or moving to the next funding step.",
    prompt:
      "Check my logged trades for rule mistakes and tell me what to fix next.",
  },
];

const NEWS_DAYS: Record<string, string> = {
  "2026-11-27": "US Core PCE / Month-end flow",
  "2026-11-25": "FOMC Minutes / High volatility",
};

export default function DashboardPage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [portfolios, setPortfolios] = useState<Portfolio[]>(INITIAL_PORTFOLIOS);
  const [activePortfolioId, setActivePortfolioId] = useState<string | null>(
    null
  );
  const [showPortfolioMenu, setShowPortfolioMenu] = useState(false);

  // Create Portfolio Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("$100k Challenge");
  const [newPortfolioBalance, setNewPortfolioBalance] = useState(100000);
  const [newPortfolioRisk, setNewPortfolioRisk] = useState(0.75);

  // Dock Navigation & Setup Nudge
  const [activeSection, setActiveSection] = useState<DockSection>("journal");
  const [showSetupTip, setShowSetupTip] = useState(true);

  // Journal / Trades State
  const [trades, setTrades] = useState<TradeEntry[]>(SAMPLE_TRADES);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [tradePair, setTradePair] = useState("EUR/USD");
  const [tradeSide, setTradeSide] = useState<"BUY" | "SELL">("BUY");
  const [tradeOutcome, setTradeOutcome] = useState<"WIN" | "LOSS">("WIN");
  const [tradeSession, setTradeSession] = useState<
    "London" | "New York" | "Asian"
  >("London");
  const [tradeFollowedRules, setTradeFollowedRules] = useState(true);
  const [tradeNote, setTradeNote] = useState("");

  // Education State
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    "What currency pairs, gold, and crypto are",
    "How pips, lots, and spreads work",
    "Buying vs. selling in plain English",
    "Spotting uptrends, downtrends, and ranges",
  ]);

  // Calendar Selected Day
  const [selectedDateKey, setSelectedDateKey] = useState("2026-11-26");

  // Notes State
  const [notesText, setNotesText] = useState(
    "Weekly Playbook (Nov 23 – Nov 27):\n• Max 2 losses per day, then stop trading.\n• Wait 15 minutes after major news reports.\n• Only take setups with at least 2.5R upside."
  );
  const [notesSavedAt, setNotesSavedAt] = useState("Saved");

  // AI Assistant Modal / Drawer
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiReply, setAiReply] = useState<string | null>(null);

  const isDark = theme === "dark";

  const activePortfolio = useMemo(() => {
    if (!activePortfolioId) return null;
    if (activePortfolioId === DEMO_PORTFOLIO.id) return DEMO_PORTFOLIO;
    return portfolios.find((p) => p.id === activePortfolioId) ?? null;
  }, [activePortfolioId, portfolios]);

  const handleUseDemoMode = () => {
    setActivePortfolioId(DEMO_PORTFOLIO.id);
    setActiveSection("journal");
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim()) return;
    const created: Portfolio = {
      id: `p-${Date.now()}`,
      name: newPortfolioName.trim(),
      balance: Number(newPortfolioBalance) || 100000,
      riskPct: Number(newPortfolioRisk) || 0.75,
    };
    setPortfolios((prev) => [created, ...prev]);
    setActivePortfolioId(created.id);
    setCreateModalOpen(false);
    setActiveSection("journal");
  };

  const riskDollars = activePortfolio
    ? activePortfolio.balance * (activePortfolio.riskPct / 100)
    : 750;
  const dailyCapDollars = activePortfolio
    ? activePortfolio.balance * 0.02
    : 2000;

  const stats = useMemo(() => {
    const netPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = trades.filter((t) => t.pnl > 0).length;
    const winRate =
      trades.length > 0 ? Math.round((wins / trades.length) * 100) : 0;
    const avgR =
      trades.length > 0
        ? (
            trades.reduce((sum, t) => sum + t.rMultiple, 0) / trades.length
          ).toFixed(2)
        : "0.00";
    const ruleAdherence =
      trades.length > 0
        ? Math.round(
            (trades.filter((t) => t.followedRules).length / trades.length) * 100
          )
        : 100;

    return { netPnl, wins, winRate, avgR, ruleAdherence };
  }, [trades]);

  const totalLessons = useMemo(
    () => EDUCATION_MODULES.reduce((sum, mod) => sum + mod.lessons.length, 0),
    []
  );

  const toggleLesson = (lesson: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lesson)
        ? prev.filter((item) => item !== lesson)
        : [...prev, lesson]
    );
  };

  const tradesByDate = useMemo(() => {
    const map: Record<string, TradeEntry[]> = {};
    for (const t of trades) {
      if (!map[t.dateKey]) map[t.dateKey] = [];
      map[t.dateKey].push(t);
    }
    return map;
  }, [trades]);

  const selectedDayTrades = tradesByDate[selectedDateKey] ?? [];

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const rMult = tradeOutcome === "WIN" ? 2.5 : -1.0;
    const pnl = Math.round(riskDollars * rMult);
    const entry: TradeEntry = {
      id: `t-${Date.now()}`,
      pair: tradePair,
      side: tradeSide,
      pnl,
      rMultiple: rMult,
      dateKey: selectedDateKey || "2026-11-26",
      session: tradeSession,
      followedRules: tradeFollowedRules,
      note:
        tradeNote.trim() ||
        (tradeOutcome === "WIN"
          ? "Executed cleanly according to plan."
          : "Stopped out within risk limit."),
    };
    setTrades((prev) => [entry, ...prev]);
    setTradeNote("");
    setLogModalOpen(false);
  };

  const runAiAnalysis = (customPrompt?: string) => {
    const q = (customPrompt ?? aiInput).trim();
    if (!q) return;
    setAiReply(
      `Based on ${trades.length} logged trades (${stats.winRate}% win rate, ${stats.avgR}R average, ${stats.ruleAdherence}% rule compliance) at ${activePortfolio?.riskPct ?? 0.75}% risk ($${riskDollars.toLocaleString()} per trade): your 2% personal daily stop ($${dailyCapDollars.toLocaleString()}) keeps single-session drawdowns contained. You have also completed ${completedLessons.length}/${totalLessons} Beginner Class lessons.`
    );
    if (!customPrompt) setAiInput("");
  };

  // Theme surface tokens
  const surfaceBg = isDark
    ? "bg-[#080A0A] text-white"
    : "bg-[#F8FAFC] text-slate-900";
  const topBarBg = isDark
    ? "border-white/[0.07] bg-[#080A0A]/85"
    : "border-slate-200/80 bg-white/85";
  const cardBg = isDark
    ? "border-white/[0.08] bg-[#0C0F0F]"
    : "border-slate-200 bg-white shadow-xs";
  const subCardBg = isDark
    ? "border-white/[0.06] bg-[#090C0B]"
    : "border-slate-200/80 bg-slate-50";
  const mutedText = isDark ? "text-neutral-400" : "text-slate-600";
  const subtleText = isDark ? "text-neutral-500" : "text-slate-500";
  const dockBg = isDark
    ? "border-white/[0.1] bg-[#0E1212]/90"
    : "border-slate-200 bg-white/95 shadow-lg";

  const dockItems: {
    id: DockSection;
    label: string;
    icon: typeof BookOpen;
  }[] = [
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "signals", label: "Signals", icon: Radio },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  // November 2026 starts on Sunday (offset 0), 30 days
  const novemberDays = Array.from({ length: 30 }, (_, idx) => {
    const day = idx + 1;
    const dateKey = `2026-11-${String(day).padStart(2, "0")}`;
    const dayTrades = tradesByDate[dateKey] ?? [];
    const dayPnl = dayTrades.reduce((s, t) => s + t.pnl, 0);
    return { day, dateKey, dayTrades, dayPnl, news: NEWS_DAYS[dateKey] };
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${surfaceBg}`}>
      {/* TOP BAR */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${topBarBg}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* LEFT: LOGO + PORTFOLIO DROPDOWN */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/earnrave-logo.svg"
                alt="EarnRave"
                className={`h-6 w-auto object-contain ${
                  !isDark ? "brightness-0" : ""
                }`}
              />
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPortfolioMenu((prev) => !prev)}
                className={`inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition ${
                  isDark
                    ? "border-white/[0.1] bg-[#0D1110] text-white hover:border-[#00D2B1]/40"
                    : "border-slate-200 bg-white text-slate-800 hover:border-emerald-500/40"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#00D2B1]" />
                <span>
                  {activePortfolio ? activePortfolio.name : "Select portfolio"}
                </span>
                <ChevronDown size={14} className={subtleText} />
              </button>

              {showPortfolioMenu && (
                <div
                  className={`absolute left-0 mt-2 w-60 rounded-2xl border p-2 shadow-xl ${cardBg}`}
                >
                  {portfolios.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setActivePortfolioId(p.id);
                        setShowPortfolioMenu(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                        activePortfolioId === p.id
                          ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                          : isDark
                            ? "text-neutral-300 hover:bg-white/[0.04]"
                            : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="font-medium">{p.name}</span>
                      <span className="font-mono text-[11px] opacity-75">
                        ${(p.balance / 1000).toFixed(0)}k
                      </span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      handleUseDemoMode();
                      setShowPortfolioMenu(false);
                    }}
                    className={`mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      activePortfolioId === DEMO_PORTFOLIO.id
                        ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                        : isDark
                          ? "text-neutral-400 hover:bg-white/[0.04] hover:text-white"
                          : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>Demo Journal</span>
                    <span className="rounded bg-[#00D2B1]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#00D2B1]">
                      DEMO
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: + CREATE PORTFOLIO, LOG TRADE, AI ANALYTICS */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium transition ${
                isDark
                  ? "border-white/[0.1] bg-white/[0.02] text-neutral-200 hover:border-[#00D2B1]/40 hover:text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-500/40"
              }`}
            >
              <Plus size={14} className="text-[#00D2B1]" />
              <span className="hidden sm:inline">Create portfolio</span>
            </button>

            {activePortfolio && (
              <button
                type="button"
                onClick={() => setLogModalOpen(true)}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#00D2B1] px-3 text-xs font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
              >
                <Plus size={14} />
                <span>Log trade</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setAiReply(null);
                setAiOpen(true);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#00D2B1]/35 bg-[#00D2B1]/10 px-3.5 text-xs font-medium text-[#00D2B1] transition hover:bg-[#00D2B1]/20"
            >
              <Sparkles size={14} />
              <span>AI-Analytics</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="mx-auto max-w-7xl px-4 pb-36 pt-8 sm:px-6 lg:pt-10">
        {!activePortfolio &&
        activeSection !== "education" &&
        activeSection !== "settings" ? (
          /* EMPTY STATE (FIRST TIME / NO PORTFOLIO SELECTED) */
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center text-center"
          >
            {/* Blurred subtle card grid behind emblem */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="pointer-events-none grid grid-cols-3 gap-2.5 opacity-25 blur-[2px]">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-11 w-14 rounded-xl border ${
                      isDark
                        ? "border-white/[0.12] bg-white/[0.04]"
                        : "border-slate-300 bg-slate-200/70"
                    }`}
                  />
                ))}
              </div>

              <div
                className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg ${
                  isDark
                    ? "border-[#00D2B1]/35 bg-[#0D1312] shadow-[#00D2B1]/10"
                    : "border-emerald-500/30 bg-white shadow-slate-200"
                }`}
              >
                <img
                  src="/earnrave-logo.svg"
                  alt="EarnRave"
                  className={`h-6 w-6 object-contain ${
                    !isDark ? "brightness-0" : ""
                  }`}
                />
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create or select your portfolio
            </h1>
            <p className={`mt-2.5 max-w-md text-sm leading-6 ${mutedText}`}>
              This unlocks your trade journal, performance stats, risk-sized
              signals, calendar, and playbook notes.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#00D2B1] px-5 text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
              >
                <FolderPlus size={16} />
                Create portfolio
              </button>

              <span className={`text-xs ${subtleText}`}>or</span>

              <button
                type="button"
                onClick={handleUseDemoMode}
                className={`inline-flex h-11 items-center gap-2 rounded-xl border px-5 text-sm font-medium transition ${
                  isDark
                    ? "border-white/[0.14] bg-white/[0.03] text-neutral-200 hover:border-[#00D2B1]/40 hover:text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500/40"
                }`}
              >
                Use demo mode
              </button>
            </div>
          </motion.div>
        ) : activeSection === "journal" && activePortfolio ? (
          /* 1. JOURNAL VIEW */
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  JOURNAL · {activePortfolio.name.toUpperCase()}
                </p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Trade Log & Rule Habits
                </h1>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className={`rounded-xl border px-3 py-2 ${subCardBg}`}>
                  1R Risk:{" "}
                  <strong className="font-mono">
                    ${riskDollars.toLocaleString()}
                  </strong>
                </span>
                <span className={`rounded-xl border px-3 py-2 ${subCardBg}`}>
                  Daily Stop:{" "}
                  <strong className="font-mono text-[#00D2B1]">
                    ${dailyCapDollars.toLocaleString()} (2%)
                  </strong>
                </span>
              </div>
            </div>

            <div className={`overflow-hidden rounded-2xl border ${cardBg}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead
                    className={`border-b text-[11px] uppercase tracking-wider ${
                      isDark
                        ? "border-white/[0.07] bg-[#090C0B] text-neutral-500"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    <tr>
                      <th className="px-5 py-3.5">Date</th>
                      <th className="px-5 py-3.5">Pair</th>
                      <th className="px-5 py-3.5">Side</th>
                      <th className="px-5 py-3.5">Session</th>
                      <th className="px-5 py-3.5">R-Multiple</th>
                      <th className="px-5 py-3.5">P&L</th>
                      <th className="px-5 py-3.5">Rules</th>
                      <th className="px-5 py-3.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      isDark ? "divide-white/[0.05]" : "divide-slate-100"
                    }`}
                  >
                    {trades.map((t) => (
                      <tr key={t.id}>
                        <td
                          className={`px-5 py-3.5 font-mono text-xs ${subtleText}`}
                        >
                          {t.dateKey}
                        </td>
                        <td className="px-5 py-3.5 font-mono font-medium">
                          {t.pair}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                              t.side === "BUY"
                                ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                                : "bg-amber-400/15 text-amber-400"
                            }`}
                          >
                            {t.side}
                          </span>
                        </td>
                        <td className={`px-5 py-3.5 text-xs ${mutedText}`}>
                          {t.session}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-xs">
                          {t.rMultiple > 0
                            ? `+${t.rMultiple}R`
                            : `${t.rMultiple}R`}
                        </td>
                        <td
                          className={`px-5 py-3.5 font-mono font-semibold ${
                            t.pnl >= 0 ? "text-[#00D2B1]" : "text-amber-400"
                          }`}
                        >
                          {t.pnl >= 0 ? "+" : "-"}$
                          {Math.abs(t.pnl).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 text-xs">
                          {t.followedRules ? (
                            <span className="inline-flex items-center gap-1 text-[#00D2B1]">
                              <Check size={13} /> Followed
                            </span>
                          ) : (
                            <span className="text-amber-400">Slip</span>
                          )}
                        </td>
                        <td
                          className={`max-w-xs truncate px-5 py-3.5 text-xs ${mutedText}`}
                        >
                          {t.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeSection === "stats" && activePortfolio ? (
          /* 2. STATS VIEW */
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                STATS · PERFORMANCE BREAKDOWN
              </p>
              <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                Account & Risk Analytics
              </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className={`rounded-2xl border p-5 ${cardBg}`}>
                <p className={`text-xs ${subtleText}`}>Net P&L</p>
                <p
                  className={`mt-2 font-mono text-2xl font-semibold ${
                    stats.netPnl >= 0 ? "text-[#00D2B1]" : "text-amber-400"
                  }`}
                >
                  {stats.netPnl >= 0 ? "+" : "-"}$
                  {Math.abs(stats.netPnl).toLocaleString()}
                </p>
              </div>

              <div className={`rounded-2xl border p-5 ${cardBg}`}>
                <p className={`text-xs ${subtleText}`}>Win Rate</p>
                <p className="mt-2 font-mono text-2xl font-semibold">
                  {stats.winRate}%
                </p>
                <p className={`mt-1 text-xs ${subtleText}`}>
                  {stats.wins} wins / {trades.length} trades
                </p>
              </div>

              <div className={`rounded-2xl border p-5 ${cardBg}`}>
                <p className={`text-xs ${subtleText}`}>Average R-Multiple</p>
                <p className="mt-2 font-mono text-2xl font-semibold text-[#00D2B1]">
                  {stats.avgR}R
                </p>
              </div>

              <div className={`rounded-2xl border p-5 ${cardBg}`}>
                <p className={`text-xs ${subtleText}`}>Rule Compliance</p>
                <p className="mt-2 font-mono text-2xl font-semibold">
                  {stats.ruleAdherence}%
                </p>
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium">
                  Trade-by-Trade P&L Bars
                </h2>
                <span className={`text-xs ${subtleText}`}>
                  2% Personal Daily Cap: ${dailyCapDollars.toLocaleString()}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {trades.map((t) => {
                  const positive = t.pnl >= 0;
                  return (
                    <div
                      key={t.id}
                      className={`flex flex-col justify-between rounded-xl border p-3.5 ${subCardBg}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-medium">{t.pair}</span>
                        {positive ? (
                          <TrendingUp size={14} className="text-[#00D2B1]" />
                        ) : (
                          <TrendingDown size={14} className="text-amber-400" />
                        )}
                      </div>

                      <div className="my-4 h-2 overflow-hidden rounded-full bg-slate-500/15">
                        <div
                          className={`h-full rounded-full ${
                            positive ? "w-4/5 bg-[#00D2B1]" : "w-2/5 bg-amber-400"
                          }`}
                        />
                      </div>

                      <p
                        className={`font-mono text-xs font-semibold ${
                          positive ? "text-[#00D2B1]" : "text-amber-400"
                        }`}
                      >
                        {positive ? "+" : "-"}$
                        {Math.abs(t.pnl).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : activeSection === "signals" && activePortfolio ? (
          /* 3. SIGNALS VIEW */
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  SIGNALS · RISK-SIZED SETUPS
                </p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Active Market Setups
                </h1>
              </div>
              <p className={`text-xs ${mutedText}`}>
                Suggested risk per trade:{" "}
                <strong className="font-mono text-[#00D2B1]">
                  ${riskDollars.toLocaleString()} ({activePortfolio.riskPct}%)
                </strong>
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {SIGNALS_LIST.map((s) => (
                <div
                  key={s.id}
                  className={`flex flex-col justify-between rounded-2xl border p-6 ${cardBg}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-semibold">
                          {s.pair}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                            s.side === "BUY"
                              ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                              : "bg-amber-400/15 text-amber-400"
                          }`}
                        >
                          {s.side}
                        </span>
                      </div>
                      <span className={`font-mono text-[11px] ${subtleText}`}>
                        {s.status}
                      </span>
                    </div>

                    <div
                      className={`mt-4 grid grid-cols-3 gap-2 rounded-xl border p-3 text-xs ${subCardBg}`}
                    >
                      <div>
                        <p className={`text-[10px] ${subtleText}`}>ENTRY</p>
                        <p className="mt-0.5 font-mono font-medium">{s.entry}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] ${subtleText}`}>STOP</p>
                        <p className="mt-0.5 font-mono font-medium text-amber-400">
                          {s.sl}
                        </p>
                      </div>
                      <div>
                        <p className={`text-[10px] ${subtleText}`}>TARGET</p>
                        <p className="mt-0.5 font-mono font-medium text-[#00D2B1]">
                          {s.tp}
                        </p>
                      </div>
                    </div>

                    <p className={`mt-4 text-xs leading-6 ${mutedText}`}>
                      {s.note}
                    </p>
                  </div>

                  <div
                    className={`mt-5 flex items-center justify-between border-t pt-3.5 text-xs ${
                      isDark ? "border-white/[0.06]" : "border-slate-100"
                    }`}
                  >
                    <span className={subtleText}>
                      Risk: ${riskDollars.toLocaleString()}
                    </span>
                    <span className="font-mono font-medium text-[#00D2B1]">
                      {s.rr}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeSection === "education" ? (
          /* 4. EDUCATION VIEW (BEGINNER CLASS) */
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  EDUCATION · FREE BEGINNER CLASS
                </p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Trading Foundations ({completedLessons.length}/{totalLessons}{" "}
                  Completed)
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-36 overflow-hidden rounded-full bg-slate-500/20">
                  <div
                    style={{
                      width: `${Math.round(
                        (completedLessons.length / totalLessons) * 100
                      )}%`,
                    }}
                    className="h-full rounded-full bg-[#00D2B1] transition-all duration-500"
                  />
                </div>
                <span className="font-mono text-xs font-medium text-[#00D2B1]">
                  {Math.round((completedLessons.length / totalLessons) * 100)}%
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {EDUCATION_MODULES.map((mod) => {
                const doneCount = mod.lessons.filter((l) =>
                  completedLessons.includes(l)
                ).length;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border p-6 ${cardBg}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-[#00D2B1]">
                        MODULE {mod.number} · {mod.duration}
                      </span>
                      <span className="rounded-full bg-[#00D2B1]/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#00D2B1]">
                        {doneCount}/{mod.lessons.length} done
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-semibold">{mod.title}</h2>

                    <div
                      className={`mt-4 space-y-2.5 border-t pt-4 ${
                        isDark ? "border-white/[0.06]" : "border-slate-100"
                      }`}
                    >
                      {mod.lessons.map((lesson) => {
                        const done = completedLessons.includes(lesson);
                        return (
                          <button
                            key={lesson}
                            type="button"
                            onClick={() => toggleLesson(lesson)}
                            className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-xs transition ${
                              done
                                ? "border-[#00D2B1]/30 bg-[#00D2B1]/[0.06]"
                                : `${subCardBg} hover:border-[#00D2B1]/30`
                            }`}
                          >
                            {done ? (
                              <CheckCircle2
                                size={15}
                                className="shrink-0 text-[#00D2B1]"
                              />
                            ) : (
                              <Circle
                                size={15}
                                className={`shrink-0 ${subtleText}`}
                              />
                            )}
                            <span
                              className={
                                done
                                  ? `${subtleText} line-through`
                                  : isDark
                                    ? "text-neutral-200"
                                    : "text-slate-700"
                              }
                            >
                              {lesson}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeSection === "calendar" && activePortfolio ? (
          /* 5. CALENDAR VIEW */
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                    CALENDAR · NOVEMBER 2026
                  </p>
                  <h1 className="mt-1 text-xl font-semibold">
                    Daily P&L & News Days
                  </h1>
                </div>
                <span className={`text-xs ${subtleText}`}>
                  Click a day to inspect
                </span>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-2 text-center text-[11px] font-medium">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className={`py-1 ${subtleText}`}>
                    {d}
                  </div>
                ))}

                {novemberDays.map(({ day, dateKey, dayTrades, dayPnl, news }) => {
                  const isSelected = selectedDateKey === dateKey;
                  const hasTrades = dayTrades.length > 0;
                  return (
                    <button
                      key={dateKey}
                      type="button"
                      onClick={() => setSelectedDateKey(dateKey)}
                      className={`flex min-h-[68px] flex-col justify-between rounded-xl border p-2 text-left transition ${
                        isSelected
                          ? "border-[#00D2B1] bg-[#00D2B1]/10"
                          : hasTrades
                            ? dayPnl >= 0
                              ? "border-[#00D2B1]/25 bg-[#00D2B1]/[0.05]"
                              : "border-amber-400/30 bg-amber-400/[0.05]"
                            : isDark
                              ? "border-white/[0.06] bg-[#090C0B] hover:border-white/[0.15]"
                              : "border-slate-200/80 bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{day}</span>
                        {news && (
                          <span
                            title={news}
                            className="h-1.5 w-1.5 rounded-full bg-amber-400"
                          />
                        )}
                      </div>

                      {hasTrades ? (
                        <span
                          className={`font-mono text-[10px] font-semibold ${
                            dayPnl >= 0 ? "text-[#00D2B1]" : "text-amber-400"
                          }`}
                        >
                          {dayPnl >= 0 ? "+" : "-"}$
                          {Math.abs(dayPnl).toLocaleString()}
                        </span>
                      ) : (
                        <span className={`text-[10px] ${subtleText}`}>—</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                SELECTED DAY · {selectedDateKey}
              </p>

              {NEWS_DAYS[selectedDateKey] && (
                <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5 text-xs text-amber-300">
                  Economic Event: <strong>{NEWS_DAYS[selectedDateKey]}</strong>
                </div>
              )}

              <div className="mt-4 space-y-3">
                {selectedDayTrades.length === 0 ? (
                  <p className={`text-sm ${mutedText}`}>
                    No trades logged on this date.
                  </p>
                ) : (
                  selectedDayTrades.map((t) => (
                    <div
                      key={t.id}
                      className={`rounded-xl border p-4 text-xs ${subCardBg}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold">
                          {t.pair} ({t.side})
                        </span>
                        <span
                          className={`font-mono font-semibold ${
                            t.pnl >= 0 ? "text-[#00D2B1]" : "text-amber-400"
                          }`}
                        >
                          {t.pnl >= 0 ? "+" : "-"}$
                          {Math.abs(t.pnl).toLocaleString()}
                        </span>
                      </div>
                      <p className={`mt-2 leading-5 ${mutedText}`}>{t.note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : activeSection === "notes" && activePortfolio ? (
          /* 6. NOTES VIEW */
          <div className={`rounded-2xl border p-6 sm:p-8 ${cardBg}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  NOTES · PLAYBOOK & WEEKLY OUTLOOK
                </p>
                <h1 className="mt-1 text-2xl font-semibold">
                  Trading Rules & Session Notes
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs ${subtleText}`}>{notesSavedAt}</span>
                <button
                  type="button"
                  onClick={() => setNotesSavedAt("Saved just now")}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#00D2B1] px-4 text-xs font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                >
                  Save notes
                </button>
              </div>
            </div>

            <textarea
              value={notesText}
              onChange={(e) => {
                setNotesText(e.target.value);
                setNotesSavedAt("Unsaved edits");
              }}
              rows={10}
              className={`mt-5 w-full rounded-2xl border p-4 font-mono text-xs leading-6 outline-none transition focus:border-[#00D2B1] sm:text-sm ${subCardBg}`}
            />
          </div>
        ) : (
          /* 7. SETTINGS VIEW (LIGHT/DARK THEME, SUPPORT, LOGOUT) */
          <div className="mx-auto max-w-2xl space-y-5">
            <div>
              <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                SETTINGS · PREFERENCES & ACCOUNT
              </p>
              <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                Workspace Settings
              </h1>
            </div>

            {/* APPEARANCE: LIGHT & DARK THEME */}
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-medium">Appearance Theme</h2>
                  <p className={`mt-1 text-xs ${mutedText}`}>
                    Switch between dark mode and light mode across your
                    dashboard.
                  </p>
                </div>

                <div
                  className={`grid grid-cols-2 rounded-xl border p-1 ${subCardBg}`}
                >
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      isDark
                        ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Moon size={13} />
                    Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      !isDark
                        ? "bg-emerald-500/15 text-emerald-700"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Sun size={13} />
                    Light
                  </button>
                </div>
              </div>
            </div>

            {/* SUPPORT */}
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00D2B1]/15 text-[#00D2B1]">
                    <LifeBuoy size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-medium">Support & Help</h2>
                    <p className={`mt-1 text-xs leading-6 ${mutedText}`}>
                      Need help setting up a funding account, adjusting risk
                      limits, or reviewing lessons? Reach out to our support
                      team.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href="mailto:hello@earnrave.com?subject=EarnRave%20Dashboard%20Support"
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#00D2B1] px-4 text-xs font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                      >
                        Contact Support
                        <ArrowUpRight size={14} />
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveSection("education")}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-4 text-xs font-medium transition ${subCardBg}`}
                      >
                        <HelpCircle size={14} />
                        Open Beginner Class
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LOG OUT */}
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-medium">Session</h2>
                  <p className={`mt-1 text-xs ${mutedText}`}>
                    Sign out of your EarnRave workspace on this device.
                  </p>
                </div>

                <Link
                  href="/login"
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-amber-400/35 bg-amber-400/10 px-4 text-xs font-medium text-amber-400 transition hover:bg-amber-400/20"
                >
                  <LogOut size={14} />
                  Log out
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FLOATING SETUP NUDGE + BOTTOM DOCK */}
      <div className="fixed inset-x-0 bottom-5 z-40 flex flex-col items-center gap-2.5 px-4">
        {showSetupTip && (
          <div
            className={`inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-xs backdrop-blur-xl ${dockBg}`}
          >
            <ShieldCheck size={13} className="text-[#00D2B1]" />
            <span className={mutedText}>
              Tip: Keep daily risk capped at{" "}
              <strong className="text-[#00D2B1]">2%</strong> before trading.
            </span>
            <button
              type="button"
              onClick={() => setShowSetupTip(false)}
              aria-label="Dismiss tip"
              className={`${subtleText} hover:text-[#00D2B1]`}
            >
              <X size={13} />
            </button>
          </div>
        )}

        <nav
          aria-label="Workspace dock"
          className={`flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border p-1.5 backdrop-blur-xl sm:gap-1.5 ${dockBg}`}
        >
          {dockItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                title={item.label}
                className={`group relative flex h-11 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-medium transition-all ${
                  active
                    ? "bg-[#00D2B1] text-[#04110E]"
                    : isDark
                      ? "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={17} />
                <span className={active ? "inline" : "hidden lg:inline"}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* CREATE PORTFOLIO MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-3xl border p-6 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create a portfolio</h2>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className={subtleText}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePortfolio} className="mt-5 space-y-4">
              <div>
                <label className={`text-xs ${mutedText}`}>Portfolio Name</label>
                <input
                  type="text"
                  required
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                  className={`mt-1.5 h-10 w-full rounded-xl border px-3 text-sm outline-none focus:border-[#00D2B1] ${subCardBg}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${mutedText}`}>
                    Starting Balance ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    required
                    value={newPortfolioBalance}
                    onChange={(e) =>
                      setNewPortfolioBalance(Number(e.target.value))
                    }
                    className={`mt-1.5 h-10 w-full rounded-xl border px-3 font-mono text-sm outline-none focus:border-[#00D2B1] ${subCardBg}`}
                  />
                </div>
                <div>
                  <label className={`text-xs ${mutedText}`}>
                    Risk / Trade (%)
                  </label>
                  <input
                    type="number"
                    min={0.1}
                    max={5}
                    step={0.05}
                    required
                    value={newPortfolioRisk}
                    onChange={(e) => setNewPortfolioRisk(Number(e.target.value))}
                    className={`mt-1.5 h-10 w-full rounded-xl border px-3 font-mono text-sm outline-none focus:border-[#00D2B1] ${subCardBg}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
              >
                Save portfolio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOG TRADE MODAL */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-3xl border p-6 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Log a trade</h2>
              <button
                type="button"
                onClick={() => setLogModalOpen(false)}
                className={subtleText}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTrade} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${mutedText}`}>Pair</label>
                  <select
                    value={tradePair}
                    onChange={(e) => setTradePair(e.target.value)}
                    className={`mt-1.5 h-10 w-full rounded-xl border px-3 font-mono text-xs outline-none ${subCardBg}`}
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="XAU/USD">XAU/USD</option>
                    <option value="GBP/JPY">GBP/JPY</option>
                    <option value="BTC/USD">BTC/USD</option>
                  </select>
                </div>
                <div>
                  <label className={`text-xs ${mutedText}`}>Session</label>
                  <select
                    value={tradeSession}
                    onChange={(e) =>
                      setTradeSession(
                        e.target.value as "London" | "New York" | "Asian"
                      )
                    }
                    className={`mt-1.5 h-10 w-full rounded-xl border px-3 text-xs outline-none ${subCardBg}`}
                  >
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Asian">Asian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${mutedText}`}>Side</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {(["BUY", "SELL"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setTradeSide(s)}
                        className={`h-10 rounded-xl border text-xs font-medium ${
                          tradeSide === s
                            ? "border-[#00D2B1] bg-[#00D2B1]/15 text-[#00D2B1]"
                            : `${subCardBg} ${mutedText}`
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`text-xs ${mutedText}`}>Outcome</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {(["WIN", "LOSS"] as const).map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setTradeOutcome(o)}
                        className={`h-10 rounded-xl border text-xs font-medium ${
                          tradeOutcome === o
                            ? o === "WIN"
                              ? "border-[#00D2B1] bg-[#00D2B1]/15 text-[#00D2B1]"
                              : "border-amber-400 bg-amber-400/15 text-amber-400"
                            : `${subCardBg} ${mutedText}`
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-xs">
                <input
                  type="checkbox"
                  checked={tradeFollowedRules}
                  onChange={(e) => setTradeFollowedRules(e.target.checked)}
                  className="h-4 w-4 accent-[#00D2B1]"
                />
                <span>Followed risk & entry rules on this trade</span>
              </label>

              <div>
                <label className={`text-xs ${mutedText}`}>Trade Note</label>
                <input
                  type="text"
                  value={tradeNote}
                  onChange={(e) => setTradeNote(e.target.value)}
                  placeholder="What happened on this setup?"
                  className={`mt-1.5 h-10 w-full rounded-xl border px-3 text-xs outline-none ${subCardBg}`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
              >
                Add trade ({tradeOutcome === "WIN" ? "+2.5R" : "-1.0R"})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI-ANALYTICS MODAL */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div
            className={`relative flex max-h-[88vh] w-full max-w-4xl flex-col justify-between overflow-y-auto rounded-3xl border p-6 sm:p-8 ${cardBg}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#00D2B1]/10 px-3 py-1 text-xs font-medium text-[#00D2B1]">
                  <Activity size={13} />
                  EarnRave AI-Analytics
                </div>
                <button
                  type="button"
                  onClick={() => setAiOpen(false)}
                  className={subtleText}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                  What would you like to analyze?
                </h2>
                <p className={`mt-1.5 text-xs sm:text-sm ${mutedText}`}>
                  Pick a quick review card below or ask about your journal, risk
                  limits, or setups.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {AI_PROMPTS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => runAiAnalysis(item.prompt)}
                    className={`rounded-2xl border p-4 text-left transition hover:border-[#00D2B1]/50 ${subCardBg}`}
                  >
                    <p className="text-xs font-semibold">{item.title}</p>
                    <p className={`mt-1.5 text-[11px] leading-5 ${mutedText}`}>
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>

              {aiReply && (
                <div className="mt-5 rounded-2xl border border-[#00D2B1]/30 bg-[#00D2B1]/[0.06] p-4 text-xs leading-6 sm:text-sm">
                  {aiReply}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                runAiAnalysis();
              }}
              className={`mt-6 flex items-center gap-2 rounded-2xl border p-2 ${subCardBg}`}
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask EarnRave AI-Analytics anything..."
                className="h-10 flex-1 bg-transparent px-3 text-sm outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#00D2B1] px-4 text-xs font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
              >
                <Send size={14} />
                Ask
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}