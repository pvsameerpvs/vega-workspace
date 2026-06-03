import { redirect } from "next/navigation";

export default function QueueBarriersPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/products/queue-barriers`);
}
