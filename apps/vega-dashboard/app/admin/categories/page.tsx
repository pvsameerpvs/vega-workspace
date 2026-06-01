import { Metadata } from "next";
import { CategoryManager } from "./sections/CategoryManager";

export const metadata: Metadata = {
  title: "Categories | Vega Admin",
};

export default function CategoriesPage() {
  return <CategoryManager />;
}
