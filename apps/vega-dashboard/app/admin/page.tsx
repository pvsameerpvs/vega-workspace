import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  // In production, this will check authentication
  redirect("/admin/dashboard");
}
