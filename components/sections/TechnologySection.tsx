"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { technologyPinned } from "@/lib/animations/technology";
import { fadeUp } from "@/lib/animations/reveal";
import { technologySection as c } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Cena 05 — Tecnologia. Muda o ambiente: escuro, frio, preciso.
 * Desktop/tablet: seção pinada, o scroll percorre os 5 pilares.
 * Mobile: lista vertical com revelação progressiva (sem pin).
 */
export default function TechnologySection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false); // sem pin (movimento reduzido) todos os pilares ficam legíveis
  const count = c.pillars.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        setPinned(true);
        technologyPinned(root.current!, { count, distance: "+=380%", onIndex: setActive });
        return () => setPinned(false);
      });
      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>("[data-pillar-m]", root.current).forEach((el) => fadeUp(el, el.children, { start: "top 88%" }));
      });
    },
    { scope: root },
  );

  return (
    <section
      id="tecnologia"
      ref={root}
      data-header="dark"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative overflow-hidden bg-ink text-bone md:h-svh"
    >
      {/* Fundo industrial, dessaturado — a imagem é atmosfera, não protagonista. */}
      <div className="relative h-[52svh] overflow-hidden md:absolute md:inset-0 md:h-auto">
        <div data-tech-bg className="absolute inset-0 will-change-transform">
          <Image
            src={c.image}
            alt={c.imageAlt}
            fill
            sizes="100vw"
            className="object-cover [filter:grayscale(0.55)_brightness(0.5)_contrast(1.08)]"
            placeholder="blur"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_50%,rgba(10,10,11,0.15),rgba(10,10,11,0.92)_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent md:hidden" />
      </div>

      <div className="wrap relative grid h-full grid-cols-12 items-center gap-x-8 pb-[14svh] md:py-[14svh]">
        {/* Lista de pilares */}
        <div className="col-span-12 md:col-span-7 lg:col-span-7">
          <div data-tech-intro className="-mt-10 mb-8 md:mt-0 md:mb-12">
            <SectionLabel index={c.index} title={c.title} className="text-bone/70" />
          </div>

          {/* Desktop/tablet: estado ativo guiado pelo scroll */}
          <ol className="hidden md:block" aria-label="Pilares de tecnologia">
            {c.pillars.map((p, i) => (
              <li key={p.word} data-tech-intro className="relative">
                <span
                  className="flex items-center gap-[0.35em] font-display text-[clamp(2.5rem,5.6vw,6rem)] font-medium leading-[1.04] tracking-[-0.035em] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: !pinned || i === active ? 1 : 0.16, transform: `translateX(${pinned && i === active ? "0.35em" : "0"})` }}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span
                    className="absolute left-0 top-1/2 h-px w-[0.28em] -translate-x-[0.1em] bg-signal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `scaleX(${i === active ? 1 : 0})`, transformOrigin: "left" }}
                    aria-hidden="true"
                  />
                  {p.word}
                </span>
              </li>
            ))}
          </ol>

          {/* Mobile: cada pilar com seu texto */}
          <ol className="space-y-10 md:hidden">
            {c.pillars.map((p, i) => (
              <li key={p.word} data-pillar-m className="border-t border-bone/15 pt-5">
                <p className="t-label tabular-nums text-bone/40">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-[2.4rem] font-medium leading-none tracking-[-0.035em]">{p.word}</h3>
                <p className="t-body mt-4 max-w-sm text-bone/65">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Painel de detalhe: visor + descrição do pilar ativo */}
        <div data-tech-intro className="col-span-5 hidden md:block lg:col-span-4 lg:col-start-9">
          <div className="relative">
            <div className="media aspect-[4/3]">
              <Image src={c.detail} alt={c.detailAlt} fill sizes="30vw" className="object-cover opacity-80 [filter:grayscale(0.4)]" placeholder="blur" />
            </div>
            {/* Marcas de enquadramento — um visor, não um card. */}
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((pos) => (
              <span key={pos} className={`absolute -m-2 size-3 border-bone/60 ${pos}`} aria-hidden="true" />
            ))}
          </div>

          <div className="mt-10 flex items-baseline justify-between border-t border-bone/15 pt-5">
            <span className="t-label tabular-nums">
              {String(active + 1).padStart(2, "0")}
              <span className="text-bone/40"> / {String(count).padStart(2, "0")}</span>
            </span>
            <span className="t-label text-bone/40">{c.pillars[active].word}</span>
          </div>

          <div className="relative mt-6 min-h-[5.5em]" aria-live="polite">
            {c.pillars.map((p, i) => (
              <p
                key={p.word}
                className="t-body absolute inset-0 text-bone/70 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: i === active ? 1 : 0, transform: `translateY(${i === active ? 0 : i < active ? -12 : 12}px)` }}
                aria-hidden={i !== active}
              >
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
