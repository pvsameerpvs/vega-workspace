import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading, LandingItem } from "./types";

export function LandingSteps({
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
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.title} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="absolute -top-4 left-6 rounded-full bg-vega-blue px-3 py-1 text-xs font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-4 mt-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-vega-yellow/15 text-vega-blue">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-bold text-vega-blue">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}