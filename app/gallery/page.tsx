import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery-experience";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from learning, community life, and special moments at The Breslov Yeshiva."
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryExperience />
    </main>
  );
}
