import type { Metadata } from "next";
import { RebbeimGrid } from "@/components/rebbeim-grid";
import { showRabbiKivakGuidanceSection } from "@/data/site-flags";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about The Breslov Yeshiva mission, approach, guidance, and rebbeim."
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      <section className="section-pad page-top-offset mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="page-kicker">About Us</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
              A Makom Torah for <span className="gradient-text">Healthy Growth</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300">
              The Breslov Yeshiva is an English-speaking yeshiva dedicated to Torah, tefillah, avodas Hashem, and grounded personal development in the light of Rebbe Nachman.
            </p>
          </div>
          <div className="media-frame aspect-[1478/718] rounded-3xl border border-white/10">
            <img src="/about-hero-tree-group.jpg" alt="The Breslov Yeshiva talmidim gathered under a tree overlooking the hills" className="h-full w-full object-cover object-center opacity-85" />
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto mt-20 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            ["Mission", "To help young men grow into sincere, capable, and joyful ovdei Hashem through serious Torah learning, close mentorship, and a balanced daily structure."],
            ["Approach", "A strong seder, accessible rebbeim, and personal guidance help each talmid develop learning skills, inner clarity, and practical consistency."],
            ["Community", "The yeshiva offers a warm environment where talmidim are known, supported, challenged, and encouraged to take ownership of their growth."]
          ].map(([title, copy]) => (
            <div key={title} className="premium-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="mt-4 leading-8 text-gray-300">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {showRabbiKivakGuidanceSection ? (
        <section className="section-pad mx-auto mt-20 max-w-7xl">
          <div className="premium-card rounded-3xl p-8 lg:p-12">
            <div className="grid gap-8 md:grid-cols-3 md:items-center">
              <img src="/rav-kivak-trans.png" alt="Rabbi Nissan Dovid Kivak" className="mx-auto w-full max-w-xs rounded-2xl bg-gradient-to-br from-indigo-800/50 to-purple-800/50 p-1" />
              <div className="md:col-span-2">
                <h2 className="text-3xl font-black text-white">Under the Guidance of Rabbi Nissan Dovid Kivak, Shlita</h2>
                <p className="mt-5 text-lg leading-8 text-gray-300">
                  The yeshiva is privileged to operate under his guidance and blessing, drawing from a living tradition of Breslov Torah, practical avodah, and care for each talmid.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad mx-auto mt-24 max-w-7xl">
        <div className="text-center">
          <h2 className="gradient-text text-4xl font-black tracking-tight sm:text-5xl">Meet Our Rebbeim</h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-300">
            Learn from rebbeim who combine Torah scholarship, mentorship, and genuine care for each talmid.
          </p>
        </div>
        <RebbeimGrid />
      </section>
    </main>
  );
}
