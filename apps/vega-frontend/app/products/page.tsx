import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Vega UAE",
  description: "Browse our full range of camp furniture, barriers, office furniture, and more.",
};

export default function ProductsPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Our Products</h1>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Product cards will be fetched from database */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <div className="mb-4 aspect-square rounded bg-gray-200" />
              <h3 className="font-semibold text-vega-blue">Product Name {i}</h3>
              <p className="text-sm text-gray-600">SKU: VEGA-{i.toString().padStart(4, "0")}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
