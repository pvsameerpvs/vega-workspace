"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { useHeroSlider } from "./hooks/useHeroSlider";

interface LandingHeroSliderProps {
  images: string[];
  alt: string;
  isAR: boolean;
}

export function LandingHeroSlider({ images, alt, isAR }: LandingHeroSliderProps) {
  const { index, paused, setPaused, go, onTouchStart, onTouchEnd } = useHeroSlider(images.length);

  if (images.length <= 1) {
    return (
      <ProtectedImage
        src={images[0] || ""}
        alt={alt}
        priority
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={isAR ? "صور المنتجات" : "Product images"}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-full w-full">
        {images.map((src, i) => (
          <ProtectedImage
            key={src}
            src={src}
            alt={alt}
            priority={i === 0}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-1000 ${
              i === index ? "scale-105 opacity-100" : "scale-100 opacity-0"
            }`}
          />
        ))}
      </div>

      <span className="absolute end-4 top-4 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white backdrop-blur-sm">
        {index + 1} / {images.length}
      </span>

      <button
        type="button"
        aria-label={isAR ? "الصورة السابقة" : "Previous image"}
        onClick={() => go(index - 1)}
        className="absolute start-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white shadow-md backdrop-blur-sm transition-all hover:bg-vega-yellow hover:text-vega-blue md:flex"
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        aria-label={isAR ? "الصورة التالية" : "Next image"}
        onClick={() => go(index + 1)}
        className="absolute end-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white shadow-md backdrop-blur-sm transition-all hover:bg-vega-yellow hover:text-vega-blue md:flex"
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" />
      </button>

      <div className="absolute bottom-4 start-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${isAR ? "صورة" : "Image"} ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-vega-yellow" : "w-1.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 start-0 h-0.5 w-full bg-white/20">
        <div
          key={index}
          className="h-full bg-vega-yellow"
          style={{ animation: paused ? "none" : "hero-progress 5s linear forwards" }}
        />
      </div>
    </div>
  );
}