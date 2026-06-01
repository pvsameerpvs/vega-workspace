"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data";
import "swiper/css";

export function Testimonials() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">What Customers Say About Vega</h2>
        <div className="flex items-center justify-end gap-2 mb-4">
          <button className="test-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="test-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".test-prev", nextEl: ".test-next" }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
        >
          {GOOGLE_REVIEWS.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-xl border border-slate-100 p-4 h-full flex flex-col">
                <div className="relative mb-4 rounded-lg overflow-hidden aspect-video bg-slate-100 flex items-center justify-center">
                  <Play className="h-8 w-8 text-[#1F3A93]" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-3 w-3 ${j < review.rating ? "fill-[#FFD400] text-[#FFD400]" : "text-slate-200"}`} />
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-900">{review.name}</div>
                <div className="text-[10px] text-slate-400">Verified Customer</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
