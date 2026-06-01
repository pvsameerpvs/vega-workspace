"use client";

import { useState } from "react";
import { useFaqs } from "@/hooks/use-content";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

export function FaqManager() {
  const { faqs, loading, create, remove } = useFaqs();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [form, setForm] = useState<any>({});

  const toggle = (id: number) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleCreate = async () => {
    await create({ ...form, isActive: true, createdAt: new Date().toISOString() });
    toast({ title: "FAQ added", description: "New FAQ added successfully." });
    setFormOpen(false);
    setForm({});
  };

  const handleDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      toast({ title: "Deleted", description: "FAQ removed." });
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="FAQ Manager" subtitle="Add, edit, and reorder FAQ entries." actionLabel="Add FAQ" onAction={() => setFormOpen(true)} />

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : faqs.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No FAQs found.</p></div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.id} className="rounded-xl border bg-white shadow-sm overflow-hidden">
              <button onClick={() => toggle(f.id)} className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">{f.question}</p>
                  <p className="text-xs text-slate-400">{f.category} &middot; Order: {f.displayOrder}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(f.id); }} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {expanded[f.id] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </button>
              {expanded[f.id] && (
                <div className="border-t px-4 py-3 text-sm text-slate-700 bg-slate-50/50">
                  <p className="mb-2">{f.answer}</p>
                  {f.questionAr && <p className="text-xs text-slate-400 mt-2 border-t pt-2">{f.questionAr}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title="Add FAQ" onSubmit={handleCreate}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Question</label>
            <input value={form.question || ""} onChange={(e) => updateForm("question", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Question" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Question (Arabic)</label>
            <input value={form.questionAr || ""} onChange={(e) => updateForm("questionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="السؤال" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Answer</label>
            <textarea rows={3} value={form.answer || ""} onChange={(e) => updateForm("answer", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Answer" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Answer (Arabic)</label>
            <textarea rows={3} value={form.answerAr || ""} onChange={(e) => updateForm("answerAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الإجابة" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Category</label>
            <input value={form.category || ""} onChange={(e) => updateForm("category", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Category" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Display Order</label>
            <input type="number" value={form.displayOrder || 0} onChange={(e) => updateForm("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete FAQ" />
    </div>
  );
}
