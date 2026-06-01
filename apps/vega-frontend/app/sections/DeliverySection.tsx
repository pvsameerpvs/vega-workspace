import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DeliverySection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="img-rounded aspect-[4/3] bg-gray-200">
              <img
                src="https://placehold.co/800x600/e5e7eb/1f2937?text=Delivery+Across+UAE"
                alt="Delivery"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="label-line mb-4">Delivery & Install</div>
            <h2 className="section-heading mb-6">
              Delivered Across<br />All Emirates.
            </h2>
            <p className="body-muted mb-6 max-w-md">
              We care about timely delivery. Our own fleet of trucks and vans ensures
              your products reach your site on schedule, whether it is Dubai, Abu Dhabi,
              Sharjah, or any other emirate.
            </p>
            <p className="body-muted mb-8 max-w-md">
              Installation services are available for all furniture and barrier products.
              Our team handles assembly at your location so you can focus on your business.
            </p>
            <Link href="/contact-us" className="pill-btn">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
