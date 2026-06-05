"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type Career = {
  id: number;
  title: string;
  titleAr?: string;
  department?: string;
  departmentAr?: string;
  location?: string;
  locationAr?: string;
  jobType?: string;
  jobTypeAr?: string;
  salaryRange?: string;
  description?: string;
  descriptionAr?: string;
  requirements?: string;
  requirementsAr?: string;
  experienceRequired?: string;
  experienceRequiredAr?: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Application = {
  id: number;
  careerId: number;
  fullName: string;
  email?: string;
  phone?: string;
  position?: string;
  experience?: string;
  cvUrl?: string;
  message?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export function useCareers() {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    try {
      const [j, a] = await Promise.all([api.getCareers(), api.getApplications()]);
      const jobsList = Array.isArray(j) ? j : (j as any)?.data ?? [];
      const appsList = Array.isArray(a) ? a : (a as any)?.data ?? [];
      setJobs(jobsList);
      setApplications(appsList);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCareers(); }, [fetchCareers]);

  const create = async (data: Omit<Career, "id">) => {
    const created = await api.createCareer(data);
    setJobs((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: Partial<Career>) => {
    const updated = await api.updateCareer(id, data);
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteCareer(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const updateAppStatus = async (id: number, status: string) => {
    const updated = await api.updateApplicationStatus(id, status);
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
    return updated;
  };

  const removeApplication = async (id: number) => {
    await api.deleteApplication(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return { jobs, applications, loading, error, refresh: fetchCareers, create, update, remove, updateAppStatus, removeApplication };
}
