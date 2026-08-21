import { ProtectedImage } from "@/components/ProtectedImage";
import { LandingSectionHeader } from "./LandingSectionHeader";
import type { LandingSectionHeading, LandingUseCaseItem } from "./types";

export function LandingUseCases({
  heading,
  items,
  images,
  isAR,
}: {
  heading: LandingSectionHeading;
  items: LandingUseCaseItem[];
  images: string[];
  isAR: boolean;
}) {
  return (
    <section className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <LandingSectionHeader heading={heading} isAR={isAR} />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {images[i] ? (
                  <ProtectedImage
                    src={images[i]}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-vega-blue/5">
                    {item.icon ? (
                      <item.icon className="h-10 w-10 text-vega-blue/20" />
                    ) : (
                      <span className="text-4xl font-bold text-vega-blue/20">{item.title.charAt(0)}</span>
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-vega-blue/30 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 text-sm font-bold text-vega-blue">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}