"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type Product = "analytics" | "signals" | "funding" | "education";

type ContextValue = {
  product: Product;
  setProduct: (product: Product) => void;
};

const Context = createContext<ContextValue | null>(null);

function getProductFromPathname(pathname: string): Product {
  if (pathname.startsWith("/signals")) return "signals";
  if (pathname.startsWith("/funding")) return "funding";
  if (pathname.startsWith("/education")) return "education";
  return "analytics";
}

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product>(() =>
    getProductFromPathname(pathname)
  );

  useEffect(() => {
    setProduct(getProductFromPathname(pathname));
  }, [pathname]);

  return (
    <Context.Provider value={{ product, setProduct }}>
      {children}
    </Context.Provider>
  );
}

export function useProduct() {
  const value = useContext(Context);

  if (!value) {
    throw new Error("useProduct must be used within ProductProvider");
  }

  return value;
}

export default ProductProvider;