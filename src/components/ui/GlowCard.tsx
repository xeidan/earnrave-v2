"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

function BorderTrace() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]">
      <motion.div
        className="absolute top-0 left-0 h-px w-28 bg-gradient-to-r from-transparent via-[#00D2B1] to-transparent shadow-[0_0_10px_rgba(0,210,177,0.55)]"
        initial={{ x: "-120px" }}
        animate={{ x: "600px" }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function GlowCard({
  children,
  className = "",
  trace = true,
}: {
  children: ReactNode;
  className?: string;
  trace?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D1110] ${className}`}
    >
      {trace && <BorderTrace />}
      {children}
    </div>
  );
}