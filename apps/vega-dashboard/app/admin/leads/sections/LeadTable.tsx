import { StatusBadge } from "@/components/admin/StatusBadge";
import { Eye, Edit2, Trash2 } from "lucide-react";

interface LeadTableProps {
  leads: any[];
  loading: boolean;
  onStatusChange: (id: number, status: string) => void;
  onView: (lead: any) => void;
  onEdit: (lead: any) => void;
  onDelete: (id: number) => void;
  updatingId?: number | null;
}

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quotation_sent", label: "Quotation Sent" },
  { value: "follow_up_required", label: "Follow Up" },
  { value: "closed", label: "Closed" },
  { value: "lost", label: "Lost" },
];

export function LeadTable({ leads, loading, onStatusChange, onView, onEdit, onDelete, updatingId }: LeadTableProps) {
  const safeLeads = Array.isArray(leads) ? leads : [];
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
    );
  }

  if (safeLeads.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
        <p className="text-sm text-slate-400">No leads found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Company</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Product</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Qty</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Source</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500">Status</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeLeads.map((l) => (
            <tr key={l.id} className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{l.name}</p>
                <p className="text-xs text-slate-400">{l.email}</p>
              </td>
              <td className="px-4 py-3 text-slate-600">{l.companyName}</td>
              <td className="px-4 py-3 text-slate-600">{l.productName}</td>
              <td className="px-4 py-3 text-slate-600">{l.quantity}</td>
              <td className="px-4 py-3 text-slate-600">
                {l.utmCampaign || l.utmSource ? (
                  <span className="inline-flex max-w-[180px] items-center gap-1 truncate rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {l.utmCampaign || l.utmSource}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">{l.location || l.sourcePage || "—"}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <select
                  value={l.status}
                  onChange={(e) => onStatusChange(l.id, e.target.value)}
                  disabled={updatingId === l.id}
                  className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium focus:border-vega-blue focus:outline-none disabled:opacity-50"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(l)}
                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-vega-blue"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(l)}
                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-vega-blue"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(l.id)}
                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
