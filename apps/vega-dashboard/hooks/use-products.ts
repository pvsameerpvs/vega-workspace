"use client";

import { useCrud } from "./use-crud";
import { api } from "@/lib/api";

export type Product = {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
  sku?: string;
  status: string;
  price?: number | null;
  showPrice?: boolean;
  categoryId?: number | null;
  subcategoryId?: number | null;
  isFeatured?: boolean;
  isPopular?: boolean;
  availabilityStatus?: string;
  deliveryAvailable?: boolean;
  installationAvailable?: boolean;
  mainImage?: string;
  image?: string;
  gallery?: string[];
  shortDescription?: string;
  shortDescriptionAr?: string;
  color?: string;
  material?: string;
  weight?: string;
  dimensions?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function useProducts() {
  return useCrud<Product>(
    () => api.getProducts(),
    (data) => api.createProduct(data),
    (id, data) => api.updateProduct(id, data),
    (id) => api.deleteProduct(id)
  );
}
