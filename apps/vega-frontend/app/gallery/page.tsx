import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Vega UAE",
  description: "Explore our product gallery, warehouse, fleet, and team photos.",
};

const GALLERIES = [
  { name: "Camp Furniture", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Camp+Furniture" },
  { name: "Queue Barriers", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Queue+Barriers" },
  { name: "Office Furniture", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Office+Furniture" },
  { name: "Metal Barriers", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Metal+Barriers" },
  { name: "Warehouse", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Warehouse" },
  { name: "Delivery Fleet", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Delivery+Fleet" },
  { name: "Team", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Team" },
  { name: "Installation", image: "https://placehold.co/600x400/1F3A93/FFD400?text=Installation" },
];

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
          {GALLERIES.map((cat) => (
            <div key={cat.name} className="group overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"

                />
              </div>
              <div className="p-4 text-center">
                <span className="text-base font-semibold text-gray-900">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
