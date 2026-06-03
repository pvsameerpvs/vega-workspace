"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type SpotlightItem = {
  id: number;
  title?: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  image?: string;
  link?: string;
  linkType?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function useSpotlight() {
  const [items, setItems] = useState<SpotlightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getSpotlightItems();
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

  const create = async (data: Omit<SpotlightItem, "id">) => {
    const created = await api.createSpotlightItem(data);
    setItems((prev) => [...prev, created]);
    return created;
  };

  const update = async (id: number, data: Partial<SpotlightItem>) => {
    const updated = await api.updateSpotlightItem(id, data);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteSpotlightItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const reorder = async (id: number, newOrder: number) => {
    await api.updateSpotlightItem(id, { displayOrder: newOrder });
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, displayOrder: newOrder } : item))
    );
  };

  return { items, loading, error, refresh: fetch, create, update, remove, reorder };
}
