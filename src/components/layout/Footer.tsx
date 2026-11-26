import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "AI-Analytics", href: "/" },
  { label: "Signals", href: "/signals" },
  { label: "Funding", href: "/funding" },
  { label: "Education", href: "/education" },
];

const platformLinks = [
  { label: "Features", href: "/#why-choose-us" },
  { label: "Pricing", href: "/signals#pricing" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#070909]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="EarnRave home" className="inline-flex">
              <Image
                src="/earnrave-logo.svg"
                alt="EarnRave"
                width={160}
                height={40}
                className="h-auto w-[160px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
              Tools, guides, and intelligence to help traders make clearer
              decisions and build steady habits.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              Products
            </h3>

            <ul className="space-y-4">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              Platform
            </h3>

            <ul className="space-y-4">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/[0.06]" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} EarnRave. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-neutral-600 transition-colors duration-200 hover:text-neutral-300"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-neutral-600 transition-colors duration-200 hover:text-neutral-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}