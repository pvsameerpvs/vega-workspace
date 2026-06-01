import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug} | Vega Product`,
    description: "Product details page with specifications and enquiry options.",
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-lg bg-gray-100" />
          <div>
            <h1 className="text-3xl font-bold text-vega-blue">{params.slug}</h1>
            <p className="mt-2 text-gray-600">SKU: VEGA-001</p>
            <div className="mt-6 space-y-2">
              <p>
                <strong>Category:</strong> Camp Furniture
              </p>
              <p>
                <strong>Material:</strong> Steel
              </p>
              <p>
                <strong>Dimensions:</strong> 200 x 90 x 180 cm
              </p>
              <p>
                <strong>Weight:</strong> 36 kg
              </p>
              <p>
                <strong>Color:</strong> Grey
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <button className="rounded bg-vega-blue px-6 py-3 text-white hover:bg-blue-800">
                Download Catalog
              </button>
              <button className="rounded bg-vega-yellow px-6 py-3 font-semibold text-vega-blue hover:bg-yellow-400">
                Enquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
