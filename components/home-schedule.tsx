"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryStyles, getTodaySummary } from "@/data/schedule";
import type { ScheduleEvent } from "@/data/schedule";
import { cn } from "@/lib/utils";

type Summary = ReturnType<typeof getTodaySummary>;

type HomeScheduleProps = {
  className?: string;
  initialSummary?: Summary;
  variant?: "default" | "hero";
};

export function HomeSchedule({ className, initialSummary, variant = "default" }: HomeScheduleProps) {
  const isHero = variant === "hero";
  const [summary, setSummary] = useState<Summary>(() => initialSummary ?? getTodaySummary(new Date()));
  const visibleEvents = 4;

  useEffect(() => {
    setSummary(getTodaySummary(new Date()));
  }, []);

  return (
    <aside
      className={cn(
        "home-schedule-widget rounded-3xl border border-white/15 bg-gray-950/78 shadow-cinematic backdrop-blur-2xl",
        isHero ? "p-5 sm:p-5 2xl:p-6" : "p-6 sm:p-7",
        className
      )}
      aria-labelledby="today-schedule-heading"
    >
      <div className={cn("flex items-start justify-between gap-4", isHero ? "mb-5" : "mb-6")}>
        <div>
          <p className="page-kicker">Today</p>
          <h2 id="today-schedule-heading" className={cn("mt-1 font-black text-white", isHero ? "text-2xl 2xl:text-3xl" : "text-3xl")}>
            Yeshiva Schedule
          </h2>
        </div>
        <div className={cn("rounded-2xl border border-white/10 bg-white/10 text-right", isHero ? "px-3 py-2.5" : "px-4 py-3")}>
          <p className="text-xs font-semibold text-gray-400">Israel</p>
          <p className="text-sm font-bold text-white">{summary.dayName}</p>
        </div>
      </div>

      {summary.hasRegularSchedule ? (
        <div className="space-y-4">
          {summary.events.slice(0, visibleEvents).map((event) => (
            <SchedulePreview key={`${event.day}-${event.time}-${event.title}`} event={event} compact={isHero} />
          ))}
        </div>
      ) : (
        <div className={cn("rounded-2xl border border-white/10 bg-white/[0.07]", isHero ? "p-4" : "p-5")}>
          <p className={cn("font-bold text-white", isHero ? "text-lg" : "text-xl")}>No regular seder today</p>
          <p className={cn("mt-2 text-gray-300", isHero ? "text-sm leading-6" : "text-base leading-7")}>
            The weekday schedule resumes on <span className="font-semibold text-amber-200">{summary.nextRegularDay.name}</span>.
          </p>
        </div>
      )}

      <Link
        href="/schedule"
        className={cn(
          "mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 font-extrabold text-gray-950 transition hover:bg-amber-100",
          isHero ? "py-3.5 text-sm" : "py-4 text-base"
        )}
      >
        View Full Schedule
      </Link>
    </aside>
  );
}

function SchedulePreview({ event, compact = false }: { event: ScheduleEvent; compact?: boolean }) {
  const styles = categoryStyles[event.category];
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/[0.07]", compact ? "p-3.5" : "p-4")}>
      <div className="mb-2 flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{event.category}</p>
      </div>
      <p className="text-base font-semibold text-amber-200">{event.time}</p>
      <h3 className={cn("mt-1 font-bold leading-tight text-white", compact ? "text-base" : "text-lg")}>{event.title}</h3>
      <p className={cn("mt-1 text-gray-300", compact ? "text-sm" : "text-base")}>{event.instructor}</p>
    </div>
  );
}
