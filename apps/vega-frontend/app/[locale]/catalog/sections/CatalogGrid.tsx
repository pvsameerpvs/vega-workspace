"use client";

import { Download, FileText, Eye, Layers } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { downloadFile } from "@/lib/download";
import Link from "next/link";

interface CatalogGridProps {
  catalogs: any[];
  locale?: string;
}

export function CatalogGrid({ catalogs, locale = "en" }: CatalogGridProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {catalogs.map((cat, i) => {
        const name = isAR && cat.nameAr ? cat.nameAr : cat.name;
        const desc = isAR && cat.descriptionAr ? cat.descriptionAr : cat.description;

        return (
          <div
            key={cat.name}
            id={cat.category?.toLowerCase().replace(/\s+/g, "-")}
            className="modern-card group animate-fade-in-up overflow-hidden"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <ProtectedImage
                src={
                  cat.coverImage ||
                  `https://placehold.co/600x750/e5e7eb/1f2937?text=${encodeURIComponent(name)}`
                }
                alt={name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <a
                  href={cat.pdfFile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#1F3A93] shadow-lg transition-all duration-300 hover:bg-[#1F3A93] hover:text-white hover:scale-105"
                >
                  <Eye className="h-3.5 w-3.5" /> {isAR ? "معاينة" : "Preview"}
                </a>
              </div>

              {cat.category && (
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-[#1F3A93] shadow-sm">
                    {cat.category}
                  </span>
                </div>
              )}

              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD400] px-3 py-1.5 text-xs font-bold text-[#1F3A93] shadow-sm">
                  <FileText className="h-3 w-3" /> PDF
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-base font-bold text-[#1F3A93] leading-tight mb-2">
                {name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                {desc}
              </p>

              {cat.categories && cat.categories.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {isAR ? "الفئات" : "Categories"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.categories.map((c: any) => (
                      <Link
                        key={c.slug}
                        href={l(`/products/${c.slug}`)}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition-all hover:bg-[#FFD400] hover:text-[#1F3A93]"
                      >
                        <Layers className="h-3 w-3" />
                        {isAR && c.nameAr ? c.nameAr : c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4 h-px bg-slate-100" />

              <div className="flex items-center gap-3">
                <button
                  onClick={() => downloadFile(cat.pdfFile, `${cat.name}.pdf`)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FFD400] px-4 py-2.5 text-xs font-bold text-[#1F3A93] transition-all duration-300 hover:bg-[#e6bf00] hover:shadow-md hover:-translate-y-0.5"
                >
                  <Download className="h-3.5 w-3.5" /> {isAR ? "تحميل" : "Download"}
                </button>
                <a
                  href={cat.pdfFile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 transition-all duration-300 hover:border-[#1F3A93] hover:bg-[#1F3A93] hover:text-white"
                >
                  <Eye className="h-3.5 w-3.5" /> {isAR ? "عرض" : "View"}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
