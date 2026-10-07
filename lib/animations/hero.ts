import { gsap, EASE } from "@/lib/gsap";

export type HeroRefs = {
  section: HTMLElement;
  stage: HTMLElement;
  video: HTMLVideoElement;
  still: HTMLElement;
  lineA: HTMLElement;
  lineB: HTMLElement;
  closing: HTMLElement;
  hint: HTMLElement;
  reelLabel: HTMLElement;
  reelBar: HTMLElement;
};

type Reel = { at: number; label: string }[];

/**
 * Seek controlado: nunca empilha seeks. Se o vídeo ainda está buscando o frame
 * anterior, guarda o alvo e aplica no evento `seeked`. Mantém o scrub fluido
 * mesmo em dispositivos modestos.
 */
function createSeeker(video: HTMLVideoElement) {
  let pending: number | null = null;
  const apply = (t: number) => {
    if (Math.abs(video.currentTime - t) < 0.015) return;
    video.currentTime = t;
  };
  const onSeeked = () => {
    if (pending === null) return;
    const t = pending;
    pending = null;
    apply(t);
  };
  video.addEventListener("seeked", onSeeked);
  return {
    seek(t: number) {
      if (video.readyState < 1) return; // sem metadata ainda
      if (video.seeking) pending = t;
      else apply(t);
    },
    destroy: () => video.removeEventListener("seeked", onSeeked),
  };
}

/** Animação de entrada (carregamento) — independente do scroll. */
export function heroIntro(r: HeroRefs) {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.set(r.lineA, { autoAlpha: 1 }, 0)
    .fromTo(r.stage, { scale: 1.08, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.4, ease: EASE.reveal }, 0)
    .fromTo(r.lineA.querySelectorAll(".mask-line > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.6, ease: EASE.reveal, stagger: 0.12 }, 0.35)
    .fromTo(r.hint, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 1.1);
  return tl;
}

/**
 * Sequência principal: o scroll é a agulha do filme.
 * 0 → 0.86   vídeo do início ao fim
 * 0.86 → 1   vídeo → still → fundo escuro (scale, clip-path, blur sutis)
 */
export function heroScroll(r: HeroRefs, reel: Reel, opts: { distance: string; scrub: number }) {
  const seeker = createSeeker(r.video);
  const state = { p: 0 };
  let currentLabel = "";

  const sync = () => {
    const d = r.video.duration || 12.5;
    const t = Math.min(state.p, 1) * (d - 0.04);
    seeker.seek(t);
    r.reelBar.style.transform = `scaleX(${state.p})`;
    let label = reel[0].label;
    for (const c of reel) if (t >= c.at) label = c.label;
    if (label !== currentLabel) {
      currentLabel = label;
      gsap.fromTo(r.reelLabel, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: EASE.reveal, overwrite: true });
      r.reelLabel.textContent = label;
    }
  };

  const tl = gsap.timeline({
    defaults: { ease: EASE.none },
    scrollTrigger: {
      trigger: r.section,
      start: "top top",
      end: opts.distance,
      pin: true,
      scrub: opts.scrub,
      anticipatePin: 1,
    },
  });

  tl.to(state, { p: 1, duration: 0.86, onUpdate: sync }, 0)
    // Cena 01 — saída do "DA ORIGEM" e do hint
    .to(r.hint, { autoAlpha: 0, duration: 0.04 }, 0)
    .to(r.lineA, { yPercent: -18, autoAlpha: 0, duration: 0.1, ease: EASE.soft }, 0.1)
    // Cena 05 — "AO MUNDO" encontra o globo
    .set(r.lineB, { autoAlpha: 1 }, 0.7)
    .fromTo(r.lineB.querySelectorAll(".mask-line > span"), { yPercent: 110 }, { yPercent: 0, duration: 0.08, stagger: 0.015, ease: EASE.soft }, 0.7)
    .to(r.lineB, { autoAlpha: 0, yPercent: -12, duration: 0.06 }, 0.86)
    // Transição: vídeo → imagem → fundo escuro
    .to(r.still, { autoAlpha: 1, duration: 0.03 }, 0.86)
    .to(r.stage, { scale: 0.9, clipPath: "inset(7% 5% 7% 5%)", filter: "blur(3px)", duration: 0.1 }, 0.88)
    .to(r.stage, { autoAlpha: 0, duration: 0.06 }, 0.92)
    // Cena final do hero — a frase-manifesto
    .set(r.closing, { autoAlpha: 1 }, 0.92)
    .fromTo(r.closing.querySelectorAll(".mask-line > span"), { yPercent: 110 }, { yPercent: 0, duration: 0.05, stagger: 0.012, ease: EASE.soft }, 0.92)
    .to({}, { duration: 0.03 }); // respiro antes de soltar o pin

  // Quando o vídeo termina de carregar, alinha o quadro à posição atual do scroll.
  r.video.addEventListener("loadeddata", sync);
  return () => {
    seeker.destroy();
    r.video.removeEventListener("loadeddata", sync);
  };
}
