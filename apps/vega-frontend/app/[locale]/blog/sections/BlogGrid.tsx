import Link from "next/link";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ArrowRight, Calendar, Clock } from "lucide-react";

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
  const l = (path: string) => `/${locale}${path}`;

  if (posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1F3A93]/5">
          <Clock className="h-6 w-6 text-[#1F3A93]/30" />
        </div>
        <p className="text-base text-slate-400">{isAR ? "المزيد من المقالات قريباً." : "More articles coming soon."}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => {
        const title = isAR && post.titleAr ? post.titleAr : post.title;
        const excerpt = isAR && post.excerptAr ? post.excerptAr : post.excerpt;

        return (
          <Link
            key={post.slug}
            href={l(`/blog/${post.slug}`)}
            className="group flex flex-col modern-card overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <ProtectedImage
                src={
                  post.featuredImage ||
                  `https://placehold.co/600x340/e5e7eb/1f2937?text=${encodeURIComponent(title)}`
                }
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Category badge */}
              {post.category && (
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-[#1F3A93] shadow-sm">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1F3A93] shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {isAR ? "اقرأ المقال" : "Read Article"} <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="h-3 w-3" />
                <span className="font-medium">{post.date}</span>
              </div>

              <h3 className="text-base font-bold text-[#1F3A93] leading-tight mb-3 group-hover:text-[#1F3A93] transition-colors">
                {title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                {excerpt}
              </p>

              <div className="flex items-center gap-1 text-xs font-bold text-[#1F3A93] group-hover:text-[#FFD400] transition-colors">
                {isAR ? "اقرأ المزيد" : "Read More"}
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
