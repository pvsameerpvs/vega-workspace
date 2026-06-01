import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Vega UAE",
  description: "Explore our product gallery, warehouse, fleet, and team photos.",
};

export default function GalleryPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Gallery</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "Camp Furniture",
            "Queue Barriers",
            "Office Furniture",
            "Warehouse",
            "Delivery Fleet",
            "Team",
            "Installation",
            "Projects",
          ].map((cat) => (
            <div key={cat} className="rounded-lg bg-gray-100 p-4 text-center">
              <div className="mb-2 aspect-square rounded bg-gray-200" />
              <span className="text-sm font-medium text-vega-blue">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
