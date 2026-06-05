"use client";

import { Search, ArrowRight } from "lucide-react";

interface BlogHeroProps {
  locale?: string;
  count: number;
}

export function BlogHero({ locale = "en", count }: BlogHeroProps) {
  const isAR = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-[#1F3A93] pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FFD400]/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FFD400]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-[#FFD400]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD400]">
              {isAR ? "رؤى ومعرفة" : "Insights & Knowledge"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            {isAR ? (
              <>
                المدونة<span className="text-[#FFD400]">.</span>
              </>
            ) : (
              <>
                The Blog<span className="text-[#FFD400]">.</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-10">
            {isAR
              ? "اكتشف أحدث المقالات والرؤى الصناعية وتحديثات المنتجات من فريق فيجا."
              : "Discover the latest articles, industry insights, and product updates from the Vega team."}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            <div>
              <span className="text-3xl font-bold text-white">{count}</span>
              <span className="block text-xs text-white/40 mt-1 uppercase tracking-wider">
                {isAR ? "مقال" : "Articles"}
              </span>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <span className="text-3xl font-bold text-[#FFD400]">2025</span>
              <span className="block text-xs text-white/40 mt-1 uppercase tracking-wider">
                {isAR ? "منذ" : "Since"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px]"
        >
          <path
            d="M0,0 C400,60 800,60 1200,0 L1200,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
