"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { heroIntro, heroScroll, type HeroRefs } from "@/lib/animations/hero";
import { hero } from "@/lib/content";
import MaskText from "@/components/ui/MaskText";

/**
 * Cena 01 — Impacto. O filme inteiro é a abertura; o scroll é a agulha.
 * A seção ocupa 100svh e fica pinada enquanto o vídeo é percorrido.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const r = {
    stage: useRef<HTMLDivElement>(null),
    video: useRef<HTMLVideoElement>(null),
    still: useRef<HTMLDivElement>(null),
    lineA: useRef<HTMLDivElement>(null),
    lineB: useRef<HTMLDivElement>(null),
    closing: useRef<HTMLDivElement>(null),
    hint: useRef<HTMLDivElement>(null),
    reelLabel: useRef<HTMLSpanElement>(null),
    reelBar: useRef<HTMLSpanElement>(null),
  };

  useGSAP(
    () => {
      const refs = {
        section: root.current!,
        stage: r.stage.current!,
        video: r.video.current!,
        still: r.still.current!,
        lineA: r.lineA.current!,
        lineB: r.lineB.current!,
        closing: r.closing.current!,
        hint: r.hint.current!,
        reelLabel: r.reelLabel.current!,
        reelBar: r.reelBar.current!,
      } satisfies HeroRefs;
      const video = refs.video;

      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, reduced: MQ.reduced, small: "(max-width: 767px)" }, (ctx) => {
        const { motion, small } = ctx.conditions as { motion: boolean; small: boolean };

        if (!motion) {
          // Movimento reduzido: sem scrub, sem pin — still + tipografia estática.
          gsap.set([refs.lineB, refs.hint], { autoAlpha: 0 });
          gsap.set(refs.lineA, { autoAlpha: 1 });
          return;
        }

        // Carrega somente a versão adequada do vídeo (desktop 16:9 / mobile 3:4).
        // O vídeo é baixado inteiro e servido como Blob: seek instantâneo e
        // garantido em qualquer navegador/servidor (sem depender de Range requests).
        const src = small ? hero.video.mobile : hero.video.desktop;
        const ctrl = new AbortController();
        let blobUrl = "";
        fetch(src, { signal: ctrl.signal })
          .then((res) => (res.ok ? res.blob() : Promise.reject(res.status)))
          .then((blob) => {
            blobUrl = URL.createObjectURL(blob);
            video.src = blobUrl;
            video.load();
          })
          .catch((err) => {
            if (err?.name === "AbortError") return;
            video.src = src; // fallback: streaming direto
            video.load();
          });

        // iOS só libera seek fluido depois de um play() iniciado pelo usuário.
        const unlock = () => {
          video.play().then(() => video.pause()).catch(() => {});
        };
        window.addEventListener("touchstart", unlock, { once: true, passive: true });

        heroIntro(refs);
        const destroy = heroScroll(refs, hero.reel, {
          distance: small ? "+=360%" : "+=520%",
          scrub: small ? 0.4 : 0.9,
        });

        return () => {
          destroy();
          ctrl.abort();
          if (blobUrl) URL.revokeObjectURL(blobUrl);
          window.removeEventListener("touchstart", unlock);
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      id="inicio"
      ref={root}
      data-header="dark"
      aria-label="Da origem ao mundo"
      className="relative h-svh w-full overflow-hidden bg-ink text-bone"
    >
      <div ref={r.stage} className="grain absolute inset-0 will-change-transform" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
        <video
          ref={r.video}
          className="absolute inset-0 h-full w-full object-cover"
          poster={hero.video.poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div ref={r.still} className="invisible absolute inset-0 opacity-0">
          <Image src={hero.end} alt="" fill sizes="100vw" className="object-cover" placeholder="blur" />
        </div>
        {/* Vinheta: legibilidade sem "gradiente decorativo". */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 22%, rgba(10,10,11,0) 55%, rgba(10,10,11,0.7) 100%)",
          }}
        />
      </div>

      {/* DA ORIGEM — ancorado embaixo à esquerda, como um título de abertura. */}
      <div ref={r.lineA} className="wrap invisible absolute inset-x-0 bottom-[14svh] md:bottom-[10svh]">
        <MaskText as="h1" lines={[hero.lineA]} className="t-mega" />
      </div>

      {/* AO MUNDO — rima visual: topo à direita, encontra o globo. */}
      <div ref={r.lineB} className="wrap invisible absolute inset-x-0 top-[16svh] text-right" aria-hidden="true">
        <MaskText as="p" lines={[hero.lineB]} className="t-mega" />
      </div>

      {/* Frase-manifesto — aparece no escuro, depois do filme. */}
      <div ref={r.closing} className="wrap invisible absolute inset-0 flex items-center justify-center text-center">
        <MaskText
          as="p"
          lines={["Construindo o futuro", "da alimentação."]}
          className="t-display max-w-[16ch]"
        />
      </div>

      {/* Legenda do filme: capítulo atual + progresso. */}
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-6 flex items-end justify-between gap-6 md:bottom-8">
        <div ref={r.hint} className="t-label flex items-center gap-3 opacity-0">
          <span className="relative block h-8 w-px overflow-hidden bg-bone/20" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.4s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-bone" />
          </span>
          Role para começar
        </div>
        <div className="ml-auto flex w-36 flex-col items-end gap-2 md:w-48" aria-hidden="true">
          <span className="block h-[1.2em] overflow-hidden">
            <span ref={r.reelLabel} className="t-label block">Origem</span>
          </span>
          <span className="block h-px w-full bg-bone/20">
            <span ref={r.reelBar} className="block h-px w-full origin-left scale-x-0 bg-bone" />
          </span>
        </div>
      </div>
    </section>
  );
}
