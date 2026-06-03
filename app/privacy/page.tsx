import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for The Breslov Yeshiva website, forms, and donation links."
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This page explains how website inquiries, forms, donation links, and basic site services may handle information."
      sections={[
        ["Information We Collect", "We collect information you choose to submit through forms, including name, email, phone number, and message details."],
        ["How We Use Information", "Submitted information is used to respond to inquiries, process applications, coordinate visits, and communicate yeshiva updates."],
        ["Forms, Donations, and Third Parties", "Forms are submitted through Formspree. Donation links may send you to providers such as Stripe, Cash App, Venmo, and PayPal."],
        ["Cookies and Local Storage", "The site may use browser storage for interface preferences and third-party embeds may use their own cookies or storage."],
        ["Sharing and Retention", "Information is shared only as needed for yeshiva administration, service providers, or legal requirements."],
        ["Contact", "Questions about privacy can be sent to info@tbye.org."]
      ].map(([title, body]) => ({ title, body }))}
    />
  );
}
