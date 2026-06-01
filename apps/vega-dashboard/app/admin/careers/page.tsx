import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Vega Admin",
};

export default function CareersManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Career Manager</h1>
      <p className="text-gray-600">
        Manage job listings and view applications. Export to Excel.
      </p>
    </div>
  );
}
