"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { globalMap } from "@/lib/animations/global";
import { globalSection as c } from "@/lib/content";
import world from "@/lib/world-dots.json";
import SectionLabel from "@/components/ui/SectionLabel";
import Facts from "@/components/ui/Facts";

const { w: W, h: H, latTop, latBottom } = world;
const project = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((latTop - lat) / (latTop - latBottom)) * H,
});

/** Arco quadrático com "elevação" proporcional à distância — uma rota, não uma linha reta. */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${mx.toFixed(1)},${(my - dist * 0.32).toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
}

/**
 * Cena 08 — Escala global. Mapa editorial de pontos: o mundo se acende a partir
 * do ponto de origem, e as rotas se desenham uma a uma. Sem números inventados.
 */
export default function GlobalSection() {
  const root = useRef<HTMLElement>(null);

  const geo = useMemo(() => {
    const o = project(c.origin.lon, c.origin.lat);
    const dests = c.destinations.map((d) => ({ ...d, ...project(d.lon, d.lat) }));
    return { o, dests, routes: dests.map((d) => arc(o, d)) };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        globalMap(root.current!, { distance: "+=260%", pin: true });
      });
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        globalMap(root.current!, { distance: "+=170%", pin: true });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="mundo"
      ref={root}
      data-header="dark"
      data-chapter={c.index}
      data-chapter-name={c.title}
      className="relative flex h-svh flex-col overflow-hidden bg-ink text-bone"
    >
      <div className="wrap relative z-10 flex items-start justify-between gap-8 pt-[calc(var(--header-h)+6svh)]">
        <div>
          <div data-global-copy>
            <SectionLabel index={c.index} title={c.title} className="mb-8 text-bone/70" />
          </div>
          <h2 data-global-copy className="t-title max-w-[14ch] md:text-[clamp(2.25rem,4.4vw,4.75rem)]" aria-label={c.headline.join(" ")}>
            {c.headline.join(" ")}
          </h2>
        </div>
        <p data-global-copy className="t-label mt-2 hidden text-bone/50 md:block">
          {c.body}
        </p>
      </div>

      {/* No mobile o mapa é enquadrado (230vw) no eixo Brasil–Atlântico–Europa: escala de leitura, não miniatura. */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden pb-[6svh] md:px-[var(--gutter)]">
        <div className="relative w-[230vw] shrink-0 translate-x-[8%] md:w-full md:max-w-[1500px] md:shrink md:translate-x-0" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={`Rotas do ${c.origin.name} para ${c.destinations.map((d) => d.name).join(", ")}.`}>
            <defs>
              <radialGradient id="reveal-grad">
                <stop offset="0.82" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="reveal-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width={W + 400} height={H + 400}>
                <circle data-map-reveal cx={geo.o.x} cy={geo.o.y} r={1150} fill="url(#reveal-grad)" />
              </mask>
            </defs>

            {/* Malha dos continentes */}
            <g mask="url(#reveal-mask)" fill="#eeebe5" opacity="0.28">
              {world.dots.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={1.55} />
              ))}
            </g>

            {/* Rotas */}
            <g fill="none" stroke="#eeebe5" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
              {geo.routes.map((d, i) => (
                <path key={i} data-route d={d} pathLength={1} />
              ))}
            </g>

            {/* Destinos */}
            {geo.dests.map((d) => (
              <g key={d.name} data-node>
                <circle cx={d.x} cy={d.y} r={7} fill="#eeebe5" opacity="0.12" />
                <circle cx={d.x} cy={d.y} r={2.6} fill="#eeebe5" />
              </g>
            ))}

            {/* Ponto de origem — o mesmo ponto vermelho do logo */}
            <g data-origin>
              <circle cx={geo.o.x} cy={geo.o.y} r={11} fill="#c8102e" opacity="0.18" />
              <circle cx={geo.o.x} cy={geo.o.y} r={4} fill="#c8102e" />
            </g>
          </svg>

          {/* Rótulos em HTML: legíveis em qualquer escala */}
          {geo.dests.map((d) => (
            <span
              key={d.name}
              data-region
              className="t-label pointer-events-none absolute -translate-x-1/2 whitespace-nowrap pt-4 text-[0.625rem] text-bone/80"
              style={{ left: `${(d.x / W) * 100}%`, top: `${(d.y / H) * 100}%` }}
            >
              {d.name}
            </span>
          ))}
          <span
            className="t-label pointer-events-none absolute -translate-x-1/2 whitespace-nowrap pt-5 text-[0.625rem] text-signal"
            style={{ left: `${(geo.o.x / W) * 100}%`, top: `${(geo.o.y / H) * 100}%` }}
          >
            Origem · {c.origin.name}
          </span>
        </div>
      </div>

      <div className="wrap">
        <Facts items={c.facts} className="pb-10" />
      </div>
    </section>
  );
}
