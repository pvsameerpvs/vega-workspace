"use client";

import { useState } from "react";
import { useCatalogs } from "@/hooks/use-catalogs";
import { useToast } from "@vega/ui";
import { Badge } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { CatalogCategorySection } from "./CatalogCategorySection";
import { CatalogForm } from "./CatalogForm";
import { api } from "@/lib/api";
import { Edit2, Trash2, FileText, ChevronDown, ChevronRight, FolderTree } from "lucide-react";

export function CatalogManager() {
  const { items: catalogs, loading, create, update, remove, refresh } = useCatalogs();
  const safeCatalogs = Array.isArray(catalogs) ? catalogs : [];
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editCatalog, setEditCatalog] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const openCreate = () => { setEditCatalog(null); setForm({}); setFormOpen(true); };
  const openEdit = (catalog: any) => {
    const cats = (catalog as any).categories || [];
    setEditCatalog(catalog);
    setForm({ ...catalog, categoryIds: cats.map((c: any) => c.id) });
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const catIds: number[] = form.categoryIds || [];
      if (editCatalog) {
        const updated = await update(editCatalog.id, form);
        const oldIds = ((editCatalog as any).categories || []).map((c: any) => c.id);
        for (const id of catIds) { if (!oldIds.includes(id)) await api.linkCategoryToCatalog(editCatalog.id, id); }
        for (const id of oldIds) { if (!catIds.includes(id)) await api.unlinkCategoryFromCatalog(editCatalog.id, id); }
        toast({ title: "Catalog updated", description: "Changes saved successfully." });
      } else {
        const created = await create({ ...form, isActive: true });
        for (const id of catIds) await api.linkCategoryToCatalog(created.id, id);
        toast({ title: "Catalog added", description: "New catalog uploaded successfully." });
      }
      setFormOpen(false);
      setEditCatalog(null);
      setForm({});
      refresh();
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Catalog removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Catalog Manager" subtitle="Upload PDF catalogs and manage linked categories with products." actionLabel="Add Catalog" onAction={openCreate} />

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : safeCatalogs.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No catalogs found.</p></div>
      ) : (
        <div className="space-y-3">
          {safeCatalogs.map((c) => {
            const cats = (c as any).categories || [];
            const isExpanded = expandedId === c.id;
            return (
              <div key={c.id} className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <button onClick={() => setExpandedId(isExpanded ? null : c.id)} className="rounded p-1 text-slate-400 hover:bg-slate-100">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  <img
                    src={c.coverImage || ""}
                    alt={c.title}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="h-14 w-10 rounded-lg object-cover select-none pointer-events-none"
                    style={{ WebkitUserDrag: "none" } as any}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900">{c.title}</p>
                    <p className="text-xs text-slate-400 truncate">{c.category || c.titleAr || ""}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {cats.length > 0 && (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <FolderTree className="h-3 w-3" /> {cats.length}
                      </Badge>
                    )}
                    {cats.slice(0, 2).map((cat: any) => (
                      <Badge key={cat.id} variant="outline" className="text-xs">{cat.name}</Badge>
                    ))}
                    {cats.length > 2 && <span className="text-xs text-slate-400">+{cats.length - 2}</span>}
                  </div>
                  <a href={c.pdfFile} target="_blank" rel="noreferrer" className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                    <FileText className="inline h-3 w-3 mr-1" /> View
                  </a>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(c)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => setDeleteId(c.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t bg-slate-50 px-4 py-4">
                    <CatalogCategorySection catalogId={c.id} categories={cats} onRefresh={refresh} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <FormDialog open={formOpen} onClose={() => { setFormOpen(false); setEditCatalog(null); setForm({}); }} title={editCatalog ? "Edit Catalog" : "Add Catalog"} onSubmit={handleSubmit} loading={isSubmitting}>
        <CatalogForm form={form} updateForm={updateForm} />
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Catalog" />
    </div>
  );
}
