"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);
      // Fetch subcategories for each category
      const subsMap: Record<number, any[]> = {};
      await Promise.all(
        data.map(async (cat: any) => {
          try {
            const subs = await api.getSubcategories(cat.id);
            subsMap[cat.id] = subs;
          } catch {
            subsMap[cat.id] = [];
          }
        })
      );
      setSubcategories(subsMap);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const createCategory = async (data: any) => {
    const created = await api.createCategory(data);
    setCategories((prev) => [...prev, created]);
    setSubcategories((prev) => ({ ...prev, [created.id]: [] }));
    return created;
  };

  const updateCategory = async (id: number, data: any) => {
    const updated = await api.updateCategory(id, data);
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    return updated;
  };

  const deleteCategory = async (id: number) => {
    await api.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setSubcategories((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const createSubcategory = async (categoryId: number, data: any) => {
    const created = await api.createSubcategory(categoryId, data);
    setSubcategories((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), created],
    }));
    return created;
  };

  const updateSubcategory = async (id: number, categoryId: number, data: any) => {
    const updated = await api.updateSubcategory(id, data);
    setSubcategories((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    return updated;
  };

  const deleteSubcategory = async (id: number, categoryId: number) => {
    await api.deleteSubcategory(id);
    setSubcategories((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).filter((s) => s.id !== id),
    }));
  };

  return {
    categories,
    subcategories,
    loading,
    error,
    refresh: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  };
}
