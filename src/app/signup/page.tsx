"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

const SECTION_TRANSITION = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1] as const,
};

function BorderTrace({ duration = 22 }: { duration?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute top-0 h-px w-36 -translate-x-full bg-gradient-to-r from-transparent via-[#00D2B1]/80 to-transparent shadow-[0_0_12px_rgba(0,210,177,0.45)]"
        initial={{ left: "0%" }}
        animate={{ left: "135%" }}
        transition={{
          duration,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [goal, setGoal] = useState<"Education" | "Signals" | "Funding">(
    "Education"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 650);
  };

  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,177,0.07),transparent_45%),#080A0A] px-5 py-8 text-white sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-16 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-[#00D2B1]/[0.04] blur-[130px]" />

      {/* TOP BAR */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-neutral-400 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to EarnRave
        </Link>

        <Link href="/" className="inline-flex items-center justify-center">
          <img
            src="/earnrave-logo.svg"
            alt="EarnRave"
            className="h-7 w-auto object-contain"
          />
        </Link>

        <div className="w-[96px]" aria-hidden="true" />
      </header>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SECTION_TRANSITION}
        className="relative z-10 mx-auto my-12 grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"
      >
        {/* LEFT VALUE PANEL */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D2B1]" />
            EARNRAVE / CREATE ACCOUNT
          </div>

          <h1 className="mt-6 max-w-xl text-5xl font-bold leading-[1.05] tracking-[-.06em] text-white xl:text-6xl">
            Start with clear rules.
            <span className="block text-neutral-500">
              Trade without guessing.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400">
            Create a free EarnRave account to unlock the beginner trading
            course, track your progress, and access risk-first tools.
          </p>

          <div className="mt-10 space-y-4 border-t border-white/[0.07] pt-8">
            {[
              "Free access to all 4 beginner trading modules",
              "Save your weekly market notes and learning progress",
              "Built-in position size and funding risk calculators",
              "Early access to EarnRave AI-Analytics & Auto Bot",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-neutral-300"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D2B1]/15 text-[#00D2B1]">
                  <Check size={12} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIGN-UP CARD */}
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0C0F0F] p-7 sm:p-9">
          <BorderTrace />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="py-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00D2B1]/30 bg-[#00D2B1]/10 text-[#00D2B1]">
                <Check size={22} />
              </div>

              <h2 className="mt-5 text-2xl font-medium tracking-tight text-white">
                Account created
              </h2>
              <p className="mt-2.5 text-sm leading-6 text-neutral-400">
                Welcome to EarnRave. Your free beginner lessons and risk tools
                are ready.
              </p>

              <div className="mt-7 space-y-3">
                <Link
                  href="/education"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                >
                  Open Beginner Class
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/signals"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.02] text-xs font-medium text-neutral-300 transition hover:border-[#00D2B1]/35 hover:text-white"
                >
                  Explore Signals
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  FREE ACCOUNT
                </p>
                <h2 className="mt-2.5 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  Create your account
                </h2>
                <p className="mt-1.5 text-xs text-neutral-400">
                  Takes less than a minute. No credit card required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label
                    htmlFor="signupEmail"
                    className="block text-[11px] font-medium tracking-[.12em] text-neutral-400"
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="relative mt-2">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                    />
                    <input
                      id="signupEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090C0B] pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-[#00D2B1]/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signupPassword"
                    className="block text-[11px] font-medium tracking-[.12em] text-neutral-400"
                  >
                    PASSWORD
                  </label>
                  <div className="relative mt-2">
                    <Lock
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                    />
                    <input
                      id="signupPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090C0B] pl-10 pr-11 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-[#00D2B1]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-300"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-medium tracking-[.12em] text-neutral-400">
                    WHAT ARE YOU HERE FOR FIRST?
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(["Education", "Signals", "Funding"] as const).map(
                      (item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setGoal(item)}
                          className={`rounded-xl border py-2.5 text-xs font-medium transition-colors duration-300 ${
                            goal === item
                              ? "border-[#00D2B1]/50 bg-[#00D2B1]/[0.1] text-[#00D2B1]"
                              : "border-white/[0.07] bg-[#090C0B] text-neutral-400 hover:border-white/[0.15] hover:text-white"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_24px_rgba(0,210,177,0.22)] disabled:opacity-60"
                >
                  {isSubmitting ? "Creating account..." : "Create free account"}
                  <ArrowUpRight size={16} />
                </button>
              </form>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck size={14} className="shrink-0 text-[#00D2B1]" />
                <span>Your data stays private. We never share your email.</span>
              </div>

              <p className="mt-6 border-t border-white/[0.06] pt-5 text-center text-xs text-neutral-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#00D2B1] transition hover:text-[#4AE6CD]"
                >
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* FOOTER NOTE */}
      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-center text-[11px] text-neutral-600 sm:flex-row sm:text-left">
        <span>
          Trading carries risk. EarnRave provides educational tools and market
          planning resources.
        </span>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="transition hover:text-neutral-400">
            Terms of Use
          </Link>
          <Link href="/privacy" className="transition hover:text-neutral-400">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  );
}