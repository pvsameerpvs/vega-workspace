import { redirect } from "next/navigation";

export default function MetalBarriersPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/products/metal-barriers`);
}
