import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function DeliverySection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="img-rounded aspect-[4/3] bg-slate-100 shadow-elevated overflow-hidden">
              <ProtectedImage
                src="/images/gallery/delivery-fleet.jpg"
                alt="Delivery"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div>
            <div className="label-line mb-4">Delivery & Install</div>
            <h2 className="section-heading mb-6">
              Delivered Across<br />All Emirates.
            </h2>
            <p className="body-muted mb-5 max-w-md">
              We care about timely delivery. Our own fleet of trucks and vans ensures
              your products reach your site on schedule, whether it is Dubai, Abu Dhabi,
              Sharjah, or any other emirate.
            </p>
            <p className="body-muted mb-8 max-w-md">
              Installation services are available for all furniture and barrier products.
              Our team handles assembly at your location so you can focus on your business.
            </p>
            <Link href="/contact-us" className="pill-btn-yellow group">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
