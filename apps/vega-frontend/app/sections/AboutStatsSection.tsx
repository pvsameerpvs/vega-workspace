export function AboutStatsSection() {
  const statsData = [
    { value: "15+", label: "Years of experience delivering across UAE" },
    { value: "1500+", label: "Satisfied customers trust our products" },
    { value: "300+", label: "Products in stock ready to deliver" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="label-line mb-4">About Us</div>
            <h2 className="section-heading">
              Reliable Supply,<br />
              Quality Solutions.
            </h2>
          </div>
          <div className="flex items-center">
            <p className="body-muted max-w-md">
              We believe that good furniture should be easy to source and reliable to use.
              For this reason, we work with the best manufacturers to create products that are
              suitable for the needs of businesses across the UAE — furniture that is pleasant
              to look at, reliable for the long term, and delivered on time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-12">
          {statsData.map((stat) => (
            <div key={stat.label}>
              <div className="stat-number mb-2">{stat.value}</div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[180px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
