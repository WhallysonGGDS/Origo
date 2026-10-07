"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { industryHorizontal } from "@/lib/animations/industry";
import { clipReveal, fadeUp, parallax, revealLines } from "@/lib/animations/reveal";
import { industrySection as c } from "@/lib/content";
import { scrollToTarget } from "@/lib/lenis";
import SectionLabel from "@/components/ui/SectionLabel";
import MaskText from "@/components/ui/MaskText";

/** Altura de cada quadro no trilho horizontal — variações criam ritmo, não grade. */
const FRAME_H = ["lg:h-[60svh] lg:self-start lg:mt-[16svh]", "lg:h-[74svh]", "lg:h-[58svh] lg:self-end lg:mb-[12svh]"];

/**
 * Cena 06 — Indústria. Um trilho horizontal pontual (desktop): a câmera percorre
 * o fluxo do processamento ao porto. Tablet/mobile: sequência vertical.
 */
export default function IndustrySection() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealLines(q("[data-headline]")[0], q("[data-headline] .mask-line > span"), { start: "top 80%" });
        fadeUp(q("[data-intro-body]")[0], q("[data-intro-body] > *"), { start: "top 90%" });
      });

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        industryHorizontal(pin.current!, track.current!, bar.current);
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        q("[data-frame]").forEach((frame) => {
          const img = frame.querySelector("img")!;
          clipReveal(frame, img, { from: "up", scale: 1.3, endScale: 1.14 });
          parallax(frame, img, { y: 5 });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="industria"
      ref={root}
      data-header="dark"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative bg-ink text-bone"
    >
      <div ref={pin} className="relative overflow-hidden py-[16svh] lg:h-svh lg:py-0">
        <div
          ref={track}
          className="wrap flex flex-col gap-16 will-change-transform md:gap-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[7vw] lg:pr-[12vw]"
        >
          {/* Abertura do trilho */}
          <div className="shrink-0 lg:w-[36vw]">
            <SectionLabel index={c.index} title={c.title} className="mb-10 text-bone/70" />
            <MaskText lines={c.headline} className="t-display" data-headline />
            <div data-intro-body className="mt-10 max-w-md">
              <p className="t-body text-bone/65">{c.body}</p>
            </div>
          </div>

          {c.frames.map((f, i) => (
            <figure key={f.caption} data-frame-wrap className={`relative shrink-0 ${FRAME_H[i]}`}>
              <div data-frame className={`media grain w-full lg:h-full lg:w-auto ${f.ratio}`}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" placeholder="blur" />
              </div>
              <figcaption data-caption className="t-caption mt-4 flex items-center gap-3 text-bone/55">
                <span className="tabular-nums text-bone/35">
                  {c.index}.{i + 1}
                </span>
                {f.caption}
              </figcaption>
            </figure>
          ))}

          {/* Fecho do trilho */}
          <div className="shrink-0 lg:w-[26vw]">
            <p className="t-title text-bone/90">Escala que nunca perde de vista a origem.</p>
            <a
              href="#sustentabilidade"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#sustentabilidade");
              }}
              className="cta mt-10 text-sm"
            >
              Ver nossos compromissos <span className="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Progresso do trilho */}
        <div className="wrap pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-6 lg:flex" aria-hidden="true">
          <span className="t-label text-bone/40">Do campo ao porto</span>
          <span className="block h-px flex-1 bg-bone/15">
            <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-bone/80" />
          </span>
        </div>
      </div>
    </section>
  );
}
