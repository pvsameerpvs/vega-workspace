"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export interface HomepageConfig {
  spotlight?: any[];
  featuredProducts?: Record<string, number[]>;
  limitedDeals?: any[];
  testimonials?: any[];
  popularCategories?: number[];
  businessSolutions?: any[];
  videos?: any[];
  sectionVisibility?: Record<string, boolean>;
}

export function useHomepage() {
  const [config, setConfig] = useState<HomepageConfig>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getHomepageConfig();
      setConfig(data || {});
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  const saveConfig = useCallback(
    async (partial: Partial<HomepageConfig>) => {
      setSaving(true);
      try {
        const next = { ...config, ...partial };
        await api.updateHomepageConfig(next);
        setConfig(next);
        return true;
      } catch (e: any) {
        setError(e.message || "Failed to save");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [config]
  );

  return { config, loading, error, saving, refresh: fetchConfig, saveConfig };
}
