"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { getBestSellers, mapProductToFrontend } from "@/lib/api";
import "swiper/css";

interface BestSellersProps {
  locale?: string;
}

export function BestSellers({ locale = "en" }: BestSellersProps) {
  const isAR = locale === "ar";
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getBestSellers().then((data) => {
      const mapped = (data || []).map(mapProductToFrontend).filter(Boolean);
      setItems(mapped as any[]);
    });
  }, []);

  const prevClass = isAR ? ".bs-next" : ".bs-prev";
  const nextClass = isAR ? ".bs-prev" : ".bs-next";

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">{isAR ? "الأكثر مبيعاً" : "Best Sellers"}</h2>
          <div className="flex items-center gap-2">
            <button className="bs-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="bs-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
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
          {items.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} tag={isAR ? "الأكثر مبيعاً" : "Best Seller"} tagColor="bg-[#1F3A93]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
