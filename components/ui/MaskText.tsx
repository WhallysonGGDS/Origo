import type { ElementType } from "react";

/** Cada linha vira uma máscara (.mask-line) com o conteúdo pronto para subir. */
export default function MaskText({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  ...rest
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
} & Record<`data-${string}`, string | boolean>) {
  return (
    <Tag className={className} aria-label={lines.join(" ")} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${lineClassName}`} aria-hidden="true">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
