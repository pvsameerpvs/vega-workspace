import { Metadata } from "next";
import { getBlogPosts, mapBlogToFrontend } from "@/lib/api";
import { BlogFeatured } from "./sections/BlogFeatured";
import { BlogGrid } from "./sections/BlogGrid";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog | Vega UAE",
  description: "Latest articles, industry insights, and product updates from Vega.",
};

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";

  const blogs = await getBlogPosts();
  const mapped = (blogs || []).map(mapBlogToFrontend).filter(Boolean) as any[];

  const featured = mapped[0];
  const remaining = mapped.slice(1);

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            {isAR ? "رؤى" : "Insights"}
          </span>
        </div>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {isAR ? "المدونة والمقالات" : "Blog & Articles"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-16">
          {isAR
            ? "أحدث المقالات والرؤى الصناعية وتحديثات المنتجات من فريق فيجا."
            : "Latest articles, industry insights, and product updates from the Vega team."}
        </p>

        {/* Featured Post */}
        {featured && <BlogFeatured post={featured} locale={locale} />}

        {/* Divider */}
        <div className="my-16 h-px bg-slate-100" />

        {/* Grid */}
        <BlogGrid posts={remaining} locale={locale} />
      </div>
    </main>
  );
}
