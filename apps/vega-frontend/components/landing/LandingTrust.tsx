import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading, LandingItem } from "./types";

export function LandingTrust({
  heading,
  items,
  isAR,
}: {
  heading: LandingSectionHeading;
  items: LandingItem[];
  isAR: boolean;
}) {
  return (
    <section className="scroll-mt-32 md:scroll-mt-40 bg-gradient-dark py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-vega-yellow/40"
            >
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-vega-yellow text-vega-blue">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}