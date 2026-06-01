"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getLeads();
      setLeads(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id: number, status: string) => {
    const updated = await api.updateLeadStatus(id, status);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
    return updated;
  };

  return { leads, loading, error, refresh: fetchLeads, updateStatus };
}
