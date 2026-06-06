"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, Sparkles, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { featuredShowcaseItems as showcaseItems, type ShowcaseItem } from "@/data/media";
import { cn } from "@/lib/utils";

const SHOWCASE_HOVER_DELAY_MS = 2000;
const SHOWCASE_SIDE_ZONE_WIDTH = "max(0px, calc(50% - min(37vw, 15.5rem)))";

type ShowcaseDirection = -1 | 1;

const showcaseCopyVariants = {
  enter: (direction: ShowcaseDirection) => ({
    opacity: 0,
    x: direction * 18,
    filter: "blur(8px)"
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)"
  },
  exit: (direction: ShowcaseDirection) => ({
    opacity: 0,
    x: direction * -18,
    filter: "blur(8px)"
  })
};

const AmbientStage = dynamic(() => import("./ambient-stage").then((module) => module.AmbientStage), {
  ssr: false
});

export function LivingShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<ShowcaseDirection>(1);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = !mounted || prefersReducedMotion === true;
  const showAmbientStage = mounted && prefersReducedMotion !== true;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const depthY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-34, 34]);
  const activeItem = showcaseItems[active];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) return;

    let context: any;
    let alive = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (!alive || !sectionRef.current) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.fromTo(
          "[data-showcase-reveal]",
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%"
            }
          }
        );
      }, sectionRef);
    });

    return () => {
      alive = false;
      context?.revert();
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActive((value) => (value + 1) % showcaseItems.length);
      if (event.key === "ArrowLeft") setActive((value) => (value - 1 + showcaseItems.length) % showcaseItems.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activate = useCallback(
    (index: number) => {
      if (index === active) return;
      const forwardDistance = (index - active + showcaseItems.length) % showcaseItems.length;
      const backwardDistance = (active - index + showcaseItems.length) % showcaseItems.length;
      setDirection(forwardDistance <= backwardDistance ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const next = useCallback(() => {
    setDirection(1);
    setActive((value) => (value + 1) % showcaseItems.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((value) => (value - 1 + showcaseItems.length) % showcaseItems.length);
  }, []);

  const activeProgress = useMemo(() => ((active + 1) / showcaseItems.length) * 100, [active]);

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) return;
    const delta = clientX - touchStart;
    if (Math.abs(delta) > 42) {
      if (delta < 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  return (
    <section
      ref={sectionRef}
      className="section-pad relative isolate mx-auto mt-20 max-w-[96rem] overflow-hidden py-10 sm:mt-24 lg:py-20"
      aria-labelledby="living-showcase-title"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(245,199,107,0.08),transparent_34%,rgba(79,124,255,0.07)_70%,transparent)]" aria-hidden="true" />
      <div className="noise-overlay" />
      {showAmbientStage && <AmbientStage />}

      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <motion.div style={{ y: depthY }} className="relative z-10 max-w-2xl" data-showcase-reveal>
          <p className="page-kicker">Living Showcase</p>
          <h2 id="living-showcase-title" className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            A cinematic window into <span className="gradient-text">yeshiva life</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-300 sm:text-xl">
            Not a gallery strip. A living editorial preview of the learning, friendship, rhythm, and inner work that shape the yeshiva day.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3" aria-label="Showcase statistics">
            {[
              ["06", "moments"],
              ["03", "themes"],
              ["4K", "source-first"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <strong className="block text-2xl font-black text-white">{value}</strong>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-gray-950 transition hover:bg-amber-100"
            >
              <Maximize2 className="h-4 w-4" />
              Open Showcase
            </button>
            <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/14">
              Open Gallery
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div
          className="relative min-h-[34rem] lg:min-h-[44rem]"
          onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          data-showcase-reveal
        >
          <div className="absolute left-2 top-6 hidden w-56 rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl md:block">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Current Frame</p>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={`${activeItem.id}-category`}
                custom={direction}
                variants={showcaseCopyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-xl font-black text-white"
              >
                {activeItem.category}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 via-fuchsia-400 to-blue-400"
                animate={{ width: `${activeProgress}%` }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {showcaseItems.map((item, index) => (
              <ShowcasePlane
                key={item.id}
                item={item}
                index={index}
                active={active}
                activate={activate}
                open={() => setOpen(true)}
                reduced={shouldReduceMotion}
                direction={direction}
              />
            ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="absolute bottom-20 left-0 top-0 z-[5] hidden cursor-w-resize bg-transparent outline-none transition focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-200/70 md:block"
            style={{ width: SHOWCASE_SIDE_ZONE_WIDTH }}
            aria-label="Previous showcase item"
          />
          <button
            type="button"
            onClick={next}
            className="absolute bottom-20 right-0 top-0 z-[5] hidden cursor-e-resize bg-transparent outline-none transition focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-200/70 md:block"
            style={{ width: SHOWCASE_SIDE_ZONE_WIDTH }}
            aria-label="Next showcase item"
          />

          <div className="absolute bottom-2 left-0 right-0 z-20 mx-auto grid max-w-xl gap-3 rounded-3xl border border-white/12 bg-gray-950/72 p-4 shadow-cinematic backdrop-blur-2xl sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <button type="button" onClick={prev} className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition hover:bg-white/14 sm:inline-flex" aria-label="Previous showcase item">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeItem.id}
                custom={direction}
                variants={showcaseCopyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">{activeItem.eyebrow}</p>
                <h3 className="mt-1 truncate text-2xl font-black text-white">{activeItem.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-300">{activeItem.description}</p>
              </motion.div>
            </AnimatePresence>
            <button type="button" onClick={next} className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition hover:bg-white/14 sm:inline-flex" aria-label="Next showcase item">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/86 backdrop-blur-xl" />
          <Dialog.Content className="fixed inset-0 z-[91] grid min-h-dvh grid-rows-[1fr_auto] overflow-hidden p-4 sm:p-8 lg:grid-cols-[1fr_28rem] lg:grid-rows-1">
            <Dialog.Title className="sr-only">{activeItem.title}</Dialog.Title>
            <Dialog.Description className="sr-only">{activeItem.description}</Dialog.Description>
            <div className="relative min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.full}
                  alt={activeItem.alt}
                  className="h-full w-full object-contain"
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <button type="button" onClick={prev} className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex" aria-label="Previous image">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={next} className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex" aria-label="Next image">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <aside className="relative rounded-3xl border border-white/10 bg-gray-950/88 p-6 shadow-cinematic backdrop-blur-2xl lg:ml-4">
              <Dialog.Close className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close showcase">
                <X className="h-5 w-5" />
              </Dialog.Close>
              <p className="page-kicker">{activeItem.category}</p>
              <h3 className="mt-5 pr-12 text-4xl font-black leading-tight text-white">{activeItem.title}</h3>
              <p className="mt-5 text-lg leading-8 text-gray-300">{activeItem.story}</p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <span className="text-gray-400">Energy</span>
                  <strong className="mt-1 block text-2xl text-white">{activeItem.energy}</strong>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <span className="text-gray-400">Frame</span>
                  <strong className="mt-1 block text-2xl text-white">{String(active + 1).padStart(2, "0")}</strong>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={prev} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/14">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
                <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/14">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <Link href="/gallery" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-gray-950 transition hover:bg-amber-100">
                Open Full Gallery
                <ExternalLink className="h-4 w-4" />
              </Link>
            </aside>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function ShowcasePlane({
  item,
  index,
  active,
  activate,
  open,
  reduced,
  direction
}: {
  item: ShowcaseItem;
  index: number;
  active: number;
  activate: (index: number) => void;
  open: () => void;
  reduced: boolean;
  direction: ShowcaseDirection;
}) {
  const activationTimer = useRef<number | null>(null);
  const offset = index - active;
  const wrapped = offset < -2 ? offset + showcaseItems.length : offset > 3 ? offset - showcaseItems.length : offset;
  const isActive = index === active;
  const x = isActive ? 0 : wrapped * 96;
  const y = isActive ? 12 : Math.abs(wrapped) * 36 + 24;
  const distance = Math.abs(wrapped);
  const rotate = isActive ? 0 : wrapped * -4 + direction * Math.min(distance, 2) * 1.25;
  const scale = isActive ? 1 : Math.max(0.72, 0.9 - Math.abs(wrapped) * 0.075);
  const zIndex = 12 - Math.abs(wrapped);
  const depthFilter = isActive
    ? "brightness(1.04) saturate(1.05) blur(0px)"
    : `brightness(${Math.max(0.7, 0.94 - distance * 0.06)}) saturate(${Math.max(0.78, 0.95 - distance * 0.04)}) blur(${distance > 2 ? 1.2 : 0}px)`;
  const depthShadow = isActive
    ? "0 34px 110px rgba(0,0,0,0.48), 0 0 46px rgba(245,199,107,0.13)"
    : "0 22px 64px rgba(0,0,0,0.34)";

  const clearActivationTimer = useCallback(() => {
    if (!activationTimer.current) return;
    window.clearTimeout(activationTimer.current);
    activationTimer.current = null;
  }, []);

  const scheduleActivation = useCallback(() => {
    clearActivationTimer();
    if (isActive) return;

    activationTimer.current = window.setTimeout(() => {
      activate(index);
      activationTimer.current = null;
    }, SHOWCASE_HOVER_DELAY_MS);
  }, [activate, clearActivationTimer, index, isActive]);

  useEffect(() => clearActivationTimer, [clearActivationTimer]);

  useEffect(() => {
    if (isActive) clearActivationTimer();
  }, [clearActivationTimer, isActive]);

  return (
    <motion.button
      type="button"
      layout
      onMouseEnter={scheduleActivation}
      onMouseLeave={clearActivationTimer}
      onFocus={scheduleActivation}
      onBlur={clearActivationTimer}
      onClick={() => {
        clearActivationTimer();
        if (isActive) {
          open();
          return;
        }
        activate(index);
      }}
      className={cn(
        "group absolute top-7 z-10 w-[min(74vw,31rem)] overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/6 text-left shadow-cinematic outline-none",
        isActive && "border-amber-200/45"
      )}
      style={{ left: "calc(50% - min(37vw, 15.5rem))", zIndex }}
      initial={false}
      animate={{
        x,
        y,
        rotate,
        scale,
        opacity: Math.abs(wrapped) > 3 ? 0 : isActive ? 1 : 0.68,
        filter: depthFilter,
        boxShadow: depthShadow
      }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              x: { type: "spring", stiffness: 92, damping: 23, mass: 1.05 },
              y: { type: "spring", stiffness: 105, damping: 24, mass: 0.95 },
              rotate: { type: "spring", stiffness: 88, damping: 22, mass: 1 },
              scale: { type: "spring", stiffness: 110, damping: 24, mass: 0.92 },
              opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              filter: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
              boxShadow: { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
            }
      }
      aria-label={isActive ? `Open ${item.title}` : `Select ${item.title}`}
    >
      <span className="media-frame block aspect-[4/5] w-full sm:aspect-[5/4]">
        <picture>
          {item.webp ? <source srcSet={item.webp} type="image/webp" /> : null}
          <img
            src={item.src}
            alt={item.alt}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            width={item.width}
            height={item.height}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
            style={{ objectPosition: item.focalPoint }}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </picture>
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.72))] opacity-80" aria-hidden="true" />
        <span className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-amber-100 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {item.category}
          </span>
          <span className="mt-3 block text-2xl font-black leading-tight text-white">{item.title}</span>
        </span>
      </span>
    </motion.button>
  );
}
