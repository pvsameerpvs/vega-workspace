"use client";

import { useState } from "react";
import { slugify } from "@vega/utils";

export type BlogFormData = {
  title?: string;
  titleAr?: string;
  slug?: string;
  category?: string;
  author?: string;
  excerpt?: string;
  excerptAr?: string;
  content?: string;
  contentAr?: string;
  featuredImage?: string;
};

export function useBlogForm(initial: BlogFormData = {}) {
  const [form, setForm] = useState<BlogFormData>(initial);

  const update = (k: keyof BlogFormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setTitle = (title: string) => {
    update("title", title);
    update("slug", slugify(title));
  };

  const reset = () => setForm({});

  return { form, setForm, update, setTitle, reset };
}
