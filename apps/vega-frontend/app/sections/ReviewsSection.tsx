import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section className="py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Testimonials</div>
          <h2 className="section-heading">What Clients Say</h2>
          <Link
            href="https://share.google/Xl4dN4UtneSxMkTeP"
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 text-base text-vega-blue hover:underline"
          >
            View on Google <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {GOOGLE_REVIEWS.map((review, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                ))}
              </div>
              <p className="mb-4 text-base leading-relaxed text-gray-500">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="text-base font-semibold text-gray-900">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
