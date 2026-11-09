"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import ProductSwitcher from "./ProductSwitcher";
import { products } from "@/config/products";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      {/* Navbar Background */}
      <div className="absolute inset-0 border-b border-white/[0.06] bg-[#070909]/95 backdrop-blur-2xl" />

      {/* Top Navigation */}
      <div className="relative flex h-[76px] items-center justify-between px-5">
        {/* Logo */}
        <a href="/" aria-label="EarnRave home">
          <Image
            src="/earnrave-logo.svg"
            alt="EarnRave"
            width={148}
            height={36}
            priority
          />
        </a>

        {/* Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="relative border-t border-white/[0.06] bg-[#080a0a] px-4 pb-5 pt-4 shadow-2xl">
          {/* Product Switcher */}
          <div className="mb-4 overflow-x-auto">
            <ProductSwitcher />
          </div>

          {/* Navigation Links */}
          <nav className="grid grid-cols-2 gap-2">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-sm text-neutral-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                {product.title}
              </a>
            ))}

            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-sm text-neutral-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              Features
            </a>

            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-sm text-neutral-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              Pricing
            </a>
          </nav>

          {/* Get Started Button */}
          <a
            href="#get-started"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black transition hover:bg-[#dffbf5]"
          >
            Get started
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}