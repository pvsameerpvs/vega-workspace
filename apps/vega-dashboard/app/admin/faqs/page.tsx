import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Vega Admin",
};

export default function FaqManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">FAQ Manager</h1>
      <p className="text-gray-600">
        Add, edit, and reorder FAQ entries with bilingual support.
      </p>
    </div>
  );
}
