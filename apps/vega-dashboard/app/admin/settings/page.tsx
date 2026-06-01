import { Metadata } from "next";
import { SettingsManager } from "./sections/SettingsManager";

export const metadata: Metadata = {
  title: "Settings | Vega Admin",
};

export default function SettingsPage() {
  return <SettingsManager />;
}
