import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function DeliverySection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <div className="img-rounded aspect-[4/3] bg-slate-100 overflow-hidden">
              <ProtectedImage
                src="/images/gallery/delivery-fleet.jpg"
                alt="Delivery"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div>
            <span className="mb-6 block text-sm text-slate-400">Delivery & Install</span>
            <h2 className="section-heading mb-10 text-4xl leading-tight md:text-5xl">
              Delivered Across<br />All Emirates.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-500 max-w-md">
              We care about timely delivery. Our own fleet of trucks and vans ensures
              your products reach your site on schedule, whether it is Dubai, Abu Dhabi,
              Sharjah, or any other emirate.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-slate-500 max-w-md">
              Installation services are available for all furniture and barrier products.
              Our team handles assembly at your location so you can focus on your business.
            </p>
            <Link href="/contact-us" className="inline-flex items-center gap-2 text-sm font-semibold text-vega-blue hover:underline transition-all">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
