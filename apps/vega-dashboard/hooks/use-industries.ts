"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type Industry = {
  id: number;
  name: string;
  nameAr?: string;
  icon?: string;
  description?: string;
  descriptionAr?: string;
  displayOrder?: number;
  isActive?: boolean;
};

export function useIndustries() {
  const [items, setItems] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getIndustries();
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

  const create = async (data: Omit<Industry, "id">) => {
    const created = await api.createIndustry(data);
    setItems((prev) => [...prev, created]);
    return created;
  };

  const update = async (id: number, data: Partial<Industry>) => {
    const updated = await api.updateIndustry(id, data);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteIndustry(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, loading, error, refresh: fetch, create, update, remove };
}
