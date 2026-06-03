import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="section-pad page-top-offset mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="page-kicker">{eyebrow}</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
          {title} {accent ? <span className="gradient-text">{accent}</span> : null}
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-300">{description}</p>
        {children}
      </div>
    </section>
  );
}

export function InfoCard({
  title,
  children,
  className
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("premium-card rounded-3xl p-8", className)}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4 text-gray-300">{children}</div>
    </div>
  );
}
