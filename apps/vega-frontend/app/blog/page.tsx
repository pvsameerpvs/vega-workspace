import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Vega UAE",
  description: "Latest articles, industry insights, and product updates from Vega.",
};

export default function BlogPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Blog & Articles</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Blog cards will be fetched from database */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <div className="mb-4 aspect-video rounded bg-gray-200" />
              <h3 className="text-lg font-semibold text-vega-blue">
                Bulk Camp Furniture Supplier in UAE
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Learn why Vega is the trusted choice for camp furniture across the UAE.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
