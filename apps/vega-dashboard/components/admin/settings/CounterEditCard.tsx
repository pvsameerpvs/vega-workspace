"use client";

import { useState } from "react";
import { Save } from "lucide-react";

interface CounterEditCardProps {
  counter: any;
  onSave: (data: any) => void;
}

export function CounterEditCard({ counter, onSave }: CounterEditCardProps) {
  const [form, setForm] = useState(counter);
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
        <label className="text-xs font-semibold text-slate-700">Label</label>
        <input value={form.label || ""} onChange={(e) => update("label", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Label (Ar)</label>
        <input value={form.labelAr || ""} onChange={(e) => update("labelAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Value</label>
        <input value={form.value || ""} onChange={(e) => update("value", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Order</label>
        <input type="number" value={form.displayOrder || 0} onChange={(e) => update("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50">
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
