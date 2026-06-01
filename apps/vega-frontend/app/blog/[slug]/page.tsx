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
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-base text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mb-6 flex items-center gap-4 text-base text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {date}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-4 w-4" /> {author}
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl mb-6 capitalize">
          {title}
        </h1>

        <div className="mb-8 img-rounded aspect-video overflow-hidden bg-gray-100">
          <ProtectedImage
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4 text-base text-gray-600 leading-relaxed">
          <p>{content}</p>
          <p>
            For any enquiries related to the topics discussed in this article, feel free to reach out to us via WhatsApp or the contact form on our website.
          </p>
        </div>
      </div>
    </main>
  );
}
