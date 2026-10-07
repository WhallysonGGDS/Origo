import { gsap, EASE } from "@/lib/gsap";

/**
 * O mundo "acende" a partir da origem: uma máscara radial cresce do ponto
 * vermelho, depois as rotas se desenham uma a uma e os destinos aparecem.
 */
export function globalMap(section: HTMLElement, opts: { distance: string; pin: boolean }) {
  const q = gsap.utils.selector(section);
  const reveal = q("[data-map-reveal]");
  const routes = q("[data-route]");
  const nodes = q("[data-node]");
  const regions = q("[data-region]");
  const origin = q("[data-origin]");
  const copy = q("[data-global-copy]");

  gsap.set(routes, { strokeDasharray: 1, strokeDashoffset: 1 });

  const tl = gsap.timeline({
    defaults: { ease: EASE.none },
    scrollTrigger: {
      trigger: section,
      start: opts.pin ? "top top" : "top 70%",
      end: opts.distance,
      pin: opts.pin,
      scrub: 0.8,
    },
  });

  // O texto entra antes do pin — a seção nunca chega vazia.
  gsap.fromTo(copy, { autoAlpha: 0, y: 30 }, {
    autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.08, ease: EASE.reveal,
    scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
  });
  gsap.set(regions, { autoAlpha: 0 });

  tl.fromTo(origin, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.06, ease: EASE.reveal }, 0)
    .fromTo(reveal, { attr: { r: 40 } }, { attr: { r: 1150 }, duration: 0.45, ease: EASE.soft }, 0.02);

  routes.forEach((route, i) => {
    const at = 0.3 + i * 0.08;
    tl.to(route, { strokeDashoffset: 0, duration: 0.14, ease: EASE.inOut }, at)
      .fromTo(nodes[i], { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.04, ease: EASE.soft }, at + 0.12)
      .fromTo(regions[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, at + 0.1);
  });
  tl.to({}, { duration: 0.08 });
  return tl;
}
