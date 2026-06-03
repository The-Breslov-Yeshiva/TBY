import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility statement and feedback contact for The Breslov Yeshiva website."
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      description="The Breslov Yeshiva aims to provide a usable, readable, and accessible website experience."
      sections={[
        ["Our Accessibility Goal", "We aim for clear navigation, readable contrast, keyboard access, semantic structure, and responsive layouts."],
        ["Built-In Accessibility", "Interactive experiences include focus states, labels, reduced-motion support, keyboard controls, and accessible dialog behavior."],
        ["Known Third-Party Limitations", "Embedded maps, videos, payment providers, and form services are controlled by third parties and may have their own accessibility behavior."],
        ["Feedback and Help", "If you encounter an accessibility issue, contact info@tbye.org with the page and a short description."],
        ["Ongoing Review", "Accessibility is reviewed as new content, media, and features are added."]
      ].map(([title, body]) => ({ title, body }))}
    />
  );
}
