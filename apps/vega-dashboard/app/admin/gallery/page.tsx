import { Metadata } from "next";
import { GalleryManager } from "./sections/GalleryManager";

export const metadata: Metadata = {
  title: "Gallery | Vega Admin",
};

export default function GalleryPage() {
  return <GalleryManager />;
}
