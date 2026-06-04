"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type CategoryShowcase = {
  id: number;
  categoryId: number;
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  displayOrder?: number;
  isActive?: boolean;
};

export function useCategoryShowcases() {
  const [items, setItems] = useState<CategoryShowcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getCategoryShowcases();
      const list = Array.isArray(res) ? res : (res as any)?.data ?? [];
      setItems(list);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (data: Omit<CategoryShowcase, "id">) => {
    const created = await api.createCategoryShowcase(data);
    setItems((prev) => [...prev, created]);
    return created;
  };

  const update = async (id: number, data: Partial<CategoryShowcase>) => {
    const updated = await api.updateCategoryShowcase(id, data);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteCategoryShowcase(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, loading, error, refresh: fetch, create, update, remove };
}
