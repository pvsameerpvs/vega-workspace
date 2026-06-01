import { Button } from "@vega/ui";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-vega-blue to-blue-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Reliable Furniture, Barriers & Camp Supply Solutions Across UAE
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            Supplying durable camp furniture, queue barriers, office furniture,
            flag poles, and industrial supply products for businesses across the UAE.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="vega-yellow" size="lg" asChild>
              <Link href="/contact-us">Request a Quote</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-vega-blue"
              asChild
            >
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
