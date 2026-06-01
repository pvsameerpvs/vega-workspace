import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, " ")} | Vega Blog`,
    description: "Read the full article on Vega blog.",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, " ");
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-base text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mb-6 flex items-center gap-4 text-base text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" /> June 2025
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-4 w-4" /> Vega Team
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl mb-6 capitalize">
          {title}
        </h1>

        <div className="mb-8 img-rounded aspect-video overflow-hidden bg-gray-100">
          <img
            src={`https://placehold.co/800x450/e5e7eb/1f2937?text=${encodeURIComponent(title)}`}
            alt={title}
            className="h-full w-full object-cover"

          />
        </div>

        <div className="space-y-4 text-base text-gray-600 leading-relaxed">
          <p>
            Full blog content will be fetched from the database based on the slug. This article covers important topics related to our products and services in the UAE market.
          </p>
          <p>
            Stay tuned for detailed insights, buying guides, and industry updates from the Vega team. Our blog is designed to help businesses make informed decisions about furniture, barriers, and industrial supplies.
          </p>
          <p>
            For any enquiries related to the topics discussed in this article, feel free to reach out to us via WhatsApp or the contact form on our website.
          </p>
        </div>
      </div>
    </main>
  );
}
