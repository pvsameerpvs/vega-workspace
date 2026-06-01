import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { BLOGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Vega UAE",
  description: "Latest articles, industry insights, and product updates from Vega.",
};

export default function BlogPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="label-line mb-4">Insights</div>
          <h1 className="section-heading">Blog & Articles</h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl">
            Latest articles, industry insights, and product updates from the Vega team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOGS.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <ProtectedImage
                  src={blog.featuredImage || `https://placehold.co/600x340/e5e7eb/1f2937?text=${encodeURIComponent(blog.title)}`}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {blog.date}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-vega-blue transition-colors">
                  {blog.title}
                </h3>
                <p className="mt-2 text-base text-gray-500 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center text-base font-medium text-vega-blue">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
