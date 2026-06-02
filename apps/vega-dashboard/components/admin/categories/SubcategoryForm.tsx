"use client";

import { Plus } from "lucide-react";

interface SubcategoryFormProps {
  catName: string;
  subForm: any;
  editSub: any;
  updateSubForm: (k: string, v: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function SubcategoryForm({ catName, subForm, editSub, updateSubForm, onSave, onCancel }: SubcategoryFormProps) {
  return (
    <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-900 mb-3">
        {editSub ? "Edit Subcategory" : "Add Subcategory to " + catName}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700">Name</label>
          <input value={subForm.name || ""} onChange={(e) => updateSubForm("name", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Subcategory name" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700">Name (Arabic)</label>
          <input value={subForm.nameAr || ""} onChange={(e) => updateSubForm("nameAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الاسم" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700">Slug</label>
          <input value={subForm.slug || ""} onChange={(e) => updateSubForm("slug", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="subcategory-slug" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700">Order</label>
          <input type="number" value={subForm.displayOrder || 0} onChange={(e) => updateSubForm("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-semibold text-slate-700">Description</label>
          <textarea rows={2} value={subForm.description || ""} onChange={(e) => updateSubForm("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Description" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        <button onClick={onCancel} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
        <button onClick={onSave} className="flex items-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark">
          <Plus className="h-4 w-4" /> {editSub ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
