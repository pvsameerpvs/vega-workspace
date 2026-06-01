import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vega UAE",
  description: "Vega privacy policy and data protection statement.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-vega-blue">Privacy Policy</h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Vega is committed to protecting your privacy. This policy explains how we collect,
            use, and safeguard your personal information.
          </p>
          <p>
            We collect information such as your name, email, phone number, and company details
            when you submit enquiries or request quotes through our website.
          </p>
          <p>
            Your information is used solely to respond to your enquiries and provide our
            services. We do not share your data with third parties without your consent.
          </p>
        </div>
      </div>
    </main>
  );
}
