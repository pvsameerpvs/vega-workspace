import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <div className="label-line mb-4 justify-center">Testimonials</div>
          <h2 className="section-heading">What Clients Say</h2>
          <Link
            href="https://share.google/Xl4dN4UtneSxMkTeP"
            target="_blank"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-vega-blue hover:underline transition-all"
          >
            View on Google <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {GOOGLE_REVIEWS.map((review, i) => (
            <div key={i} className="modern-card p-6 group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="mb-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-vega-yellow text-vega-yellow" : "text-slate-200"}`} />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="text-sm font-bold text-vega-blue">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
