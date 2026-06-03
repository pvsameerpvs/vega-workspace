import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getBlogPosts } from "@/lib/api";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { BlogSidebar } from "./sections/BlogSidebar";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const blogs = await getBlogPosts();
  const blog = blogs.find((b: any) => b.slug === params.slug);
  const isAR = params.locale === "ar";
  const title = (isAR && blog?.titleAr ? blog.titleAr : blog?.title) || params.slug.replace(/-/g, " ");
  return {
    title: `${title} | Vega Blog`,
    description: blog?.excerptAr || blog?.excerpt || "Read the full article on Vega blog.",
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string; locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const isAR = params.locale === "ar";
  const l = (path: string) => `/${params.locale}${path}`;

  const blogs = await getBlogPosts();
  const blog = blogs.find((b: any) => b.slug === params.slug);
  if (!blog) {
    notFound();
  }
  const title = (isAR && blog?.titleAr ? blog.titleAr : blog?.title) || params.slug.replace(/-/g, " ");
  const content = (isAR && blog?.contentAr ? blog.contentAr : blog?.content) ||
    (isAR
      ? "سيتم إضافة محتوى المدونة الكامل قريباً. ترقبوا الرؤى التفصيلية والتحديثات من فريق فيجا."
      : "Full blog content will be added soon. Stay tuned for detailed insights and updates from the Vega team.");
  const date = blog?.publishDate ? new Date(blog.publishDate).toLocaleDateString() : blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "June 2025";
  const author = blog?.author || "Vega Team";
  const image = blog?.featuredImage || "";
  const category = blog?.category || "General";

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="max-w-3xl">
            <Link
              href={l("/blog")}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#1F3A93] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> {isAR ? "العودة إلى المدونة" : "Back to Blog"}
            </Link>

            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-[#FFD400]/10 px-4 py-1.5 text-xs font-bold text-[#FFD400] uppercase tracking-wider">
                {category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1F3A93] leading-tight mb-6 tracking-tight">
              {title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#FFD400]" /> {date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#FFD400]" /> {author}
              </span>
            </div>

            <div className="mb-10 overflow-hidden rounded-2xl bg-slate-100">
              <ProtectedImage
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6 text-base text-slate-600 leading-[1.8]">
              <p className="text-lg font-medium text-slate-700">{content}</p>
              <p className="text-slate-500">
                {isAR
                  ? "لأي استفسارات تتعلق بالمواضيع المناقشة في هذا المقال، لا تتردد في التواصل معنا عبر واتساب أو نموذج التواصل على موقعنا."
                  : "For any enquiries related to the topics discussed in this article, feel free to reach out to us via WhatsApp or the contact form on our website."}
              </p>
            </div>

            <div className="my-12 h-px bg-slate-100" />

            {/* WhatsApp CTA */}
            <div className="rounded-2xl bg-[#1F3A93] px-8 py-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FFD400]/10" />
              <div className="relative flex items-center gap-5">
                <div className="h-12 w-12 rounded-full bg-[#FFD400] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="h-6 w-6 text-[#1F3A93]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {isAR ? "لديك أسئلة؟" : "Have Questions?"}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-3">
                    {isAR
                      ? "دردش معنا مباشرة على واتساب للحصول على إجابات سريعة."
                      : "Chat with us directly on WhatsApp for quick answers."}
                  </p>
                  <a
                    href="https://wa.me/971567351095"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-5 py-2 text-xs font-bold text-[#1F3A93] transition-all hover:bg-white"
                  >
                    {isAR ? "دردش على واتساب" : "Chat on WhatsApp"} <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <BlogSidebar currentSlug={params.slug} category={category} locale={params.locale} />
        </div>
      </div>
    </main>
  );
}
