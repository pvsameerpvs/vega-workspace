"use client";

import Link from "next/link";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface BlogPostHeaderProps {
  title: string;
  image: string;
  category: string;
  date: string;
  author: string;
  locale?: string;
}

export function BlogPostHeader({
  title,
  image,
  category,
  date,
  author,
  locale = "en",
}: BlogPostHeaderProps) {
  const isAR = locale === "ar";

  return (
    <div className="relative">
      {/* Back link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-[#1F3A93] shadow-lg hover:bg-white transition-all"
        >
          <ArrowLeft className={`h-3.5 w-3.5 ${isAR ? "rotate-180" : ""}`} />
          {isAR ? "المدونة" : "Blog"}
        </Link>
      </div>

      {/* Image container */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden bg-[#1F3A93]">
        <ProtectedImage
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-60"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A93] via-[#1F3A93]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F3A93]/50 to-transparent" />
      </div>

      {/* Title overlay */}
      <div className="relative -mt-48 z-10 mx-auto max-w-7xl px-6 pb-12">
        <div className="max-w-3xl">
          {/* Meta */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD400] px-4 py-1.5 text-xs font-bold text-[#1F3A93] uppercase tracking-wider">
              <Tag className="h-3 w-3" />
              {category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/70 font-medium">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/70 font-medium">
              <User className="h-3.5 w-3.5" />
              {author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
