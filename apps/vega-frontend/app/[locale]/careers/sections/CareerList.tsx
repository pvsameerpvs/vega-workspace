"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import { JobCard } from "./JobCard";
import { ApplyDialog } from "./ApplyDialog";

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

interface CareerListProps {
  jobs: CareerItem[];
  locale?: string;
}

export function CareerList({ jobs, locale = "en" }: CareerListProps) {
  const isAR = locale === "ar";
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  const openApply = (job: CareerItem) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  if (jobs.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white py-20 text-center">
        <Briefcase className="mx-auto mb-4 h-10 w-10 text-slate-200" />
        <p className="text-sm font-semibold text-slate-400">
          {isAR ? "لا توجد وظائف متاحة حالياً." : "No open positions at the moment."}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          {isAR ? "يرجى التحقق لاحقاً." : "Please check back later."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {departments.map((dept) => {
        const deptJobs = jobs.filter((j) => j.department === dept);
        return (
          <div key={dept}>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1F3A93]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#1F3A93]">
                <Briefcase className="h-3 w-3" /> {dept}
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {deptJobs.map((job) => (
                <JobCard
                  key={job.slug}
                  job={job}
                  locale={locale}
                  onApply={() => openApply(job)}
                  onDetails={() => openApply(job)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {selectedJob && (
        <ApplyDialog
          job={selectedJob}
          locale={locale}
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setTimeout(() => setSelectedJob(null), 300);
          }}
        />
      )}
    </div>
  );
}
