"use client";

import Link from "next/link";
import { POPULAR_RANGES } from "@/lib/data";

export function PopularCategoriesSection() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-14 md:text-3xl">
          Popular Product Ranges
        </h2>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-8">
          {POPULAR_RANGES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-4 aspect-square w-full max-w-[140px] overflow-hidden rounded-full bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-vega-blue">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
