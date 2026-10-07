import { gsap, EASE } from "@/lib/gsap";

type Target = gsap.TweenTarget;

/**
 * Linhas mascaradas sobem de dentro da máscara (.mask-line > span).
 * Toca uma vez ao entrar; volta ao sair por cima para manter a narrativa reversível.
 */
export function revealLines(trigger: Element, lines: Target, opts: { start?: string; stagger?: number; delay?: number } = {}) {
  return gsap.fromTo(
    lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 1.4,
      ease: EASE.reveal,
      stagger: opts.stagger ?? 0.09,
      delay: opts.delay ?? 0,
      scrollTrigger: { trigger, start: opts.start ?? "top 82%", toggleActions: "play none none reverse" },
    },
  );
}

/** Texto secundário: opacidade + leve deslocamento. Discreto por definição. */
export function fadeUp(trigger: Element, targets: Target, opts: { start?: string; stagger?: number; delay?: number } = {}) {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: EASE.soft,
      stagger: opts.stagger ?? 0.08,
      delay: opts.delay ?? 0.15,
      scrollTrigger: { trigger, start: opts.start ?? "top 85%", toggleActions: "play none none reverse" },
    },
  );
}

const CLIP_FROM = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
  center: "inset(18% 18% 18% 18%)",
} as const;

/**
 * Revelação por máscara (clip-path) atrelada ao scroll, com a imagem interna
 * desescalando ao mesmo tempo — a sensação de "abrir a janela".
 */
export function clipReveal(
  frame: Element,
  img: Element | null,
  opts: { from?: keyof typeof CLIP_FROM; start?: string; end?: string; scale?: number; endScale?: number } = {},
) {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: frame, start: opts.start ?? "top 90%", end: opts.end ?? "top 35%", scrub: 0.8 },
  });
  tl.fromTo(frame, { clipPath: CLIP_FROM[opts.from ?? "up"] }, { clipPath: "inset(0% 0% 0% 0%)", ease: EASE.none }, 0);
  if (img) tl.fromTo(img, { scale: opts.scale ?? 1.25 }, { scale: opts.endScale ?? 1.12, ease: EASE.none }, 0);
  return tl;
}

/**
 * Parallax de imagem dentro do frame. A imagem já está com sobra (scale ≥ 1.08)
 * para nunca expor bordas. `x` permite deriva horizontal.
 */
export function parallax(frame: Element, img: Element, opts: { y?: number; x?: number; scale?: number } = {}) {
  const y = opts.y ?? 8;
  const x = opts.x ?? 0;
  if (opts.scale) gsap.set(img, { scale: opts.scale });
  return gsap.fromTo(
    img,
    { yPercent: -y, xPercent: -x },
    {
      yPercent: y,
      xPercent: x,
      ease: EASE.none,
      scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}
