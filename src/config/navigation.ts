import type { Product } from "@/providers/ProductProvider";

export type NavigationItem = {
  label: string;
  href: string;
};

export type ProductNavigation = {
  product: string;
  items: NavigationItem[];
};

export const navigation: Record<Product, ProductNavigation> = {
  analytics: {
    product: "AI-Analytics",
    items: [
      { label: "AI Assistant", href: "/#ai-assistant" },
      { label: "Connect Broker", href: "/#connect-broker" },
      { label: "Why Choose Us", href: "/#why-choose-us" },
      { label: "FAQ", href: "/#faq" },
    ],
  },

  signals: {
    product: "Signals",
    items: [
      { label: "Trade Ideas", href: "/signals#live-ideas" },
      { label: "Past Results", href: "/signals#results" },
      { label: "Pricing", href: "/signals#pricing" },
    ],
  },

  funding: {
    product: "Funding",
    items: [
      { label: "Risk Calculator", href: "/funding#calculator" },
      { label: "3 Stages", href: "/funding#steps" },
    ],
  },

  education: {
    product: "Education",
    items: [
      { label: "Weekly Outlook", href: "/education#outlooks" },
      { label: "Beginner Class", href: "/education#beginner-class" },
    ],
  },
};