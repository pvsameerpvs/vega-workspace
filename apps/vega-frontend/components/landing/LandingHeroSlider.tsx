"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

interface LandingHeroSliderProps {
  images: string[];
  alt: string;
  isAR: boolean;
}

export function LandingHeroSlider({ images, alt, isAR }: LandingHeroSliderProps) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  const go = useCallback(
    (next: number) => {
      if (images.length <= 1) return;
      setIndex(((next % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length <= 1) {
    return (
      <ProtectedImage
        src={images[0] || ""}
        alt={alt}
        className="aspect-[4/3] w-full object-cover"
        priority
      />
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {images.map((src, i) => (
          <ProtectedImage
            key={src}
            src={src}
            alt={alt}
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={isAR ? "الصورة السابقة" : "Previous image"}
        onClick={() => go(index - 1)}
        className="absolute start-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/80 text-vega-blue shadow-md backdrop-blur-sm transition-all hover:bg-vega-yellow hover:text-vega-blue"
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        aria-label={isAR ? "الصورة التالية" : "Next image"}
        onClick={() => go(index + 1)}
        className="absolute end-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/80 text-vega-blue shadow-md backdrop-blur-sm transition-all hover:bg-vega-yellow hover:text-vega-blue"
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" />
      </button>

      <div className="absolute bottom-3 start-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${isAR ? "صورة" : "Image"} ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-vega-yellow" : "w-1.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}