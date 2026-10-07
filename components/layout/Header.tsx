"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";
import { nav } from "@/lib/content";
import Logo from "@/components/ui/Logo";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const chapterIdx = useRef<HTMLSpanElement>(null);
  const chapterName = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    const header = headerRef.current!;
    const chapter = chapterRef.current!;

    // Tema do header acompanha o fundo da seção que passa sob ele.
    gsap.utils.toArray<HTMLElement>("[data-header]").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 40px",
        end: "bottom 40px",
        refreshPriority: -1,
        onToggle: (self) => {
          if (!self.isActive) return;
          header.dataset.theme = section.dataset.header;
          chapter.dataset.theme = section.dataset.header;
          const idx = section.dataset.chapter;
          chapter.dataset.visible = idx ? "true" : "false";
          if (idx && chapterIdx.current && chapterName.current) {
            chapterIdx.current.textContent = idx;
            chapterName.current.textContent = section.dataset.chapterName ?? "";
          }
        },
      });
    });

    // Some ao descer, volta ao subir — o conteúdo é o protagonista.
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 120;
        header.dataset.hidden = hide ? "true" : "false";
      },
    });
  });

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <header ref={headerRef} data-theme="dark" data-menu={open ? "open" : undefined} className="site-header fixed inset-x-0 top-0 z-50">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between">
          <a href="#inicio" onClick={go("#inicio")} className="relative z-10" aria-label="ORIGO — início">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-10 text-[0.8125rem] tracking-[0.01em]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={go(item.href)} className="link-sweep opacity-80 transition-opacity duration-500 hover:opacity-100">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#final" onClick={go("#final")} className="cta hidden text-[0.8125rem] lg:inline-flex">
            Conheça a empresa <span className="cta-arrow" aria-hidden="true">→</span>
          </a>

          <button
            type="button"
            className="t-label relative z-10 flex items-center gap-3 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Fechar" : "Menu"}</span>
            <span className="relative block h-2.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Indicador de capítulo — vertical, na margem: orienta sem disputar espaço com o conteúdo. */}
      <div
        ref={chapterRef}
        data-visible="false"
        data-theme="dark"
        aria-hidden="true"
        className="chapter-indicator pointer-events-none fixed bottom-10 left-[calc(var(--gutter)/2)] z-40 hidden origin-bottom-left -rotate-90 items-center gap-3 whitespace-nowrap lg:flex"
      >
        <span ref={chapterIdx} className="t-label tabular-nums opacity-60">01</span>
        <span className="h-px w-8 bg-current opacity-30" />
        <span ref={chapterName} className="t-label">Origem</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-28 text-bone lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease }}
          >
            <nav aria-label="Menu móvel">
              <ul className="space-y-3">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={go(item.href)}
                      className="block font-display text-[2.6rem] font-medium leading-[1.05] tracking-[-0.03em]"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.06 }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.a
              href="#final"
              onClick={go("#final")}
              className="cta self-start text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              Conheça a empresa <span className="cta-arrow" aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
