import { Metadata } from "next";
import { BlogManager } from "./sections/BlogManager";

export const metadata: Metadata = {
  title: "Blog | Vega Admin",
};

export default function BlogManagerPage() {
  return <BlogManager />;
}
