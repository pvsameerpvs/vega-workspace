import { Metadata } from "next";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Vega UAE",
  description: "Join the Vega team. Explore current job openings and career opportunities.",
};

const JOBS = [
  {
    title: "Sales Executive",
    location: "Dubai, UAE",
    type: "Full-time",
    description: "Responsible for B2B sales, client relationship management, and achieving sales targets across the UAE.",
  },
  {
    title: "Warehouse Supervisor",
    location: "Sharjah, UAE",
    type: "Full-time",
    description: "Oversee daily warehouse operations, inventory management, and coordinate with the delivery team.",
  },
  {
    title: "Delivery Driver",
    location: "Dubai, UAE",
    type: "Full-time",
    description: "Ensure timely delivery of products across all emirates with proper vehicle maintenance and documentation.",
  },
];

export default function CareersPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Join Us</div>
          <h1 className="section-heading">Careers at Vega</h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto">
            We are always looking for talented individuals to join our team. Check out our current openings below.
          </p>
        </div>

        {/* Why Join */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-yellow/20 text-vega-blue">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Growth Opportunities</h3>
            <p className="mt-2 text-base text-gray-500">Build your career with a fast-growing company in the UAE.</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-yellow/20 text-vega-blue">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Work-Life Balance</h3>
            <p className="mt-2 text-base text-gray-500">We value our team and promote a healthy work environment.</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-yellow/20 text-vega-blue">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">UAE Presence</h3>
            <p className="mt-2 text-base text-gray-500">Work across Dubai and Sharjah with a dynamic team.</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-4">
          <div className="label-line mb-4">Openings</div>
          <h2 className="section-heading mb-10">Current Vacancies</h2>
        </div>
        <div className="space-y-4">
          {JOBS.map((job) => (
            <div key={job.title} className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-base text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.type}
                    </span>
                  </div>
                  <p className="mt-3 text-base text-gray-500 max-w-2xl">{job.description}</p>
                </div>
                <Link href="/contact-us" className="pill-btn shrink-0">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
