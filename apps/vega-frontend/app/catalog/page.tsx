import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogs | Vega UAE",
  description: "Download our product catalogs in PDF format.",
};

export default function CatalogPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Product Catalogs</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "CROWN Camp Furniture",
            "Alpha Barrier",
            "Camp Furniture Brochure",
            "VEGA Office Furniture",
          ].map((cat) => (
            <div key={cat} className="rounded-lg border bg-white p-6">
              <div className="mb-4 aspect-[3/4] rounded bg-gray-200" />
              <h3 className="text-lg font-semibold text-vega-blue">{cat}</h3>
              <button className="mt-4 w-full rounded bg-vega-blue py-2 text-white hover:bg-blue-800">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
