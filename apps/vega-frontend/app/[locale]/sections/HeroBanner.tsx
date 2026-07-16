"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { getBanners } from "@/lib/api";
import { HeroSlide } from "./hero";
import { scaleIn } from "./hero/animations";


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

export function HeroBanner({ banners: initialBanners, locale = "en" }: HeroBannerProps) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners || []);
  const [loading, setLoading] = useState(!initialBanners || initialBanners.length === 0);
  const isAR = locale === "ar";

  useEffect(() => {
    if (!initialBanners || initialBanners.length === 0) {
      getBanners().then((d) => {
        if (d && d.length > 0) setBanners(d as Banner[]);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [initialBanners]);

  const activeBanners = banners?.filter((b) => b.isActive && b.image) || [];
  const slides = activeBanners.map((b) => ({
    id: String(b.id),
    title: isAR ? (b.titleAr || b.title || "") : (b.title || ""),
    subtitle: isAR ? (b.subtitleAr || b.subtitle || "") : (b.subtitle || ""),
    ctaText: isAR ? (b.ctaTextAr || b.ctaText || "اطلب عرض سعر") : (b.ctaText || "Request a Quote"),
    ctaLink: b.ctaLink || "/contact-us",
    ctaSecondaryText: isAR ? (b.ctaSecondaryTextAr || b.ctaSecondaryText || "عرض المنتجات") : (b.ctaSecondaryText || "View Products"),
    ctaSecondaryLink: b.ctaSecondaryLink || "/products",
    image: b.image || "",
    slideDuration: b.slideDuration || 6000,
  }));

  if (loading) {
    return (
      <section className="relative overflow-hidden w-full h-[calc(100vh-7rem)] bg-slate-200 animate-pulse" />
    );
  }

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
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} data-swiper-autoplay={slide.slideDuration}>
            <motion.div
              className="w-full h-full"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <HeroSlide slide={slide} index={index} locale={locale} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
