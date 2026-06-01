import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads | Vega Admin",
};

export default function LeadsManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Lead / Quote Manager</h1>
      <p className="text-gray-600">
        View and manage all website leads. Update statuses: New, Contacted, Quotation Sent,
        Follow-up Required, Closed, Lost.
      </p>
    </div>
  );
}
