import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Vega Admin",
};

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Website Settings</h1>
      <p className="text-gray-600">
        Manage logo, favicon, contact details, social media, footer content, SEO defaults,
        and homepage sections.
      </p>
    </div>
  );
}
