"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis dirige o scroll; o ticker do GSAP dirige o Lenis — um único loop de
 * animação para tudo. Em toque, mantém o scroll nativo (melhor no mobile).
 * Desligado com prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    // Fontes alteram métricas de texto → recalcula pins/gatilhos.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
