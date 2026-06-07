"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { rabbeim, type Rabbi } from "@/data/rebbeim";
import { cn } from "@/lib/utils";

export function RebbeimGrid() {
  const [selected, setSelected] = useState<Rabbi | null>(null);

  return (
    <>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rabbeim.map((rabbi) => (
          <button key={rabbi.name} type="button" onClick={() => setSelected(rabbi)} className="group text-left">
            <div className="premium-card h-full rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/20">
              <div className="mx-auto mb-5 aspect-square h-36 w-36 overflow-hidden rounded-2xl ring-4 ring-white/20">
                <img src={rabbi.image} alt={rabbi.name} className={cn("h-full w-full object-cover", rabbi.focus)} />
              </div>
              <h3 className="text-center text-xl font-bold text-white">{rabbi.name}</h3>
              <p className="mt-1 text-center text-gray-300">{rabbi.role}</p>
              <p className="mt-4 text-center text-sm font-bold text-indigo-300">View bio</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog.Root open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/72 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[91] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/20 bg-gray-950 p-5 shadow-cinematic sm:rounded-3xl sm:p-8">
            <Dialog.Close className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-gray-300 transition hover:bg-white/20 hover:text-white" aria-label="Close biography">
              <X className="h-5 w-5" />
            </Dialog.Close>
            {selected && (
              <div className="flex flex-col gap-6 sm:flex-row">
                <img src={selected.image} alt={selected.name} className={cn("h-32 w-32 shrink-0 rounded-2xl object-cover ring-4 ring-white/20 sm:h-36 sm:w-36", selected.focus)} />
                <div className="min-w-0">
                  <Dialog.Description className="page-kicker">{selected.role}</Dialog.Description>
                  <Dialog.Title className="mt-2 text-3xl font-black text-white">{selected.name}</Dialog.Title>
                  <p className="mt-4 text-lg leading-8 text-gray-300">{selected.bio}</p>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
