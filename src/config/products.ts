import {
  Brain,
  Radio,
  Rocket,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

import type { Product } from "@/providers/ProductProvider";

type ProductConfig = {
  id: Product;
  title: string;
  label: string;
  icon: LucideIcon;
  href: string;
  description: string;
};

export const products: ProductConfig[] = [
  {
    id: "analytics",
    title: "AI-Analytics",
    label: "AI-Analytics",
    icon: Brain,
    href: "#analytics",
    description: "Understand your performance and identify your trading edge.",
  },
  {
    id: "signals",
    title: "Signals",
    label: "Signals",
    icon: Radio,
    href: "#signals",
    description: "Find structured trade opportunities and setups.",
  },
  {
    id: "funding",
    title: "Funding",
    label: "Funding",
    icon: Rocket,
    href: "#funding",
    description: "Prepare for prop firm challenges and manage risk.",
  },
  {
    id: "insights",
    title: "Insights",
    label: "Insights",
    icon: Lightbulb,
    href: "#insights",
    description: "Stay informed with market research and analysis.",
  },
];