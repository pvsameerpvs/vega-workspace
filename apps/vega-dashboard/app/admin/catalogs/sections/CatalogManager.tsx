"use client";

import { useState } from "react";
import { useCatalogs } from "@/hooks/use-content";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Trash2, FileText } from "lucide-react";

export function CatalogManager() {
  const { catalogs, loading, create, remove } = useCatalogs();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleCreate = async () => {
    await create({ ...form, isActive: true, createdAt: new Date().toISOString() });
    toast({ title: "Catalog added", description: "New catalog uploaded successfully." });
    setFormOpen(false);
    setForm({});
  };

  const handleDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Catalog removed." });
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Catalog Manager" subtitle="Upload PDF catalogs with cover images." actionLabel="Add Catalog" onAction={() => setFormOpen(true)} />

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : catalogs.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No catalogs found.</p></div>
      ) : (
        <div className="space-y-3">
          {catalogs.map((c) => (
            <div key={c.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
              <img src={c.coverImage || "/images/placeholder.jpg"} alt={c.title} className="h-16 w-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-400">{c.category}</p>
              </div>
              <a href={c.pdfFile} target="_blank" rel="noreferrer" className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                <FileText className="inline h-3 w-3 mr-1" /> View
              </a>
              <button onClick={() => setDeleteId(c.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title="Add Catalog" onSubmit={handleCreate}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
            <input value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Catalog title" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
            <input value={form.titleAr || ""} onChange={(e) => updateForm("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="عنوان الكتالوج" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Category</label>
            <input value={form.category || ""} onChange={(e) => updateForm("category", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Category" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
            <textarea rows={3} value={form.description || ""} onChange={(e) => updateForm("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Description" />
          </div>
          <ImageUpload folder="catalogs" onChange={(url) => updateForm("coverImage", url)} label="Cover Image" />
          <FileUpload folder="catalogs" onChange={(url) => updateForm("pdfFile", url)} label="PDF File" accept="application/pdf" />
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Catalog" />
    </div>
  );
}
