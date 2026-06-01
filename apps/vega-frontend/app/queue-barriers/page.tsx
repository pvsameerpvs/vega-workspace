import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Queue Barriers | Vega UAE",
  description: "Retractable queue barriers, VIP poles, belts, ropes, and sign boards.",
};

export default function QueueBarriersPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Queue Barriers</h1>
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            "Retractable Queue Barriers",
            "Black Queue Barriers",
            "Silver Queue Barriers",
            "Gold Queue Barriers",
            "Double Belt Queue Barriers",
            "Belt Cassettes",
            "VIP Poles",
            "Belts and Ropes",
            "Information Stands",
            "Sign Boards",
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
              <h3 className="font-semibold text-vega-blue">Queue Product {i}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
