import { z } from "zod";
import { slugify } from "@vega/utils";

export const blogSchema = z.object({
  title: z.string().min(1).max(255),
  titleAr: z.string().max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  category: z.string().max(100).optional(),
  author: z.string().max(255).optional(),
  excerpt: z.string().optional(),
  excerptAr: z.string().optional(),
  content: z.string().optional(),
  contentAr: z.string().optional(),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  publishDate: z.string().datetime().optional(),
  seoTitle: z.string().max(255).optional(),
  seoDescription: z.string().optional(),
  focusKeyword: z.string().max(255).optional(),
});

export function ensureBlogSlug(body: any): any {
  if (!body.slug || String(body.slug).trim() === "") {
    body.slug = slugify(body.title || "blog-post");
  }
  return body;
}

export function normalizeBlogDates(body: any): any {
  if (body.publishDate && typeof body.publishDate === "string") {
    body.publishDate = new Date(body.publishDate);
  }
  if (body.publishDate && !(body.publishDate instanceof Date)) {
    delete body.publishDate;
  }
  return body;
}
