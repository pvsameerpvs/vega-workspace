"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getSettings();
      setSettings(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const createBanner = async (data: any) => {
    const created = await api.createBanner(data);
    setSettings((prev: any) => ({
      ...prev,
      banners: [...(prev?.banners || []), created],
    }));
    return created;
  };

  const updateBanner = async (id: number, data: any) => {
    const updated = await api.updateBanner(id, data);
    setSettings((prev: any) => ({
      ...prev,
      banners: prev?.banners?.map((b: any) => (b.id === id ? { ...b, ...updated } : b)),
    }));
    return updated;
  };

  const deleteBanner = async (id: number) => {
    await api.deleteBanner(id);
    setSettings((prev: any) => ({
      ...prev,
      banners: prev?.banners?.filter((b: any) => b.id !== id),
    }));
  };

  const updateCounter = async (id: number, data: any) => {
    const updated = await api.updateCounter(id, data);
    setSettings((prev: any) => ({
      ...prev,
      stats: prev?.stats?.map((s: any) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    return updated;
  };

  const updateSeo = async (id: number, data: any) => {
    const updated = await api.updateSeo(id, data);
    setSettings((prev: any) => ({
      ...prev,
      seo: prev?.seo?.map((s: any) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    return updated;
  };

  return { settings, loading, error, refresh: fetchSettings, createBanner, updateBanner, deleteBanner, updateCounter, updateSeo };
}
