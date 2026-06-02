"use client";

import { useState, useCallback } from "react";
import { useToast } from "@vega/ui";
import { api } from "@/lib/api";
import { FolderTree, AlertCircle, Plus } from "lucide-react";

interface ProductCategoryBlockProps {
  form: any;
  update: (key: string, value: any) => void;
  categories: any[];
  subcategories: any[];
  loadingCats: boolean;
  selectedCategoryId: number | "";
  setSelectedCategoryId: (id: number | "") => void;
}

export function ProductCategoryBlock({
  form,
  update,
  categories,
  subcategories,
  loadingCats,
  selectedCategoryId,
  setSelectedCategoryId,
}: ProductCategoryBlockProps) {
  const { toast } = useToast();
  const [showInlineCategory, setShowInlineCategory] = useState(false);
  const [inlineCatForm, setInlineCatForm] = useState<any>({});

  const updateInlineCat = (key: string, value: any) =>
    setInlineCatForm((f: any) => ({ ...f, [key]: value }));

  const handleCreateInlineCategory = async () => {
    if (!inlineCatForm.name || !inlineCatForm.slug) {
      toast({ title: "Error", description: "Name and slug are required.", variant: "destructive" });
      return;
    }
    try {
      const created = await api.createCategory({
        ...inlineCatForm,
        isActive: true,
        createdAt: new Date().toISOString(),
      });
      setSelectedCategoryId(created.id);
      update("categoryId", created.id);
      setShowInlineCategory(false);
      setInlineCatForm({});
      toast({ title: "Category created", description: `${created.name} is now available.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to create category.", variant: "destructive" });
    }
  };

  const handleCategoryChange = (catId: string) => {
    if (catId === "__new__") {
      setShowInlineCategory(true);
      return;
    }
    setShowInlineCategory(false);
    const id = catId ? Number(catId) : "";
    setSelectedCategoryId(id);
    update("categoryId", id || null);
    update("subcategoryId", null);
  };

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 space-y-3">
      <div className="flex items-center gap-2">
        <FolderTree className="h-4 w-4 text-amber-600" />
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Category Assignment</p>
      </div>

      {categories.length === 0 && !loadingCats && !showInlineCategory && (
        <div className="flex items-center gap-2 rounded-md bg-white p-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4" />
          <span>No categories found. Create one first.</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Parent Category *</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm focus:border-vega-blue focus:outline-none bg-white"
          >
            <option value="">{loadingCats ? "Loading..." : "Select a category..."}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            <option value="__new__">+ Create New Category...</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Subcategory</label>
          <select
            value={form.subcategoryId || ""}
            onChange={(e) => update("subcategoryId", e.target.value ? Number(e.target.value) : null)}
            disabled={!selectedCategoryId}
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm focus:border-vega-blue focus:outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">{selectedCategoryId ? "Select subcategory..." : "First select category"}</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
      </div>

      {showInlineCategory && (
        <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2 mt-2">
          <p className="text-xs font-bold text-slate-700">Create New Category</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={inlineCatForm.name || ""}
              onChange={(e) => updateInlineCat("name", e.target.value)}
              placeholder="Category name"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
            />
            <input
              value={inlineCatForm.slug || ""}
              onChange={(e) => updateInlineCat("slug", e.target.value)}
              placeholder="category-slug"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowInlineCategory(false)}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateInlineCategory}
              className="flex items-center gap-1 rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark"
            >
              <Plus className="h-3 w-3" /> Create & Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
