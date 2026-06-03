import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Submission Received",
  description: "Your submission has been received by The Breslov Yeshiva."
};

export default function ReceivedPage() {
  return (
    <main className="section-pad page-top-offset flex min-h-screen items-center justify-center">
      <section className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/18 text-emerald-300">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-7xl">Submission Received</h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-gray-300">
          Thank you for reaching out. The yeshiva office will review your message and follow up when appropriate.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-white px-8 py-4 font-black text-gray-950 transition hover:bg-amber-100">Back Home</Link>
          <Link href="/gallery" className="rounded-full border border-white/15 bg-white/8 px-8 py-4 font-bold text-white transition hover:bg-white/14">View Gallery</Link>
        </div>
      </section>
    </main>
  );
}
