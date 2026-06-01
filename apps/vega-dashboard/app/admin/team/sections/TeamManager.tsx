"use client";

import { useState } from "react";
import { useTeam } from "@/hooks/use-content";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Trash2 } from "lucide-react";

export function TeamManager() {
  const { members, loading, create, remove } = useTeam();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleCreate = async () => {
    await create({ ...form, isActive: true, createdAt: new Date().toISOString() });
    toast({ title: "Team member added", description: "New member added successfully." });
    setFormOpen(false);
    setForm({});
  };

  const handleDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Team member removed." });
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Team Manager" subtitle="Manage team member profiles and photos." actionLabel="Add Member" onAction={() => setFormOpen(true)} />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />)}</div>
      ) : members.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No team members found.</p></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {members.map((m) => (
            <div key={m.id} className="rounded-xl border bg-white p-4 shadow-sm text-center">
              <img src={m.photo || "/images/placeholder.jpg"} alt={m.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
              <p className="mt-3 font-medium text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">{m.designation}</p>
              <p className="text-xs text-slate-400">{m.department}</p>
              <button onClick={() => setDeleteId(m.id)} className="mt-3 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 mx-auto">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title="Add Team Member" onSubmit={handleCreate}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name</label>
            <input value={form.name || ""} onChange={(e) => updateForm("name", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Full name" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Name (Arabic)</label>
            <input value={form.nameAr || ""} onChange={(e) => updateForm("nameAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الاسم" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Designation</label>
            <input value={form.designation || ""} onChange={(e) => updateForm("designation", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Job title" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
            <input value={form.department || ""} onChange={(e) => updateForm("department", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Department" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Bio</label>
            <textarea rows={3} value={form.bio || ""} onChange={(e) => updateForm("bio", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Short bio" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Email</label>
            <input value={form.email || ""} onChange={(e) => updateForm("email", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="email@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Display Order</label>
            <input type="number" value={form.displayOrder || 0} onChange={(e) => updateForm("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <ImageUpload folder="team" onChange={(url) => updateForm("photo", url)} label="Photo" />
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Team Member" />
    </div>
  );
}
