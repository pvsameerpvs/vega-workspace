import { Metadata } from "next";
import { TeamManager } from "./sections/TeamManager";

export const metadata: Metadata = {
  title: "Team | Vega Admin",
};

export default function TeamManagerPage() {
  return <TeamManager />;
}
