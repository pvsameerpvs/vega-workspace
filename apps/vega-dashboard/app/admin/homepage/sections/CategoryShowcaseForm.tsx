"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface CategoryShowcaseFormProps {
  categories: any[];
  onCreate: (data: any) => void;
  onCancel: () => void;
}

export function CategoryShowcaseForm({ categories, onCreate, onCancel }: CategoryShowcaseFormProps) {
  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const images = [form.image1, form.image2, form.image3, form.image4];
  const setImage = (idx: number, url: string) => {
    const key = `image${idx + 1}` as keyof typeof form;
    setForm((p) => ({ ...p, [key]: url }));
  };

  const handleSubmit = () => {
    if (!form.categoryId) return;
    onCreate({
      ...form,
      categoryId: Number(form.categoryId),
      isActive: true,
    });
  };

  return (
    <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Category</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))}
            className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Title" className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
          <input value={form.titleAr} onChange={(e) => setForm((p) => ({ ...p, titleAr: e.target.value }))} placeholder="Arabic title" className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" rows={4} className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none resize-y min-h-[80px]" />
        <textarea value={form.descriptionAr} onChange={(e) => setForm((p) => ({ ...p, descriptionAr: e.target.value }))} placeholder="Arabic description" rows={4} className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none resize-y min-h-[80px]" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <ImageUpload key={i} label={`Image ${i + 1}`} value={images[i]} onChange={(url) => setImage(i, url)} />
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button onClick={handleSubmit} className="rounded-md bg-vega-yellow px-4 py-2 text-xs font-semibold text-vega-blue hover:bg-vega-yellow-dark transition-colors">
          Create Showcase
        </button>
      </div>
    </div>
  );
}
