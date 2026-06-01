import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function QualitySection() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="label-line mb-4">Our Commitment</div>
            <h2 className="section-heading mb-6">
              Quality Keeps Us<br />
              <span className="font-display italic text-vega-yellow">Moving</span> Forward.
            </h2>
            <p className="body-muted mb-5 max-w-md">
              We have more than 15 years of experience producing and supplying furniture
              for businesses across the UAE. More than ten thousand pieces of furniture
              have been delivered to camps, offices, and events around the country.
            </p>
            <p className="body-muted mb-8 max-w-md">
              Every product goes through strict quality checks before it reaches your site.
              From bunk beds to queue barriers, we ensure durability and reliability.
            </p>
            <Link href="/about-us" className="pill-btn-blue group">
              Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="img-rounded aspect-[4/3] bg-slate-100 shadow-elevated overflow-hidden">
              <ProtectedImage
                src="/images/gallery/warehouse-interior.jpg"
                alt="Quality Products"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
