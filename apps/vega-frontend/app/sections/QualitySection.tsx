import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function QualitySection() {
  return (
    <section className="py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="label-line mb-4">Our Commitment</div>
            <h2 className="section-heading mb-6">
              Quality Keeps Us<br />Moving Forward.
            </h2>
            <p className="body-muted mb-6 max-w-md">
              We have more than 15 years of experience producing and supplying furniture
              for businesses across the UAE. More than ten thousand pieces of furniture
              have been delivered to camps, offices, and events around the country.
            </p>
            <p className="body-muted mb-8 max-w-md">
              Every product goes through strict quality checks before it reaches your site.
              From bunk beds to queue barriers, we ensure durability and reliability.
            </p>
            <Link href="/about-us" className="pill-btn">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="img-rounded aspect-[4/3] bg-gray-200">
              <ProtectedImage
                src="https://placehold.co/800x600/e5e7eb/1f2937?text=Quality+Products"
                alt="Quality Products"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
