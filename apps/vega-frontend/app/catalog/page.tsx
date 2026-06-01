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
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Downloads</span>
          <h1 className="section-heading text-4xl md:text-5xl">Product Catalogs</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Download our product catalogs in PDF format. Browse our complete range of furniture, barriers, and industrial supplies.
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {CATALOGS.map((cat, i) => (
            <div key={cat.name} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="mb-5 aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100">
                <ProtectedImage
                  src={cat.coverImage || `https://placehold.co/400x540/e5e7eb/1f2937?text=${encodeURIComponent(cat.name)}`}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                <FileText className="h-3.5 w-3.5" /> PDF
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{cat.name}</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">{cat.description}</p>
              <button className="pill-btn-yellow w-full text-sm">
                <Download className="h-4 w-4 inline mr-2" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
