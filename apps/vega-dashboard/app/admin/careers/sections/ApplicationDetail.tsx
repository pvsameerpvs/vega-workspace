"use client";

import {
  X,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Download,
  Trash2,
  Clock,
  CheckCircle,
} from "lucide-react";
import { AppDetailMeta } from "./AppDetailMeta";
import { AppDetailStatus } from "./AppDetailStatus";

interface ApplicationDetailProps {
  application: any;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

export function ApplicationDetail({ application, open, onClose, onStatusChange, onDelete }: ApplicationDetailProps) {
  if (!open || !application) return null;

  const statusLabel = application.status?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) || "New";
  const statusMap: Record<string, string> = {
    new: "bg-blue-50 text-blue-700 border-blue-200",
    contacted: "bg-amber-50 text-amber-700 border-amber-200",
    reviewing: "bg-purple-50 text-purple-700 border-purple-200",
    shortlisted: "bg-teal-50 text-teal-700 border-teal-200",
    interviewed: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accepted: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };
  const statusClass = statusMap[String(application.status || "")] || "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3A93]/10 text-[#1F3A93]">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Application Details</h3>
              <p className="text-xs text-slate-400">ID: #{application.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6 flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}>
              <CheckCircle className="h-3.5 w-3.5" /> {statusLabel}
            </span>
            <span className="text-xs text-slate-400">
              <Clock className="mr-1 inline h-3 w-3" />
              {application.createdAt ? new Date(application.createdAt).toLocaleString() : "—"}
            </span>
          </div>

          <div className="mb-6 rounded-2xl bg-slate-50 p-5">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">Applicant</h4>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD400]/10 text-[#FFD400] text-lg font-bold">
                {application.fullName?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">{application.fullName}</p>
                <p className="text-xs text-slate-500">{application.position}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                <Mail className="h-4 w-4 text-[#1F3A93]" />
                <span className="text-sm text-slate-700">{application.email}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm">
                <Phone className="h-4 w-4 text-[#1F3A93]" />
                <span className="text-sm text-slate-700">{application.phone || "—"}</span>
              </div>
            </div>
          </div>

          <AppDetailMeta application={application} />

          {application.message && (
            <div className="mb-6">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Cover Message</h4>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{application.message}</p>
              </div>
            </div>
          )}

          {application.cvUrl && (
            <div className="mb-6">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Resume / CV</h4>
              <a
                href={application.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-[#FFD400] hover:bg-[#FFD400]/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">Resume.pdf</p>
                  <p className="text-xs text-slate-400">Click to view or download</p>
                </div>
                <Download className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          )}

          <AppDetailStatus currentStatus={application.status} onChange={(s) => onStatusChange(application.id, s)} />
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${application.email}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1F3A93] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#152a6e]"
            >
              <Mail className="h-4 w-4" /> Reply via Email
            </a>
            <button
              onClick={() => onDelete(application.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
