import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Vega UAE",
  description: "Join the Vega team. Explore current job openings and career opportunities.",
};

export default function CareersPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Careers</h1>
        <p className="mb-8 text-gray-600">
          We are always looking for talented individuals to join our team. Check out our
          current openings below.
        </p>
        <div className="space-y-4">
          {/* Job listings will be fetched from database */}
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-xl font-semibold text-vega-blue">Sales Executive</h3>
            <p className="mt-2 text-gray-600">Dubai, UAE | Full-time</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-xl font-semibold text-vega-blue">Warehouse Supervisor</h3>
            <p className="mt-2 text-gray-600">Sharjah, UAE | Full-time</p>
          </div>
        </div>
      </div>
    </main>
  );
}
