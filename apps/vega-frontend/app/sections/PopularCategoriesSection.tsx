"use client";

import Link from "next/link";
import { POPULAR_RANGES } from "@/lib/data";

export function PopularCategoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="label-line mb-4 justify-center">Most Popular</div>
          <h2 className="section-heading">Popular Product Ranges</h2>
        </div>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-8">
          {POPULAR_RANGES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative mb-4 aspect-square w-full max-w-[130px] overflow-hidden rounded-full bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:scale-105 group-hover:shadow-md group-hover:border-vega-yellow">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <span className="text-sm font-bold text-vega-blue transition-colors duration-300 group-hover:text-vega-yellow">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
