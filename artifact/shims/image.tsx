// Substitui next/image no build estático do Artifact (sem servidor de imagens).
import type { CSSProperties } from "react";

type Props = {
  src: string | { src: string };
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
};

export default function Image({ src, alt, fill, className, style }: Props) {
  const url = typeof src === "string" ? src : src.src;
  const fillStyle: CSSProperties | undefined = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none" } : undefined;
  return <img src={url} alt={alt} className={className} style={{ ...fillStyle, ...style }} loading="lazy" decoding="async" />;
}
