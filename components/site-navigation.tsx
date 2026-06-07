"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { communityNavigation, primaryNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const allMobileItems = [...primaryNavigation, ...communityNavigation];
  const communityMenuId = "community-navigation-menu";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gray-950/72 backdrop-blur-2xl">
      <div className="relative mx-auto flex h-[var(--site-nav-height)] max-w-[96rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 xl:gap-4" aria-label="The Breslov Yeshiva home">
          <img src="/breslov-logo-gold-cutout.png" alt="The Breslov Yeshiva" className="h-[clamp(3rem,10vw,4rem)] w-auto max-w-[41vw] object-contain md:h-[4.5rem] md:max-w-[20rem] xl:h-[5.35rem] xl:max-w-[22rem]" />
          <img src={site.logo} alt={site.logoAlt} className="h-[clamp(3rem,10vw,4rem)] w-auto max-w-[41vw] object-contain md:h-[4.5rem] md:max-w-[20rem] xl:h-[5.35rem] xl:max-w-[22rem]" />
        </Link>

        <nav className="hidden min-w-0 items-center gap-4 text-sm font-extrabold text-gray-200 xl:flex 2xl:gap-6 2xl:text-base" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("transition hover:text-white", active(item.href) && "text-amber-200")}
            >
              {item.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setCommunityOpen(true)}
            onMouseLeave={() => setCommunityOpen(false)}
            onBlur={(event) => {
              const nextFocus = event.relatedTarget as Node | null;
              if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
                setCommunityOpen(false);
              }
            }}
          >
            <button
              type="button"
              className={cn("inline-flex items-center gap-1.5 transition hover:text-white", communityOpen && "text-white")}
              aria-haspopup="menu"
              aria-expanded={communityOpen}
              aria-controls={communityMenuId}
              onClick={() => setCommunityOpen((value) => !value)}
              onFocus={() => setCommunityOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setCommunityOpen(false);
                }
              }}
            >
              Community
              <ChevronDown className={cn("h-4 w-4 transition", communityOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "absolute right-0 top-full z-50 pt-3 transition duration-150",
                communityOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              )}
            >
              <div
                id={communityMenuId}
                role="menu"
                className="grid min-w-52 gap-1 rounded-2xl border border-white/12 bg-gray-950/96 p-2 shadow-cinematic backdrop-blur-2xl"
              >
                {communityNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    tabIndex={communityOpen ? 0 : -1}
                    onClick={() => setCommunityOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                      active(item.href) && "bg-white/10 text-amber-200"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
          <Link
            href="/donate"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-3 text-sm font-black text-white shadow-[0_18px_46px_rgba(214,42,180,0.34)] transition hover:scale-[1.02] hover:shadow-[0_22px_56px_rgba(214,42,180,0.44)] 2xl:px-6"
          >
            <Heart className="h-4 w-4 transition group-hover:scale-110" />
            Donate
          </Link>
          <Link
            href="/#register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-black text-white shadow-[0_18px_46px_rgba(48,128,255,0.32)] transition hover:scale-[1.02] hover:from-indigo-500 hover:to-blue-500 2xl:px-6"
          >
            Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white xl:hidden"
          aria-expanded={open}
          aria-label="Open navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-var(--site-nav-height))] overflow-y-auto border-t border-white/10 bg-gray-950/96 px-4 py-5 shadow-cinematic xl:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {allMobileItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-gray-200 transition hover:bg-white/10",
                    active(item.href) && "bg-white/10 text-amber-200"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-5 py-3 text-sm font-black text-white transition hover:from-purple-500 hover:to-pink-500"
            >
              <Heart className="h-4 w-4" />
              Donate
            </Link>
            <Link
              href="/#register"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-black text-white transition hover:from-indigo-500 hover:to-blue-500"
            >
              Apply Now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
