"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts, mapProductToFrontend } from "@/lib/api";

interface FeaturedProductsProps {
  locale?: string;
}

export function FeaturedProducts({ locale = "en" }: FeaturedProductsProps) {
  const isAR = locale === "ar";
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      const mapped = (data || []).map(mapProductToFrontend).filter(Boolean);
      setFeatured(mapped as any[]);
    });
  }, []);

  const prevClass = isAR ? ".featured-next" : ".featured-prev";
  const nextClass = isAR ? ".featured-prev" : ".featured-next";

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">{isAR ? "حصرياً أونلاين" : "Online Exclusive"}</h2>
          <div className="flex items-center gap-2">
            <button className="featured-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="featured-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
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
          {featured.map((p, i) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} tag={i < 3 ? (isAR ? "وصل حديثاً" : "New Arrival") : i < 5 ? (isAR ? "الأكثر مبيعاً" : "Best Seller") : (isAR ? "حصري أونلاين" : "Online Exclusive")} tagColor={i < 3 ? "bg-[#1F3A93]" : i < 5 ? "bg-[#FFD400] text-[#1F3A93]" : "bg-emerald-600"} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
