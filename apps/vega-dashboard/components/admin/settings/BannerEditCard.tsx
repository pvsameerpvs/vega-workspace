"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Save, Trash2 } from "lucide-react";

interface BannerEditCardProps {
  banner: any;
  onSave: (data: any) => void;
  onDelete: () => void;
}

export function BannerEditCard({ banner, onSave, onDelete }: BannerEditCardProps) {
  const [form, setForm] = useState(banner);
  const [saving, setSaving] = useState(false);

  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
      <div className="flex gap-4 items-start">
        <div className="w-40">
          <ImageUpload value={form.image} onChange={(url) => update("image", url)} folder="banners" label="Banner Image" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Title</label>
              <input value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Banner title" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Title (Arabic)</label>
              <input value={form.titleAr || ""} onChange={(e) => update("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Subtitle</label>
              <textarea rows={2} value={form.subtitle || ""} onChange={(e) => update("subtitle", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Short description" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Subtitle (Arabic)</label>
              <textarea rows={2} value={form.subtitleAr || ""} onChange={(e) => update("subtitleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الوصف" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">CTA Text</label>
              <input value={form.ctaText || ""} onChange={(e) => update("ctaText", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. Request a Quote" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">CTA Text (Arabic)</label>
              <input value={form.ctaTextAr || ""} onChange={(e) => update("ctaTextAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. اطلب عرض سعر" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">CTA Link</label>
              <input value={form.ctaLink || ""} onChange={(e) => update("ctaLink", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="/contact-us" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Text</label>
              <input value={form.ctaSecondaryText || ""} onChange={(e) => update("ctaSecondaryText", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. View Products" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Text (Arabic)</label>
              <input value={form.ctaSecondaryTextAr || ""} onChange={(e) => update("ctaSecondaryTextAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. عرض المنتجات" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Link</label>
              <input value={form.ctaSecondaryLink || ""} onChange={(e) => update("ctaSecondaryLink", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="/products" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Display Order</label>
              <input type="number" value={form.displayOrder || 0} onChange={(e) => update("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Slide Duration (ms)</label>
              <input type="number" value={form.slideDuration || 6000} onChange={(e) => update("slideDuration", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
            </div>
            <div className="flex items-center gap-4 pt-5">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => update("isActive", e.target.checked)} />
                Active
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onDelete} className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50">
          <Trash2 className="h-4 w-4" /> Delete
        </button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Banner"}
        </button>
      </div>
    </div>
  );
}
