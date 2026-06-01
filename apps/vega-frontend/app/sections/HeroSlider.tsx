"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HeroSlider() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative flex h-full flex-col justify-center px-6 pt-24 lg:px-16">
                <div className="mx-auto w-full max-w-7xl">
                  <div className="max-w-2xl">
                    {/* Tagline */}
                    <div className="mb-6 flex items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                        For Businesses Across UAE
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl font-light leading-[1.15] text-white md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={slide.ctaLink}
                        className="rounded-full border border-white/40 px-7 py-3 text-sm text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                      >
                        {slide.ctaText}
                      </Link>
                      <Link
                        href={slide.ctaSecondaryLink}
                        className="rounded-full border border-white/40 px-7 py-3 text-sm text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                      >
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
