"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const create = async (data: any) => {
    const created = await api.createProduct(data);
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: any) => {
    const updated = await api.updateProduct(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, loading, error, refresh: fetchProducts, create, update, remove };
}
