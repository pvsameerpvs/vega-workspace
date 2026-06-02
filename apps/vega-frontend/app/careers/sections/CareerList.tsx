import { MapPin, Clock, Briefcase, DollarSign, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CareerItem {
  slug: string;
  title: string;
  titleAr?: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  experience?: string;
  salaryRange?: string;
}

interface CareerListProps {
  jobs: CareerItem[];
}

export function CareerList({ jobs }: CareerListProps) {
  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  return (
    <div className="space-y-8">
      {departments.map((dept) => {
        const deptJobs = jobs.filter((j) => j.department === dept);
        return (
          <div key={dept}>
            {/* Department Header */}
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F3A93]">
                {dept}
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            {/* Jobs in this department */}
            <div className="grid gap-5 md:grid-cols-2">
              {deptJobs.map((job, i) => (
                <div
                  key={job.slug}
                  className="modern-card p-7 animate-fade-in-up group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-[#FFD400]/10 px-3 py-1 text-[10px] font-bold text-[#FFD400] uppercase tracking-wider mb-3">
                        {job.type}
                      </span>
                      <h3 className="text-lg font-bold text-[#1F3A93] leading-tight">
                        {job.title}
                      </h3>
                      {job.titleAr && (
                        <p className="mt-1 text-sm text-slate-400 font-medium">
                          {job.titleAr}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    {job.description}
                  </p>

                  {/* Meta Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
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

                  {/* Requirements */}
                  {job.requirements && (
                    <div className="mb-5 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                      <Briefcase className="h-4 w-4 mt-0.5 shrink-0 text-[#FFD400]" />
                      <span className="text-xs text-slate-500 leading-relaxed">
                        {job.requirements}
                      </span>
                    </div>
                  )}

                  {/* Apply CTA */}
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#1F3A93] transition-colors hover:text-[#FFD400]"
                  >
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
