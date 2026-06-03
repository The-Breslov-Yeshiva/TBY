export type LegalSection = {
  title: string;
  body: string;
};

export function LegalPage({ title, eyebrow, description, sections }: { title: string; eyebrow: string; description: string; sections: LegalSection[] }) {
  return (
    <main className="section-pad page-top-offset mx-auto max-w-4xl pb-20">
      <p className="page-kicker">{eyebrow}</p>
      <h1 className="mt-4 text-5xl font-black tracking-tight text-white">{title}</h1>
      <p className="mt-6 text-xl leading-8 text-gray-300">{description}</p>
      <section className="mt-12 grid gap-6">
        {sections.map((section) => (
          <div key={section.title} className="premium-card rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white">{section.title}</h2>
            <p className="mt-4 leading-8 text-gray-300">{section.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
