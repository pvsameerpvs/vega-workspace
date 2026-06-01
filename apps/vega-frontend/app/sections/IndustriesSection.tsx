import { INDUSTRIES } from "@/lib/data";

export function IndustriesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Sectors</span>
          <h2 className="section-heading text-4xl md:text-5xl">Industries We Serve</h2>
        </div>
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.03}s` }}>
              <span className="text-base font-semibold text-slate-900">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
