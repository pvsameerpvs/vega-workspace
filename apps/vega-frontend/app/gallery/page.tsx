import { Metadata } from "next";
import { ProtectedImage } from "@/components/ProtectedImage";
import { GALLERY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | Vega UAE",
  description: "Explore our product gallery, warehouse, fleet, and team photos.",
};

export default function GalleryPage() {
  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="label-line mb-4">Portfolio</div>
          <h1 className="section-heading">Gallery</h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl leading-relaxed">
            Explore our product gallery, warehouse, fleet, and team photos.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <div key={item.name} className="group overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-subtle transition-all duration-500 hover:shadow-md hover:-translate-y-1 hover:border-vega-blue/20 animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
              <div className="aspect-square overflow-hidden">
                <ProtectedImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-bold text-vega-blue">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
