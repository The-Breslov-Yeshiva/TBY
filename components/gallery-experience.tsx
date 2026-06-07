"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, X, ZoomIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { albums, categories, showcaseItems } from "@/data/media";
import type { ShowcaseItem } from "@/data/media";
import { cn } from "@/lib/utils";

export function GalleryExperience() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [album, setAlbum] = useState<(typeof albums)[number]>("All Albums");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("curated");
  const [active, setActive] = useState<ShowcaseItem | null>(null);
  const reduced = useReducedMotion();

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = showcaseItems.filter((item) => {
      const matchesCategory = filter === "All" || item.category === filter;
      const matchesAlbum = album === "All Albums" || item.album === album;
      const matchesQuery = !normalized || `${item.title} ${item.category} ${item.album} ${item.description} ${item.keywords}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesAlbum && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "newest") return b.date.localeCompare(a.date);
      if (sort === "energy") return b.energy - a.energy;
      return showcaseItems.indexOf(a) - showcaseItems.indexOf(b);
    });
  }, [album, filter, query, sort]);

  const activeIndex = active ? items.findIndex((item) => item.id === active.id) : -1;
  const move = (direction: number) => {
    if (!active || !items.length) return;
    const index = activeIndex < 0 ? 0 : activeIndex;
    setActive(items[(index + direction + items.length) % items.length]);
  };

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget = target?.matches("input, textarea, select, [contenteditable='true']");
      if (isTypingTarget) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, activeIndex, items]);

  return (
    <>
      <section className="section-pad page-top-offset relative mx-auto max-w-[96rem] pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="page-kicker">Gallery</p>
            <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              A living portrait of <span className="gradient-text">yeshiva life</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-300">
              Learning, friendship, daily avodah, and the quiet frames that reveal the rhythm of the yeshiva.
            </p>
          </div>
          <div className="premium-card grid grid-cols-3 gap-3 rounded-3xl p-5">
            <Stat value={String(showcaseItems.length).padStart(2, "0")} label="Moments" />
            <Stat value={String(categories.length - 1).padStart(2, "0")} label="Themes" />
            <Stat value={String(albums.length - 1).padStart(2, "0")} label="Albums" />
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[96rem]">
        <div className="nav-sticky-offset sticky z-20 mb-8 rounded-2xl border border-white/10 bg-gray-950/78 p-3 shadow-cinematic backdrop-blur-2xl sm:rounded-3xl">
          <div className="grid gap-3">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-black transition",
                      filter === category ? "bg-white text-gray-950" : "bg-white/8 text-gray-200 hover:bg-white/14"
                    )}
                    aria-pressed={filter === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <label className="relative block min-w-0">
                <span className="sr-only">Search gallery</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search moments"
                  className="h-11 w-full rounded-full border border-white/10 bg-white/8 pl-11 pr-4 text-sm font-bold text-white placeholder:text-gray-500 lg:w-64"
                />
              </label>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-full border border-white/10 bg-gray-950 px-4 text-sm font-bold text-white">
                <option value="curated">Curated</option>
                <option value="newest">Newest</option>
                <option value="energy">Energy</option>
              </select>
            </div>
            <div className="touch-scroll flex gap-2 overflow-x-auto border-t border-white/10 pt-3" role="tablist" aria-label="Gallery albums">
              {albums.map((albumName) => (
                <button
                  key={albumName}
                  type="button"
                  onClick={() => setAlbum(albumName)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-black transition",
                    album === albumName ? "bg-amber-200 text-gray-950" : "bg-white/8 text-gray-200 hover:bg-white/14"
                  )}
                  role="tab"
                  aria-selected={album === albumName}
                >
                  {albumName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {items.length ? (
          <motion.div layout className="grid auto-rows-auto grid-cols-2 gap-2 sm:gap-3 md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] 2xl:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} open={() => setActive(item)} reduced={Boolean(reduced)} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="premium-card rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black text-white">No matching moments</h2>
            <p className="mt-3 text-gray-300">Try another search or category.</p>
          </div>
        )}
      </section>

      <section className="section-pad mx-auto max-w-[96rem] py-20">
        <div className="premium-card rounded-3xl p-8 text-center lg:p-12">
          <p className="page-kicker">Share a moment</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black text-white sm:text-5xl">Have a photo from the yeshiva?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">Send it to the office so the public archive can keep growing with care.</p>
        </div>
      </section>

      <Dialog.Root open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/86 backdrop-blur-xl" />
          <Dialog.Content className="fixed inset-0 z-[91] grid min-h-dvh grid-rows-[minmax(42dvh,1fr)_auto] gap-3 overflow-y-auto p-3 sm:gap-4 sm:p-4 lg:grid-cols-[1fr_26rem] lg:grid-rows-1 lg:overflow-hidden lg:p-8">
            {active && (
              <>
                <Dialog.Title className="sr-only">{active.title}</Dialog.Title>
                <Dialog.Description className="sr-only">{active.description}</Dialog.Description>
                <div className="relative min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-black">
                  <img src={active.full} alt={active.alt} className="h-full w-full object-contain" />
                  <button type="button" onClick={() => move(-1)} className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex" aria-label="Previous image">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => move(1)} className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex" aria-label="Next image">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <aside className="relative rounded-2xl border border-white/10 bg-gray-950/90 p-4 shadow-cinematic backdrop-blur-2xl sm:rounded-3xl sm:p-6 lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto">
                  <Dialog.Close className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close image">
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                  <p className="page-kicker">{active.album}</p>
                  <h3 className="mt-5 pr-12 text-3xl font-black text-white sm:text-4xl">{active.title}</h3>
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-amber-200">{active.category}</p>
                  <p className="mt-5 text-lg leading-8 text-gray-300">{active.story}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8">
                    <button type="button" onClick={() => move(-1)} className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white hover:bg-white/14">Previous</button>
                    <button type="button" onClick={() => move(1)} className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white hover:bg-white/14">Next</button>
                  </div>
                </aside>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
      <strong className="block text-3xl font-black text-white">{value}</strong>
      <span className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">{label}</span>
    </div>
  );
}

function GalleryCard({ item, index, open, reduced }: { item: ShowcaseItem; index: number; open: () => void; reduced: boolean }) {
  const ratio = item.width / item.height;
  const orientation = ratio >= 1.65 ? "wide" : ratio <= 0.8 ? "portrait" : ratio >= 0.9 && ratio <= 1.15 ? "square" : "standard";

  return (
    <motion.button
      layout
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.36, delay: index * 0.025 }}
      type="button"
      onClick={open}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 text-left shadow-lg transition hover:border-amber-200/50",
        orientation === "wide" && "md:col-span-2",
        orientation === "portrait" ? "aspect-[4/5]" : orientation === "square" ? "aspect-square" : orientation === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"
      )}
      aria-label={`Open ${item.title}`}
    >
      <picture>
        {item.webp ? <source srcSet={item.webp} type="image/webp" /> : null}
        <img
          src={item.full}
          alt={item.alt}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          width={item.width}
          height={item.height}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.055]"
          style={{ objectPosition: item.focalPoint }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, (max-width: 1440px) 28vw, 22vw"
        />
      </picture>
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100" />
      <span className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-3 md:opacity-0 md:transition md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-amber-200">{item.album}</span>
        <span className="mt-1 block text-lg font-black text-white">{item.title}</span>
      </span>
      <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/28 text-white backdrop-blur-md">
        <ZoomIn className="h-4 w-4" />
      </span>
    </motion.button>
  );
}
