import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Vega UAE",
  description: "Get in touch with Vega for product enquiries, quotes, and support.",
};

export default function ContactPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Contact Us</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-vega-blue">Mobile & WhatsApp</h3>
              <p className="text-gray-700">+971 56 735 1095</p>
              <p className="text-gray-700">+971 56 931 0575</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-vega-blue">Email</h3>
              <p className="text-gray-700">Sales@thevegauae.com</p>
              <p className="text-gray-700">admin@thevegauae.com</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-vega-blue">Office</h3>
              <p className="text-gray-700">
                M01-410, Corridor 14, Mezzanine Floor,
                <br />
                Unique World Business Centre,
                <br />
                Hamriya A Building, Karama, Dubai, UAE
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-vega-blue">Warehouse</h3>
              <p className="text-gray-700">
                Warehouse 12, Block 6,
                <br />
                BMG Logistic Park,
                <br />
                Sharjah Industrial Area 18, UAE
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-vega-blue">Send Enquiry</h3>
            <p className="text-gray-500">
              Contact form with fields for name, email, phone, company, and message will be
              integrated here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
