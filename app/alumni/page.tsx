import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Stay connected with The Breslov Yeshiva alumni community."
};

export default function AlumniPage() {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-7xl pb-20">
      <section className="max-w-3xl">
        <p className="page-kicker">Alumni</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
          Alumni <span className="gradient-text">Network</span>
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-300">Stay connected to the yeshiva, the rebbeim, and the chevra as life moves forward.</p>
        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-3 text-sm font-bold text-white hover:from-indigo-500 hover:to-blue-500">
          Contact Alumni Office
        </Link>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          ["Shiurim & Chizuk", "Ongoing Torah and encouragement for alumni wherever they are."],
          ["Events", "Opportunities to reconnect for yeshiva events and shared milestones."],
          ["Mentorship", "Continued guidance from rebbeim and staff when life decisions arise."]
        ].map(([title, copy]) => (
          <div key={title} className="premium-card rounded-3xl p-8">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-4 leading-7 text-gray-300">{copy}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 premium-card rounded-3xl p-8 text-center lg:p-12">
        <h2 className="text-3xl font-black text-white">Come Back to Visit</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">The yeshiva remains a home base for alumni. Reach out before visiting so the office can coordinate.</p>
      </section>
    </main>
  );
}
