"use client";

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
};

export function useCatalogs() {
  return useCrud<Catalog>(
    () => api.getCatalogs(),
    (data) => api.createCatalog(data),
    (id, data) => api.updateCatalog(id, data),
    (id) => api.deleteCatalog(id)
  );
}
