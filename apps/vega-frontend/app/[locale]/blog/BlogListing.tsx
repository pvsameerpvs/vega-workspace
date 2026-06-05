"use client";

import { useState, useMemo } from "react";
import { BlogFilters } from "./sections/BlogFilters";
import { BlogFeatured } from "./sections/BlogFeatured";
import { BlogGrid } from "./sections/BlogGrid";

interface BlogPost {
  slug: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  featuredImage?: string;
  date: string;
  author?: string;
  category?: string;
}

interface BlogListingProps {
  posts: BlogPost[];
  locale?: string;
}

export function BlogListing({ posts, locale = "en" }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(posts.map((p) => p.category).filter(Boolean))
    );
    return cats as string[];
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.titleAr?.toLowerCase().includes(q) ?? false) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.excerptAr?.toLowerCase().includes(q) ?? false) ||
          (p.category?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const featured = filtered[0];
  const remaining = filtered.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-6 -mt-8 relative z-10 pb-24">
      {/* Filters card */}
      <div className="modern-card p-6 md:p-8 mb-12 shadow-lg">
        <BlogFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locale={locale}
          resultCount={filtered.length}
        />
      </div>

      {/* Featured Post */}
      {featured && activeCategory === "all" && !searchQuery && (
        <BlogFeatured post={featured} locale={locale} />
      )}

      {/* More Articles Divider */}
      {remaining.length > 0 && activeCategory === "all" && !searchQuery && (
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
            {locale === "ar" ? "المزيد من المقالات" : "More Articles"}
          </span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
      )}

      {/* Grid - only show if there are posts to display */}
      {(activeCategory !== "all" || searchQuery || remaining.length > 0) && (
        <BlogGrid
          posts={activeCategory === "all" && !searchQuery ? remaining : filtered}
          locale={locale}
        />
      )}
    </div>
  );
}
