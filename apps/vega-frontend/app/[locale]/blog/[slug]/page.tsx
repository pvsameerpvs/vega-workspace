import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, mapBlogToFrontend } from "@/lib/api";
import { BlogPostHeader } from "./sections/BlogPostHeader";
import { BlogContent } from "./sections/BlogContent";
import { BlogSidebar } from "./sections/BlogSidebar";
import { BlogShare } from "./sections/BlogShare";
import { BlogAuthor } from "./sections/BlogAuthor";
import { BlogRelated } from "./sections/BlogRelated";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const blogs = await getBlogPosts();
  const blog = blogs.find((b: any) => b.slug === params.slug);
  const isAR = params.locale === "ar";
  const title =
    (isAR && blog?.titleAr ? blog.titleAr : blog?.title) ||
    params.slug.replace(/-/g, " ");
  return {
    title: `${title} | Vega Blog`,
    description:
      blog?.excerptAr || blog?.excerpt || "Read the full article on Vega blog.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const isAR = params.locale === "ar";

  const blogs = await getBlogPosts();
  const blog = blogs.find((b: any) => b.slug === params.slug);
  if (!blog) {
    notFound();
  }

  const title =
    (isAR && blog?.titleAr ? blog.titleAr : blog?.title) ||
    params.slug.replace(/-/g, " ");
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

  const relatedPosts = blogs
    .filter((b: any) => b.category === category && b.slug !== params.slug)
    .slice(0, 3)
    .map(mapBlogToFrontend)
    .filter(Boolean) as any[];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Header */}
      <BlogPostHeader
        title={title}
        image={image}
        category={category}
        date={date}
        author={author}
        locale={params.locale}
      />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] lg:items-start">
          {/* Main */}
          <div className="min-w-0">
            <BlogContent content={content} locale={params.locale} />

            {/* Share */}
            <div className="my-12 pt-8 border-t border-slate-100">
              <BlogShare title={title} slug={params.slug} locale={params.locale} />
            </div>

            {/* Author */}
            <BlogAuthor author={author} locale={params.locale} />

            {/* Related */}
            <BlogRelated posts={relatedPosts} locale={params.locale} />
          </div>

          {/* Sidebar */}
          <BlogSidebar
            currentSlug={params.slug}
            category={category}
            locale={params.locale}
          />
        </div>
      </div>
    </main>
  );
}
