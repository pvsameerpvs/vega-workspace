import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getBlogPosts, mapBlogToFrontend } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog | Vega UAE",
  description: "Latest articles, industry insights, and product updates from Vega.",
};

export default async function BlogPage() {
  const blogs = await getBlogPosts();
  const mapped = blogs.map(mapBlogToFrontend).filter(Boolean);

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <span className="mb-6 block text-sm text-slate-400">Insights</span>
          <h1 className="section-heading text-4xl md:text-5xl">Blog & Articles</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
            Latest articles, industry insights, and product updates from the Vega team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mapped.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col overflow-hidden animate-fade-in-up"
            >
              <div className="mb-5 aspect-video overflow-hidden rounded-3xl bg-slate-100">
                <ProtectedImage
                  src={blog.featuredImage || `https://placehold.co/600x340/e5e7eb/1f2937?text=${encodeURIComponent(blog.title)}`}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                {blog.date}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-vega-blue transition-colors duration-300 leading-tight">
                {blog.title}
              </h3>
              <p className="mt-3 text-base text-slate-500 leading-relaxed flex-1">
                {blog.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center text-sm font-semibold text-vega-blue group-hover:underline">
                Read More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
