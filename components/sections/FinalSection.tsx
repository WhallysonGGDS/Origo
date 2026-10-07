"use client";

import { useRef } from "react";
import { gsap, EASE, MQ, useGSAP } from "@/lib/gsap";
import { finalSection as c } from "@/lib/content";
import { scrollToTarget } from "@/lib/lenis";
import Logo from "@/components/ui/Logo";

/**
 * Cena 09 — Conversão. Silêncio, uma frase e um único próximo passo.
 * O ponto vermelho do logo — a origem — é o último gesto da página.
 */
export default function FinalSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(MQ.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 55%", toggleActions: "play none none reverse" },
        });
        tl.fromTo(q("[data-logo]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.4, ease: EASE.reveal })
          .fromTo(q("[data-word] > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.6, ease: EASE.reveal, stagger: 0.08 }, 0.15)
          .fromTo(q("[data-final-cta]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE.soft }, 0.9)
          .fromTo(q("[data-logo-dot]"), { scale: 0 }, { scale: 1, duration: 1, ease: EASE.reveal }, 0.6);
        // Leve aproximação enquanto a seção atravessa a tela — a "câmera" se aproxima no fim.
        gsap.fromTo(q("[data-final-inner]"), { scale: 0.94 }, {
          scale: 1, ease: EASE.none,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 1 },
        });
      });
    },
    { scope: root },
  );

  const lines = ["Da origem", "ao mundo."];

  return (
    <section id="final" ref={root} data-header="dark" className="relative flex min-h-svh items-center justify-center bg-ink py-[18svh] text-bone">
      <div data-final-inner className="wrap flex flex-col items-center text-center">
        <div data-logo className="mb-14 md:mb-20">
          <Logo size="1.5rem" />
        </div>

        <h2 className="t-mega text-[11vw] leading-[0.86] md:text-[clamp(3.25rem,9vw,10.5rem)]" aria-label={c.headline}>
          {lines.map((l) => (
            <span key={l} data-word className="mask-line" aria-hidden="true">
              <span>{l}</span>
            </span>
          ))}
        </h2>

        <a
          data-final-cta
          href={c.cta.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(c.cta.href);
          }}
          className="cta mt-16 text-base md:mt-20 md:text-lg"
        >
          {c.cta.label} <span className="cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
