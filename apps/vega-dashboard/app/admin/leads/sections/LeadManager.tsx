"use client";

import { useState } from "react";
import { useLeads } from "@/hooks/use-leads";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { LeadTable } from "./LeadTable";
import { LeadDetail } from "./LeadDetail";
import { LeadCreateDialog } from "./LeadCreateDialog";
import { Plus } from "lucide-react";

export function LeadManager() {
  const { leads, loading, updateStatus, createLead } = useLeads();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [detailLead, setDetailLead] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeLeads = Array.isArray(leads) ? leads : [];
  const filtered = safeLeads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.name?.toLowerCase().includes(q) ||
      l.companyName?.toLowerCase().includes(q) ||
      l.productName?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q);
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

      <LeadTable
        leads={filtered}
        loading={loading}
        onStatusChange={handleStatusChange}
        onView={(lead) => setDetailLead(lead)}
        updatingId={updatingId}
      />

      <LeadDetail lead={detailLead} onClose={() => setDetailLead(null)} />

      <LeadCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        loading={isSubmitting}
      />
    </div>
  );
}
