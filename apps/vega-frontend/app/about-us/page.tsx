import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vega UAE",
  description:
    "Learn about Vega, a trusted supplier of camp furniture, barriers, and industrial supplies across the UAE.",
};

export default function AboutUsPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">About Us</h1>
        <div className="space-y-6 text-gray-700">
          <p>
            Vega is a leading B2B supplier of camp furniture, metal barriers, queue
            barriers, office furniture, and industrial supplies across the United Arab
            Emirates.
          </p>
          <p>
            With over 15 years of experience and a 10,000+ sq ft warehouse facility, we
            serve construction companies, labor camps, facilities management firms, and
            government entities with reliable, durable products.
          </p>
          <p>
            Our product range includes bunk beds, single beds, mattresses, lockers,
            dining furniture, plastic furniture, gas burners, flag poles, crowd control
            barriers, and office furniture.
          </p>
        </div>
      </div>
    </main>
  );
}
