import Link from "next/link";
import { getBlogPosts } from "@/lib/api";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ArrowRight } from "lucide-react";

interface BlogSidebarProps {
  currentSlug: string;
  category: string;
  locale?: string;
}

export async function BlogSidebar({
  currentSlug,
  category,
  locale = "en",
}: BlogSidebarProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const blogs = await getBlogPosts();

  const related = blogs
    .filter((b: any) => b.category === category && b.slug !== currentSlug)
    .slice(0, 3);

  const categories = Array.from(
    new Set(blogs.map((b: any) => b.category).filter(Boolean))
  );

  return (
    <aside className="space-y-6">
      {/* Related Articles */}
      {related.length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-4">
            {isAR ? "مقالات ذات صلة" : "Related Articles"}
          </h3>
          <div className="space-y-4">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={l(`/blog/${post.slug}`)}
                className="group flex gap-3 items-start"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <ProtectedImage
                    src={
                      post.featuredImage ||
                      `https://placehold.co/120x120/e5e7eb/1f2937?text=${encodeURIComponent(
                        post.title?.[0] || "V"
                      )}`
                    }
                    alt={isAR && post.titleAr ? post.titleAr : post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-[#1F3A93] transition-colors line-clamp-2">
                    {isAR && post.titleAr ? post.titleAr : post.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {post.publishDate
                      ? new Date(post.publishDate).toLocaleDateString()
                      : post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-2xl bg-[#1F3A93] text-white relative overflow-hidden p-5">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#FFD400]/10" />
        <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-white/5" />
        <div className="relative">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
            {isAR ? "تواصل معنا" : "Get in Touch"}
          </h3>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            {isAR
              ? "بحاجة إلى مساعدة في مشروع أو طلب بالجملة؟ فريقنا هنا للمساعدة."
              : "Need help with a project or bulk order? Our team is here to assist."}
          </p>
          <Link
            href={l("/contact-us")}
            className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-5 py-2.5 text-xs font-bold text-[#1F3A93] transition-all hover:bg-white"
          >
            {isAR ? "تواصل معنا" : "Contact Us"}
            <ArrowRight className={`h-3 w-3 ${isAR ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-4">
          {isAR ? "الفئات" : "Categories"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                cat === category
                  ? "bg-[#1F3A93] text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-[#FFD400]/10 hover:text-[#1F3A93]"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
