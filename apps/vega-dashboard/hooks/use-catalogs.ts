"use client";

import { useState, useCallback } from "react";
import { useCrud } from "./use-crud";
import { api } from "@/lib/api";

export type Catalog = {
  id: number;
  title: string;
  titleAr?: string;
  category?: string;
  categoryAr?: string;
  description?: string;
  descriptionAr?: string;
  coverImage?: string;
  pdfFile?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  categories?: { id: number; name: string; nameAr?: string; slug: string }[];
};

export type CatalogDetail = Catalog & {
  categories: (CatalogCategory & { products: CatalogProduct[] })[];
};

export type CatalogCategory = {
  categoryId: number;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
};

export type CatalogProduct = {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
  sku: string;
  mainImage?: string;
  status: string;
};

export function useCatalogs() {
  const crud = useCrud<Catalog>(
    () => api.getCatalogs(),
    (data) => api.createCatalog(data),
    (id, data) => api.updateCatalog(id, data),
    (id) => api.deleteCatalog(id)
  );

  const [detail, setDetail] = useState<CatalogDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchDetail = useCallback(async (id: number) => {
    setDetailLoading(true);
    try {
      const data = await api.getCatalog(id);
      setDetail(data);
    } catch (e) {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const linkCategory = useCallback(async (catalogId: number, categoryId: number) => {
    await api.linkCategoryToCatalog(catalogId, categoryId);
    if (detail && detail.id === catalogId) {
      await fetchDetail(catalogId);
    }
    await crud.refresh();
  }, [detail, fetchDetail, crud]);

  const unlinkCategory = useCallback(async (catalogId: number, categoryId: number) => {
    await api.unlinkCategoryFromCatalog(catalogId, categoryId);
    if (detail && detail.id === catalogId) {
      await fetchDetail(catalogId);
    }
    await crud.refresh();
  }, [detail, fetchDetail, crud]);

  return {
    ...crud,
    detail,
    detailLoading,
    fetchDetail,
    linkCategory,
    unlinkCategory,
  };
}
