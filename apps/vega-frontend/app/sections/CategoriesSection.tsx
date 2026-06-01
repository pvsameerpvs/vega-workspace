const CATEGORIES = [
  "Bunk Bed",
  "Mattresses and Bedding",
  "Office Furniture",
  "Plastic Furniture",
  "Hospitality Equipment",
  "Queue Barriers",
  "Flags & Flag Poles",
  "Waste Bins",
];

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-vega-blue">
          Popular Product Categories
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className="flex aspect-square flex-col items-center justify-center rounded-xl bg-gray-50 p-4 text-center transition hover:shadow-lg"
            >
              <div className="mb-3 h-16 w-16 rounded-full bg-gray-200" />
              <span className="font-semibold text-vega-blue">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
