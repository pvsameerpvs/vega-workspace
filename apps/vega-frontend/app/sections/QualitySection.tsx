import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function QualitySection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <span className="mb-6 block text-sm text-slate-400">Our Commitment</span>
            <h2 className="section-heading mb-10 text-4xl leading-tight md:text-5xl">
              Quality Keeps Us<br />
              <span className="font-display italic text-vega-yellow">Moving</span> Forward.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-500 max-w-md">
              We have more than 15 years of experience producing and supplying furniture
              for businesses across the UAE. More than ten thousand pieces of furniture
              have been delivered to camps, offices, and events around the country.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-slate-500 max-w-md">
              Every product goes through strict quality checks before it reaches your site.
              From bunk beds to queue barriers, we ensure durability and reliability.
            </p>
            <Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-semibold text-vega-blue hover:underline transition-all">
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="img-rounded aspect-[4/3] bg-slate-100 overflow-hidden">
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
