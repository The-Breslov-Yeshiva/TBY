import Link from "next/link";
import { legalNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-gray-950/55">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-gray-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <img src={site.logo} alt={site.logoAlt} className="h-12 w-auto object-contain" />
          <div>
            <p className="font-semibold text-gray-300">&copy; 2026 {site.name}</p>
            <p>Nurturing Torah Scholars Since Our Founding</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-4" aria-label="Legal footer">
          {legalNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="max-w-xs md:text-right">{site.address}</p>
      </div>
    </footer>
  );
}
