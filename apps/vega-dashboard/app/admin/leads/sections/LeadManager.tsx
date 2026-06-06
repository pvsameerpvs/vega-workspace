"use client";

import { useState } from "react";
import { useLeads } from "@/hooks/use-leads";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { LeadTable } from "./LeadTable";
import { LeadDetail } from "./LeadDetail";
import { LeadCreateDialog } from "./LeadCreateDialog";
import { FormDialog } from "@/components/admin/FormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Plus } from "lucide-react";

export function LeadManager() {
  const { leads, loading, error, updateStatus, updateLead, deleteLead, createLead } = useLeads();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [detailLead, setDetailLead] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editLead, setEditLead] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const safeLeads = Array.isArray(leads) ? leads : [];
  const filtered = safeLeads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      (l.name || "").toLowerCase().includes(q) ||
      (l.companyName || "").toLowerCase().includes(q) ||
      (l.productName || "").toLowerCase().includes(q) ||
      (l.email || "").toLowerCase().includes(q);
    const matchesStatus = !statusFilter || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      await updateStatus(id, status);
      toast({ title: "Status updated", description: `Lead status changed to ${status.replace(/_/g, " ")}.` });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to update status.", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    try {
      await createLead(data);
      toast({ title: "Lead created", description: "New lead added successfully." });
      setCreateOpen(false);
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to create lead.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editLead) return;
    setIsSubmitting(true);
    try {
      await updateLead(editLead.id, editForm);
      toast({ title: "Lead updated", description: "Lead details updated successfully." });
      setEditLead(null);
      setEditForm({});
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to update lead.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteLead(deleteId);
      toast({ title: "Lead deleted", description: "The lead has been removed." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete lead.", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Lead / Quote Manager"
        subtitle="View and manage all website enquiries. Update statuses and track progress."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, company, product, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quotation_sent">Quotation Sent</option>
          <option value="follow_up_required">Follow Up Required</option>
          <option value="closed">Closed</option>
          <option value="lost">Lost</option>
        </select>
        <button
          onClick={() => setCreateOpen(true)}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#1F3A93] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1F3A93]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load leads: {error}
        </div>
      )}

      <LeadTable
        leads={filtered}
        loading={loading}
        onStatusChange={handleStatusChange}
        onView={(lead) => setDetailLead(lead)}
        onEdit={(lead) => { setEditLead(lead); setEditForm({ ...lead }); }}
        onDelete={(id) => setDeleteId(id)}
        updatingId={updatingId}
      />

      <LeadDetail lead={detailLead} onClose={() => setDetailLead(null)} />

      <LeadCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        loading={isSubmitting}
      />

      <FormDialog
        open={!!editLead}
        onClose={() => { setEditLead(null); setEditForm({}); }}
        title="Edit Lead"
        onSubmit={handleEdit}
        loading={isSubmitting}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Name</label>
            <input type="text" value={editForm.name || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Company</label>
            <input type="text" value={editForm.companyName || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, companyName: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email</label>
            <input type="email" value={editForm.email || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, email: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Phone</label>
            <input type="tel" value={editForm.phone || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, phone: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Product Name</label>
            <input type="text" value={editForm.productName || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, productName: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">SKU</label>
            <input type="text" value={editForm.sku || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, sku: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Quantity</label>
            <input type="text" value={editForm.quantity || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, quantity: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Location</label>
            <input type="text" value={editForm.location || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, location: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Message</label>
            <textarea rows={3} value={editForm.message || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, message: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none resize-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Status</label>
            <select value={editForm.status || "new"} onChange={(e) => setEditForm((f: any) => ({ ...f, status: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quotation_sent">Quotation Sent</option>
              <option value="follow_up_required">Follow Up Required</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Source Page</label>
            <input type="text" value={editForm.sourcePage || ""} onChange={(e) => setEditForm((f: any) => ({ ...f, sourcePage: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
          </div>
        </div>
      </FormDialog>

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        description="Are you sure you want to delete this lead? This action cannot be undone."
      />
    </div>
  );
}
