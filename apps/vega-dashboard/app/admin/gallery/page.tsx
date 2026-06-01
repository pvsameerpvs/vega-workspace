import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Vega Admin",
};

export default function GalleryManagerPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Gallery Manager</h1>
      <p className="text-gray-600">
        Upload and organize gallery images by category with alt text and display order.
      </p>
    </div>
  );
}
