"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

export function HeroSlider() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-[980px] overflow-hidden bg-[#1a1a2e]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover scale-105 animate-[scaleIn_12s_ease-out_forwards]"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Dark cinematic overlay for furniture elegance */}
                <div className="absolute inset-0 bg-[#1a1a2e]/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/20 to-[#1a1a2e]/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/60 via-transparent to-[#1a1a2e]/30" />
              </div>

              {/* Slide Numbers — Left Side */}
              <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:left-8 lg:left-12 xl:flex">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-500 ${
                      i === index
                        ? "border-vega-yellow bg-vega-yellow text-vega-blue"
                        : "border-white/15 text-white/30 hover:border-white/30 hover:text-white/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>

              {/* Center Content — Like the reference image */}
              <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="max-w-4xl">
                  {/* Main Heading — Large Elegant Serif Italic (like reference) */}
                  <h1
                    className="font-display mb-6 text-4xl font-medium italic leading-[1.2] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p
                    className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-white/50 md:text-base animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.subtitle}
                  </p>

                  {/* Single CTA Button — Like reference */}
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <Link
                      href={slide.ctaLink}
                      className="group inline-flex items-center gap-3 rounded-full bg-vega-yellow px-8 py-3.5 text-sm font-bold text-vega-blue shadow-yellow transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 font-heading"
                    >
                      {slide.ctaText}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Bar — Like reference image */}
              <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="mx-auto flex max-w-7xl items-end justify-between px-4 pb-6 pt-20 md:px-8 lg:px-10">
                  {/* Left: Social Icons */}
                  <div className="hidden md:flex items-center gap-2">
                    {[
                      { name: "Facebook", icon: "Fb" },
                      { name: "Instagram", icon: "In" },
                      { name: "LinkedIn", icon: "Li" },
                    ].map((s) => (
                      <a
                        key={s.name}
                        href={`https://www.${s.name.toLowerCase()}.com/vegauae`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/40 transition-all duration-300 hover:border-vega-yellow hover:bg-vega-yellow hover:text-vega-blue text-[10px] font-bold"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
