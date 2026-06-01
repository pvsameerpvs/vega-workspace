const STATS = [
  { value: "10,000+", label: "sq ft warehouse" },
  { value: "300+", label: "products in stock" },
  { value: "1500+", label: "satisfied customers" },
  { value: "15+", label: "years of experience" },
];

export function StatsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-vega-yellow">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
