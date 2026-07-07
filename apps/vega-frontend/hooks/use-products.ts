"use client";

import { useState, useEffect } from "react";
import { getProducts, mapProductToFrontend } from "@/lib/api";

let cachedProducts: any[] | null = null;
let fetchPromise: Promise<any[]> | null = null;

export function useProducts() {
  const [products, setProducts] = useState<any[]>(cachedProducts || []);

  useEffect(() => {
    if (cachedProducts) return;

    if (!fetchPromise) {
      fetchPromise = getProducts().then((data) => {
        const mapped = (data || []).map(mapProductToFrontend).filter(Boolean) as any[];
        cachedProducts = mapped;
        return mapped;
      });
    }

    fetchPromise.then(setProducts);
  }, []);

  return products;
}
