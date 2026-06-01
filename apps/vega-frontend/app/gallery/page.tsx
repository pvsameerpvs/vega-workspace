import { Metadata } from "next";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getGallery, mapGalleryToFrontend } from "@/lib/api";

export const metadata: Metadata = {
  title: "Gallery | Vega UAE",
  description: "Explore our product gallery, warehouse, fleet, and team photos.",
};

export default async function GalleryPage() {
  const items = await getGallery();
  const mapped = items.map(mapGalleryToFrontend).filter(Boolean);

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <span className="mb-6 block text-sm text-slate-400">Portfolio</span>
          <h1 className="section-heading text-4xl md:text-5xl">Gallery</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
            Explore our product gallery, warehouse, fleet, and team photos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {mapped.map((item, i) => (
            <div key={item.name + i} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
              <div className="aspect-square overflow-hidden rounded-3xl bg-slate-100 mb-3">
                <ProtectedImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <span className="text-base font-semibold text-slate-900">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
