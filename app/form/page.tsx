import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Student Application",
  description: "Apply to The Breslov Yeshiva."
};

export default function FormPage() {
  return (
    <main className="section-pad page-top-offset mx-auto flex min-h-screen max-w-4xl items-center justify-center pb-32">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="gradient-text text-4xl font-black sm:text-5xl">Student Application</h1>
          <p className="mt-4 text-xl text-gray-300">Help us understand your journey and aspirations.</p>
        </div>
        <ApplicationForm />
      </div>
    </main>
  );
}
