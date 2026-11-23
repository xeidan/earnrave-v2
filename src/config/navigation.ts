import type { Product } from "@/providers/ProductProvider";

type NavigationItem = {
  label: string;
  href: string;
};

type ProductNavigation = {
  product: string;
  items: NavigationItem[];
};

export const navigation: Record<Product, ProductNavigation> = {
  analytics: {
    product: "AI-Analytics",
    items: [
      { label: "Overview", href: "#analytics" },
      { label: "Performance", href: "#performance" },
      { label: "Trade Journal", href: "#journal" },
      { label: "AI Review", href: "#feedback" },
    ],
  },

  signals: {
    product: "Signals",
    items: [
      { label: "Live Signals", href: "#signals" },
      { label: "Trade Setups", href: "#setups" },
      { label: "Performance", href: "#performance" },
      { label: "Pricing", href: "#pricing" },
    ],
  },

  funding: {
    product: "Funding",
    items: [
      { label: "Challenges", href: "#funding" },
      { label: "Preparation", href: "#preparation" },
      { label: "Risk Management", href: "#risk" },
      { label: "Resources", href: "#resources" },
    ],
  },

  insights: {
    product: "Insights",
    items: [
      { label: "Market Overview", href: "#markets" },
      { label: "Research", href: "#research" },
      { label: "Education", href: "#education" },
      { label: "Weekly Analysis", href: "#weekly-analysis" },
    ],
  },
};