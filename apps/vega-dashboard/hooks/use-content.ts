"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getBlogs();
      setBlogs(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const create = async (data: any) => {
    const created = await api.createBlog(data);
    setBlogs((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: any) => {
    const updated = await api.updateBlog(id, data);
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return { blogs, loading, error, refresh: fetchBlogs, create, update, remove };
}

export function useGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getGallery();
      setItems(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const create = async (data: any) => {
    const created = await api.createGallery(data);
    setItems((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: any) => {
    const updated = await api.updateGallery(id, data);
    setItems((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteGallery(id);
    setItems((prev) => prev.filter((g) => g.id !== id));
  };

  return { items, loading, error, refresh: fetchGallery, create, update, remove };
}

export function useCatalogs() {
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCatalogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCatalogs();
      setCatalogs(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCatalogs(); }, [fetchCatalogs]);

  const create = async (data: any) => {
    const created = await api.createCatalog(data);
    setCatalogs((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: any) => {
    const updated = await api.updateCatalog(id, data);
    setCatalogs((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteCatalog(id);
    setCatalogs((prev) => prev.filter((c) => c.id !== id));
  };

  return { catalogs, loading, error, refresh: fetchCatalogs, create, update, remove };
}

export function useTeam() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getTeam();
      setMembers(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTeam(); }, [fetchTeam]);

  const create = async (data: any) => {
    const created = await api.createTeam(data);
    setMembers((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: any) => {
    const updated = await api.updateTeam(id, data);
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteTeam(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return { members, loading, error, refresh: fetchTeam, create, update, remove };
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getFaqs();
      setFaqs(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]);

  const create = async (data: any) => {
    const created = await api.createFaq(data);
    setFaqs((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: number, data: any) => {
    const updated = await api.updateFaq(id, data);
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
    return updated;
  };

  const remove = async (id: number) => {
    await api.deleteFaq(id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return { faqs, loading, error, refresh: fetchFaqs, create, update, remove };
}

export function useCareers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    try {
      const [j, a] = await Promise.all([api.getCareers(), api.getApplications()]);
      setJobs(j);
      setApplications(a);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCareers(); }, [fetchCareers]);

  const create = async (data: any) => {
    const created = await api.createCareer(data);
    setJobs((prev) => [created, ...prev]);
    return created;
  };

  const remove = async (id: number) => {
    await api.deleteCareer(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return { jobs, applications, loading, error, refresh: fetchCareers, create, remove };
}

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
    } catch (e: any) {
      setError(e.message);
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
