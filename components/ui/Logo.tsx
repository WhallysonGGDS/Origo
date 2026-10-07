/**
 * Wordmark fictício. O ponto vermelho é o "ponto de origem" — o mesmo ponto
 * que reaparece no mapa global. Substituir pelo logo autorizado do cliente.
 */
export default function Logo({ className = "", size = "1.125rem" }: { className?: string; size?: string }) {
  return (
    <span className={`inline-flex items-baseline font-display leading-none ${className}`} style={{ fontSize: size }} aria-label="ORIGO">
      <span aria-hidden="true" className="font-extrabold tracking-[0.08em]" style={{ fontStretch: "125%" }}>
        ORIGO
      </span>
      <span aria-hidden="true" data-logo-dot className="ml-[0.18em] inline-block size-[0.26em] rounded-full bg-signal" />
    </span>
  );
}
