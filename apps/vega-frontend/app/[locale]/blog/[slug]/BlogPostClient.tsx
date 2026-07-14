"use client";

import { useState, useEffect } from "react";
import { getBlogPost, getBlogPostsByCategory, mapBlogToFrontend } from "@/lib/api";
import { BlogPostHeader } from "./sections/BlogPostHeader";
import { BlogContent } from "./sections/BlogContent";
import { BlogSidebar } from "./sections/BlogSidebar";
import { BlogShare } from "./sections/BlogShare";
import { BlogAuthor } from "./sections/BlogAuthor";
import { BlogRelated } from "./sections/BlogRelated";

interface BlogPostClientProps {
  slug: string;
  locale: string;
}

export function BlogPostClient({ slug, locale }: BlogPostClientProps) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const isAR = locale === "ar";

  useEffect(() => {
    getBlogPost(slug).then((post) => {
      if (post) {
        setBlog(post);
        getBlogPostsByCategory(post.category, slug).then((related) => {
          setRelatedPosts(
            (related || [])
              .filter((b: any) => b.slug !== slug)
              .slice(0, 3)
              .map(mapBlogToFrontend)
              .filter(Boolean) as any[]
          );
        });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#1F3A93]" />
      </div>
    );
  }

  if (!blog) return null;

  const title =
    (isAR && blog?.titleAr ? blog.titleAr : blog?.title) || slug.replace(/-/g, " ");
  const content =
    (isAR && blog?.contentAr ? blog.contentAr : blog?.content) ||
    (isAR
      ? "سيتم إضافة محتوى المدونة الكامل قريباً. ترقبوا الرؤى التفصيلية والتحديثات من فريق فيجا."
      : "Full blog content will be added soon. Stay tuned for detailed insights and updates from the Vega team.");
  const date = blog?.publishDate
    ? new Date(blog.publishDate).toLocaleDateString()
    : blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "June 2025";
  const author = blog?.author || "Vega Team";
  const image = blog?.featuredImage || "";
  const category = blog?.category || "General";

  return (
    <main className="min-h-screen bg-white">
      <BlogPostHeader
        title={title}
        image={image}
        category={category}
        date={date}
        author={author}
        locale={locale}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] lg:items-start">
          <div className="min-w-0">
            <BlogContent content={content} locale={locale} />

            <div className="my-12 pt-8 border-t border-slate-100">
              <BlogShare title={title} slug={slug} locale={locale} />
            </div>

            <BlogAuthor author={author} locale={locale} />

            <BlogRelated posts={relatedPosts} locale={locale} />
          </div>

          <BlogSidebar
            currentSlug={slug}
            category={category}
            locale={locale}
          />
        </div>
      </div>
    </main>
  );
}
