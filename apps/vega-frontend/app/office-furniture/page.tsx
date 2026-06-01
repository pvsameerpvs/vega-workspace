import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Office Furniture | Vega UAE",
  description: "Office desks, chairs, cabinets, meeting tables, and workstations.",
};

export default function OfficeFurniturePage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Office Furniture</h1>
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            "Office Desks",
            "Office Chairs",
            "File Cabinets",
            "Storage Cabinets",
            "Meeting Tables",
            "Workstations",
            "Reception Furniture",
          ].map((sub) => (
            <span
              key={sub}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-vega-blue"
            >
              {sub}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <div className="mb-4 aspect-square rounded bg-gray-200" />
              <h3 className="font-semibold text-vega-blue">Office Product {i}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
