import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Vega Admin",
};

export default function BlogManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Blog Manager</h1>
      <p className="text-gray-600">
        Create, edit, and publish blog posts with SEO fields and bilingual support.
      </p>
    </div>
  );
}
