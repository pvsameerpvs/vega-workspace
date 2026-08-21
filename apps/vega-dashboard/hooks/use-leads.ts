"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type Lead = {
  id: number;
  name: string;
  companyName?: string;
  email?: string;
  phone?: string;
  productName?: string;
  sku?: string;
  quantity?: string;
  location?: string;
  message?: string;
  status: string;
  sourcePage?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getLeads();
      const list = Array.isArray(res) ? res : (res as any)?.data ?? [];
      setLeads(list);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
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

  const updateLead = async (id: number, data: Partial<Lead>) => {
    const updated = await api.updateLead(id, data);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
    return updated;
  };

  const deleteLead = async (id: number) => {
    await api.deleteLead(id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const createLead = async (data: Omit<Lead, "id">) => {
    const created = await api.createLead(data);
    setLeads((prev) => [created, ...prev]);
    return created;
  };

  return { leads, loading, error, refresh: fetchLeads, updateStatus, updateLead, deleteLead, createLead };
}
