"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface Banner {
  id: number;
  image?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  isActive?: boolean;
}

interface HeroBannerProps {
  banners?: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const activeBanners = banners?.filter((b) => b.isActive && b.image) || [];
  const slides = activeBanners.length > 0
    ? activeBanners.map((b) => ({
        id: String(b.id),
        title: b.title || "",
        subtitle: b.subtitle || "",
        ctaText: b.ctaText || "Request a Quote",
        ctaLink: b.ctaLink || "/contact-us",
        ctaSecondaryText: b.ctaSecondaryText || "View Products",
        ctaSecondaryLink: b.ctaSecondaryLink || "/products",
        image: b.image,
      }))
    : HERO_SLIDES;

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full aspect-[3/4] md:aspect-[16/6] max-h-[600px] md:max-h-[520px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:bottom-10 md:left-8 md:right-auto flex flex-col items-center md:items-start gap-4">
                {/* Title & subtitle for mobile (desktop has text baked in image) */}
                <div className="text-center md:hidden space-y-1">
                  {slide.title && (
                    <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-sm text-white/90 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-5 py-2.5 text-sm font-bold text-[#1F3A93] hover:bg-white transition-all shadow-lg w-full md:w-auto"
                  >
                    {slide.ctaText} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={slide.ctaSecondaryLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-5 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-[#1F3A93] transition-all shadow-lg w-full md:w-auto"
                  >
                    {slide.ctaSecondaryText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
