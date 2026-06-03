"use client";

import { useState, useMemo } from "react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { useToast } from "@vega/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Star, Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";

export function SpotlightManager() {
  const { toast } = useToast();
  const { items, loading, create, update, remove, reorder } = useSpotlight();
  const { categories } = useCategories();
  const { items: products } = useProducts();

  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const safeItems = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [items]);

  const safeCategories = useMemo(() => Array.isArray(categories) ? categories : [], [categories]);
  const safeProducts = useMemo(() => Array.isArray(products) ? products : [], [products]);

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const openCreate = () => {
    setEditItem(null);
    setForm({ linkType: "category", isActive: true, displayOrder: safeItems.length + 1 });
    setFormOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({ ...item });
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title?.trim()) {
      toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
      return;
    }
    if (!form.link?.trim()) {
      toast({ title: "Validation Error", description: "Link (slug) is required.", variant: "destructive" });
      return;
    }
    if (!form.image?.trim()) {
      toast({ title: "Validation Error", description: "Please upload an image.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      if (editItem) {
        await update(editItem.id, form);
        toast({ title: "Updated", description: "Spotlight item updated successfully." });
      } else {
        await create(form);
        toast({ title: "Created", description: "Spotlight item added successfully." });
      }
      setFormOpen(false);
      setEditItem(null);
      setForm({});
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Spotlight item removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleReorder = async (id: number, direction: "up" | "down") => {
    const idx = safeItems.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const newIndex = direction === "up" ? idx - 1 : idx + 1;
    if (newIndex < 0 || newIndex >= safeItems.length) return;
    const target = safeItems[newIndex];
    await Promise.all([
      reorder(id, target.displayOrder ?? newIndex),
      reorder(target.id, safeItems[idx].displayOrder ?? idx),
    ]);
    toast({ title: "Reordered", description: "Display order updated." });
  };

  const handleToggleActive = async (item: any) => {
    try {
      await update(item.id, { isActive: !item.isActive });
      toast({ title: "Updated", description: `Item ${item.isActive ? "hidden" : "shown"} on homepage.` });
    } catch (e) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    }
  };

  const handleLinkTypeChange = (type: string) => {
    updateForm("linkType", type);
    updateForm("link", "");
  };

  const handleCategorySelect = (categoryId: string) => {
    const cat = safeCategories.find((c) => String(c.id) === categoryId);
    if (cat) {
      updateForm("link", cat.slug);
      updateForm("title", cat.name);
      if (!form.image) updateForm("image", cat.image || cat.banner || "");
    }
  };

  const handleProductSelect = (productId: string) => {
    const prod = safeProducts.find((p) => String(p.id) === productId);
    if (prod) {
      updateForm("link", prod.slug);
      updateForm("title", prod.name);
      if (!form.image) updateForm("image", prod.mainImage || prod.image || "");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-vega-blue" />
          <p className="text-sm font-bold text-slate-900">In the Spotlight</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark"
        >
          <Plus className="h-3.5 w-3.5" /> Add Item
        </button>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs text-slate-500 mb-4">
          Manage homepage spotlight items. First item displays large. All items link to their category or product page.
        </p>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />
            ))}
          </div>
        ) : safeItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 py-12 text-center">
            <Star className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-400">No spotlight items yet.</p>
            <p className="text-xs text-slate-400 mt-1">Click &quot;Add Item&quot; to create your first spotlight card.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {safeItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 rounded-lg border p-3 ${index === 0 ? "border-vega-blue/20 bg-vega-blue/5" : "border-slate-200"}`}
              >
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${index === 0 ? "bg-vega-blue text-white" : "bg-slate-200 text-slate-500"}`}>
                  {index + 1}
                </div>
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {item.image ? (
                    <img src={item.image} alt={item.title || ""} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{item.title || "Untitled"}</p>
                  <p className="text-xs text-slate-500">
                    {item.linkType === "product" ? "Product" : "Category"} &middot; /{item.link} &middot; Order {item.displayOrder}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleReorder(item.id, "up")} disabled={index === 0} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleReorder(item.id, "down")} disabled={index === safeItems.length - 1} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleToggleActive(item)} className="rounded p-1 text-slate-400 hover:bg-slate-100" title={item.isActive ? "Hide" : "Show"}>
                    {item.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => openEdit(item)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-vega-blue">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormDialog
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditItem(null); setForm({}); }}
        title={editItem ? "Edit Spotlight Item" : "Add Spotlight Item"}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
              <input value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Display title" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
              <input value={form.titleAr || ""} onChange={(e) => updateForm("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Subtitle</label>
              <input value={form.subtitle || ""} onChange={(e) => updateForm("subtitle", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Short subtitle" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Subtitle (Arabic)</label>
              <input value={form.subtitleAr || ""} onChange={(e) => updateForm("subtitleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان الفرعي" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Link Type</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleLinkTypeChange("category")} className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${form.linkType === "category" ? "border-vega-blue bg-vega-blue text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Category</button>
              <button type="button" onClick={() => handleLinkTypeChange("product")} className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${form.linkType === "product" ? "border-vega-blue bg-vega-blue text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Product</button>
            </div>
          </div>
          {form.linkType === "category" ? (
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Select Category</label>
              <select value={safeCategories.find((c) => c.slug === form.link)?.id || ""} onChange={(e) => handleCategorySelect(e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none bg-white">
                <option value="">Choose a category...</option>
                {safeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Select Product</label>
              <select value={safeProducts.find((p) => p.slug === form.link)?.id || ""} onChange={(e) => handleProductSelect(e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none bg-white">
                <option value="">Choose a product...</option>
                {safeProducts.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.name} ({prod.sku})</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Link Slug</label>
            <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm bg-slate-50">
              <span className="text-slate-400 text-xs">/{form.linkType === "product" ? "products" : "products"}/</span>
              <input value={form.link || ""} onChange={(e) => updateForm("link", e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none text-slate-700" placeholder="slug" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">The URL slug users will navigate to when they click this card.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Display Order</label>
              <input type="number" value={form.displayOrder || 0} onChange={(e) => updateForm("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => updateForm("isActive", e.target.checked)} />
                Active on Homepage
              </label>
            </div>
          </div>
          <ImageUpload folder="spotlight" value={form.image} onChange={(url) => updateForm("image", url)} label="Spotlight Image" />
        </div>
      </FormDialog>

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Spotlight Item"
        description="Are you sure you want to remove this spotlight item?"
      />
    </div>
  );
}
