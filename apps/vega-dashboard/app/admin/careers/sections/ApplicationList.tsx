"use client";

import { useState } from "react";
import { Search, Users, Trash2 } from "lucide-react";

interface ApplicationListProps {
  applications: any[];
  onOpenDetail: (app: any) => void;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

export function ApplicationList({ applications, onOpenDetail, onStatusChange, onDelete }: ApplicationListProps) {
  const [appSearch, setAppSearch] = useState("");

  const filtered = applications.filter((a) => {
    const q = appSearch.toLowerCase();
    return (
      a.fullName?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.position?.toLowerCase().includes(q) ||
      a.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-2.5 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={appSearch}
          onChange={(e) => setAppSearch(e.target.value)}
          placeholder="Search by name, email, position, or status..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center">
          <p className="text-sm text-slate-400">No applications found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50/50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-500">Applicant</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-500">Position</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-500">Experience</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-500">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => onOpenDetail(a)} className="text-left hover:underline">
                        <p className="font-medium text-slate-900">{a.fullName}</p>
                        <p className="text-xs text-slate-400">{a.email}</p>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{a.position}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{a.experience || "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => onStatusChange(a.id, e.target.value)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none hover:border-vega-blue focus:border-vega-blue"
                      >
                        {["new", "contacted", "reviewing", "shortlisted", "interviewed", "accepted", "rejected"].map((s) => (
                          <option key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => onOpenDetail(a)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue">
                          <Users className="h-4 w-4" />
                        </button>
                        <button onClick={() => onDelete(a.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
