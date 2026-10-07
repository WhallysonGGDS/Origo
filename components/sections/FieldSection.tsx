"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, EASE, MQ, useGSAP } from "@/lib/gsap";
import { clipReveal, fadeUp, parallax, revealLines } from "@/lib/animations/reveal";
import { fieldSection as c } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import MaskText from "@/components/ui/MaskText";
import Facts from "@/components/ui/Facts";

/** Cena 03 — Campo. Diagramação editorial: duas imagens em velocidades distintas, texto em coluna estreita. */
export default function FieldSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const [primary, secondary] = q("[data-frame]");

      gsap.matchMedia().add(MQ.motion, () => {
        revealLines(q("[data-headline]")[0], q("[data-headline] .mask-line > span"));
        clipReveal(primary, primary.querySelector("img"), { from: "up", scale: 1.25, endScale: 1.14 });
        parallax(primary, primary.querySelector("img")!, { y: 5 });
        clipReveal(secondary, secondary.querySelector("img"), { from: "down", start: "top 95%", end: "top 45%" });
        // A imagem secundária "flutua" mais rápido — profundidade por diferença de velocidade.
        gsap.fromTo(secondary.parentElement, { yPercent: 18 }, {
          yPercent: -18,
          ease: EASE.none,
          scrollTrigger: { trigger: primary, start: "top bottom", end: "bottom top", scrub: true },
        });
        q("[data-body]").forEach((b) => fadeUp(b, b.children));
        gsap.fromTo(q("[data-rule]"), { scaleX: 0 }, {
          scaleX: 1, duration: 1.6, ease: EASE.reveal, transformOrigin: "left",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="campo"
      ref={root}
      data-header="light"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative bg-bone py-[18svh] text-ink"
    >
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
          <SectionLabel index={c.index} title={c.title} className="mb-10 text-ink/60 lg:col-span-12" />
          <MaskText lines={c.headline} className="t-display lg:col-span-10" data-headline />
        </div>

        <div data-rule className="hairline mt-14 mb-14 lg:mt-20 lg:mb-20" />

        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <figure className="lg:col-span-8">
            <div data-frame className="media grain aspect-[4/5] md:aspect-[16/10]">
              <Image src={c.primary.src} alt={c.primary.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
            <figcaption className="t-caption mt-4 flex justify-between text-ink/50">
              <span>{c.primary.caption}</span>
              <span className="hidden md:inline">Goiás, Brasil</span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-14 lg:col-span-3 lg:col-start-10">
            <div data-body className="space-y-8">
              <p className="t-body text-ink/70">{c.body}</p>
              <blockquote className="border-l border-signal pl-5 font-display text-xl leading-snug tracking-[-0.02em] lg:text-2xl">
                “{c.quote}”
              </blockquote>
            </div>

            <figure className="w-2/3 self-end md:w-1/2 lg:w-full">
              <div data-frame className="media grain aspect-[4/5]">
                <Image src={c.secondary.src} alt={c.secondary.alt} fill sizes="(min-width: 1024px) 25vw, 60vw" className="object-cover" placeholder="blur" />
              </div>
              <figcaption className="t-caption mt-4 text-ink/50">{c.secondary.caption}</figcaption>
            </figure>
          </div>
        </div>

        <Facts items={c.facts} className="mt-24" />
      </div>
    </section>
  );
}
