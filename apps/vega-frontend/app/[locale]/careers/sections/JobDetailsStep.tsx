"use client";

import { MapPin, Briefcase, DollarSign, GraduationCap, ArrowRight } from "lucide-react";

interface CareerItem {
  slug: string;
  id?: number;
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

interface JobDetailsStepProps {
  job: CareerItem;
  isAR: boolean;
  onNext: () => void;
}

export function JobDetailsStep({ job, isAR, onNext }: JobDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#FFD400]/10 px-3 py-1 text-[10px] font-bold text-[#FFD400] uppercase tracking-wider mb-3">
            {job.type}
          </span>
          <h2 className="text-2xl font-bold text-[#1F3A93]">
            {isAR && job.titleAr ? job.titleAr : job.title}
          </h2>
          <p className="mt-1 text-sm text-slate-400 font-medium">{job.department}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
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
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          {isAR ? "الوصف" : "Description"}
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          {isAR && job.descriptionAr ? job.descriptionAr : job.description}
        </p>
      </div>

      {job.requirements && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {isAR ? "المتطلبات" : "Requirements"}
          </h4>
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
            <Briefcase className="h-5 w-5 shrink-0 text-[#FFD400] mt-0.5" />
            <p className="text-sm text-slate-500 leading-relaxed">
              {isAR && job.requirementsAr ? job.requirementsAr : job.requirements}
            </p>
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onNext}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3A93] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#152a6e] hover:shadow-lg"
        >
          {isAR ? "قدم الآن" : "Apply Now"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
