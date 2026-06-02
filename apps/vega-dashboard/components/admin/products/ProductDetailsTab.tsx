"use client";

import { Input } from "@vega/ui";

interface ProductDetailsTabProps {
  form: any;
  update: (key: string, value: any) => void;
}

export function ProductDetailsTab({ form, update }: ProductDetailsTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Short Description</label>
        <textarea value={form.shortDescription || ""} onChange={(e) => update("shortDescription", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Short Description (Arabic)</label>
        <textarea value={form.shortDescriptionAr || ""} onChange={(e) => update("shortDescriptionAr", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Color</label>
          <Input value={form.color || ""} onChange={(e) => update("color", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Material</label>
          <Input value={form.material || ""} onChange={(e) => update("material", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Weight</label>
          <Input value={form.weight || ""} onChange={(e) => update("weight", e.target.value)} />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Dimensions</label>
        <Input value={form.dimensions || ""} onChange={(e) => update("dimensions", e.target.value)} />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.deliveryAvailable} onChange={(e) => update("deliveryAvailable", e.target.checked)} />
          Delivery Available
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.installationAvailable} onChange={(e) => update("installationAvailable", e.target.checked)} />
          Installation Available
        </label>
      </div>
    </div>
  );
}
