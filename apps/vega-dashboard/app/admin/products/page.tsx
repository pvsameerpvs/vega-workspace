import { Metadata } from "next";
import { ProductManager } from "./sections/ProductManager";

export const metadata: Metadata = {
  title: "Products | Vega Admin",
};

export default function ProductsPage() {
  return <ProductManager />;
}
