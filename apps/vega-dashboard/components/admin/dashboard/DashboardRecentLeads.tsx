import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ArrowRight } from "lucide-react";

interface DashboardRecentLeadsProps {
  leads: any[];
}

export function DashboardRecentLeads({ leads }: DashboardRecentLeadsProps) {
  const recent = leads.slice(0, 5);

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Recent Leads</h3>
        <Link href="/admin/leads" className="flex items-center gap-1 text-xs font-semibold text-vega-blue hover:underline">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className="text-sm text-slate-400">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-semibold text-slate-500">Name</th>
                <th className="pb-3 font-semibold text-slate-500">Product</th>
                <th className="pb-3 font-semibold text-slate-500">Location</th>
                <th className="pb-3 font-semibold text-slate-500">Status</th>
                <th className="pb-3 font-semibold text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-3 font-medium text-slate-900">{lead.name}</td>
                  <td className="py-3 text-slate-600">{lead.productName}</td>
                  <td className="py-3 text-slate-600">{lead.location}</td>
                  <td className="py-3"><StatusBadge status={lead.status} /></td>
                  <td className="py-3 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
