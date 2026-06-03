import Link from "next/link";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ArrowRight, Calendar, User } from "lucide-react";

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

interface BlogFeaturedProps {
  post: BlogPost;
  locale?: string;
}

export function BlogFeatured({ post, locale = "en" }: BlogFeaturedProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const title = isAR && post.titleAr ? post.titleAr : post.title;
  const excerpt = isAR && post.excerptAr ? post.excerptAr : post.excerpt;

  return (
    <Link
      href={l(`/blog/${post.slug}`)}
      className="group block modern-card overflow-hidden animate-fade-in-up"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-slate-100">
          <ProtectedImage
            src={
              post.featuredImage ||
              `https://placehold.co/800x600/e5e7eb/1f2937?text=${encodeURIComponent(title)}`
            }
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Overlay badge */}
          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center rounded-full bg-[#FFD400] px-4 py-1.5 text-xs font-bold text-[#1F3A93] shadow-sm">
              {isAR ? "مميز" : "Featured"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <div className="mb-4 flex items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {post.author || "Vega Team"}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#1F3A93] leading-tight mb-4 group-hover:text-[#FFD400] transition-colors duration-300">
            {title}
          </h2>

          <p className="text-base text-slate-500 leading-relaxed mb-6 line-clamp-3">
            {excerpt}
          </p>

          <div className="inline-flex items-center text-sm font-bold text-[#1F3A93] group-hover:text-[#FFD400] transition-colors duration-300">
            {isAR ? "اقرأ المقال" : "Read Article"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
