"use client";

import { useState, useEffect, useCallback } from "react";
import { FormDialog } from "@/components/admin/FormDialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MultiImageUpload } from "@/components/admin/MultiImageUpload";
import { Input } from "@vega/ui";
import { api } from "@/lib/api";
import { useToast } from "@vega/ui";
import { Plus, FolderTree, AlertCircle } from "lucide-react";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void | Promise<void>;
  product?: any;
}

export function ProductForm({ open, onClose, onSubmit, product }: ProductFormProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState("basic");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [loadingCats, setLoadingCats] = useState(false);

  // Inline category creation
  const [showInlineCategory, setShowInlineCategory] = useState(false);
  const [inlineCatForm, setInlineCatForm] = useState<any>({});

  const loadCategories = useCallback(async () => {
    setLoadingCats(true);
    try {
      const cats = await api.getCategories();
      setCategories(cats);
    } catch {
      setCategories([]);
    } finally {
      setLoadingCats(false);
    }
  }, []);

  // Fetch categories on open
  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open, loadCategories]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      api.getSubcategories(selectedCategoryId).then((subs) => setSubcategories(subs)).catch(() => setSubcategories([]));
    } else {
      setSubcategories([]);
    }
  }, [selectedCategoryId]);

  // Initialize form
  useEffect(() => {
    if (product) {
      setForm({ ...product });
      setSelectedCategoryId(product.categoryId || "");
    } else {
      setForm({
        status: "published",
        isFeatured: false,
        isPopular: false,
        showPrice: false,
        availabilityStatus: "In Stock",
        deliveryAvailable: true,
        installationAvailable: false,
      });
      setSelectedCategoryId("");
      setSubcategories([]);
    }
    setShowInlineCategory(false);
    setInlineCatForm({});
  }, [product, open]);

  const update = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }));
  const updateInlineCat = (key: string, value: any) => setInlineCatForm((f: any) => ({ ...f, [key]: value }));

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
      setCategories((prev) => [...prev, created]);
      setSelectedCategoryId(created.id);
      update("categoryId", created.id);
      setShowInlineCategory(false);
      setInlineCatForm({});
      toast({ title: "Category created", description: `${created.name} is now available.` });
      // Load subcategories (will be empty for new category)
      setSubcategories([]);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to create category.", variant: "destructive" });
    }
  };

  const tabs = [
    { id: "basic", label: "Basic" },
    { id: "details", label: "Details" },
    { id: "images", label: "Images" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <FormDialog open={open} onClose={onClose} title={product ? "Edit Product" : "Add Product"} onSubmit={() => onSubmit(form)}>
      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === t.id ? "bg-white text-vega-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "basic" && (
        <div className="space-y-4">
          {/* Category Assignment - With Inline Creation */}
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

            {/* Inline Category Creation Form */}
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
      )}

      {activeTab === "details" && (
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
      )}

      {activeTab === "images" && (
        <div className="space-y-4">
          <ImageUpload value={form.mainImage || form.image || ""} onChange={(url) => update("mainImage", url)} folder="products" label="Main Image" />
          <MultiImageUpload
            value={Array.isArray(form.gallery) ? form.gallery : form.gallery ? [form.gallery] : []}
            onChange={(urls) => update("gallery", urls)}
            folder="products"
            label="Gallery Images"
          />
        </div>
      )}

      {activeTab === "seo" && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Title</label>
            <Input value={form.seoTitle || ""} onChange={(e) => update("seoTitle", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Description</label>
            <textarea value={form.seoDescription || ""} onChange={(e) => update("seoDescription", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Keywords</label>
            <Input value={form.seoKeywords || ""} onChange={(e) => update("seoKeywords", e.target.value)} placeholder="keyword1, keyword2" />
          </div>
        </div>
      )}
    </FormDialog>
  );
}
