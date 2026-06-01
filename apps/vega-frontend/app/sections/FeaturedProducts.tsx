"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts, mapProductToFrontend } from "@/lib/api";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      const mapped = data.map(mapProductToFrontend).filter(Boolean);
      setProducts(mapped.filter((p: any) => p.isFeatured).slice(0, 8));
    });
  }, []);

  const featured = products.length > 0 ? products : [];

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">Online Exclusive</h2>
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
          navigation={{ prevEl: ".featured-prev", nextEl: ".featured-next" }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
        >
          {featured.map((p, i) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} tag={i < 3 ? "New Arrival" : i < 5 ? "Best Seller" : "Online Exclusive"} tagColor={i < 3 ? "bg-[#1F3A93]" : i < 5 ? "bg-[#FFD400] text-[#1F3A93]" : "bg-emerald-600"} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
