import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Testimonials</span>
          <h2 className="section-heading text-4xl md:text-5xl">What Clients Say</h2>
          <Link
            href="https://share.google/Xl4dN4UtneSxMkTeP"
            target="_blank"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-vega-blue hover:underline transition-all"
          >
            View on Google <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {GOOGLE_REVIEWS.map((review, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="mb-6 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-vega-yellow text-vega-yellow" : "text-slate-200"}`} />
                ))}
              </div>
              <p className="mb-6 text-base leading-relaxed text-slate-500">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="text-sm font-semibold text-slate-900">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
