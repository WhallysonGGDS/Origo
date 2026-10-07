"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { clipReveal, fadeUp, parallax, revealLines } from "@/lib/animations/reveal";
import { originSection as c } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import MaskText from "@/components/ui/MaskText";

/**
 * Cena 02 — Contexto. A janela que fechou no fim do filme volta a abrir:
 * a imagem nasce de um recorte central (match cut com a transição do hero).
 */
export default function OriginSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const frame = q("[data-frame]")[0];
      const img = q("[data-frame] img")[0];

      gsap.matchMedia().add(MQ.motion, () => {
        clipReveal(frame, img, { from: "center", start: "top 95%", end: "top 25%", scale: 1.3, endScale: 1.16 });
        parallax(frame, img, { y: 6, x: 3 });
        revealLines(root.current!, q("[data-headline] .mask-line > span"), { start: "top 60%" });
        q("[data-body]").forEach((b) => fadeUp(b, b.children));
      });
    },
    { scope: root },
  );

  return (
    <section
      id="origem"
      ref={root}
      data-header="dark"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative bg-ink pb-[16svh] pt-[18svh] text-bone"
    >
      <div className="wrap grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col justify-between lg:col-span-4 lg:min-h-[86svh] lg:py-2">
          <div>
            <SectionLabel index={c.index} title={c.title} className="mb-10 text-bone/70" />
            <MaskText lines={["Tudo começa", "aqui."]} className="t-display" data-headline />
          </div>

          <div data-body className="hidden max-w-sm space-y-8 lg:block">
            <p className="t-body text-bone/70">{c.body}</p>
            <p className="t-caption flex flex-wrap gap-x-4 gap-y-1 text-bone/40">
              {c.meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </p>
          </div>
        </div>

        <div className="-mx-[var(--gutter)] lg:col-span-8 lg:ml-0 lg:mr-[calc(var(--gutter)*-1)]">
          <div data-frame className="media grain h-[68svh] lg:h-[86svh]">
            <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" placeholder="blur" />
          </div>
        </div>

        <div data-body className="max-w-md space-y-6 lg:hidden">
          <p className="t-body text-bone/70">{c.body}</p>
          <p className="t-caption flex flex-wrap gap-x-4 gap-y-1 text-bone/40">
            {c.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
