"use client";

import { useState, useEffect, useCallback } from "react";
import { FormDialog } from "@/components/admin/FormDialog";
import { api } from "@/lib/api";
import {
  ProductBasicTab,
  ProductDetailsTab,
  ProductImagesTab,
  ProductSeoTab,
} from "@/components/admin/products";
import { AdminLanguageToggle } from "@/components/admin/LanguageToggle";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void | Promise<void>;
  product?: any;
  loading?: boolean;
}

export function ProductForm({ open, onClose, onSubmit, product, loading = false }: ProductFormProps) {
  const [form, setForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState("basic");
  const [lang, setLang] = useState<"en" | "ar">("ar");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [loadingCats, setLoadingCats] = useState(false);

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

  useEffect(() => {
    if (open) loadCategories();
  }, [open, loadCategories]);

  useEffect(() => {
    if (selectedCategoryId) {
      api.getSubcategories(selectedCategoryId).then((subs) => setSubcategories(subs)).catch(() => setSubcategories([]));
    } else {
      setSubcategories([]);
    }
  }, [selectedCategoryId]);

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
  }, [product, open]);

  const update = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }));

  const tabs = [
    { id: "basic", label: "Basic" },
    { id: "details", label: "Details" },
    { id: "images", label: "Images" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <FormDialog open={open} onClose={onClose} title={product ? "Edit Product" : "Add Product"} onSubmit={() => onSubmit(form)} loading={loading}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500">Content Language</span>
        <AdminLanguageToggle value={lang} onChange={setLang} />
      </div>
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
        <ProductBasicTab
          form={form}
          update={update}
          categories={categories}
          subcategories={subcategories}
          loadingCats={loadingCats}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          lang={lang}
        />
      )}
      {activeTab === "details" && <ProductDetailsTab form={form} update={update} lang={lang} />}
      {activeTab === "images" && <ProductImagesTab form={form} update={update} />}
      {activeTab === "seo" && <ProductSeoTab form={form} update={update} lang={lang} />}
    </FormDialog>
  );
}
