"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export type Category = {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  banner?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Subcategory = {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  displayOrder?: number;
  isActive?: boolean;
  categoryId?: number;
  createdAt?: string;
  updatedAt?: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Record<number, Subcategory[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);
      const subsMap: Record<number, Subcategory[]> = {};
      await Promise.all(
        data.map(async (cat: Category) => {
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const createCategory = async (data: Omit<Category, "id">) => {
    const created = await api.createCategory(data);
    setCategories((prev) => [...prev, created]);
    setSubcategories((prev) => ({ ...prev, [created.id]: [] }));
    return created;
  };

  const updateCategory = async (id: number, data: Partial<Category>) => {
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

  const createSubcategory = async (categoryId: number, data: Omit<Subcategory, "id">) => {
    const created = await api.createSubcategory(categoryId, data);
    setSubcategories((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), created],
    }));
    return created;
  };

  const updateSubcategory = async (id: number, categoryId: number, data: Partial<Subcategory>) => {
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
