"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1.2 });
  // Evita recalcular ao abrir/fechar a barra de endereço no mobile.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Easings do projeto — todos lentos na saída; nada de bounce/elastic. */
export const EASE = {
  reveal: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
  none: "none",
} as const;

/** Breakpoints compartilhados por gsap.matchMedia(). */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  tablet: "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
