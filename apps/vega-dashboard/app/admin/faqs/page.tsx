import { Metadata } from "next";
import { FaqManager } from "./sections/FaqManager";

export const metadata: Metadata = {
  title: "FAQ | Vega Admin",
};

export default function FaqManagerPage() {
  return <FaqManager />;
}
