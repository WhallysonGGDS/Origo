"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Cursor discreto: um ponto em blend "difference" que cresce sobre elementos interativos. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    el.dataset.hidden = "true";

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      el.dataset.hidden = "false";
      const interactive = (e.target as Element | null)?.closest("a, button, [data-cursor]");
      el.dataset.state = interactive ? "link" : "";
    };
    const leave = () => (el.dataset.hidden = "true");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
