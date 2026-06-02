"use client";

import { useState } from "react";
import { useGallery } from "@/hooks/use-gallery";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Edit2, Trash2 } from "lucide-react";

export function GalleryManager() {
  const { items, loading, create, update, remove } = useGallery();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const openCreate = () => { setEditItem(null); setForm({}); setFormOpen(true); };
  const openEdit = (item: any) => { setEditItem(item); setForm({ ...item }); setFormOpen(true); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editItem) {
        await update(editItem.id, form);
        toast({ title: "Gallery item updated", description: "Changes saved successfully." });
      } else {
        await create({ ...form, isActive: true, createdAt: new Date().toISOString() });
        toast({ title: "Gallery item added", description: "The image has been uploaded." });
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
      toast({ title: "Deleted", description: "Image removed from gallery." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Gallery Manager" subtitle="Upload and organize gallery images." actionLabel="Add Image" onAction={openCreate} />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-square animate-pulse rounded-xl bg-slate-200" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No gallery items yet.</p></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border bg-white shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="aspect-square w-full object-cover select-none pointer-events-none"
                style={{ WebkitUserDrag: "none" } as any}
              />
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="rounded-md bg-white p-1.5 text-slate-700 hover:bg-slate-100"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => setDeleteId(item.id)} className="rounded-md bg-red-500 p-1.5 text-white hover:bg-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormDialog open={formOpen} onClose={() => { setFormOpen(false); setEditItem(null); setForm({}); }} title={editItem ? "Edit Gallery Image" : "Add Gallery Image"} onSubmit={handleSubmit} loading={isSubmitting}>
        <div className="space-y-4">
          <ImageUpload folder="gallery" value={form.image} onChange={(url) => updateForm("image", url)} label="Image" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
              <input value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Image title" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
              <input value={form.titleAr || ""} onChange={(e) => updateForm("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Alt Text</label>
              <input value={form.altText || ""} onChange={(e) => updateForm("altText", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Alt text for accessibility" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Alt Text (Arabic)</label>
              <input value={form.altTextAr || ""} onChange={(e) => updateForm("altTextAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="نص بديل" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Display Order</label>
            <input type="number" value={form.displayOrder || 0} onChange={(e) => updateForm("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Image" />
    </div>
  );
}
