import Link from "next/link";
import { ArrowUpRight, BookOpenText, CheckCircle2, Compass, HeartHandshake, Moon, Mountain, Sparkles, Sun } from "lucide-react";
import {
  visionClosingLine,
  visionFoundingLine,
  visionIntegrationLine,
  visionIntroParagraphs,
  visionOutcomes,
  visionRhythmCards,
  visionStatement
} from "@/data/vision";

const rhythmIcons = [Sun, Mountain, Moon] as const;

export function VisionPageContent() {
  return (
    <main className="pb-24">
      <section className="section-pad page-top-offset relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_24%_16%,rgba(245,199,107,0.18),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(79,124,255,0.18),transparent_32%)]" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/12 text-amber-200 ring-1 ring-amber-200/24">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="page-kicker mt-6">The Breslov Yeshiva - Yeshivas Uvacharta Bachaim</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Choosing Life Through <span className="gradient-text">Integrated Torah and Living</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-gray-300">
              A dedicated vision for building whole people: rooted in Torah, emotionally clear, practically capable, and deeply connected to Hashem.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:from-indigo-500 hover:to-blue-500">
                Apply Now
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/schedule" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/14">
                View Schedule
              </Link>
            </div>
          </div>

          <div className="premium-card relative min-h-[22rem] overflow-hidden rounded-3xl sm:min-h-[28rem] lg:min-h-[34rem]">
            <img src="/vision-hero-beis-midrash.jpeg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover object-center opacity-70 blur-2xl saturate-125" />
            <img src="/vision-hero-beis-midrash.jpeg" alt="The Breslov Yeshiva talmidim learning together around a table in the beis midrash" className="absolute inset-0 h-full w-full origin-center -translate-y-[19%] scale-[1.16] object-cover object-center sm:-translate-y-[19%] sm:scale-[1.16] lg:-translate-y-[20%] lg:scale-[1.17]" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/76 via-gray-950/36 to-gray-950/10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-lg rounded-3xl border border-white/12 bg-gray-950/70 p-5 backdrop-blur-xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-200">Core Vision</p>
                <p className="mt-3 text-xl font-black leading-8 text-white">{visionStatement}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto mt-8 max-w-7xl">
        <div className="premium-card overflow-hidden rounded-3xl">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/12 text-amber-200 ring-1 ring-amber-200/24">
                <BookOpenText className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="page-kicker mt-6">Why this yeshiva exists</p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Torah learned deeply. Life lived whole.
              </h2>
              <p className="mt-5 text-lg font-black leading-8 text-amber-200">{visionFoundingLine}</p>
            </div>
            <div className="space-y-5 p-6 text-lg leading-8 text-gray-300 sm:p-8 lg:p-10">
              {visionIntroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto mt-20 max-w-7xl" aria-labelledby="daily-rhythm-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="page-kicker">Structured Daily Rhythm</p>
          <h2 id="daily-rhythm-title" className="mt-4 scroll-mt-[calc(var(--site-nav-height)+2rem)] text-4xl font-black tracking-tight text-white sm:text-5xl">
            Developing the <span className="gradient-text">Whole Person</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-300">
            The yeshiva day is designed to move from source to lived experience, from inner work to practical direction, and from personal growth to belonging.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {visionRhythmCards.map((card, index) => {
            const Icon = rhythmIcons[index] ?? Sparkles;
            return (
              <article key={card.title} className="premium-card flex h-full flex-col rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-200/12 text-amber-200 ring-1 ring-amber-200/24">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-white">{card.title}</h3>
                    <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-amber-200">{card.subtitle}</p>
                  </div>
                </div>
                <p className="mt-6 leading-8 text-gray-300">{card.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad mx-auto mt-20 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="premium-card rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/12 text-amber-200 ring-1 ring-amber-200/24">
              <HeartHandshake className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="page-kicker mt-6">Integration</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white">{visionIntegrationLine}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              The vision is not only to educate students, but to shape a life of learning, avodah, emotional clarity, responsibility, contribution, and purpose.
            </p>
          </div>

          <div className="premium-card rounded-3xl p-6 sm:p-8 lg:p-10">
            <p className="page-kicker">A student leaves with</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {visionOutcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
                  <p className="text-sm font-bold leading-6 text-gray-200">{outcome}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-bold leading-8 text-gray-200">{visionClosingLine}</p>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto mt-20 max-w-5xl">
        <div className="premium-card relative overflow-hidden rounded-3xl p-6 text-center sm:p-8 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,199,107,0.16),transparent_42%)]" aria-hidden="true" />
          <div className="relative">
            <p className="page-kicker">Choose Life Each Day</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Build a Torah life with clarity, capability, and purpose.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:from-indigo-500 hover:to-blue-500">
                Begin Your Journey
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/14">
                Speak With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
