"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";

interface CategoryDialogContentProps {
  form: any;
  update: (k: string, v: any) => void;
}

export function CategoryDialogContent({ form, update }: CategoryDialogContentProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Name</label>
          <input value={form.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Category name" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
          <input value={form.nameAr || ""} onChange={(e) => update("nameAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الاسم" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Slug</label>
        <input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="category-slug" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
        <textarea rows={3} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Description" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Description (Arabic)</label>
        <textarea rows={3} value={form.descriptionAr || ""} onChange={(e) => update("descriptionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الوصف" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Display Order</label>
          <input type="number" value={form.displayOrder || 0} onChange={(e) => update("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={!!form.isActive} onChange={(e) => update("isActive", e.target.checked)} />
            Active
          </label>
        </div>
      </div>
      <ImageUpload folder="categories" value={form.image} onChange={(url) => update("image", url)} label="Category Image" />
      <ImageUpload folder="categories" value={form.banner} onChange={(url) => update("banner", url)} label="Banner Image" />
    </div>
  );
}
