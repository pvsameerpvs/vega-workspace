"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/lib/types";

interface RecentViewedProps {
  products?: Product[];
  locale?: string;
}

export function RecentViewed({ products = [], locale = "en" }: RecentViewedProps) {
  const isAR = locale === "ar";
  if (products.length === 0) return null;

  const prevClass = isAR ? ".rv-next" : ".rv-prev";
  const nextClass = isAR ? ".rv-prev" : ".rv-next";

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">{isAR ? "شوهد مؤخراً" : "Recently Viewed"}</h2>
          <div className="flex items-center gap-2">
            <button className="rv-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rv-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevClass, nextEl: nextClass }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
