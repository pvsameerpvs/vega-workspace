import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | Vega Admin",
};

export default function TeamManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Team / Employee Manager</h1>
      <p className="text-gray-600">
        Manage team member profiles, photos, roles, and display order.
      </p>
    </div>
  );
}
