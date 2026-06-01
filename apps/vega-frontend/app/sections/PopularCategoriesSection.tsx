"use client";

import Link from "next/link";
import { POPULAR_RANGES } from "@/lib/data";

export function PopularCategoriesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Most Popular</span>
          <h2 className="section-heading text-4xl md:text-5xl">Popular Product Ranges</h2>
        </div>

        <div className="grid grid-cols-2 gap-y-16 gap-x-8 sm:grid-cols-4 lg:grid-cols-8">
          {POPULAR_RANGES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative mb-5 aspect-square w-full max-w-[130px] overflow-hidden rounded-3xl bg-slate-100 transition-all duration-500 group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <span className="text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-vega-blue">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
