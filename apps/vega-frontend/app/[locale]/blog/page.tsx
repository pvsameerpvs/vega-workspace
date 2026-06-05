import { getBlogPosts, mapBlogToFrontend } from "@/lib/api";
import { BlogHero } from "./sections/BlogHero";
import { BlogListing } from "./BlogListing";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Blog | Vega UAE",
  description: "Latest articles, industry insights, and product updates from Vega.",
};

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) notFound();

  const blogs = await getBlogPosts();
  const mapped = (blogs || []).map(mapBlogToFrontend).filter(Boolean) as any[];

  return (
    <main className="min-h-screen bg-white">
      <BlogHero locale={locale} count={mapped.length} />
      <BlogListing posts={mapped} locale={locale} />
    </main>
  );
}
