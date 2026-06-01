import { Metadata } from "next";
import { MapPin, Clock, Briefcase, ArrowRight, DollarSign, ListChecks } from "lucide-react";
import Link from "next/link";
import { CAREERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers | Vega UAE",
  description: "Join the Vega team. Explore current job openings and career opportunities.",
};

export default function CareersPage() {
  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Join Us</span>
          <h1 className="section-heading text-4xl md:text-5xl">Careers at Vega</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We are always looking for talented individuals to join our team. Check out our current openings below.
          </p>
        </div>

        {/* Why Join */}
        <div className="mb-20 grid gap-12 sm:grid-cols-3">
          {[
            { icon: Briefcase, title: "Growth Opportunities", desc: "Build your career with a fast-growing company in the UAE." },
            { icon: Clock, title: "Work-Life Balance", desc: "We value our team and promote a healthy work environment." },
            { icon: MapPin, title: "UAE Presence", desc: "Work across Dubai and Sharjah with a dynamic team." },
          ].map((card, i) => (
            <div key={card.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-base text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="mb-4">
          <span className="mb-6 block text-sm text-slate-400">Openings</span>
          <h2 className="section-heading mb-16 text-4xl">Current Vacancies</h2>
        </div>
        <div className="space-y-0">
          {CAREERS.map((job, i) => (
            <div key={job.slug} className="border-b border-slate-100 py-10 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-base text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {job.department}
                    </span>
                  </div>
                  <p className="mt-4 text-base text-slate-500 max-w-2xl leading-relaxed">{job.description}</p>
                  {job.requirements && (
                    <div className="mt-4 flex items-start gap-2 text-base text-slate-500">
                      <ListChecks className="h-4 w-4 mt-1 shrink-0 text-vega-yellow" />
                      <span>{job.requirements}</span>
                    </div>
                  )}
                  {job.salaryRange && (
                    <div className="mt-3 flex items-center gap-2 text-base text-slate-500">
                      <DollarSign className="h-4 w-4 text-vega-yellow" />
                      <span>{job.salaryRange}</span>
                    </div>
                  )}
                </div>
                <Link href="/contact-us" className="pill-btn-yellow group shrink-0 text-sm">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
