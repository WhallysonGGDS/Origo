"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, EASE, MQ, useGSAP } from "@/lib/gsap";
import { fadeUp, revealLines } from "@/lib/animations/reveal";
import { sustainabilitySection as c } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Facts from "@/components/ui/Facts";

/**
 * Cena 07 — Sustentabilidade. O respiro da página: muito espaço, uma frase,
 * uma faixa de paisagem em formato cinemascope com escala lentíssima.
 */
export default function SustainabilitySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const band = q("[data-band]")[0];
      const img = q("[data-band] img")[0];

      gsap.matchMedia().add(MQ.motion, () => {
        revealLines(q("[data-headline]")[0], q("[data-headline] .mask-line > span"), { stagger: 0.16 });
        // A faixa abre do centro para as bordas…
        gsap.fromTo(band, { clipPath: "inset(0% 14% 0% 14%)" }, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: EASE.none,
          scrollTrigger: { trigger: band, start: "top 95%", end: "center 55%", scrub: 1 },
        });
        // …e a paisagem desescala devagar, por toda a travessia da seção.
        gsap.fromTo(img, { scale: 1.28 }, {
          scale: 1,
          ease: EASE.none,
          scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
        fadeUp(q("[data-body]")[0], q("[data-body] > *"));
      });
    },
    { scope: root },
  );

  return (
    <section
      id="sustentabilidade"
      ref={root}
      data-header="light"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative bg-bone pb-[16svh] pt-[20svh] text-ink"
    >
      <div className="wrap">
        <SectionLabel index={c.index} title={c.title} className="mb-16 justify-center text-ink/60 md:mb-24" />
        <h2 data-headline aria-label={c.headline.join(" ")} className="t-display text-center">
          <span className="mask-line" aria-hidden="true">
            <span>{c.headline[0]}</span>
          </span>
          <span className="mask-line text-stone" aria-hidden="true">
            <span>{c.headline[1]}</span>
          </span>
        </h2>
      </div>

      <div data-band className="media grain mt-20 aspect-[16/9] md:mt-28 md:aspect-[1920/531]">
        <Image src={c.image} alt={c.imageAlt} fill sizes="100vw" className="object-cover" placeholder="blur" />
      </div>

      <div className="wrap mt-16 grid grid-cols-12 gap-x-8 md:mt-20">
        <div data-body className="col-span-12 space-y-8 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8">
          <p className="t-body text-ink/70">{c.body}</p>
          <a href="#" className="cta text-sm">
            Nossos compromissos ESG <span className="cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="wrap">
        <Facts items={c.facts} className="mt-24" />
      </div>
    </section>
  );
}
