import { Metadata } from "next";
import { ProtectedImage } from "@/components/ProtectedImage";
import { GALLERY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | Vega UAE",
  description: "Explore our product gallery, warehouse, fleet, and team photos.",
};

export default function GalleryPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="label-line mb-4">Portfolio</div>
          <h1 className="section-heading">Gallery</h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl">
            Explore our product gallery, warehouse, fleet, and team photos.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item) => (
            <div key={item.name} className="group overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-square overflow-hidden">
              <ProtectedImage
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              </div>
              <div className="p-4 text-center">
                <span className="text-base font-semibold text-gray-900">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
