"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/use-products";
import "swiper/css";

interface NewArrivalsProps {
  locale?: string;
}

export function NewArrivals({ locale = "en" }: NewArrivalsProps) {
  const isAR = locale === "ar";
  const allProducts = useProducts();
  const items = allProducts.slice(0, 8);

  const prevClass = isAR ? ".na-next" : ".na-prev";
  const nextClass = isAR ? ".na-prev" : ".na-next";

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">{isAR ? "وصل حديثاً" : "New Arrivals"}</h2>
          <div className="flex items-center gap-2">
            <button className="na-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="na-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
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
              <ProductCard product={p} tag={isAR ? "وصل حديثاً" : "New Arrival"} tagColor="bg-[#FFD400] text-[#1F3A93]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
