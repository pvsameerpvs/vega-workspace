"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data";
import "swiper/css";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-[#1F3A93] text-white",
  "bg-[#FFD400] text-[#1F3A93]",
  "bg-emerald-600 text-white",
  "bg-rose-600 text-white",
  "bg-sky-600 text-white",
  "bg-amber-600 text-white",
  "bg-violet-600 text-white",
  "bg-teal-600 text-white",
];

export function Testimonials() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              What Customers Say About Vega
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-[#1F3A93]">G</span>
                <span className="text-2xl font-bold text-rose-600">o</span>
                <span className="text-2xl font-bold text-amber-500">o</span>
                <span className="text-2xl font-bold text-[#1F3A93]">g</span>
                <span className="text-2xl font-bold text-emerald-600">l</span>
                <span className="text-2xl font-bold text-rose-600">e</span>
              </div>
              <span className="text-sm text-slate-500">Reviews</span>
              <div className="flex items-center gap-0.5 ml-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FFD400] text-[#FFD400]" />
                ))}
                <span className="ml-1 text-sm font-bold text-slate-700">4.8</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="test-prev flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="test-next flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-[#1F3A93] hover:text-white hover:border-[#1F3A93] transition-all">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".test-prev", nextEl: ".test-next" }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {GOOGLE_REVIEWS.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-xl border border-slate-100 p-5 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{review.name}</div>
                    <div className="text-[11px] text-slate-400">Verified Customer</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${
                        j < review.rating
                          ? "fill-[#FFD400] text-[#FFD400]"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-[11px] text-slate-400">{review.rating}.0</span>
                </div>

                {/* Quote */}
                <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 h-4 w-4 text-[#FFD400]/40" />
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    {review.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
