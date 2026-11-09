"use client";
import { createContext, useContext, useState } from "react";
export type Product = "journal" | "tools" | "funding" | "academy" | "ai";
type ContextValue = { product: Product; setProduct: (product: Product) => void };
const Context = createContext<ContextValue | null>(null);
export function ProductProvider({ children }: { children: React.ReactNode }) { const [product,setProduct] = useState<Product>("journal"); return <Context.Provider value={{product,setProduct}}>{children}</Context.Provider>; }
export function useProduct() { const value = useContext(Context); if (!value) throw new Error("useProduct must be used within ProductProvider"); return value; }
