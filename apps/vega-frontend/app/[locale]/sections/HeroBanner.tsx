"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface Banner {
  id: number;
  image?: string;
  title?: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  ctaText?: string;
  ctaTextAr?: string;
  ctaLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryTextAr?: string;
  ctaSecondaryLink?: string;
  slideDuration?: number;
  isActive?: boolean;
}

interface HeroBannerProps {
  banners?: Banner[];
  locale?: string;
}

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export function HeroBanner({ banners, locale = "en" }: HeroBannerProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const activeBanners = banners?.filter((b) => b.isActive && b.image) || [];
  const slides = activeBanners.map((b) => ({
    id: String(b.id),
    title: isAR ? (b.titleAr || b.title || "") : (b.title || ""),
    subtitle: isAR ? (b.subtitleAr || b.subtitle || "") : (b.subtitle || ""),
    ctaText: isAR ? (b.ctaTextAr || b.ctaText || "اطلب عرض سعر") : (b.ctaText || "Request a Quote"),
    ctaLink: b.ctaLink || "/contact-us",
    ctaSecondaryText: isAR ? (b.ctaSecondaryTextAr || b.ctaSecondaryText || "عرض المنتجات") : (b.ctaSecondaryText || "View Products"),
    ctaSecondaryLink: b.ctaSecondaryLink || "/products",
    image: b.image,
    slideDuration: b.slideDuration || 6000,
  }));

  if (slides.length === 0) return null;

  return (
    <section className="relative overflow-hidden w-full h-[calc(100vh-7rem)]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} data-swiper-autoplay={slide.slideDuration}>
            <div className="relative w-full h-[calc(100vh-7rem)]">
              {/* Background Image with scale animation */}
              <motion.div
                className="absolute inset-0"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </motion.div>

              {/* Gradient overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              {/* Title & Subtitle — start side (left in LTR, right in RTL) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 md:items-start">
                <div className={`max-w-xl space-y-5 ${isAR ? "text-center md:text-right" : "text-center md:text-left"}`}>
                  {slide.title && (
                    <motion.h2
                      custom={0}
                      variants={slideUp}
                      initial="hidden"
                      animate="visible"
                      className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                      style={{
                        fontFamily: "var(--font-poppins), Poppins, sans-serif",
                        textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {slide.title}
                    </motion.h2>
                  )}
                  {slide.subtitle && (
                    <motion.p
                      custom={1}
                      variants={slideUp}
                      initial="hidden"
                      animate="visible"
                      className="text-base md:text-lg text-white/95 leading-relaxed"
                      style={{
                        fontFamily: "var(--font-poppins), Poppins, sans-serif",
                        fontWeight: 400,
                        textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                      }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Buttons — start side (left in LTR, right in RTL) */}
              <motion.div
                custom={2}
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className={`absolute bottom-0 ${isAR ? "left-0 md:left-10" : "right-0 md:right-10"} p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-3 w-full md:w-auto`}
              >
                <Link
                  href={l(slide.ctaLink)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-7 py-3.5 text-sm font-bold text-[#1F3A93] hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto group"
                  style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                >
                  {slide.ctaText}
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isAR ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  href={l(slide.ctaSecondaryLink)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-[#1F3A93] hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto"
                  style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                >
                  {slide.ctaSecondaryText}
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
