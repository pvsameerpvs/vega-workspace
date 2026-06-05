"use client";

import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface AppDetailMetaProps {
  application: any;
}

export function AppDetailMeta({ application }: AppDetailMetaProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-slate-100 p-4">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Briefcase className="h-3.5 w-3.5" /> Position
        </div>
        <p className="text-sm font-bold text-slate-900">{application.position}</p>
      </div>
      <div className="rounded-xl border border-slate-100 p-4">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <GraduationCap className="h-3.5 w-3.5" /> Experience
        </div>
        <p className="text-sm font-bold text-slate-900">{application.experience || "—"}</p>
      </div>
      <div className="rounded-xl border border-slate-100 p-4">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Calendar className="h-3.5 w-3.5" /> Applied
        </div>
        <p className="text-sm font-bold text-slate-900">
          {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "—"}
        </p>
      </div>
      <div className="rounded-xl border border-slate-100 p-4">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <MapPin className="h-3.5 w-3.5" /> Career ID
        </div>
        <p className="text-sm font-bold text-slate-900">#{application.careerId}</p>
      </div>
    </div>
  );
}
