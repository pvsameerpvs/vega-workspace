"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { CategoryCard, CategoryDialogContent } from "@/components/admin/categories";

export function CategoryManager() {
  const {
    categories, subcategories, loading,
    createCategory, updateCategory, deleteCategory,
    createSubcategory, updateSubcategory, deleteSubcategory,
  } = useCategories();
  const { toast } = useToast();
  const safeCategories = Array.isArray(categories) ? categories : [];

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
    if (!catForm.name) {
      toast({ title: "Error", description: "Category name is required.", variant: "destructive" });
      return;
    }
    await createCategory({ ...catForm, isActive: true });
    toast({ title: "Category created", description: `${catForm.name} added successfully.` });
    setCatFormOpen(false);
    setCatForm({});
  };

  const handleUpdateCategory = async () => {
    if (!editCat) return;
    await updateCategory(editCat.id, catForm);
    toast({ title: "Category updated", description: `${catForm.name} updated successfully.` });
    setEditCat(null);
    setCatForm({});
    setCatFormOpen(false);
  };

  const handleDeleteCategory = async () => {
    if (!deleteCatId) return;
    await deleteCategory(deleteCatId);
    toast({ title: "Deleted", description: "Category removed." });
    setDeleteCatId(null);
  };

  const handleCreateSubcategory = async (categoryId: number) => {
    if (!subForm.name) {
      toast({ title: "Error", description: "Subcategory name is required.", variant: "destructive" });
      return;
    }
    await createSubcategory(categoryId, { ...subForm, isActive: true });
    toast({ title: "Subcategory created", description: `${subForm.name} added.` });
    setSubFormOpen(null);
    setSubForm({});
  };

  const handleUpdateSubcategory = async (categoryId: number) => {
    if (!editSub) return;
    await updateSubcategory(editSub.id, categoryId, subForm);
    toast({ title: "Subcategory updated", description: `${subForm.name} updated.` });
    setEditSub(null);
    setSubForm({});
  };

  const handleDeleteSubcategory = async () => {
    if (!deleteSubId) return;
    await deleteSubcategory(deleteSubId.id, deleteSubId.catId);
    toast({ title: "Deleted", description: "Subcategory removed." });
    setDeleteSubId(null);
  };

  const openEditCat = (cat: any) => { setEditCat(cat); setCatForm({ ...cat }); setCatFormOpen(true); };
  const openEditSub = (sub: any, catId: number) => { setEditSub({ ...sub, categoryId: catId }); setSubForm({ ...sub }); setSubFormOpen(catId); };

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
      <PageHeader title="Category Manager" subtitle="Manage parent categories and child subcategories." actionLabel="Add Category" onAction={() => { setEditCat(null); setCatForm({}); setCatFormOpen(true); }} />

      {safeCategories.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No categories found.</p></div>
      ) : (
        <div className="space-y-4">
          {safeCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              subs={subcategories[cat.id] || []}
              expanded={!!expanded[cat.id]}
              onToggle={() => toggle(cat.id)}
              onEdit={() => openEditCat(cat)}
              onDelete={() => setDeleteCatId(cat.id)}
              onEditSub={(sub) => openEditSub(sub, cat.id)}
              onDeleteSub={(sub) => setDeleteSubId({ id: sub.id, catId: cat.id })}
              onAddSub={() => { setEditSub(null); setSubForm({}); setSubFormOpen(cat.id); }}
              subFormOpen={subFormOpen === cat.id}
              subForm={subForm}
              editSub={editSub}
              updateSubForm={updateSubForm}
              onSaveSub={() => editSub ? handleUpdateSubcategory(cat.id) : handleCreateSubcategory(cat.id)}
              onCancelSub={() => { setSubFormOpen(null); setEditSub(null); setSubForm({}); }}
            />
          ))}
        </div>
      )}

      <FormDialog open={catFormOpen} onClose={() => { setCatFormOpen(false); setEditCat(null); setCatForm({}); }} title={editCat ? "Edit Category" : "Add Category"} onSubmit={editCat ? handleUpdateCategory : handleCreateCategory}>
        <CategoryDialogContent form={catForm} update={updateCatForm} />
      </FormDialog>

      <DeleteDialog open={!!deleteCatId} onClose={() => setDeleteCatId(null)} onConfirm={handleDeleteCategory} title="Delete Category" description="This will also delete all subcategories. Are you sure?" />
      <DeleteDialog open={!!deleteSubId} onClose={() => setDeleteSubId(null)} onConfirm={handleDeleteSubcategory} title="Delete Subcategory" />
    </div>
  );
}
