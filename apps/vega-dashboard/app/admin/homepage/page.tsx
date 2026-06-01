import { Metadata } from "next";
import { HomepageManager } from "./sections/HomepageManager";

export const metadata: Metadata = {
  title: "Homepage Manager | Vega Admin",
};

export default function HomepagePage() {
  return <HomepageManager />;
}
