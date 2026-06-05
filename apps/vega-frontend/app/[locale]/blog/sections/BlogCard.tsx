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

interface BlogCardProps {
  post: BlogPost;
  locale?: string;
  index?: number;
}

export function BlogCard({ post, locale = "en", index = 0 }: BlogCardProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const title = isAR && post.titleAr ? post.titleAr : post.title;
  const excerpt = isAR && post.excerptAr ? post.excerptAr : post.excerpt;

  return (
    <Link
      href={l(`/blog/${post.slug}`)}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 h-full"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <ProtectedImage
          src={
            post.featuredImage ||
            `https://placehold.co/600x375/e5e7eb/1f2937?text=${encodeURIComponent(title)}`
          }
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Category badge */}
        {post.category && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-[#1F3A93] shadow-sm uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1F3A93]/30 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1F3A93] shadow-lg transition-transform duration-300 group-hover:scale-105">
            {isAR ? "اقرأ المقال" : "Read Article"}
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          {post.author && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              {post.author}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-[#1F3A93] leading-snug mb-3 group-hover:text-[#1F3A93]">
          {title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
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
}
