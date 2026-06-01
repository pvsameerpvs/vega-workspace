"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HeroSlider() {
  return (
    <section className="relative h-[85vh] min-h-[620px] max-h-[920px] overflow-hidden bg-vega-blue">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image with zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover scale-105 animate-[scaleIn_8s_ease-out_forwards]"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-vega-blue/40 via-vega-blue/20 to-vega-blue/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-vega-blue/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex h-full flex-col justify-center px-6 pt-32 lg:px-16">
                <div className="mx-auto w-full max-w-7xl">
                  <div className="max-w-2xl">
                    {/* Tagline */}
                    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-vega-yellow/30 bg-vega-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-vega-yellow backdrop-blur-sm">
                        For Businesses Across UAE
                      </span>
                    </div>

                    {/* Main Heading - Blue */}
                    <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="mb-9 max-w-lg text-base leading-relaxed text-white/70 md:text-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      {slide.subtitle}
                    </p>

                    {/* Buttons - Yellow primary, Blue secondary */}
                    <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      <Link href={slide.ctaLink} className="group inline-flex items-center gap-2 rounded-full bg-vega-yellow px-7 py-3.5 text-sm font-bold text-vega-blue shadow-yellow transition-all duration-300 hover:bg-vega-yellow-dark hover:shadow-lg hover:-translate-y-0.5">
                        {slide.ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <Link href={slide.ctaSecondaryLink} className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/40">
                        {slide.ctaSecondaryText}
                      </Link>
                    </div>
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
