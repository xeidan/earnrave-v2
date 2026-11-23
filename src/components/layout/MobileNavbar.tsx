"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  X,
  LayoutGrid,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { products } from "@/config/products";
import { navigation } from "@/config/navigation";
import { useProduct } from "@/providers/ProductProvider";
import type { Product } from "@/providers/ProductProvider";

export default function MobileNavbar() {
  const { product, setProduct } = useProduct();

  const [open, setOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<Product | null>(product);

  // Keep the expanded accordion aligned with the selected product.
  useEffect(() => {
    setExpandedProduct(product);
  }, [product]);

  // Lock background scrolling while the menu is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Toggle product accordion.
  const toggleProduct = (productId: Product) => {
    setExpandedProduct((current) =>
      current === productId ? null : productId
    );

    setProduct(productId);
  };

  // Full-screen menu animation.
  const drawerVariants = {
    hidden: {
      x: "100%",
    },
    visible: {
      x: 0,
      transition: {
        type: "tween" as const,
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "tween" as const,
        duration: 0.32,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      {/* Mobile Header */}
      <div className="relative flex h-[76px] items-center justify-between border-b border-white/[0.06] bg-[#070909]/95 px-5 backdrop-blur-2xl">
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

        {/* Menu Trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-neutral-300 transition duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white active:scale-95"
        >
          <LayoutGrid size={20} strokeWidth={1.7} />
        </button>
      </div>

      {/* Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.28 },
              }}
            />

            {/* Full-Screen Drawer */}
            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden border border-white/[0.08] bg-[#101212] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
            >
              {/* Drawer Header */}
              <motion.div
                variants={itemVariants}
                className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.06] px-5"
              >
                {/* Logo */}
                <a href="/" aria-label="EarnRave home">
                  <Image
                    src="/earnrave-logo.svg"
                    alt="EarnRave"
                    width={148}
                    height={36}
                  />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] text-neutral-400 transition duration-300 hover:bg-white/[0.05] hover:text-white active:scale-95"
                >
                  <X size={21} strokeWidth={1.7} />
                </button>
              </motion.div>

              {/* Navigation Content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7">
                <nav className="space-y-2">
                  {products.map((item, index) => {
                    const Icon = item.icon;
                    const isExpanded = expandedProduct === item.id;
                    const productNavigation = navigation[item.id];

                    return (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="overflow-hidden"
                      >
                        {/* Pillar */}
                        <button
                          type="button"
                          onClick={() => toggleProduct(item.id)}
                          aria-expanded={isExpanded}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-4 text-left transition-colors duration-200 ${
                            isExpanded
                              ? "text-white"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon
                              size={19}
                              className={`transition-colors duration-200 ${
                                isExpanded
                                  ? "text-[#00d2b1]"
                                  : "text-neutral-500"
                              }`}
                            />

                            <span className="text-[17px] font-medium tracking-[-0.02em]">
                              {item.title}
                            </span>
                          </span>

                          <ChevronDown
                            size={18}
                            className={`text-neutral-500 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Accordion Links */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: {
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                  },
                                  opacity: {
                                    duration: 0.25,
                                    delay: 0.08,
                                  },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: {
                                    duration: 0.28,
                                    ease: [0.4, 0, 1, 1],
                                  },
                                  opacity: {
                                    duration: 0.15,
                                  },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              <div className="ml-9 border-l border-white/[0.08] pl-4">
                                {(productNavigation?.items ?? []).map(
                                  (link, linkIndex) => (
                                    <motion.a
                                      key={link.label}
                                      href={link.href}
                                      initial={{
                                        opacity: 0,
                                        x: -8,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                          delay: linkIndex * 0.035,
                                          duration: 0.2,
                                        },
                                      }}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center py-3 text-[14px] text-neutral-500 transition-colors hover:text-white"
                                    >
                                      {link.label}
                                    </motion.a>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Pillar Separator */}
                        {index !== products.length - 1 && (
                          <div className="mx-3 h-px bg-white/[0.035]" />
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Global Links */}
                <motion.div
                  variants={itemVariants}
                  className="mt-7 border-t border-white/[0.06] pt-5"
                >
                  <a
                    href="#features"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 text-sm text-neutral-400 transition hover:text-white"
                  >
                    Features
                  </a>

                  <a
                    href="#pricing"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 text-sm text-neutral-400 transition hover:text-white"
                  >
                    Pricing
                  </a>
                </motion.div>
              </div>

              {/* Bottom Account Actions */}
              <motion.div
                variants={itemVariants}
                className="shrink-0 border-t border-white/[0.06] bg-[#0c0e0e] p-5 pb-[calc(20px+env(safe-area-inset-bottom))]"
              >
                <div className="flex gap-3">
                  {/* Log In */}
                  <a
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-sm font-medium text-neutral-300 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Log in
                  </a>

                  {/* Get Started */}
                  <a
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition duration-300 hover:bg-[#e8f5f2] active:scale-[0.98]"
                  >
                    Get started
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}