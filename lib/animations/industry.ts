import { gsap, EASE } from "@/lib/gsap";

/**
 * Scroll horizontal pontual: a faixa desliza enquanto a seção fica pinada.
 * O tween principal precisa de ease "none" (containerAnimation).
 */
export function industryHorizontal(pin: HTMLElement, track: HTMLElement, bar: HTMLElement | null) {
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const scrollTween = gsap.to(track, {
    x: () => -distance(),
    ease: EASE.none,
    scrollTrigger: {
      trigger: pin,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (bar) bar.style.transform = `scaleX(${self.progress})`;
      },
    },
  });

  // Cada quadro: contra-parallax horizontal + zoom lento ao atravessar a tela.
  track.querySelectorAll<HTMLElement>("[data-frame]").forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;
    gsap.fromTo(
      img,
      { xPercent: -7, scale: 1.18 },
      {
        xPercent: 7,
        scale: 1.06,
        ease: EASE.none,
        scrollTrigger: { trigger: frame, containerAnimation: scrollTween, start: "left right", end: "right left", scrub: true },
      },
    );
    const cap = frame.querySelector("[data-caption]");
    if (cap)
      gsap.fromTo(
        cap,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.2,
          ease: EASE.reveal,
          scrollTrigger: { trigger: frame, containerAnimation: scrollTween, start: "left 70%", toggleActions: "play none none reverse" },
        },
      );
  });

  return scrollTween;
}
