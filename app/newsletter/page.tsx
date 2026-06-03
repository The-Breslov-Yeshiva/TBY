import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe for updates, divrei Torah, and news from The Breslov Yeshiva."
};

export default function NewsletterPage() {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-7xl pb-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <section>
          <p className="page-kicker">Newsletter</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Yeshiva <span className="gradient-text">Newsletter</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-300">
            Subscribe for divrei Torah, yeshiva updates, alumni notes, and opportunities to support the mission.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {["Divrei Torah", "Yeshiva Updates", "Alumni Notes", "Opportunities"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 p-6">
                <h2 className="font-bold text-white">{item}</h2>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-card rounded-3xl p-8">
          <h2 className="text-3xl font-black text-white">Subscribe</h2>
          <form action="https://formspree.io/f/meojeeyg" method="POST" className="mt-8 space-y-5">
            <input type="hidden" name="_subject" value="Newsletter signup" />
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">Name</label>
              <input id="name" name="name" className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">Email</label>
              <input id="email" name="email" type="email" required className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white" />
            </div>
            <button type="submit" className="w-full rounded-full bg-white px-6 py-4 text-sm font-black text-gray-950 transition hover:bg-amber-100">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
