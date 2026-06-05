"use client";

import { useState } from "react";
import { useCareers } from "@/hooks/use-careers";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { JobForm } from "@/components/admin/careers";
import { ApplicationDetail } from "./ApplicationDetail";
import { JobList } from "./JobList";
import { ApplicationList } from "./ApplicationList";
import { Briefcase, Users } from "lucide-react";

export function CareerManager() {
  const { jobs, applications, loading, create, update, remove, updateAppStatus, removeApplication } = useCareers();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("jobs");
  const [formOpen, setFormOpen] = useState(false);
  const [editJob, setEditJob] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteAppId, setDeleteAppId] = useState<number | null>(null);

  const updateForm = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const tabs = [
    { id: "jobs", label: "Job Listings", icon: Briefcase },
    { id: "applications", label: `Applications (${applications?.length || 0})`, icon: Users },
  ];

  const openCreate = () => { setEditJob(null); setForm({}); setFormOpen(true); };
  const openEdit = (job: any) => { setEditJob(job); setForm({ ...job }); setFormOpen(true); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (editJob) {
        await update(editJob.id, form);
        toast({ title: "Job updated", description: "Job listing updated successfully." });
      } else {
        await create({ ...form, isActive: true });
        toast({ title: "Job created", description: "New job listing added successfully." });
      }
      setFormOpen(false);
      setEditJob(null);
      setForm({});
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save job.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await remove(deleteId);
      toast({ title: "Deleted", description: "Job listing removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeleteApp = async () => {
    if (!deleteAppId) return;
    try {
      await removeApplication(deleteAppId);
      toast({ title: "Deleted", description: "Application removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete.", variant: "destructive" });
    } finally {
      setDeleteAppId(null);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateAppStatus(id, status);
      toast({ title: "Status updated", description: `Application marked as ${status}.` });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to update status.", variant: "destructive" });
    }
  };

  const openDetail = (app: any) => {
    setSelectedApp(app);
    setDetailOpen(true);
  };

  return (
    <div className="p-8">
      <PageHeader title="Career Manager" subtitle="Manage job listings and view applications." actionLabel="Add Job" onAction={openCreate} />

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
        <JobList jobs={Array.isArray(jobs) ? jobs : []} onEdit={openEdit} onDelete={setDeleteId} />
      ) : (
        <ApplicationList
          applications={Array.isArray(applications) ? applications : []}
          onOpenDetail={openDetail}
          onStatusChange={handleStatusChange}
          onDelete={setDeleteAppId}
        />
      )}

      <FormDialog open={formOpen} onClose={() => { setFormOpen(false); setEditJob(null); setForm({}); }} title={editJob ? "Edit Job Listing" : "Add Job Listing"} onSubmit={handleSubmit} loading={isSubmitting}>
        <JobForm form={form} update={updateForm} />
      </FormDialog>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Job" />
      <DeleteDialog open={!!deleteAppId} onClose={() => setDeleteAppId(null)} onConfirm={handleDeleteApp} title="Delete Application" description="Are you sure you want to delete this application? This action cannot be undone." />

      <ApplicationDetail
        application={selectedApp}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onStatusChange={handleStatusChange}
        onDelete={(id) => { setDetailOpen(false); setDeleteAppId(id); }}
      />
    </div>
  );
}
