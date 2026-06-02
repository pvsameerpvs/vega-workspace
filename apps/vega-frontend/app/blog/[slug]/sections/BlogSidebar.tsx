import Link from "next/link";
import { BLOGS } from "@/lib/data";

interface BlogSidebarProps {
  currentSlug: string;
  category: string;
}

export function BlogSidebar({ currentSlug, category }: BlogSidebarProps) {
  const related = BLOGS.filter(
    (b) => b.category === category && b.slug !== currentSlug
  ).slice(0, 3);

  const categories = Array.from(
    new Set(BLOGS.map((b) => b.category).filter(Boolean))
  );

  return (
    <aside className="space-y-8">
      {/* Related Articles */}
      {related.length > 0 && (
        <div className="modern-card p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-5">
            Related Articles
          </h3>
          <div className="space-y-4">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 items-start"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <img
                    src={
                      post.featuredImage ||
                      `https://placehold.co/120x120/e5e7eb/1f2937?text=${encodeURIComponent(post.title[0])}`
                    }
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-[#1F3A93] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Contact */}
      <div className="modern-card p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-4">
          Get in Touch
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Need help with a project or bulk order? Our team is here to assist.
        </p>
        <Link
          href="/contact-us"
          className="pill-btn-yellow w-full text-xs justify-center"
        >
          Contact Us
        </Link>
      </div>

      {/* Categories */}
      <div className="modern-card p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-4">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-[#FFD400]/10 hover:text-[#1F3A93] transition-colors cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
