"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type PopularCategory = {
  id: number;
  name: string;
  nameAr?: string;
  image?: string;
  link?: string;
  displayOrder?: number;
  isActive?: boolean;
};

export function usePopularCategories() {
  const [items, setItems] = useState<PopularCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getPopularCategories();
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

  const create = async (data: Omit<PopularCategory, "id">) => {
    const created = await api.createPopularCategory(data);
    setItems((prev) => [...prev, created]);
    return created;
  };

  const update = async (id: number, data: Partial<PopularCategory>) => {
    const updated = await api.updatePopularCategory(id, data);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deletePopularCategory(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, loading, error, refresh: fetch, create, update, remove };
}
