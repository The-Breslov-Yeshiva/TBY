import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for The Breslov Yeshiva website."
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      description="These terms describe general use of The Breslov Yeshiva website and related online services."
      sections={[
        ["Website Information", "Website content is provided for general information about the yeshiva and may be updated without notice."],
        ["Admissions and Contact Forms", "Submitting a form does not guarantee admission or acceptance into any program."],
        ["Donations and Payments", "Donation and payment services are handled by third-party providers under their own terms."],
        ["Intellectual Property", "Images, logos, copy, and other content belong to The Breslov Yeshiva or their respective owners."],
        ["External Links and Services", "The site may link to third-party services, maps, videos, and payment providers."],
        ["Appropriate Use", "Do not misuse the website, interfere with its operation, or submit false or harmful information."],
        ["No Warranty", "The website is provided as-is without warranties of uninterrupted availability or error-free operation."],
        ["Contact", "Questions about these terms can be sent to info@tbye.org."]
      ].map(([title, body]) => ({ title, body }))}
    />
  );
}
