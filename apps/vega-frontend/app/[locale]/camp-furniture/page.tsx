import { redirect } from "next/navigation";

export default function CampFurniturePage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/products/camp-furniture`);
}
