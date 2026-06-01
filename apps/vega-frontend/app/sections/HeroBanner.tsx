"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full object-cover"
                style={{ aspectRatio: "16 / 6", maxHeight: "520px" }}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* CTA buttons overlay at bottom-left */}
              <div className="absolute bottom-6 left-4 md:bottom-10 md:left-8 flex items-center gap-3">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-5 py-2.5 text-sm font-bold text-[#1F3A93] hover:bg-white transition-all shadow-lg"
                >
                  {slide.ctaText} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={slide.ctaSecondaryLink}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-5 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-[#1F3A93] transition-all shadow-lg"
                >
                  {slide.ctaSecondaryText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
