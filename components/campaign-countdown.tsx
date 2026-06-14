"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock3, HeartHandshake, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fundraisingCampaign } from "@/data/campaign";
import { homepageShowcaseItems } from "@/data/media";
import { cn } from "@/lib/utils";

type CampaignCountdownVariant = "feature" | "hero" | "donate";

type RemainingTime = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const countdownImages = homepageShowcaseItems.slice(0, 5);

function getRemainingTime(targetTime: number): RemainingTime {
  const total = Math.max(0, targetTime - Date.now());
  const secondsTotal = Math.floor(total / 1000);

  return {
    total,
    days: Math.floor(secondsTotal / 86400),
    hours: Math.floor((secondsTotal % 86400) / 3600),
    minutes: Math.floor((secondsTotal % 3600) / 60),
    seconds: secondsTotal % 60
  };
}

function padTime(value: number) {
  return String(value).padStart(2, "0");
}

export function CampaignCountdown({ variant = "hero", className }: { variant?: CampaignCountdownVariant; className?: string }) {
  const targetTime = useMemo(() => new Date(fundraisingCampaign.endsAt).getTime(), []);
  const [remaining, setRemaining] = useState<RemainingTime | null>(null);
  const reducedMotion = useReducedMotion();
  const isComplete = Boolean(remaining && remaining.total <= 0);
  const isFeature = variant === "feature";
  const isHero = variant === "hero";
  const Heading = isFeature ? "h1" : "h2";

  useEffect(() => {
    setRemaining(getRemainingTime(targetTime));
    const timer = window.setInterval(() => {
      setRemaining(getRemainingTime(targetTime));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetTime]);

  const units = remaining
    ? [
        ["Days", remaining.days],
        ["Hours", remaining.hours],
        ["Minutes", remaining.minutes],
        ["Seconds", remaining.seconds]
      ]
    : [
        ["Days", null],
        ["Hours", null],
        ["Minutes", null],
        ["Seconds", null]
      ];

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-[1.75rem] border border-white/12 bg-gray-950/82 text-left shadow-cinematic backdrop-blur-2xl",
        isFeature ? "rounded-[2rem] p-5 sm:p-8 lg:p-10 xl:p-12" : isHero ? "p-5 sm:p-6 lg:p-7 xl:p-8" : "p-4 sm:p-5 lg:p-6",
        className
      )}
      aria-labelledby={`${variant}-campaign-countdown-title`}
    >
      <div className="absolute inset-0 -z-20">
        <img src="/gallery-pic-01.webp" alt="" className="h-full w-full object-cover opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,7,19,0.94),rgba(17,12,26,0.78)_44%,rgba(5,7,19,0.96)),linear-gradient(18deg,rgba(245,199,107,0.18),transparent_38%),linear-gradient(222deg,rgba(79,124,255,0.18),transparent_42%)]" />
      </div>
      <div className="noise-overlay" />

      <div
        className={cn(
          "relative grid gap-6",
          isFeature
            ? "lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-center lg:gap-10 xl:gap-14"
            : isHero
              ? "lg:items-center"
              : "xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.75fr)] xl:items-center"
        )}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber-200", isFeature && "px-4 py-2 text-sm")}>
              <Clock3 className={cn("h-3.5 w-3.5", isFeature && "h-4 w-4")} />
              {fundraisingCampaign.eyebrow}
            </span>
            <span className={cn("rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-bold text-gray-200", isFeature && "px-4 py-2 text-sm")}>
              Goal {fundraisingCampaign.goal}
            </span>
          </div>

          <Heading
            id={`${variant}-campaign-countdown-title`}
            className={cn(
              "mt-5 font-black leading-tight tracking-tight text-white",
              isFeature ? "text-4xl sm:text-6xl lg:text-7xl xl:text-8xl" : isHero ? "text-3xl sm:text-4xl xl:text-5xl" : "text-3xl sm:text-4xl"
            )}
          >
            <span className="gradient-text">{fundraisingCampaign.tagline}</span>
          </Heading>
          <p className={cn("mt-4 max-w-3xl leading-8 text-gray-200", isFeature ? "text-xl sm:text-2xl sm:leading-9" : isHero ? "text-lg sm:text-xl sm:leading-8" : "text-base sm:text-lg")}>
            {fundraisingCampaign.copy}
          </p>

          <div className={cn("mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3", isFeature && "mt-8 gap-3 sm:gap-4", isHero && "gap-3 sm:gap-3.5")} aria-live="polite">
            {units.map(([label, value]) => (
              <div key={label} className={cn("rounded-2xl border border-white/10 bg-white/[0.075] p-3 text-center backdrop-blur-md sm:p-4", isFeature && "p-4 sm:p-5", isHero && "p-4")}>
                <strong className={cn("block font-black leading-none text-white tabular-nums text-3xl sm:text-4xl", isFeature && "text-4xl sm:text-5xl lg:text-6xl", isHero && "text-4xl sm:text-5xl")}>
                  {typeof value === "number" ? padTime(value) : "--"}
                </strong>
                <span className={cn("mt-2 block text-[0.68rem] font-black uppercase tracking-[0.16em] text-gray-400", isHero && "text-xs")}>{label}</span>
              </div>
            ))}
          </div>

          <div className={cn("mt-6 flex flex-col gap-3 sm:flex-row sm:items-center", isFeature && "mt-8")}>
            <a
              href={fundraisingCampaign.href}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className={cn("inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-gray-950 transition hover:bg-amber-100", isFeature && "px-8 py-5 text-base", isHero && "px-7 py-4 text-base")}
            >
              Donate to the Campaign
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className={cn("text-sm font-bold leading-6 text-gray-300", isFeature && "text-base", isHero && "text-base")}>
              {isComplete ? "The countdown is complete. The campaign link remains open." : `Countdown ends ${fundraisingCampaign.endsAtLabel}.`}
            </p>
          </div>
        </div>

        <div className={cn("relative min-h-[17rem]", isFeature ? "hidden min-h-[30rem] lg:block xl:min-h-[34rem]" : isHero ? "hidden" : "hidden xl:block")}>
          <motion.div
            className="absolute left-0 top-5 w-[63%] overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/8 shadow-cinematic"
            animate={reducedMotion ? false : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={countdownImages[0]?.webp || countdownImages[0]?.full || "/gallery-pic-01.webp"} alt="" className="aspect-[4/5] w-full object-cover" aria-hidden="true" />
          </motion.div>
          <motion.div
            className="absolute right-0 top-0 w-[56%] overflow-hidden rounded-[1.35rem] border border-amber-200/25 bg-white/8 shadow-cinematic"
            animate={reducedMotion ? false : { y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={countdownImages[1]?.webp || countdownImages[1]?.full || "/gallery-pic-left.webp"} alt="" className="aspect-[4/3] w-full object-cover" aria-hidden="true" />
          </motion.div>
          <div className="absolute bottom-0 right-8 w-[62%] overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/8 shadow-cinematic">
            <img src={countdownImages[2]?.webp || countdownImages[2]?.full || "/gallery-black.webp"} alt="" className="aspect-[16/10] w-full object-cover" aria-hidden="true" />
          </div>
          <div className="absolute bottom-5 left-4 rounded-2xl border border-white/12 bg-gray-950/80 p-4 shadow-cinematic backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 text-gray-950">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">Bonus Goal</p>
                <p className="text-xl font-black text-white">{fundraisingCampaign.bonusGoal}</p>
              </div>
            </div>
          </div>
          <div className="absolute right-2 top-28 rounded-2xl border border-white/12 bg-gray-950/76 p-3 shadow-cinematic backdrop-blur-xl">
            <HeartHandshake className="h-6 w-6 text-amber-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
