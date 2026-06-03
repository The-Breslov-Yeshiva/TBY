import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Breslov Yeshiva for admissions, visits, donations, and general questions."
};

export default function ContactPage() {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-7xl pb-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <section>
          <p className="page-kicker">Contact Us</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Begin Your <span className="gradient-text">Journey Today</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-300">
            Reach out about admissions, scheduling a visit, learning more about the yeshiva, or partnering with our mission.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ContactCard title="Email">
              <a href={`mailto:${site.email}`} className="text-indigo-300 hover:text-indigo-200">{site.email}</a>
            </ContactCard>
            <ContactCard title="Location">{site.address}</ContactCard>
            <ContactCard title="Admissions">Use the form for applications, visits, and questions about the daily schedule.</ContactCard>
            <ContactCard title="Donations">For dedications and sponsorships, mention donation details in your message.</ContactCard>
          </div>
        </section>

        <section className="premium-card rounded-3xl p-8">
          <h2 className="text-center text-3xl font-black text-white">Send a Message</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-gray-300">Inquiries go to the yeshiva office directly.</p>
          <form action="https://formspree.io/f/meojeeyg" method="POST" className="mt-8 space-y-6">
            <input type="hidden" name="_subject" value="Website contact inquiry" />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="first-name" label="First Name" name="first-name" required />
              <Field id="last-name" label="Last Name" name="last-name" required />
            </div>
            <Field id="email" label="Email" name="email" type="email" required />
            <Field id="phone-number" label="Phone Number" name="phone-number" type="tel" />
            <div>
              <label htmlFor="inquiry-type" className="mb-2 block text-sm font-medium text-gray-300">Inquiry Type</label>
              <select id="inquiry-type" name="inquiry-type" className="w-full rounded-xl border border-white/20 bg-gray-950 px-4 py-3 text-white">
                <option>Admissions</option>
                <option>Schedule a Visit</option>
                <option>Donation or Sponsorship</option>
                <option>General Question</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400" placeholder="Tell us how we can help." />
            </div>
            <button type="submit" className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition hover:from-indigo-500 hover:to-purple-500">
              Send Message
            </button>
          </form>
        </section>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-card rounded-3xl p-8">
          <h2 className="text-2xl font-black text-white">Visit the Yeshiva</h2>
          <p className="mt-4 leading-8 text-gray-300">The yeshiva is located in Ramat Beit Shemesh, with access to local shuls, learning communities, and residential neighborhoods.</p>
          <a href="https://www.google.com/maps/search/?api=1&query=32%20Nachal%20Lachish%2C%20Ramat%20Beit%20Shemesh%2C%20Israel" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/16">
            Open in Google Maps
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <iframe
            title="Map to The Breslov Yeshiva"
            src="https://maps.google.com/maps?q=32%20Nachal%20Lachish%2C%20Ramat%20Beit%20Shemesh%2C%20Israel&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}

function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-6">
      <h2 className="font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-400">{children}</p>
    </div>
  );
}

function Field({ id, label, name, type = "text", required }: { id: string; label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">{label}</label>
      <input id={id} name={name} type={type} required={required} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400" />
    </div>
  );
}
