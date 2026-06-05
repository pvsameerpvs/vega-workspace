"use client";

import { BlogCard } from "./BlogCard";
import { Clock, FileText } from "lucide-react";

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

interface BlogGridProps {
  posts: BlogPost[];
  locale?: string;
}

export function BlogGrid({ posts, locale = "en" }: BlogGridProps) {
  const isAR = locale === "ar";

  if (posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1F3A93]/5">
          <FileText className="h-8 w-8 text-[#1F3A93]/20" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          {isAR ? "لا توجد مقالات" : "No Articles Found"}
        </h3>
        <p className="text-base text-slate-400 max-w-sm mx-auto">
          {isAR
            ? "المزيد من المقالات قريباً. ترقبوا الرؤى التفصيلية من فريق فيجا."
            : "More articles coming soon. Stay tuned for detailed insights from the Vega team."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} locale={locale} index={i} />
      ))}
    </div>
  );
}
