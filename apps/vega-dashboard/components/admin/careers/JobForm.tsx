"use client";

import { slugify } from "@vega/utils";

interface JobFormProps {
  form: any;
  update: (k: string, v: any) => void;
}

export function JobForm({ form, update }: JobFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title</label>
          <input value={form.title || ""} onChange={(e) => {
            const title = e.target.value;
            update("title", title);
            update("slug", slugify(title));
          }} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Job title" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Title (Arabic)</label>
          <input value={form.titleAr || ""} onChange={(e) => update("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
          <input value={form.department || ""} onChange={(e) => update("department", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Department" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Department (Arabic)</label>
          <input value={form.departmentAr || ""} onChange={(e) => update("departmentAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="القسم" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Location</label>
          <input value={form.location || ""} onChange={(e) => update("location", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. Dubai, UAE" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Location (Arabic)</label>
          <input value={form.locationAr || ""} onChange={(e) => update("locationAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="دبي، الإمارات" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Job Type</label>
          <input value={form.jobType || ""} onChange={(e) => update("jobType", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Full-time, Part-time, etc." />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Job Type (Arabic)</label>
          <input value={form.jobTypeAr || ""} onChange={(e) => update("jobTypeAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="دوام كامل" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Salary Range</label>
        <input value={form.salaryRange || ""} onChange={(e) => update("salaryRange", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. AED 5,000 - 7,000" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
        <textarea rows={3} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Job description" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Description (Arabic)</label>
        <textarea rows={3} value={form.descriptionAr || ""} onChange={(e) => update("descriptionAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="وصف الوظيفة" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Requirements</label>
        <textarea rows={3} value={form.requirements || ""} onChange={(e) => update("requirements", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Requirements" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Requirements (Arabic)</label>
        <textarea rows={3} value={form.requirementsAr || ""} onChange={(e) => update("requirementsAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="المتطلبات" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Experience Required</label>
          <input value={form.experienceRequired || ""} onChange={(e) => update("experienceRequired", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. 2-3 years" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Experience Required (Arabic)</label>
          <input value={form.experienceRequiredAr || ""} onChange={(e) => update("experienceRequiredAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="2-3 سنوات" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">Slug</label>
        <input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="job-slug" />
      </div>
    </div>
  );
}
