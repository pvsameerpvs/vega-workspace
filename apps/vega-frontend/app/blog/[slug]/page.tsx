import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { BLOGS } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = BLOGS.find((b) => b.slug === params.slug);
  return {
    title: `${blog?.title || params.slug.replace(/-/g, " ")} | Vega Blog`,
    description: blog?.excerpt || "Read the full article on Vega blog.",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = BLOGS.find((b) => b.slug === params.slug);
  const title = blog?.title || params.slug.replace(/-/g, " ");
  const content = blog?.content || "Full blog content will be added soon. Stay tuned for detailed insights and updates from the Vega team.";
  const date = blog?.date || "June 2025";
  const author = blog?.author || "Vega Team";
  const image = blog?.featuredImage || `/images/blog/placeholder.jpg`;

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mb-6 flex items-center gap-6 text-sm text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> {author}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl mb-8 capitalize tracking-tight">
          {title}
        </h1>

        <div className="mb-10 img-rounded aspect-video overflow-hidden bg-slate-100">
          <ProtectedImage
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6 text-lg text-slate-500 leading-relaxed">
          <p>{content}</p>
          <p>
            For any enquiries related to the topics discussed in this article, feel free to reach out to us via WhatsApp or the contact form on our website.
          </p>
        </div>
      </div>
    </main>
  );
}
