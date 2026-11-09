"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import ProductSwitcher from "./ProductSwitcher";
import { navigation } from "@/config/navigation";
import { useProduct } from "@/providers/ProductProvider";

export default function DesktopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { product } = useProduct();
  const links = navigation[product];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden lg:block">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/65 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(0,210,177,.09),transparent_68%)]" />

      <div className="relative mx-auto max-w-[1600px] px-8 pt-5">
        <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#090b0b]/95 shadow-[0_24px_70px_rgba(0,0,0,.42)] backdrop-blur-2xl">

          {/* Top Navigation */}
          <div className="flex h-[78px] items-center justify-between px-7">

            {/* Logo */}
            <a
              href="/"
              aria-label="EarnRave home"
              className="w-[205px] shrink-0"
            >
              <Image
                src="/earnrave-logo.svg"
                alt="EarnRave"
                width={165}
                height={42}
                priority
              />
            </a>

            {/* Product Switcher */}
            <div className="flex flex-1 justify-center">
              <ProductSwitcher />
            </div>

            {/* Account Actions */}
            <div className="flex w-[205px] shrink-0 items-center justify-end gap-5">
              <a
                href="#login"
                className="text-sm font-medium text-neutral-400 transition hover:text-white"
              >
                Log in
              </a>

              <a
                href="#get-started"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-[#dffbf5]"
              >
                Get started
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Secondary Navigation */}
          <div className="flex h-[56px] items-center justify-center gap-10">
            {scrolled && (
              <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white">
                {links.product}
                <ChevronDown size={14} />
              </button>
            )}

            {links.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-medium text-neutral-500 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
}