import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading, LandingItem } from "./types";

export function LandingCategories({
  heading,
  items,
  isAR,
}: {
  heading: LandingSectionHeading;
  items: LandingItem[];
  isAR: boolean;
}) {
  return (
    <section className="scroll-mt-32 md:scroll-mt-40 bg-gradient-subtle py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vega-yellow/60 hover:shadow-card-hover"
            >
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-vega-blue text-vega-yellow transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-vega-blue">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}