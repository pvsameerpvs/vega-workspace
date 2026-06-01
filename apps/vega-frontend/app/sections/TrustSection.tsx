"use client";

import { ShieldCheck, Truck, Users } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Our Promise</div>
          <h2 className="section-heading">Trusted. Reliable. Delivered.</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Trusted Supplier Seal */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vega-yellow/20 text-vega-blue">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Trusted Supplier</h3>
            <p className="text-base text-gray-500 leading-relaxed">
              Serving UAE businesses since 2009 with verified quality and on-time delivery.
            </p>
            <div className="mt-6 inline-flex items-center rounded-full bg-vega-blue px-4 py-1.5 text-sm font-medium text-white">
              Verified Partner
            </div>
          </div>

          {/* Fleet */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vega-yellow/20 text-vega-blue">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Our Fleet</h3>
            <p className="text-base text-gray-500 leading-relaxed">
              2 trucks, vans, SUVs, and 4 sedans with a professional delivery team ready to serve across all emirates.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-gray-50 py-3 text-sm font-medium text-gray-600">Trucks</div>
              <div className="rounded-lg bg-gray-50 py-3 text-sm font-medium text-gray-600">Vans</div>
              <div className="rounded-lg bg-gray-50 py-3 text-sm font-medium text-gray-600">Sedans</div>
            </div>
          </div>

          {/* Team */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vega-yellow/20 text-vega-blue">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Our Team</h3>
            <p className="text-base text-gray-500 leading-relaxed">
              A dedicated team of 15 to 20 professionals committed to delivering excellence in every order.
            </p>
            <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
              <Users className="h-3 w-3" />
              15–20 Members
            </div>
          </div>
        </div>

        {/* Fleet & Team Visual Placeholder */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="img-rounded aspect-[16/9] overflow-hidden bg-gray-200">
            <img
              src="/images/gallery/delivery-fleet.jpg"
              alt="Vega Fleet"
              className="h-full w-full object-cover"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="img-rounded aspect-[16/9] overflow-hidden bg-gray-200">
            <img
              src="/images/gallery/vega-team.jpg"
              alt="Vega Team"
              className="h-full w-full object-cover"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
