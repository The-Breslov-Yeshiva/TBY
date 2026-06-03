import type { Metadata } from "next";
import { ScheduleBoard } from "@/components/schedule-board";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Daily seder and shiur schedule at The Breslov Yeshiva."
};

export default function SchedulePage() {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-7xl pb-20">
      <div className="mb-12 max-w-3xl">
        <p className="page-kicker">The Daily Path</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
          The <span className="gradient-text">Daily Path</span>
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-300">
          A structured weekday rhythm of Gemara, Halacha, Chassidus, tefillah, supervised learning, and personal growth.
        </p>
      </div>
      <ScheduleBoard />
    </main>
  );
}
