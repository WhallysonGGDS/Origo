import type { Fact } from "@/lib/content";

/** Indicadores só aparecem quando há dados reais (com fonte). Nada é inventado. */
export default function Facts({ items, className = "" }: { items: Fact[]; className?: string }) {
  if (!items.length) return null;
  return (
    <dl className={`grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 ${className}`}>
      {items.map((f) => (
        <div key={f.label} className="border-t border-current/15 pt-4">
          <dt className="t-caption opacity-60">{f.label}</dt>
          <dd className="mt-2 font-display text-4xl font-medium tracking-tight tabular-nums">{f.value}</dd>
          <dd className="t-caption mt-2 opacity-40">Fonte: {f.source}</dd>
        </div>
      ))}
    </dl>
  );
}
