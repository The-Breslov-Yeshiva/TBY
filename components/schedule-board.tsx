"use client";

import { useMemo, useState } from "react";
import { categoryStyles, getEventsForDay, scheduleDays, scheduleEvents, type ScheduleEvent } from "@/data/schedule";
import { cn } from "@/lib/utils";

export function ScheduleBoard() {
  const [day, setDay] = useState("sun");
  const [selected, setSelected] = useState<ScheduleEvent>(scheduleEvents[0]);
  const events = useMemo(() => getEventsForDay(day), [day]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
      <aside className="premium-card rounded-3xl p-5">
        <div className="grid gap-2">
          {scheduleDays.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setDay(item.id);
                setSelected(getEventsForDay(item.id)[0] || selected);
              }}
              className={cn(
                "rounded-2xl px-4 py-3 text-left font-bold transition",
                item.id === day ? "bg-white text-gray-950" : "bg-white/6 text-gray-200 hover:bg-white/10"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/6 p-5">
          <p className="page-kicker">{selected.category}</p>
          <h2 className="mt-3 text-2xl font-black text-white">{selected.title}</h2>
          <p className="mt-3 text-amber-200">{selected.time}</p>
          <p className="mt-4 leading-7 text-gray-300">{selected.description}</p>
        </div>
      </aside>

      <div className="grid gap-4">
        {events.map((event) => {
          const styles = categoryStyles[event.category];
          return (
            <button
              key={`${event.day}-${event.time}-${event.title}`}
              type="button"
              onClick={() => setSelected(event)}
              className={cn(
                "grid gap-4 rounded-3xl border p-5 text-left transition sm:grid-cols-[11rem_1fr]",
                selected === event ? "border-amber-200/50 bg-white/12" : "border-white/10 bg-white/6 hover:bg-white/10"
              )}
            >
              <div>
                <p className="font-bold text-amber-200">{event.time}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-gray-400">{event.category}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{event.title}</h3>
                <p className="mt-1 text-gray-300">{event.instructor}</p>
                <p className="mt-3 line-clamp-2 leading-7 text-gray-400">{event.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
