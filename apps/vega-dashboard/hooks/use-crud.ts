"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export interface CrudHook<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  create: (data: any) => Promise<T>;
  update: (id: number, data: any) => Promise<T>;
  remove: (id: number) => Promise<void>;
}

export function useCrud<T extends { id: number }>(
  fetcher: () => Promise<T[]>,
  creator: (data: any) => Promise<T>,
  updater: (id: number, data: any) => Promise<T>,
  deleter: (id: number) => Promise<void>
): CrudHook<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetcher();
      setItems(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (data: Omit<T, "id">) => {
    const created = await creator(data);
    setItems((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: Partial<T>) => {
    const updated = await updater(id, data);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    return updated;
  };

  const remove = async (id: number) => {
    await deleter(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, loading, error, refresh: fetch, create, update, remove };
}
