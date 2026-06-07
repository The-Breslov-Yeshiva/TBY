import Link from "next/link";
import { ArrowUpRight, CalendarDays, CheckCircle2, Heart, Moon, Mountain, Sparkles, Sun } from "lucide-react";
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

export function ChoosingLifeSection() {
  return (
    <section className="section-pad relative mx-auto mt-24 max-w-7xl" aria-labelledby="choosing-life-title">
      <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(245,199,107,0.14),transparent_68%)] blur-3xl" aria-hidden="true" />
      <div className="premium-card overflow-hidden rounded-3xl">
        <div className="relative border-b border-white/10 p-6 sm:p-8 lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,199,107,0.09),transparent_32%,rgba(79,124,255,0.08)_78%,transparent)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="page-kicker">The Breslov Yeshiva - Yeshivas Uvacharta Bachaim</p>
            <h2 id="choosing-life-title" className="mt-5 scroll-mt-[calc(var(--site-nav-height)+2rem)] text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Choosing Life Through <span className="gradient-text">Integrated Torah and Living</span>
            </h2>
            <div className="mx-auto mt-7 max-w-3xl space-y-5 text-lg leading-8 text-gray-300">
              {visionIntroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-xl font-black text-amber-200">{visionFoundingLine}</p>
              <p>Its vision is simple: {visionStatement}</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-12">
          <div className="grid gap-5 lg:grid-cols-3">
            {visionRhythmCards.map((card, index) => {
              const Icon = rhythmIcons[index] ?? Sparkles;
              return (
                <article key={card.title} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-200/12 text-amber-200 ring-1 ring-amber-200/24">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-white">{card.title}</h3>
                      <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-amber-200">{card.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-8 text-gray-300">{card.body}</p>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-amber-200/24 bg-[linear-gradient(135deg,rgba(245,199,107,0.12),rgba(255,255,255,0.045))] p-6 text-center sm:p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-200/14 text-amber-200 ring-1 ring-amber-200/26">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-2xl font-black leading-9 text-white">
              {visionIntegrationLine}
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-gray-950/70 p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-lg">
                <p className="page-kicker">A student leaves with</p>
                <h3 className="mt-3 text-3xl font-black text-white">A life that can keep growing.</h3>
              </div>
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                {visionOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
                    <p className="text-sm font-bold leading-6 text-gray-200">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-4xl text-center text-lg font-bold leading-8 text-gray-200">
              {visionClosingLine}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:from-indigo-500 hover:to-blue-500">
              <Heart className="h-4 w-4" aria-hidden="true" />
              Begin Your Journey
            </Link>
            <Link href="/schedule" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/14">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Explore the Daily Schedule
            </Link>
            <Link href="/about" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black text-amber-200 transition hover:text-amber-100">
              Learn more about TBY
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
