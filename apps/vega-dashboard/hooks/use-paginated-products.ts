"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/lib/api";

export interface PaginatedState {
  items: any[];
  loading: boolean;
  page: number;
  total: number;
  totalPages: number;
  search: string;
  categoryId: number | null;
  subcategoryId: number | null;
  setPage: (p: number) => void;
  setSearch: (s: string) => void;
  setCategoryId: (id: number | null) => void;
  setSubcategoryId: (id: number | null) => void;
  refresh: () => void;
}

export function usePaginatedProducts(initialLimit = 20): PaginatedState {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const fetchIdRef = useRef(0);

  const fetch = useCallback(async (p: number, s: string, catId: number | null, subId: number | null) => {
    const id = ++fetchIdRef.current;
    setLoading(true);
    try {
      const res = await api.getProductsPaginated(
        p, limit, s || undefined,
        catId ?? undefined,
        subId ?? undefined,
      );
      if (id !== fetchIdRef.current) return;
      setItems(res.data || []);
      setTotal(res.meta?.total || 0);
      setTotalPages(res.meta?.totalPages || 0);
    } catch {
      if (id !== fetchIdRef.current) return;
      setItems([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      if (id === fetchIdRef.current) setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch(page, search, categoryId, subcategoryId);
  }, [page, search, categoryId, subcategoryId, fetch]);

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const handleSetSearch = useCallback((s: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(s);
      setPage(1);
    }, 300);
  }, []);

  const refresh = useCallback(() => {
    fetch(page, search, categoryId, subcategoryId);
  }, [fetch, page, search, categoryId, subcategoryId]);

  const handleSetCategoryId = useCallback((id: number | null) => {
    setCategoryId(id);
    setSubcategoryId(null);
    setPage(1);
  }, []);

  const handleSetSubcategoryId = useCallback((id: number | null) => {
    setSubcategoryId(id);
    setPage(1);
  }, []);

  return {
    items, loading, page, total, totalPages,
    search, categoryId, subcategoryId,
    setPage,
    setSearch: handleSetSearch,
    setCategoryId: handleSetCategoryId,
    setSubcategoryId: handleSetSubcategoryId,
    refresh,
  };
}