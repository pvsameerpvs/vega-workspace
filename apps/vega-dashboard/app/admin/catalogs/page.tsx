import { Metadata } from "next";
import { CatalogManager } from "./sections/CatalogManager";

export const metadata: Metadata = {
  title: "Catalogs | Vega Admin",
};

export default function CatalogsPage() {
  return <CatalogManager />;
}
