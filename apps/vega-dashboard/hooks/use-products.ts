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
  deliveryAvailable?: boolean;
  installationAvailable?: boolean;
  mainImage?: string;
  image?: string;
  gallery?: string[];
  shortDescription?: string;
  shortDescriptionAr?: string;
  fullDescription?: string;
  fullDescriptionAr?: string;
  color?: string;
  design?: string;
  material?: string;
  weight?: string;
  dimensions?: string;
  fittingType?: string;
  features?: string;
  featuresAr?: string;
  warranty?: string;
  brand?: string;
  country?: string;
  bulkAvailable?: boolean;
  bulkQuantityNote?: string;
  wholesaleDiscountNote?: string;
  deliveryInfo?: string;
  installation?: string;
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
