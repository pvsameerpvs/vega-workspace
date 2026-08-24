import { ArrowRight } from "lucide-react";
import { TrackedAnchor } from "./TrackedAnchor";
import type { LandingHero as LandingHeroContent } from "./types";

interface LandingHeroContentProps {
  hero: LandingHeroContent;
  isAR: boolean;
  quoteHref: string;
  productsHref: string;
  trustMicrocopy: string;
}

export function LandingHeroContent({
  hero,
  isAR,
  quoteHref,
  productsHref,
  trustMicrocopy,
}: LandingHeroContentProps) {
  const trustItems = trustMicrocopy.split("•").map((t) => t.trim()).filter(Boolean);

  return (
    <div className={`max-w-2xl space-y-6 ${isAR ? "text-center md:text-right" : "text-center md:text-left"}`}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-vega-yellow" />
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
          {hero.eyebrow}
        </span>
      </div>

      <h1
        className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)" }}
      >
        {hero.title}
      </h1>

      <p
        className="text-base leading-relaxed text-white/90 md:text-lg"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
      >
        {hero.subtitle}
      </p>

      <div className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center">
        <TrackedAnchor
          href={quoteHref}
          event="lp_hero_quote"
          label={hero.primaryCta}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-vega-yellow px-8 py-4 text-sm font-bold text-vega-blue shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-xl"
        >
          {hero.primaryCta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </TrackedAnchor>
        <TrackedAnchor
          href={productsHref}
          event="lp_hero_products"
          label={hero.secondaryCta}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-vega-blue hover:shadow-lg"
        >
          {hero.secondaryCta}
        </TrackedAnchor>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
        {trustItems.map((item, i) => (
          <span key={item} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            {i > 0 && <span className="h-1 w-1 rounded-full bg-vega-yellow" />}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}