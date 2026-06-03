"use client";

import { Input } from "@vega/ui";

interface ProductDetailsTabProps {
  form: any;
  update: (key: string, value: any) => void;
  lang?: "en" | "ar";
}

export function ProductDetailsTab({ form, update, lang = "ar" }: ProductDetailsTabProps) {
  const isAR = lang === "ar";

  return (
    <div className="space-y-4">
      {/* Short Description */}
      <div className={isAR ? "order-2" : "order-1"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Short Description</label>
        <textarea value={form.shortDescription || ""} onChange={(e) => update("shortDescription", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div className={isAR ? "order-1" : "order-2"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Short Description (Arabic)</label>
        <textarea value={form.shortDescriptionAr || ""} onChange={(e) => update("shortDescriptionAr", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" dir="rtl" lang="ar" />
      </div>

      {/* Full Description */}
      <div className={isAR ? "order-2" : "order-1"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Full Description</label>
        <textarea value={form.fullDescription || ""} onChange={(e) => update("fullDescription", e.target.value)} rows={6} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Detailed product description..." />
      </div>
      <div className={isAR ? "order-1" : "order-2"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Full Description (Arabic)</label>
        <textarea value={form.fullDescriptionAr || ""} onChange={(e) => update("fullDescriptionAr", e.target.value)} rows={6} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="وصف المنتج التفصيلي..." dir="rtl" lang="ar" />
      </div>

      {/* Physical Specs */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Available Colours</label>
          <Input value={form.color || ""} onChange={(e) => update("color", e.target.value)} placeholder="e.g. Black/Cooper/Blue" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Design</label>
          <Input value={form.design || ""} onChange={(e) => update("design", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Material</label>
          <Input value={form.material || ""} onChange={(e) => update("material", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Weight</label>
          <Input value={form.weight || ""} onChange={(e) => update("weight", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Fitting</label>
          <Input value={form.fittingType || ""} onChange={(e) => update("fittingType", e.target.value)} placeholder="e.g. Height Adjustable" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Dimensions</label>
          <Input value={form.dimensions || ""} onChange={(e) => update("dimensions", e.target.value)} />
        </div>
      </div>

      {/* Features */}
      <div className={isAR ? "order-2" : "order-1"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Features</label>
        <textarea value={form.features || ""} onChange={(e) => update("features", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. High Density Foam, Black Faux Leather, 1.2 mm Metal Chrome Base" />
      </div>
      <div className={isAR ? "order-1" : "order-2"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Features (Arabic)</label>
        <textarea value={form.featuresAr || ""} onChange={(e) => update("featuresAr", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" dir="rtl" lang="ar" />
      </div>

      {/* Extra Info */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Brand</label>
          <Input value={form.brand || ""} onChange={(e) => update("brand", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Country</label>
          <Input value={form.country || ""} onChange={(e) => update("country", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Warranty</label>
          <Input value={form.warranty || ""} onChange={(e) => update("warranty", e.target.value)} />
        </div>
      </div>

      {/* Bulk & Wholesale */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.bulkAvailable} onChange={(e) => update("bulkAvailable", e.target.checked)} />
          Bulk Available
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.deliveryAvailable} onChange={(e) => update("deliveryAvailable", e.target.checked)} />
          Delivery Available
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.installationAvailable} onChange={(e) => update("installationAvailable", e.target.checked)} />
          Installation Available
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Bulk Quantity Note</label>
          <Input value={form.bulkQuantityNote || ""} onChange={(e) => update("bulkQuantityNote", e.target.value)} placeholder="e.g. Available in bulk quantity" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Wholesale Discount Note</label>
          <Input value={form.wholesaleDiscountNote || ""} onChange={(e) => update("wholesaleDiscountNote", e.target.value)} placeholder="e.g. Wholesale Discount (10 + Units)" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Delivery Info</label>
          <Input value={form.deliveryInfo || ""} onChange={(e) => update("deliveryInfo", e.target.value)} placeholder="e.g. Delivery all across UAE" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Installation Info</label>
          <Input value={form.installation || ""} onChange={(e) => update("installation", e.target.value)} placeholder="e.g. Installation available on request" />
        </div>
      </div>
    </div>
  );
}
