import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vega UAE",
  description: "Vega privacy policy and data protection statement.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12">
          <div className="label-line mb-4">Legal</div>
          <h1 className="section-heading">Privacy Policy</h1>
          <p className="mt-4 text-base text-slate-500">
            Last updated: June 2025
          </p>
        </div>

        <div className="space-y-8 text-base text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-vega-blue mb-3">1. Introduction</h2>
            <p>
              Vega is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-vega-blue mb-3">2. Information We Collect</h2>
            <p>
              We collect information such as your name, email, phone number, and company details when you submit enquiries or request quotes through our website. We may also collect technical data such as IP address and browser type for website analytics.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-vega-blue mb-3">3. How We Use Your Information</h2>
            <p>
              Your information is used solely to respond to your enquiries, provide our services, and improve our website experience. We do not share your data with third parties without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-vega-blue mb-3">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. All data is stored securely and accessed only by authorized personnel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-vega-blue mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or how we handle your data, please contact us at Sales@thevegauae.com or call +971 56 735 1095.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
