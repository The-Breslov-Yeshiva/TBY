import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "More Information",
  description: "Additional information request page for The Breslov Yeshiva."
};

export default function MorePage() {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-4xl pb-20">
      <section className="premium-card rounded-3xl p-8 text-center lg:p-12">
        <p className="page-kicker">More Info</p>
        <h1 className="mt-4 text-5xl font-black text-white">More Info Here</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          For additional details about programs, admissions, or visits, contact the office and we will direct your question.
        </p>
        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-black text-gray-950 transition hover:bg-amber-100">
          Contact Us
        </Link>
      </section>
    </main>
  );
}
