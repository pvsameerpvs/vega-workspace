"use client";

import { Input } from "@vega/ui";

interface ProductSeoTabProps {
  form: any;
  update: (key: string, value: any) => void;
  lang?: "en" | "ar";
}

export function ProductSeoTab({ form, update, lang = "ar" }: ProductSeoTabProps) {
  const isAR = lang === "ar";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Title</label>
        <Input value={form.seoTitle || ""} onChange={(e) => update("seoTitle", e.target.value)} placeholder="English SEO title" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Description</label>
        <textarea value={form.seoDescription || ""} onChange={(e) => update("seoDescription", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="English SEO description" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Keywords</label>
        <Input value={form.seoKeywords || ""} onChange={(e) => update("seoKeywords", e.target.value)} placeholder="keyword1, keyword2" />
      </div>
    </div>
  );
}
