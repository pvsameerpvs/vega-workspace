"use client";

import { useState, useMemo } from "react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ImageIcon, X } from "lucide-react";

interface GalleryItem {
  name: string;
  image: string;
  category?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const categories = useMemo(() => {
    const set = new Set(items.map((item) => item.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filtered =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat as string)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              activeFilter === cat
                ? "bg-[#1F3A93] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-500 hover:border-[#FFD400] hover:text-[#1F3A93]"
            }`}
          >
            {cat === "All" && <ImageIcon className="h-4 w-4" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, i) => {
          const isFeatured = i % 5 === 0 && filtered.length > 5;
          return (
            <button
              key={item.name + i}
              onClick={() => setSelectedImage(item)}
              className={`group relative animate-fade-in-up overflow-hidden rounded-2xl bg-slate-100 text-left transition-all duration-500 hover:shadow-card-hover ${
                isFeatured ? "row-span-2" : ""
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`relative ${isFeatured ? "aspect-[3/4]" : "aspect-square"}`}>
                <ProtectedImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1F3A93]/80 via-[#1F3A93]/20 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#FFD400]">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {item.name}
                  </h3>
                </div>

                {/* Category badge (visible always) */}
                <div className="absolute left-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center rounded-full bg-[#FFD400] px-3 py-1 text-[10px] font-bold text-[#1F3A93] shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1F3A93]/5">
            <ImageIcon className="h-6 w-6 text-[#1F3A93]/30" />
          </div>
          <p className="text-base text-slate-400">No images in this category.</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-2 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD400]">
                {selectedImage.category}
              </span>
              <p className="text-sm font-bold text-white">{selectedImage.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
