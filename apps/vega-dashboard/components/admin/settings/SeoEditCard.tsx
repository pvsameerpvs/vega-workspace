"use client";

import { useState } from "react";
import { Save } from "lucide-react";

interface SeoEditCardProps {
  seo: any;
  onSave: (data: any) => void;
}

export function SeoEditCard({ seo, onSave }: SeoEditCardProps) {
  const [form, setForm] = useState(seo);
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
      <div>
        <label className="text-xs font-semibold text-slate-700">Page</label>
        <input value={form.page || ""} onChange={(e) => update("page", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Meta Title</label>
        <input value={form.metaTitle || ""} onChange={(e) => update("metaTitle", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Meta Description</label>
        <textarea rows={3} value={form.metaDescription || ""} onChange={(e) => update("metaDescription", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50">
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save SEO"}
      </button>
    </div>
  );
}
