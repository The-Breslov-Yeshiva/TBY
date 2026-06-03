import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Heart, Landmark, Wallet } from "lucide-react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Donate",
  description: "Partner with The Breslov Yeshiva and support authentic Torah education."
};

const givingOptions = [
  { label: "Credit Card (Stripe)", href: site.donationLinks.stripe, icon: CreditCard, tone: "from-blue-500 to-indigo-500" },
  { label: "Cash App", href: site.donationLinks.cashApp, icon: Wallet, tone: "from-green-500 to-emerald-500" },
  { label: "Venmo", href: site.donationLinks.venmo, icon: Landmark, tone: "from-blue-400 to-blue-600" }
];

const impacts = [
  ["Enable Torah Learning", "Support daily shiurim, chavrusa learning, and a full seder built for steady growth."],
  ["Provide Scholarships", "Help dedicated students join the program when finances would otherwise stand in the way."],
  ["Build the Future", "Invest in the next generation of Torah leaders, mentors, husbands, and fathers."]
];

export default function DonatePage() {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-7xl pb-20">
      <div className="max-w-3xl">
        <p className="page-kicker">Support Torah Growth</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
          Partner in <span className="gradient-text">Our Mission</span>
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-300">
          Your support enables scholarships, daily shiurim, mentorship, and a healthy makom Torah in Ramat Beit Shemesh.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <section className="premium-card rounded-3xl p-8">
          <h2 className="text-2xl font-black text-white">Make a Difference</h2>
          <p className="mt-4 leading-8 text-gray-300">Every contribution helps us provide scholarships, strengthen daily shiurim, and maintain a warm environment for serious growth.</p>
          <div className="mt-8 space-y-4">
            {givingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <a key={option.label} href={option.href} target="_blank" rel="noopener noreferrer" className="flex items-center rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:bg-white/14">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${option.tone}`}>
                    <Icon className="h-7 w-7 text-white" />
                  </span>
                  <span className="ml-4 text-lg font-bold text-white">{option.label}</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="premium-card rounded-3xl p-8">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-200">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Your Impact</h2>
          <div className="mt-8 space-y-6">
            {impacts.map(([title, copy], index) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 font-black text-amber-200">{index + 1}</span>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-400">{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/6 p-6">
            <h3 className="font-bold text-white">Questions about giving?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">For sponsorships, dedications, or scholarship gifts, contact us directly.</p>
            <Link href="/contact" className="mt-4 inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/16">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
