import { Download, FileText, Eye } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { CATALOGS } from "@/lib/data";

export function CatalogGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {CATALOGS.map((cat, i) => (
        <div
          key={cat.name}
          id={cat.category?.toLowerCase().replace(/\s+/g, "-")}
          className="modern-card group animate-fade-in-up overflow-hidden"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {/* Cover Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
            <ProtectedImage
              src={
                cat.coverImage ||
                `https://placehold.co/600x750/e5e7eb/1f2937?text=${encodeURIComponent(cat.name)}`
              }
              alt={cat.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#1F3A93] shadow-lg transition-all duration-300 hover:bg-[#1F3A93] hover:text-white hover:scale-105">
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
            </div>

            {/* Category Badge */}
            {cat.category && (
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-[#1F3A93] shadow-sm">
                  {cat.category}
                </span>
              </div>
            )}

            {/* PDF Badge */}
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD400] px-3 py-1.5 text-xs font-bold text-[#1F3A93] shadow-sm">
                <FileText className="h-3 w-3" /> PDF
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-base font-bold text-[#1F3A93] leading-tight mb-2">
              {cat.name}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
              {cat.description}
            </p>

            <div className="mb-5 h-px bg-slate-100" />

            <div className="flex items-center gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FFD400] px-4 py-2.5 text-xs font-bold text-[#1F3A93] transition-all duration-300 hover:bg-[#e6bf00] hover:shadow-md hover:-translate-y-0.5">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 transition-all duration-300 hover:border-[#1F3A93] hover:bg-[#1F3A93] hover:text-white">
                <Eye className="h-3.5 w-3.5" /> View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
