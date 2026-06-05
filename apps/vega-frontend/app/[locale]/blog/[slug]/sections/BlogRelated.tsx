"use client";

import Link from "next/link";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ArrowRight, Calendar } from "lucide-react";

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

interface BlogRelatedProps {
  posts: BlogPost[];
  locale?: string;
}

export function BlogRelated({ posts, locale = "en" }: BlogRelatedProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  if (posts.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-slate-100">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-6 bg-[#FFD400]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              {isAR ? "مقالات ذات صلة" : "Related Articles"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F3A93] leading-tight">
            {isAR ? "قد يعجبك أيضاً" : "You Might Also Like"}
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => {
          const title = isAR && post.titleAr ? post.titleAr : post.title;
          const excerpt = isAR && post.excerptAr ? post.excerptAr : post.excerpt;

          return (
            <Link
              key={post.slug}
              href={l(`/blog/${post.slug}`)}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <ProtectedImage
                  src={
                    post.featuredImage ||
                    `https://placehold.co/400x250/e5e7eb/1f2937?text=${encodeURIComponent(title)}`
                  }
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {post.category && (
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-[#1F3A93] shadow-sm">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="mb-2 flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-sm font-bold text-[#1F3A93] leading-snug mb-2 line-clamp-2">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1 mb-3">
                  {excerpt}
                </p>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1F3A93] group-hover:text-[#FFD400] transition-colors">
                  {isAR ? "اقرأ المزيد" : "Read More"}
                  <ArrowRight
                    className={`h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 ${
                      isAR ? "rotate-180 group-hover:-translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
