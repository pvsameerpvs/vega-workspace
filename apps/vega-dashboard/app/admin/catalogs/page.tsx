import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogs | Vega Admin",
};

export default function CatalogsManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Catalog Manager</h1>
      <p className="text-gray-600">
        Upload PDF catalogs with cover images, descriptions, and download tracking.
      </p>
    </div>
  );
}
