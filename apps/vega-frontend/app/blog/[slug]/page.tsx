import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug} | Vega Blog`,
    description: "Read the full article on Vega blog.",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-3xl font-bold text-vega-blue">Blog Post: {params.slug}</h1>
        <p className="text-gray-600">
          Full blog content will be fetched from the database based on the slug.
        </p>
      </div>
    </main>
  );
}
