const STATS = [
  { value: "10,000+", label: "sq ft warehouse facility" },
  { value: "300+", label: "products in stock" },
  { value: "1,500+", label: "satisfied customers" },
  { value: "15+", label: "years of experience" },
  { value: "Multiple", label: "secured payment options" },
  { value: "15+", label: "industries served" },
  { value: "24/7", label: "dedicated customer support" },
];

export function AboutStatsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 grid gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-6 block text-sm text-slate-400">About Us</span>
            <h2 className="section-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
              Reliable Supply,<br />
              <span className="font-display italic text-vega-yellow">Quality</span> Solutions.
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-lg leading-relaxed text-slate-500 max-w-md">
              We believe that good furniture should be easy to source and reliable to use.
              For this reason, we work with the best manufacturers to create products that are
              suitable for the needs of businesses across the UAE.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 border-t border-slate-100 pt-20 md:grid-cols-4 lg:grid-cols-7">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="stat-number mb-2 text-3xl md:text-4xl">{stat.value}</div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-[140px] mx-auto">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
