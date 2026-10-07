import { gsap, EASE } from "@/lib/gsap";

/**
 * Seção pinada: o scroll percorre os 5 pilares. O estado ativo é aplicado via
 * data-attribute e as transições ficam no CSS (opacity/transform apenas).
 */
export function technologyPinned(section: HTMLElement, opts: { count: number; distance: string; onIndex: (i: number) => void }) {
  const bg = section.querySelector("[data-tech-bg]");
  const intro = section.querySelectorAll("[data-tech-intro]");
  let last = -1;

  const tl = gsap.timeline({
    defaults: { ease: EASE.none },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: opts.distance,
      pin: true,
      scrub: 0.6,
      onUpdate(self) {
        const i = Math.min(opts.count - 1, Math.floor(gsap.utils.mapRange(0.08, 0.96, 0, opts.count, self.progress)));
        const idx = Math.max(0, i);
        if (idx !== last) {
          last = idx;
          opts.onIndex(idx);
        }
      },
    },
  });

  if (bg) tl.fromTo(bg, { scale: 1.18 }, { scale: 1.02, duration: 1 }, 0);
  // Entrada dos elementos antes do pin, para a seção nunca chegar vazia.
  gsap.fromTo(intro, { autoAlpha: 0, y: 40 }, {
    autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.07, ease: EASE.reveal,
    scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none reverse" },
  });
  return tl;
}
