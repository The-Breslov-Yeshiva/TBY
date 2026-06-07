import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Compass, Sparkles } from "lucide-react";
import { visionIntegrationLine, visionOutcomes } from "@/data/vision";

const teaserOutcomes = visionOutcomes.slice(0, 3);

export function VisionTeaser() {
  return (
    <section className="section-pad relative mx-auto mt-24 max-w-7xl" aria-labelledby="home-vision-title">
      <div className="absolute inset-x-6 top-14 -z-10 h-56 rounded-full bg-[radial-gradient(circle,rgba(245,199,107,0.16),transparent_68%)] blur-3xl" aria-hidden="true" />
      <div className="premium-card overflow-hidden rounded-3xl">
        <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative p-6 sm:p-8 lg:p-12">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,199,107,0.11),transparent_44%)]" aria-hidden="true" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-200/12 text-amber-200 ring-1 ring-amber-200/24">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="page-kicker mt-6">Our Vision</p>
              <h2 id="home-vision-title" className="mt-4 scroll-mt-[calc(var(--site-nav-height)+2rem)] text-4xl font-black tracking-tight text-white sm:text-5xl">
                Choosing Life Through <span className="gradient-text">Integrated Torah and Living</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                TBY was built to help a student integrate Torah, identity, emotional clarity, practical capability, and purpose into one lived framework.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/vision" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:from-indigo-500 hover:to-blue-500">
                  Read Our Vision
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/form" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/14">
                  Begin Your Journey
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-gray-950/70 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="rounded-3xl border border-amber-200/20 bg-amber-200/[0.07] p-5">
              <div className="flex items-center gap-3 text-amber-200">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-black uppercase tracking-[0.18em]">The integrated goal</p>
              </div>
              <p className="mt-4 text-2xl font-black leading-9 text-white">{visionIntegrationLine}</p>
            </div>
            <div className="mt-5 grid gap-3">
              {teaserOutcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
                  <p className="text-sm font-bold leading-6 text-gray-200">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
