"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { slideUp, kenBurns } from "./animations";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  image: string;
}

interface HeroSlideProps {
  slide: Slide;
  index: number;
  locale: string;
}

export function HeroSlide({ slide, index, locale }: HeroSlideProps) {
  const isAR = locale === "ar";

  return (
    <div className="relative w-full h-[calc(100vh-7rem)]">
      <motion.div
        className="absolute inset-0"
        variants={kenBurns}
        initial="initial"
        animate="animate"
      >
        <ProtectedImage
          src={slide.image}
          alt={slide.title}
          className="object-cover"
          priority={index === 0}
          quality={100}
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 md:items-start">
        <div className={`max-w-xl space-y-5 ${isAR ? "text-center md:text-right" : "text-center md:text-left"}`}>
          {slide.title && (
            <motion.h2
              custom={0}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight md:tracking-normal"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)" }}
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
              className="text-base md:text-lg text-white/95 leading-relaxed tracking-wide"
              style={{
                fontWeight: 400,
                textShadow: "0 2px 16px rgba(0,0,0,0.8)",
              }}
            >
              {slide.subtitle}
            </motion.p>
          )}
        </div>
      </div>

      <motion.div
        custom={2}
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className={`absolute bottom-0 ${isAR ? "left-0 md:left-10" : "right-0 md:right-10"} p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-3 w-full md:w-auto`}
      >
        <Link
          href={`/${locale}${slide.ctaLink}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-7 py-3.5 text-sm font-bold text-[#1F3A93] hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto group"
        >
          {slide.ctaText}
          <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isAR ? "rotate-180" : ""}`} />
        </Link>
        <Link
          href={`/${locale}${slide.ctaSecondaryLink}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-[#1F3A93] hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto"
        >
          {slide.ctaSecondaryText}
        </Link>
      </motion.div>
    </div>
  );
}
