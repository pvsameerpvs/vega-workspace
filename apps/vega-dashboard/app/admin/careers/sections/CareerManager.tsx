"use client";

import { useState } from "react";
import { useCareers } from "@/hooks/use-content";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Briefcase, Users, Trash2 } from "lucide-react";

export function CareerManager() {
  const { jobs, applications, loading, create, remove } = useCareers();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("jobs");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const tabs = [
    { id: "jobs", label: "Job Listings", icon: Briefcase },
    { id: "applications", label: `Applications (${applications.length})`, icon: Users },
  ];

  const handleCreate = async () => {
    await create({ ...form, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    toast({ title: "Job created", description: "New job listing added successfully." });
    setFormOpen(false);
    setForm({});
  };

  const handleDelete = async () => {
    if (deleteId) {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Job listing removed." });
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Career Manager" subtitle="Manage job listings and view applications." actionLabel="Add Job" onAction={() => setFormOpen(true)} />

      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 mb-6">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${activeTab === t.id ? "bg-white text-vega-blue shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : activeTab === "jobs" ? (
        jobs.length === 0 ? (
          <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No jobs found.</p></div>
        ) : (
          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{j.title}</p>
                    <p className="text-xs text-slate-500">{j.department} &middot; {j.location} &middot; {j.jobType}</p>
                    <p className="text-xs text-slate-400 mt-1">{j.salaryRange}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={j.isActive ? "active" : "inactive"} />
                    <button onClick={() => setDeleteId(j.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{j.description}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        applications.length === 0 ? (
          <div className="rounded-xl border bg-white py-16 text-center"><p className="text-sm text-slate-400">No applications yet.</p></div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-slate-50/50"><th className="px-4 py-3 text-left font-semibold text-slate-500">Name</th><th className="px-4 py-3 text-left font-semibold text-slate-500">Position</th><th className="px-4 py-3 text-left font-semibold text-slate-500">Experience</th><th className="px-4 py-3 text-left font-semibold text-slate-500">Status</th><th className="px-4 py-3 text-left font-semibold text-slate-500">Date</th></tr></thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3"><p className="font-medium text-slate-900">{a.fullName}</p><p className="text-xs text-slate-400">{a.email}</p></td>
                    <td className="px-4 py-3 text-slate-600">{a.position}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{a.experience}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3 text-slate-400">{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      <FormDialog open={formOpen} onClose={() => setFormOpen(false)} title="Add Job Listing" onSubmit={handleCreate}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
            <input value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Job title" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
            <input value={form.titleAr || ""} onChange={(e) => updateForm("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
            <input value={form.department || ""} onChange={(e) => updateForm("department", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Department" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Location</label>
            <input value={form.location || ""} onChange={(e) => updateForm("location", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. Dubai, UAE" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Job Type</label>
            <input value={form.jobType || ""} onChange={(e) => updateForm("jobType", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Full-time, Part-time, etc." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Salary Range</label>
            <input value={form.salaryRange || ""} onChange={(e) => updateForm("salaryRange", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. AED 5,000 - 7,000" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
            <textarea rows={3} value={form.description || ""} onChange={(e) => updateForm("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Job description" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Requirements</label>
            <textarea rows={3} value={form.requirements || ""} onChange={(e) => updateForm("requirements", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Requirements" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Experience Required</label>
            <input value={form.experienceRequired || ""} onChange={(e) => updateForm("experienceRequired", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. 2-3 years" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Slug</label>
            <input value={form.slug || ""} onChange={(e) => updateForm("slug", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="job-slug" />
          </div>
        </div>
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Job" />
    </div>
  );
}
