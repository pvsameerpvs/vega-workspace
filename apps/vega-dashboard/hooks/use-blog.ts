"use client";

import { useCrud } from "./use-crud";
import { api } from "@/lib/api";

export type Blog = {
  id: number;
  title: string;
  titleAr?: string;
  slug: string;
  category?: string;
  categoryAr?: string;
  author?: string;
  excerpt?: string;
  excerptAr?: string;
  content?: string;
  contentAr?: string;
  featuredImage?: string;
  status: string;
  publishDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function useBlog() {
  return useCrud<Blog>(
    () => api.getBlogs(),
    (data) => api.createBlog(data),
    (id, data) => api.updateBlog(id, data),
    (id) => api.deleteBlog(id)
  );
}
