"use client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { Edit2, Trash2 } from "lucide-react";

interface JobListProps {
  jobs: any[];
  onEdit: (job: any) => void;
  onDelete: (id: number) => void;
}

export function JobList({ jobs, onEdit, onDelete }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center">
        <p className="text-sm text-slate-400">No jobs found.</p>
      </div>
    );
  }

  return (
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
              <button onClick={() => onEdit(j)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(j.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{j.description}</p>
        </div>
      ))}
    </div>
  );
}
