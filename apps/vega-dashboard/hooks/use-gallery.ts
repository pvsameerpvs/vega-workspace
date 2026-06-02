"use client";

import { useCrud } from "./use-crud";
import { api } from "@/lib/api";

export type GalleryItem = {
  id: number;
  title?: string;
  titleAr?: string;
  category?: string;
  categoryAr?: string;
  altText?: string;
  altTextAr?: string;
  image: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function useGallery() {
  return useCrud<GalleryItem>(
    () => api.getGallery(),
    (data) => api.createGallery(data),
    (id, data) => api.updateGallery(id, data),
    (id) => api.deleteGallery(id)
  );
}
