/** Rótulo de capítulo: "02 — Campo". Ancora a narrativa sem competir com o título. */
export default function SectionLabel({ index, title, className = "" }: { index: string; title: string; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-3 ${className}`}>
      <span className="tabular-nums opacity-60">{index}</span>
      <span className="h-px w-8 bg-current opacity-30" aria-hidden="true" />
      <span>{title}</span>
    </p>
  );
}
