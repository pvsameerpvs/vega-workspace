"use client";

import { MapPin, Briefcase, DollarSign, GraduationCap, Clock, ChevronRight, ArrowRight } from "lucide-react";

interface CareerItem {
  id?: number;
  slug: string;
  title: string;
  titleAr?: string;
  department: string;
  location: string;
  type: string;
  description: string;
  descriptionAr?: string;
  requirements?: string;
  requirementsAr?: string;
  experience?: string;
  salaryRange?: string;
}

interface JobCardProps {
  job: CareerItem;
  locale?: string;
  onApply: () => void;
  onDetails: () => void;
}

export function JobCard({ job, locale = "en", onApply, onDetails }: JobCardProps) {
  const isAR = locale === "ar";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#FFD400] via-[#FFD400]/80 to-[#1F3A93] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-[#FFD400]/10 px-3 py-1 text-[10px] font-bold text-[#FFD400] uppercase tracking-wider">
            {job.type}
          </span>
          <h3 className="mt-3 text-lg font-bold text-[#1F3A93] leading-tight">
            {isAR && job.titleAr ? job.titleAr : job.title}
          </h3>
          {job.titleAr && !isAR && (
            <p className="mt-1 text-xs text-slate-400 font-medium">{job.titleAr}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3A93]/5 text-[#1F3A93] transition-all group-hover:bg-[#1F3A93] group-hover:text-white">
          <ChevronRight className={`h-5 w-5 ${isAR ? "rotate-180" : ""}`} />
        </div>
      </div>

      <p className="mb-5 text-sm text-slate-500 leading-relaxed line-clamp-3">
        {isAR && job.descriptionAr ? job.descriptionAr : job.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
          <MapPin className="h-3 w-3 text-[#1F3A93]" /> {job.location}
        </span>
        {job.experience && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <GraduationCap className="h-3 w-3 text-[#1F3A93]" /> {job.experience}
          </span>
        )}
        {job.salaryRange && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <DollarSign className="h-3 w-3 text-[#FFD400]" /> {job.salaryRange}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
          <Clock className="h-3 w-3 text-slate-400" /> {isAR ? "جديد" : "New"}
        </span>
      </div>

      {job.requirements && (
        <div className="mb-5 rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-700 mb-1">{isAR ? "المتطلبات:" : "Requirements:"}</p>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {isAR && job.requirementsAr ? job.requirementsAr : job.requirements}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onApply}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1F3A93] px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#152a6e] hover:shadow-lg"
        >
          {isAR ? "قدم الآن" : "Apply Now"}
          <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${isAR ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
        </button>
        <button
          onClick={onDetails}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-[#1F3A93] transition-all hover:border-[#1F3A93] hover:bg-[#1F3A93]/5"
        >
          {isAR ? "التفاصيل" : "Details"}
        </button>
      </div>
    </div>
  );
}
