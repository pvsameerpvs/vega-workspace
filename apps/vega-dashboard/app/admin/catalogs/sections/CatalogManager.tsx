"use client";

import { useState } from "react";
import { useCatalogs } from "@/hooks/use-catalogs";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Edit2, Trash2, FileText } from "lucide-react";

export function CatalogManager() {
  const { items: catalogs, loading, create, update, remove } = useCatalogs();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editCatalog, setEditCatalog] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const openCreate = () => { setEditCatalog(null); setForm({}); setFormOpen(true); };
  const openEdit = (catalog: any) => { setEditCatalog(catalog); setForm({ ...catalog }); setFormOpen(true); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editCatalog) {
        await update(editCatalog.id, form);
        toast({ title: "Catalog updated", description: "Changes saved successfully." });
      } else {
        await create({ ...form, isActive: true, createdAt: new Date().toISOString() });
        toast({ title: "Catalog added", description: "New catalog uploaded successfully." });
      }
      setFormOpen(false);
      setEditCatalog(null);
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
      toast({ title: "Deleted", description: "Catalog removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Catalog Manager" subtitle="Upload PDF catalogs with cover images." actionLabel="Add Catalog" onAction={openCreate} />

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : catalogs.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No catalogs found.</p></div>
      ) : (
        <div className="space-y-3">
          {catalogs.map((c) => (
            <div key={c.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
              <img
                src={c.coverImage || "/images/placeholder.jpg"}
                alt={c.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="h-16 w-12 rounded-lg object-cover select-none pointer-events-none"
                style={{ WebkitUserDrag: "none" } as any}
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-400">{c.category}</p>
              </div>
              <a href={c.pdfFile} target="_blank" rel="noreferrer" className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                <FileText className="inline h-3 w-3 mr-1" /> View
              </a>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => setDeleteId(c.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormDialog open={formOpen} onClose={() => { setFormOpen(false); setEditCatalog(null); setForm({}); }} title={editCatalog ? "Edit Catalog" : "Add Catalog"} onSubmit={handleSubmit} loading={isSubmitting}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
              <input value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Catalog title" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
              <input value={form.titleAr || ""} onChange={(e) => updateForm("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="عنوان الكتالوج" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Category</label>
              <input value={form.category || ""} onChange={(e) => updateForm("category", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Category" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Category (Arabic)</label>
              <input value={form.categoryAr || ""} onChange={(e) => updateForm("categoryAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الفئة" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
            <textarea rows={3} value={form.description || ""} onChange={(e) => updateForm("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Description" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description (Arabic)</label>
            <textarea rows={3} value={form.descriptionAr || ""} onChange={(e) => updateForm("descriptionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الوصف" />
          </div>
          <ImageUpload folder="catalogs" value={form.coverImage} onChange={(url) => updateForm("coverImage", url)} label="Cover Image" />
          <FileUpload folder="catalogs" value={form.pdfFile} onChange={(url) => updateForm("pdfFile", url)} label="PDF File" accept="application/pdf" />
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Catalog" />
    </div>
  );
}
