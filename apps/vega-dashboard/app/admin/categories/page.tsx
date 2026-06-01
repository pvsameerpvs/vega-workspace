import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | Vega Admin",
};

export default function CategoriesManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Category Manager</h1>
      <p className="text-gray-600">
        Manage main categories and subcategories with images, banners, descriptions, and SEO
        settings.
      </p>
    </div>
  );
}
