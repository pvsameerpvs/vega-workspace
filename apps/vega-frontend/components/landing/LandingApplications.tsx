import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading, LandingItem } from "./types";

export function LandingApplications({
  heading,
  items,
  isAR,
}: {
  heading: LandingSectionHeading;
  items: LandingItem[];
  isAR: boolean;
}) {
  return (
    <section id="applications" className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-vega-yellow/60 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-vega-blue text-vega-yellow transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-vega-blue">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}