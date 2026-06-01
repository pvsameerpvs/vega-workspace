import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Furniture | Vega UAE",
  description: "Bunk beds, single beds, mattresses, lockers, and dining furniture for labor camps.",
};

export default function CampFurniturePage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Camp Furniture</h1>
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            "Bunk Beds",
            "Single Beds",
            "Mattresses",
            "Blankets",
            "Pillows",
            "Bedsheets",
            "Lockers",
            "Dining Tables",
            "Plastic Chairs",
            "Gas Burners",
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
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <div className="mb-4 aspect-square rounded bg-gray-200" />
              <h3 className="font-semibold text-vega-blue">Camp Product {i}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
