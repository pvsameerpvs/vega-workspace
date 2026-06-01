import { Metadata } from "next";
import { LeadManager } from "./sections/LeadManager";

export const metadata: Metadata = {
  title: "Leads | Vega Admin",
};

export default function LeadsPage() {
  return <LeadManager />;
}
