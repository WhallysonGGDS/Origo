"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { clipReveal, fadeUp, parallax, revealLines } from "@/lib/animations/reveal";
import { peopleSection as c } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import MaskText from "@/components/ui/MaskText";

/** Cena 04 — Pessoas. A escala vira rosto: retratos grandes, assimétricos, revelados por máscara. */
export default function PeopleSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const frames = q("[data-frame]");

      gsap.matchMedia().add(MQ.motion, () => {
        revealLines(q("[data-headline]")[0], q("[data-headline] .mask-line > span"), { stagger: 0.12 });
        frames.forEach((frame, i) => {
          const img = frame.querySelector("img")!;
          clipReveal(frame, img, { from: i === 0 ? "up" : "down", scale: 1.35, endScale: 1.14, end: "top 30%" });
          parallax(frame, img, { y: i === 0 ? 6 : 9 });
        });
        q("[data-body]").forEach((b) => fadeUp(b, b.children));
      });
    },
    { scope: root },
  );

  const [farmer, worker] = c.portraits;

  return (
    <section
      id="pessoas"
      ref={root}
      data-header="light"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative bg-bone pb-[20svh] pt-[6svh] text-ink"
    >
      <div className="wrap">
        <SectionLabel index={c.index} title={c.title} className="mb-10 text-ink/60" />
        <MaskText
          lines={c.headline}
          className="font-display text-[clamp(2.4rem,7.2vw,8.25rem)] font-medium leading-[0.94] tracking-[-0.04em]"
          data-headline
        />

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-14 lg:mt-24 lg:gap-x-8">
          <div data-body className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <p className="t-body text-ink/70">{c.body}</p>
          </div>

          <figure className="col-span-7 self-start md:col-span-5 lg:col-span-4 lg:mt-[22svh]">
            <div data-frame className="media grain aspect-[3/5]">
              <Image src={worker.src} alt={worker.alt} fill sizes="(min-width: 1024px) 30vw, 55vw" className="object-cover" placeholder="blur" />
            </div>
            <figcaption className="t-caption mt-4 text-ink/50">{worker.caption}</figcaption>
          </figure>

          <figure className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <div data-frame className="media grain aspect-[4/5]">
              <Image src={farmer.src} alt={farmer.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-[60%_30%]" placeholder="blur" />
            </div>
            <figcaption className="t-caption mt-4 text-ink/50">{farmer.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
