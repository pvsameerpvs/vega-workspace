"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

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

interface Testimonial {
  name: string;
  rating: number;
  text: string;
}

interface TestimonialsProps {
  reviews?: Testimonial[];
  locale?: string;
}

export function Testimonials({ reviews = [], locale = "en" }: TestimonialsProps) {
  const isAR = locale === "ar";

  // In RTL, Swiper prev/next classes must be swapped
  const prevClass = isAR ? ".test-next" : ".test-prev";
  const nextClass = isAR ? ".test-prev" : ".test-next";

  return (
    <section className="py-8 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isAR ? "ماذا يقول عملاؤنا عن فيجا" : "What Customers Say About Vega"}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              {/* Google logo — force LTR so letters don't reverse in RTL */}
              <span dir="ltr" className="flex items-center gap-1">
                <span className="text-2xl font-bold text-[#1F3A93]">G</span>
                <span className="text-2xl font-bold text-rose-600">o</span>
                <span className="text-2xl font-bold text-amber-500">o</span>
                <span className="text-2xl font-bold text-[#1F3A93]">g</span>
                <span className="text-2xl font-bold text-emerald-600">l</span>
                <span className="text-2xl font-bold text-rose-600">e</span>
              </span>
              <span className="text-sm text-slate-500">{isAR ? "التقييمات" : "Reviews"}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FFD400] text-[#FFD400]" />
                ))}
                <span className="ms-1 text-sm font-bold text-slate-700">4.8</span>
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

        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#FFD400] text-[#FFD400]" />
              ))}
            </div>
            <p className="text-lg font-semibold text-slate-700 mb-1">
              {isAR ? "4.8 من 5 نجوم على Google" : "4.8 out of 5 stars on Google"}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              {isAR ? "انقر لقراءة تقييمات عملائنا على Google" : "Click to read our customer reviews on Google"}
            </p>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJ5UtFaHNnXz4RWif9gPewmzU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F3A93] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#152a6e] transition-colors"
            >
              <span className="text-[#FFD400]">
                {isAR ? "اقرأ التقييمات" : "Read Reviews"}
              </span>
            </a>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: prevClass, nextEl: nextClass }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-xl border border-slate-100 p-5 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{review.name}</div>
                      <div className="text-[11px] text-slate-400">{isAR ? "عميل موثق" : "Verified Customer"}</div>
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
                    <span className="ms-1 text-[11px] text-slate-400">{review.rating}.0</span>
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1">
                    <Quote className={`absolute -top-1 h-4 w-4 text-[#FFD400]/40 ${isAR ? "-right-1" : "-left-1"}`} />
                    <p className={`text-sm text-slate-600 leading-relaxed ${isAR ? "pr-4" : "pl-4"}`}>
                      {review.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
