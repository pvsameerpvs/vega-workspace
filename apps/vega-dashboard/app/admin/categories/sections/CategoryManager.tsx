"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FolderTree, ChevronDown, ChevronUp, Trash2, Edit2, Plus, Save } from "lucide-react";

export function CategoryManager() {
  const {
    categories,
    subcategories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  } = useCategories();
  const { toast } = useToast();

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [catFormOpen, setCatFormOpen] = useState(false);
  const [subFormOpen, setSubFormOpen] = useState<number | null>(null);
  const [deleteCatId, setDeleteCatId] = useState<number | null>(null);
  const [deleteSubId, setDeleteSubId] = useState<{ id: number; catId: number } | null>(null);
  const [editCat, setEditCat] = useState<any>(null);
  const [editSub, setEditSub] = useState<any>(null);

  const [catForm, setCatForm] = useState<any>({});
  const [subForm, setSubForm] = useState<any>({});

  const toggle = (id: number) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateCatForm = (k: string, v: any) => setCatForm((f: any) => ({ ...f, [k]: v }));
  const updateSubForm = (k: string, v: any) => setSubForm((f: any) => ({ ...f, [k]: v }));

  const handleCreateCategory = async () => {
    await createCategory({ ...catForm, isActive: true, createdAt: new Date().toISOString() });
    toast({ title: "Category created", description: `${catForm.name} added successfully.` });
    setCatFormOpen(false);
    setCatForm({});
  };

  const handleUpdateCategory = async () => {
    if (editCat) {
      await updateCategory(editCat.id, catForm);
      toast({ title: "Category updated", description: `${catForm.name} updated successfully.` });
      setEditCat(null);
      setCatForm({});
    }
  };

  const handleDeleteCategory = async () => {
    if (deleteCatId) {
      await deleteCategory(deleteCatId);
      toast({ title: "Deleted", description: "Category removed." });
      setDeleteCatId(null);
    }
  };

  const handleCreateSubcategory = async (categoryId: number) => {
    await createSubcategory(categoryId, { ...subForm, isActive: true, createdAt: new Date().toISOString() });
    toast({ title: "Subcategory created", description: `${subForm.name} added.` });
    setSubFormOpen(null);
    setSubForm({});
  };

  const handleUpdateSubcategory = async (categoryId: number) => {
    if (editSub) {
      await updateSubcategory(editSub.id, categoryId, subForm);
      toast({ title: "Subcategory updated", description: `${subForm.name} updated.` });
      setEditSub(null);
      setSubForm({});
    }
  };

  const handleDeleteSubcategory = async () => {
    if (deleteSubId) {
      await deleteSubcategory(deleteSubId.id, deleteSubId.catId);
      toast({ title: "Deleted", description: "Subcategory removed." });
      setDeleteSubId(null);
    }
  };

  const openEditCat = (cat: any) => {
    setEditCat(cat);
    setCatForm({ ...cat });
    setCatFormOpen(true);
  };

  const openEditSub = (sub: any, catId: number) => {
    setEditSub({ ...sub, categoryId: catId });
    setSubForm({ ...sub });
    setSubFormOpen(catId);
  };

  if (loading) {
    return (
      <div className="p-8">
        <PageHeader title="Category Manager" subtitle="Manage parent categories and child subcategories." />
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-200" />)}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Category Manager"
        subtitle="Manage parent categories and child subcategories."
        actionLabel="Add Category"
        onAction={() => {
          setEditCat(null);
          setCatForm({});
          setCatFormOpen(true);
        }}
      />

      {categories.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No categories found.</p></div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => {
            const subs = subcategories[cat.id] || [];
            return (
              <div key={cat.id} className="rounded-xl border bg-white shadow-sm overflow-hidden">
                {/* Parent Category Header */}
                <div className="flex items-center gap-4 p-4">
                  <img src={cat.image || "/images/placeholder.jpg"} alt={cat.name} className="h-14 w-14 rounded-xl object-cover border border-slate-100" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{cat.name}</p>
                      <StatusBadge status={cat.isActive ? "active" : "inactive"} />
                    </div>
                    <p className="text-xs text-slate-400">{cat.nameAr} &middot; /{cat.slug} &middot; Order: {cat.displayOrder}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{subs.length} subs</span>
                    <button onClick={() => openEditCat(cat)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteCatId(cat.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => toggle(cat.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
                      {expanded[cat.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Subcategories Section */}
                {expanded[cat.id] && (
                  <div className="border-t bg-slate-50/50 px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subcategories</p>
                      <button
                        onClick={() => {
                          setEditSub(null);
                          setSubForm({});
                          setSubFormOpen(cat.id);
                        }}
                        className="flex items-center gap-1 rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark"
                      >
                        <Plus className="h-3 w-3" /> Add Sub
                      </button>
                    </div>

                    {subs.length === 0 ? (
                      <p className="text-sm text-slate-400 py-2">No subcategories yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {subs.map((sub: any) => (
                          <div key={sub.id} className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
                            <img src={sub.image || "/images/placeholder.jpg"} alt={sub.name} className="h-10 w-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{sub.name}</p>
                              <p className="text-xs text-slate-400">{sub.nameAr} &middot; Order: {sub.displayOrder}</p>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => openEditSub(sub, cat.id)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-vega-blue">
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button onClick={() => setDeleteSubId({ id: sub.id, catId: cat.id })} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inline Subcategory Form */}
                    {subFormOpen === cat.id && (
                      <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
                        <p className="text-sm font-bold text-slate-900 mb-3">
                          {editSub ? "Edit Subcategory" : "Add Subcategory to " + cat.name}
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
                          <div className="col-span-2">
                            <ImageUpload folder="subcategories" onChange={(url) => updateSubForm("image", url)} label="Image" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                          <button onClick={() => { setSubFormOpen(null); setEditSub(null); setSubForm({}); }} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            Cancel
                          </button>
                          <button
                            onClick={() => editSub ? handleUpdateSubcategory(cat.id) : handleCreateSubcategory(cat.id)}
                            className="flex items-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark"
                          >
                            <Save className="h-4 w-4" />
                            {editSub ? "Update" : "Create"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Category Form Dialog */}
      <FormDialog
        open={catFormOpen}
        onClose={() => {
          setCatFormOpen(false);
          setEditCat(null);
          setCatForm({});
        }}
        title={editCat ? "Edit Category" : "Add Category"}
        onSubmit={editCat ? handleUpdateCategory : handleCreateCategory}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Name</label>
              <input value={catForm.name || ""} onChange={(e) => updateCatForm("name", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Category name" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
              <input value={catForm.nameAr || ""} onChange={(e) => updateCatForm("nameAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الاسم" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Slug</label>
            <input value={catForm.slug || ""} onChange={(e) => updateCatForm("slug", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="category-slug" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
            <textarea rows={3} value={catForm.description || ""} onChange={(e) => updateCatForm("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Description" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description (Arabic)</label>
            <textarea rows={3} value={catForm.descriptionAr || ""} onChange={(e) => updateCatForm("descriptionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الوصف" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Display Order</label>
              <input type="number" value={catForm.displayOrder || 0} onChange={(e) => updateCatForm("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={!!catForm.isActive} onChange={(e) => updateCatForm("isActive", e.target.checked)} />
                Active
              </label>
            </div>
          </div>
          <ImageUpload folder="categories" onChange={(url) => updateCatForm("image", url)} label="Category Image" />
          <ImageUpload folder="categories" onChange={(url) => updateCatForm("banner", url)} label="Banner Image" />
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteCatId} onClose={() => setDeleteCatId(null)} onConfirm={handleDeleteCategory} title="Delete Category" description="This will also delete all subcategories. Are you sure?" />
      <DeleteDialog open={!!deleteSubId} onClose={() => setDeleteSubId(null)} onConfirm={handleDeleteSubcategory} title="Delete Subcategory" />
    </div>
  );
}
