import { Metadata } from "next";
import { AdminDashboard } from "./sections/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard | Vega Admin",
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
