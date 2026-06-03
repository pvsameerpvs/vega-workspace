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
      <div className={isAR ? "order-2" : "order-1"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Title</label>
        <Input value={form.seoTitle || ""} onChange={(e) => update("seoTitle", e.target.value)} placeholder="English SEO title" />
      </div>
      <div className={isAR ? "order-1" : "order-2"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Title (Arabic)</label>
        <Input
          value={form.seoTitleAr || ""}
          onChange={(e) => update("seoTitleAr", e.target.value)}
          placeholder="عنوان SEO بالعربية"
          dir="rtl"
          lang="ar"
        />
      </div>

      <div className={isAR ? "order-2" : "order-1"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Description</label>
        <textarea value={form.seoDescription || ""} onChange={(e) => update("seoDescription", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="English SEO description" />
      </div>
      <div className={isAR ? "order-1" : "order-2"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Description (Arabic)</label>
        <textarea value={form.seoDescriptionAr || ""} onChange={(e) => update("seoDescriptionAr", e.target.value)} rows={3} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="وصف SEO بالعربية" dir="rtl" lang="ar" />
      </div>

      <div className={isAR ? "order-2" : "order-1"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Keywords</label>
        <Input value={form.seoKeywords || ""} onChange={(e) => update("seoKeywords", e.target.value)} placeholder="keyword1, keyword2" />
      </div>
      <div className={isAR ? "order-1" : "order-2"}>
        <label className="mb-1 block text-xs font-semibold text-slate-700">SEO Keywords (Arabic)</label>
        <Input
          value={form.seoKeywordsAr || ""}
          onChange={(e) => update("seoKeywordsAr", e.target.value)}
          placeholder="كلمات مفتاحية بالعربية"
          dir="rtl"
          lang="ar"
        />
      </div>
    </div>
  );
}
