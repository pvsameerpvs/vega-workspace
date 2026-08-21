import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading, LandingItem } from "./types";

export function LandingFeatureGrid({
  heading,
  items,
  isAR,
  tone = "light",
}: {
  heading: LandingSectionHeading;
  items: LandingItem[];
  isAR: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <section id={tone === "dark" ? "why-us" : undefined} className={`scroll-mt-32 md:scroll-mt-40 py-16 md:py-24 ${tone === "dark" ? "bg-gradient-dark" : "bg-gradient-subtle"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                tone === "dark" ? "border-white/10 bg-white/5" : "border-slate-100 bg-white shadow-sm"
              }`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  tone === "dark" ? "bg-vega-yellow text-vega-blue" : "bg-vega-yellow/15 text-vega-blue"
                }`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className={`mb-2 text-base font-bold ${tone === "dark" ? "text-white" : "text-vega-blue"}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-slate-500"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}