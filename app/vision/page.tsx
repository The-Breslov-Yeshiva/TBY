import type { Metadata } from "next";
import { VisionPageContent } from "@/components/vision/vision-page-content";

export const metadata: Metadata = {
  title: "Vision",
  description: "Choosing Life Through Integrated Torah and Living: the vision of The Breslov Yeshiva."
};

export default function VisionPage() {
  return <VisionPageContent />;
}
