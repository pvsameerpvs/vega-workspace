"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";

interface CategoryShowcaseDialogContentProps {
  form: any;
  update: (k: string, v: any) => void;
  categories: any[];
}

export function CategoryShowcaseDialogContent({ form, update, categories }: CategoryShowcaseDialogContentProps) {
  const images = [form.image1, form.image2, form.image3, form.image4];

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Category</label>
        <select
          value={form.categoryId || ""}
          onChange={(e) => update("categoryId", Number(e.target.value))}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
          <input value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Showcase title" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
          <input value={form.titleAr || ""} onChange={(e) => update("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
          <textarea rows={4} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none resize-y" placeholder="Showcase description" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Description (Arabic)</label>
          <textarea rows={4} value={form.descriptionAr || ""} onChange={(e) => update("descriptionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none resize-y" placeholder="الوصف" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-700">Images</label>
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <ImageUpload key={i} label={`Image ${i + 1}`} value={images[i]} onChange={(url) => update(`image${i + 1}`, url)} />
          ))}
        </div>
      </div>
    </div>
  );
}
