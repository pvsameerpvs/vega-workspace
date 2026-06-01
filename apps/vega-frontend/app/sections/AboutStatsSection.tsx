import { Warehouse, Package, Users, Award, CreditCard, Building, Headset } from "lucide-react";

const STATS = [
  { value: "10,000+", label: "sq ft warehouse facility", icon: Warehouse },
  { value: "300+", label: "products in stock", icon: Package },
  { value: "1,500+", label: "satisfied customers", icon: Users },
  { value: "15+", label: "years of experience", icon: Award },
  { value: "Multiple", label: "secured payment options", icon: CreditCard },
  { value: "15+", label: "industries served", icon: Building },
  { value: "24/7", label: "dedicated customer support", icon: Headset },
];

export function AboutStatsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="label-line mb-4">About Us</div>
            <h2 className="section-heading">
              Reliable Supply,<br />
              <span className="font-display italic text-vega-yellow">Quality</span> Solutions.
            </h2>
          </div>
          <div className="flex items-center">
            <p className="body-muted max-w-md">
              We believe that good furniture should be easy to source and reliable to use.
              For this reason, we work with the best manufacturers to create products that are
              suitable for the needs of businesses across the UAE.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-12 md:grid-cols-4 lg:grid-cols-7">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vega-blue/10 text-vega-blue transition-all duration-300 group-hover:bg-vega-blue group-hover:text-white shadow-subtle">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="stat-number mb-1 text-2xl">{stat.value}</div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[140px] mx-auto">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
