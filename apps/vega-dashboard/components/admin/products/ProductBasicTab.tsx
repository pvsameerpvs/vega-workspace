"use client";

import { Input } from "@vega/ui";
import { ProductCategoryBlock } from "./ProductCategoryBlock";

interface ProductBasicTabProps {
  form: any;
  update: (key: string, value: any) => void;
  categories: any[];
  subcategories: any[];
  loadingCats: boolean;
  selectedCategoryId: number | "";
  setSelectedCategoryId: (id: number | "") => void;
}

export function ProductBasicTab({
  form,
  update,
  categories,
  subcategories,
  loadingCats,
  selectedCategoryId,
  setSelectedCategoryId,
}: ProductBasicTabProps) {
  return (
    <div className="space-y-4">
      <ProductCategoryBlock
        form={form}
        update={update}
        categories={categories}
        subcategories={subcategories}
        loadingCats={loadingCats}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Name</label>
          <Input value={form.name || ""} onChange={(e) => update("name", e.target.value)} placeholder="Product name" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
          <Input value={form.nameAr || ""} onChange={(e) => update("nameAr", e.target.value)} placeholder="اسم المنتج" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Slug</label>
          <Input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} placeholder="product-slug" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">SKU</label>
          <Input value={form.sku || ""} onChange={(e) => update("sku", e.target.value)} placeholder="VEGA-XXX-001" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
          <select
            value={form.status || "published"}
            onChange={(e) => update("status", e.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm focus:border-vega-blue focus:outline-none"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Availability</label>
          <select
            value={form.availabilityStatus || "In Stock"}
            onChange={(e) => update("availabilityStatus", e.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm focus:border-vega-blue focus:outline-none"
          >
            <option>In Stock</option>
            <option>Made to Order</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Price (AED)</label>
          <input
            type="number"
            value={form.price || ""}
            onChange={(e) => update("price", e.target.value ? Number(e.target.value) : null)}
            placeholder="e.g. 4500"
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4 pt-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={!!form.showPrice} onChange={(e) => update("showPrice", e.target.checked)} />
            Show Price on Website
          </label>
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={!!form.isPopular} onChange={(e) => update("isPopular", e.target.checked)} />
          Popular
        </label>
      </div>
    </div>
  );
}
