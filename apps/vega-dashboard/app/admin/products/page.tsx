import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Vega Admin",
};

export default function ProductsManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Product Manager</h1>
      <p className="text-gray-600">
        Full CRUD for products with fields: name, SKU, category, subcategory, images,
        specifications, pricing notes, and SEO settings.
      </p>
    </div>
  );
}
