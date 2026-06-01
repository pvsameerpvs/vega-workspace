import { Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Testimonials</div>
          <h2 className="section-heading">What Clients Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {GOOGLE_REVIEWS.map((review, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-500">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="text-sm font-medium text-gray-900">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
