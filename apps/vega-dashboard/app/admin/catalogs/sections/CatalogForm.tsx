"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";

interface Props {
  form: any;
  updateForm: (k: string, v: any) => void;
}

export function CatalogForm({ form, updateForm }: Props) {
  const [allCats, setAllCats] = useState<any[]>([]);
  const selected: number[] = form.categoryIds || [];

  useEffect(() => {
    api.getCategories().then((res) => {
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setAllCats(list);
    });
  }, []);

  const toggle = (id: number) => {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    updateForm("categoryIds", next);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
          <input value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Catalog title" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
          <input value={form.titleAr || ""} onChange={(e) => updateForm("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="عنوان الكتالوج" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Linked Categories</label>
        <div className="max-h-40 overflow-y-auto rounded-md border border-slate-200 p-2 space-y-1">
          {allCats.length === 0 && <p className="text-xs text-slate-400 py-1">No categories found. Create categories first.</p>}
          {allCats.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
              <input type="checkbox" checked={selected.includes(cat.id)} onChange={() => toggle(cat.id)} className="rounded border-slate-300 text-vega-blue focus:ring-vega-blue" />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
        <textarea rows={3} value={form.description || ""} onChange={(e) => updateForm("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Description" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Description (Arabic)</label>
        <textarea rows={3} value={form.descriptionAr || ""} onChange={(e) => updateForm("descriptionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الوصف" />
      </div>
      <ImageUpload folder="catalogs" value={form.coverImage} onChange={(url) => updateForm("coverImage", url)} label="Cover Image" />
      <FileUpload folder="catalogs" value={form.pdfFile} onChange={(url) => updateForm("pdfFile", url)} label="PDF File" accept="application/pdf" />
    </div>
  );
}
