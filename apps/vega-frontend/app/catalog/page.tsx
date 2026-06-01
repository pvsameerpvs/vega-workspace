import { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { CATALOGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Catalogs | Vega UAE",
  description: "Download our product catalogs in PDF format.",
};

export default function CatalogPage() {
  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="label-line mb-4 justify-center">Downloads</div>
          <h1 className="section-heading">Product Catalogs</h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Download our product catalogs in PDF format. Browse our complete range of furniture, barriers, and industrial supplies.
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATALOGS.map((cat, i) => (
            <div key={cat.name} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-slate-50 shadow-subtle">
                <ProtectedImage
                  src={cat.coverImage || `https://placehold.co/400x540/e5e7eb/1f2937?text=${encodeURIComponent(cat.name)}`}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400">
                <FileText className="h-3.5 w-3.5" /> PDF
              </div>
              <h3 className="text-base font-bold text-vega-blue mb-1">{cat.name}</h3>
              <p className="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">{cat.description}</p>
              <button className="w-full rounded-full bg-vega-blue py-2.5 text-sm font-bold text-white hover:bg-vega-blue-dark transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-blue hover:-translate-y-0.5">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
