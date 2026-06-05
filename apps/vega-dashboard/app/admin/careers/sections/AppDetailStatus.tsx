"use client";

interface AppDetailStatusProps {
  currentStatus: string;
  onChange: (status: string) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  reviewing: "bg-purple-50 text-purple-700 border-purple-200",
  shortlisted: "bg-teal-50 text-teal-700 border-teal-200",
  interviewed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const statuses = ["new", "contacted", "reviewing", "shortlisted", "interviewed", "accepted", "rejected"];

export function AppDetailStatus({ currentStatus, onChange }: AppDetailStatusProps) {
  return (
    <div className="mb-6">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Update Status</h4>
      <div className="grid grid-cols-2 gap-2">
        {statuses.map((s) => {
          const active = currentStatus === s;
          const cls = statusColors[s] || "bg-slate-50 text-slate-700 border-slate-200";
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`rounded-lg border px-3 py-2 text-xs font-bold transition-all ${active ? cls + " ring-2 ring-offset-1 ring-vega-blue/30" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}
            >
              {s.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          );
        })}
      </div>
    </div>
  );
}
