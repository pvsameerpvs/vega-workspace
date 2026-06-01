import { Metadata } from "next";
import { ArrowRight, MapPin, Phone, Mail, Warehouse } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Vega UAE",
  description:
    "Learn about Vega, a trusted supplier of camp furniture, barriers, and industrial supplies across the UAE.",
};

export default function AboutUsPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="label-line mb-4">Company</div>
          <h1 className="section-heading">About Us</h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl">
            Vega is a leading B2B supplier of camp furniture, metal barriers, queue barriers, office furniture, and industrial supplies across the United Arab Emirates.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          <div className="space-y-6">
            <p className="text-base text-gray-600 leading-relaxed">
              With over 15 years of experience and a 10,000+ sq ft warehouse facility, we serve construction companies, labor camps, facilities management firms, and government entities with reliable, durable products.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Our product range includes bunk beds, single beds, mattresses, lockers, dining furniture, plastic furniture, gas burners, flag poles, crowd control barriers, and office furniture.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              We believe that good furniture should be easy to source and reliable to use. For this reason, we work with the best manufacturers to create products suitable for businesses across the UAE.
            </p>
            <Link href="/products" className="pill-btn inline-flex">
              Explore Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="img-rounded aspect-[4/3] bg-gray-200">
            <img
              src="https://placehold.co/800x600/e5e7eb/1f2937?text=Vega+Warehouse"
              alt="Vega Warehouse"
              className="h-full w-full object-cover"

            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20 grid grid-cols-2 gap-6 border-t border-gray-100 pt-12 md:grid-cols-4">
          {[
            { value: "15+", label: "Years of experience" },
            { value: "10,000+", label: "sq ft warehouse" },
            { value: "1,500+", label: "Satisfied customers" },
            { value: "300+", label: "Products in stock" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="stat-number mb-1">{stat.value}</div>
              <p className="text-base text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Contact Cards */}
        <div className="mb-4 text-center">
          <div className="label-line mb-4 justify-center">Reach Us</div>
          <h2 className="section-heading mb-12">Get in Touch</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-base text-gray-500">+971 56 735 1095</p>
            <p className="text-base text-gray-500">+971 56 931 0575</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-base text-gray-500">Sales@thevegauae.com</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Office</h3>
            <p className="text-base text-gray-500">Dubai, UAE</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
              <Warehouse className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Warehouse</h3>
            <p className="text-base text-gray-500">Sharjah, UAE</p>
          </div>
        </div>
      </div>
    </main>
  );
}
