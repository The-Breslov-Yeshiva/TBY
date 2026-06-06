import Link from "next/link";
import { BookOpen, CheckCircle2, HeartHandshake, MapPin, Sparkles, Users } from "lucide-react";
import { HeroVideo } from "@/components/hero-video";
import { HomeSchedule } from "@/components/home-schedule";
import { LivingShowcase } from "@/components/showcase/living-showcase";
import { getTodaySummary } from "@/data/schedule";
import { showHomeScheduleWidget, showRabbiKivakGuidanceSection } from "@/data/site-flags";

const features = [
  { title: "Torah Excellence", copy: "A strong foundation in Gemara and Halacha with experienced maggidei shiur.", icon: BookOpen },
  { title: "Spiritual Growth", copy: "Daily chassidus, tefillah, hisbodedus, and emphasis on joy in avodas Hashem.", icon: Sparkles },
  { title: "Supportive Community", copy: "A warm environment where talmidim are known, supported, and challenged.", icon: Users },
  { title: "Holistic Approach", copy: "A balance of rigorous learning, personal development, and emotional health.", icon: HeartHandshake },
  { title: "Proven Success", copy: "A path built to produce grounded Torah learners with genuine simchas hachaim.", icon: CheckCircle2 },
  { title: "Prime Location", copy: "A beautiful facility in the Ramat Beit Shemesh neighborhood.", icon: MapPin }
];

export default function HomePage() {
  const initialScheduleSummary = getTodaySummary();

  return (
    <main className="relative">
      <section className="relative min-h-screen overflow-hidden px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8 xl:pt-36">
        <div className="absolute inset-0 z-0">
          <img src="/about-hero-tree-group.jpg" alt="The Breslov Yeshiva talmidim gathered under a tree overlooking the hills" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/92 via-gray-950/68 to-gray-950/75" />
        </div>

        <div className="relative z-10 flex w-full lg:min-h-[calc(100vh-10rem)] lg:items-center xl:w-[calc(100%_-_21rem)] xl:translate-x-32 min-[1400px]:translate-x-56 min-[1536px]:translate-x-60 min-[1800px]:translate-x-84 2xl:w-[calc(100%_-_23rem)]">
          <div className="mx-auto grid w-full max-w-[108rem] gap-y-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.18fr)] lg:items-center lg:gap-x-8 xl:max-w-[59rem] xl:grid-cols-[minmax(25rem,0.92fr)_minmax(24rem,1.08fr)] xl:gap-x-5 2xl:max-w-[74rem] 2xl:grid-cols-[minmax(34rem,0.98fr)_minmax(24rem,1.02fr)] 2xl:gap-x-8">
            <div className="min-w-0 text-center lg:translate-x-36 lg:text-left">
              <h1 className="gradient-text text-4xl font-light leading-tight drop-shadow-2xl sm:text-5xl lg:text-[clamp(3rem,3.8vw,4.6rem)]">
                <span className="block">Where Torah Meets Transformation</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-xl leading-8 text-gray-100 drop-shadow-lg lg:mx-0 lg:max-w-2xl lg:text-2xl lg:leading-9">
                An English-speaking yeshiva dedicated to healthy, balanced growth in Torah and avodas Hashem, nurturing the next generation of inspired Torah scholars.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-nowrap lg:justify-start">
                <Link href="#register" className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-indigo-500 hover:to-blue-500">
                  Begin Your Journey
                </Link>
                <Link href="#about" className="rounded-full bg-white/10 px-6 py-4 text-lg font-semibold text-gray-100 backdrop-blur-sm transition hover:bg-white/16 hover:text-white">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative w-full min-w-0 lg:translate-x-24">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(245,199,107,0.18),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(79,124,255,0.18),transparent_35%)] blur-2xl" aria-hidden="true" />
              <HeroVideo />
            </div>
          </div>
        </div>

        {showHomeScheduleWidget ? (
          <div className="relative z-10 mx-auto mt-10 w-full max-w-2xl xl:absolute xl:right-8 xl:top-[26rem] xl:mx-0 xl:mt-0 xl:w-[19rem] xl:max-w-none xl:-translate-x-12 2xl:right-10 2xl:top-[27rem] 2xl:w-[20rem] min-[1800px]:!right-12 min-[1800px]:!top-[25.75rem]">
            <HomeSchedule
              initialSummary={initialScheduleSummary}
              variant="hero"
              className="w-full"
            />
          </div>
        ) : null}
      </section>

      <LivingShowcase />

      <section id="about" className="section-pad mx-auto mt-24 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="premium-card rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="mt-4 leading-8 text-gray-300">
              To build a yeshiva where young men can discover the depth, joy, and truth of Rebbe Nachman's path and carry it with them for life.
            </p>
          </div>
          <div className="premium-card rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white">Our Purpose</h2>
            <p className="mt-4 leading-8 text-gray-300">
              To give English-speaking young men a spiritual home where they can grow in Torah, tefillah, emunah, and healthy personal development.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto mt-28 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="gradient-text text-4xl font-black tracking-tight sm:text-5xl">What Makes Us Unique</h2>
          <p className="mt-6 text-xl leading-8 text-gray-300">A thoughtful approach to Torah education built for real transformation.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="premium-card rounded-3xl p-8 transition hover:-translate-y-1 hover:border-white/20">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-gray-300">{feature.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      {showRabbiKivakGuidanceSection ? (
        <section className="section-pad mx-auto mt-28 max-w-7xl">
          <div className="premium-card overflow-hidden rounded-3xl p-8 lg:p-12">
            <div className="grid gap-8 md:grid-cols-3 md:items-center">
              <div>
                <img src="/rav-kivak-trans.png" alt="Rabbi Nissan Dovid Kivak" className="mx-auto w-full max-w-xs rounded-2xl bg-gradient-to-br from-indigo-800/50 to-purple-800/50 p-1" />
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-black text-white lg:text-4xl">Under the Guidance of Rabbi Nissan Dovid Kivak, Shlita</h2>
                <p className="mt-5 text-lg leading-8 text-gray-300">
                  The yeshiva is privileged to operate under the direct guidance and blessing of Rabbi Nissan Dovid Kivak, shlita, one of the influential leaders in the global Breslov community.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="register" className="section-pad relative mt-24 pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="premium-card relative overflow-hidden rounded-3xl p-8 lg:p-16">
            <div className="relative">
              <h2 className="text-center text-4xl font-black text-white">Begin Your Journey Today</h2>
              <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-8 text-gray-300">
                Take the first step toward Torah excellence and spiritual fulfillment.
              </p>
              <form action="https://formspree.io/f/meojeeyg" method="POST" className="mx-auto mt-12 max-w-3xl">
                <input type="hidden" name="_subject" value="Homepage application inquiry" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="first-name" name="first-name" label="First Name" required />
                  <Field id="last-name" name="last-name" label="Last Name" required />
                  <Field id="email" name="email" label="Email" type="email" required className="sm:col-span-2" />
                  <Field id="phone-number" name="phone-number" label="Phone Number" type="tel" required className="sm:col-span-2" />
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">Tell Us About Yourself</label>
                    <textarea id="message" name="message" rows={4} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50" placeholder="Share your background, goals, and what draws you to our yeshiva." />
                  </div>
                </div>
                <div className="mt-8 flex justify-center">
                  <button type="submit" className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-indigo-500 hover:to-purple-500">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  className
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input id={id} name={name} type={type} required={required} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50" />
    </div>
  );
}
