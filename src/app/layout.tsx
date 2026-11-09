import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "@/providers/ProductProvider";
export const metadata: Metadata = { title: "EarnRave — Your Complete Trading Ecosystem", description: "Journal your trades, prepare for funding challenges, build your edge, and improve your trading performance with EarnRave." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><ProductProvider>{children}</ProductProvider></body></html>; }
