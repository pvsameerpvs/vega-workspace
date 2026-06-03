import { redirect } from "next/navigation";

export default function OfficeFurniturePage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/products/office-furniture`);
}
