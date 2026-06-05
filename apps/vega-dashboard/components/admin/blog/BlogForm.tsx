"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { BlogFormData } from "@/hooks/use-blog-form";

interface BlogFormProps {
  form: BlogFormData;
  onChange: (k: keyof BlogFormData, v: string) => void;
  onTitleChange: (title: string) => void;
}

export function BlogForm({ form, onChange, onTitleChange }: BlogFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
          <input
            value={form.title || ""}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
            placeholder="Post title"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
          <input
            value={form.titleAr || ""}
            onChange={(e) => onChange("titleAr", e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
            placeholder="العنوان"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Category</label>
          <input
            value={form.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
            placeholder="Category"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Author</label>
          <input
            value={form.author || ""}
            onChange={(e) => onChange("author", e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
            placeholder="Author name"
          />
        </div>
      </div>
      <ImageUpload
        folder="blog"
        value={form.featuredImage}
        onChange={(url) => onChange("featuredImage", url)}
        label="Featured Image"
      />
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Excerpt</label>
        <textarea
          rows={3}
          value={form.excerpt || ""}
          onChange={(e) => onChange("excerpt", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          placeholder="Short excerpt"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Excerpt (Arabic)</label>
        <textarea
          rows={3}
          value={form.excerptAr || ""}
          onChange={(e) => onChange("excerptAr", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          placeholder="مقتطف قصير"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Content</label>
        <textarea
          rows={5}
          value={form.content || ""}
          onChange={(e) => onChange("content", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          placeholder="Full content"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Content (Arabic)</label>
        <textarea
          rows={5}
          value={form.contentAr || ""}
          onChange={(e) => onChange("contentAr", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          placeholder="المحتوى الكامل"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Slug</label>
        <input
          value={form.slug || ""}
          onChange={(e) => onChange("slug", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          placeholder="blog-post-slug"
        />
      </div>
    </div>
  );
}
