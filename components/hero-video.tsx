"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { useMemo } from "react";

const previewSrc =
  "https://player.vimeo.com/video/1188735766?title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&autopause=0&quality=4k&initial_quality=4k&max_quality=4k&player_id=0&app_id=58479";

const modalSrc =
  "https://player.vimeo.com/video/1188735766?autoplay=1&title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&quality=4k&initial_quality=4k&max_quality=4k&quality_selector=1";

export function HeroVideo() {
  const iframeTitle = useMemo(() => "The Breslov Yeshiva video", []);

  return (
    <Dialog.Root>
      <div className="relative mx-auto w-full max-w-[49.5rem] lg:max-w-[63rem] xl:max-w-[clamp(30rem,33vw,40.5rem)]">
        <div className="relative overflow-hidden rounded-3xl bg-black shadow-cinematic" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={previewSrc}
            frameBorder="0"
            aria-hidden="true"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            className="pointer-events-none absolute inset-0 h-full w-full"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            title={iframeTitle}
          />
          <Dialog.Trigger className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-b from-slate-950/8 to-slate-950/48">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white text-gray-950 shadow-cinematic transition hover:scale-105">
              <Play className="ml-1 h-9 w-9 fill-current" />
            </span>
          </Dialog.Trigger>
        </div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/84 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[91] flex items-center justify-center px-4 py-8">
          <Dialog.Title className="sr-only">The Breslov Yeshiva video</Dialog.Title>
          <Dialog.Description className="sr-only">A video introduction to The Breslov Yeshiva.</Dialog.Description>
          <div className="relative w-full max-w-6xl">
            <Dialog.Close className="absolute -top-14 right-0 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20" aria-label="Close video">
              <X className="h-6 w-6" />
            </Dialog.Close>
            <div className="relative overflow-hidden rounded-3xl bg-black shadow-cinematic" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={modalSrc}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
                title={iframeTitle}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
