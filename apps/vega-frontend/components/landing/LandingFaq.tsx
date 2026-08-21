import { ChevronDown } from "lucide-react";
import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading } from "./types";

export function LandingFaq({
  heading,
  items,
  isAR,
}: {
  heading: LandingSectionHeading;
  items: { q: string; a: string }[];
  isAR: boolean;
}) {
  return (
    <section id="faq" className="scroll-mt-32 md:scroll-mt-40 bg-gradient-subtle py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-100 bg-white shadow-sm open:shadow-md transition-shadow"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm font-bold text-vega-blue md:text-base">{item.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-sm leading-relaxed text-slate-500">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}