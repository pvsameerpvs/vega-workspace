import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/api";
import { isValidLocale } from "@/lib/i18n";
import { BlogPostClient } from "./BlogPostClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  try {
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
  } catch {
    return {
      title: "Blog Post | Vega UAE",
      description: "Read the full article on Vega blog.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();

  return <BlogPostClient slug={params.slug} locale={params.locale} />;
}
