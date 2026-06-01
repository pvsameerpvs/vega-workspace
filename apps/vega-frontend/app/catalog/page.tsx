import { Metadata } from "next";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Catalogs | Vega UAE",
  description: "Download our product catalogs in PDF format.",
};

const CATALOGS = [
  {
    name: "CROWN Camp Furniture",
    description: "Complete range of camp furniture including bunk beds, single beds, mattresses, lockers, and dining sets.",
  },
  {
    name: "Alpha Barrier",
    description: "Queue barriers, metal barriers, crowd control solutions, and VIP poles for events and commercial spaces.",
  },
  {
    name: "Camp Furniture Brochure",
    description: "A comprehensive overview of our labor camp furniture and accommodation solutions across the UAE.",
  },
  {
    name: "VEGA Office Furniture",
    description: "Executive desks, ergonomic chairs, filing cabinets, and complete office workstation solutions.",
  },
];

export default function CatalogPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Downloads</div>
          <h1 className="section-heading">Product Catalogs</h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto">
            Download our product catalogs in PDF format. Browse our complete range of furniture, barriers, and industrial supplies.
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATALOGS.map((cat) => (
            <div key={cat.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
              <div className="mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={`https://placehold.co/400x540/e5e7eb/1f2937?text=${encodeURIComponent(cat.name)}`}
                  alt={cat.name}
                  className="h-full w-full object-cover"

                />
              </div>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                <FileText className="h-4 w-4" /> PDF
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-base text-gray-500 mb-6 flex-1">{cat.description}</p>
              <button className="w-full rounded-full bg-gray-900 py-3 text-base font-medium text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
