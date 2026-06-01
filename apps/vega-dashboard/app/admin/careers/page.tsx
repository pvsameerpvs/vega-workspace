import { Metadata } from "next";
import { CareerManager } from "./sections/CareerManager";

export const metadata: Metadata = {
  title: "Careers | Vega Admin",
};

export default function CareersPage() {
  return <CareerManager />;
}
