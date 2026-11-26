"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  RotateCcw,
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

export default function LoginPage() {
  const [method, setMethod] = useState<"password" | "otp">("password");
  const [otpStep, setOtpStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendSeconds]);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoggedIn(true);
    }, 600);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpStep("code");
      setResendSeconds(30);
    }, 600);
  };

  const handleResendOtp = () => {
    if (resendSeconds > 0 || isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setResendSeconds(30);
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length < 4) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoggedIn(true);
    }, 600);
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

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SECTION_TRANSITION}
        className="relative z-10 mx-auto my-12 w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0C0F0F] p-7 sm:p-9">
          <BorderTrace />

          {loggedIn ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="py-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00D2B1]/30 bg-[#00D2B1]/10 text-[#00D2B1]">
                <Check size={22} />
              </div>

              <h1 className="mt-5 text-2xl font-medium tracking-tight text-white">
                Welcome back
              </h1>
              <p className="mt-2.5 text-sm leading-6 text-neutral-400">
                You are signed in as{" "}
                <span className="text-neutral-200">{email}</span>. Where would
                you like to go next?
              </p>

              <div className="mt-7 space-y-3">
                <Link
                  href="/signals"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD]"
                >
                  Go to Signals
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/education"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.02] text-xs font-medium text-neutral-300 transition hover:border-[#00D2B1]/35 hover:text-white"
                >
                  Continue Beginner Class
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <div>
                <p className="text-[11px] font-medium tracking-[.18em] text-[#00D2B1]">
                  WELCOME BACK
                </p>
                <h1 className="mt-2.5 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  Log in to EarnRave
                </h1>
                <p className="mt-1.5 text-xs text-neutral-400">
                  Choose password login or a one-time verification code.
                </p>
              </div>

              {/* METHOD SWITCHER */}
              <div className="mt-6 grid grid-cols-2 rounded-xl border border-white/[0.08] bg-[#090C0B] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMethod("password");
                    setOtpStep("email");
                  }}
                  className={`rounded-lg py-2 text-xs font-medium transition-colors duration-300 ${
                    method === "password"
                      ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMethod("otp");
                    setOtpStep("email");
                  }}
                  className={`rounded-lg py-2 text-xs font-medium transition-colors duration-300 ${
                    method === "otp"
                      ? "bg-[#00D2B1]/15 text-[#00D2B1]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  One-Time Code (OTP)
                </button>
              </div>

              {method === "password" ? (
                <form onSubmit={handlePasswordLogin} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="loginEmail"
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
                        id="loginEmail"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090C0B] pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-[#00D2B1]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="loginPassword"
                        className="block text-[11px] font-medium tracking-[.12em] text-neutral-400"
                      >
                        PASSWORD
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setMethod("otp");
                          setOtpStep("email");
                        }}
                        className="text-[11px] text-neutral-500 transition hover:text-[#00D2B1]"
                      >
                        Use OTP instead
                      </button>
                    </div>

                    <div className="relative mt-2">
                      <Lock
                        size={15}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                      />
                      <input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
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
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-xs text-neutral-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-[#090C0B] accent-[#00D2B1]"
                    />
                    Keep me signed in on this device
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_24px_rgba(0,210,177,0.22)] disabled:opacity-60"
                  >
                    {isSubmitting ? "Signing in..." : "Log in with password"}
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              ) : otpStep === "email" ? (
                <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="otpEmail"
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
                        id="otpEmail"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090C0B] pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-[#00D2B1]/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_24px_rgba(0,210,177,0.22)] disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending OTP..." : "Send one-time code"}
                    <ArrowUpRight size={16} />
                  </button>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500">
                    <ShieldCheck
                      size={14}
                      className="shrink-0 text-[#00D2B1]"
                    />
                    <span>
                      Single-use code expires automatically for your safety.
                    </span>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <p className="text-xs leading-5 text-neutral-400">
                    Enter the 6-digit code sent to{" "}
                    <span className="text-neutral-200">{email}</span>.
                  </p>

                  <div>
                    <label
                      htmlFor="otpCode"
                      className="block text-[11px] font-medium tracking-[.12em] text-neutral-400"
                    >
                      6-DIGIT OTP CODE
                    </label>
                    <div className="relative mt-2">
                      <KeyRound
                        size={15}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                      />
                      <input
                        id="otpCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="123456"
                        className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#090C0B] pl-10 pr-4 font-mono text-base tracking-[0.35em] text-white placeholder-neutral-600 outline-none transition focus:border-[#00D2B1]/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || otp.length < 4}
                    className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D2B1] text-sm font-medium text-[#04110E] transition hover:bg-[#4AE6CD] hover:shadow-[0_0_24px_rgba(0,210,177,0.22)] disabled:opacity-60"
                  >
                    {isSubmitting ? "Verifying OTP..." : "Verify & log in"}
                    <ArrowUpRight size={16} />
                  </button>

                  <div className="flex items-center justify-between pt-1 text-xs text-neutral-400">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStep("email");
                        setOtp("");
                      }}
                      className="transition hover:text-white"
                    >
                      Change email
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendSeconds > 0 || isSubmitting}
                      className="inline-flex items-center gap-1.5 text-[#00D2B1] transition hover:text-[#4AE6CD] disabled:text-neutral-500"
                    >
                      <RotateCcw size={13} />
                      {resendSeconds > 0
                        ? `Resend in ${resendSeconds}s`
                        : isSubmitting
                          ? "Sending..."
                          : "Resend OTP"}
                    </button>
                  </div>
                </form>
              )}

              <p className="mt-6 border-t border-white/[0.06] pt-5 text-center text-xs text-neutral-400">
                New to EarnRave?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#00D2B1] transition hover:text-[#4AE6CD]"
                >
                  Create a free account
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