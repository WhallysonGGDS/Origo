#!/usr/bin/env bash
# Prepara o vídeo-fonte para scrub por scroll e extrai os stills de cada capítulo.
# Uso: ./scripts/prepare-media.sh caminho/para/video-original.mp4
set -euo pipefail
SRC="$1"; OUT_V=public/videos; OUT_I=public/images
mkdir -p "$OUT_V" "$OUT_I"

# Vídeo do hero — corta antes do letreiro final embutido (12.5s), sem áudio,
# GOP curto (keyint=4) para seeks rápidos durante o scrub, faststart para streaming.
ffmpeg -v error -y -i "$SRC" -t 12.5 -an -c:v libx264 -preset slow -crf 23 \
  -x264-params keyint=4:min-keyint=1:scenecut=0 -pix_fmt yuv420p -movflags +faststart \
  "$OUT_V/hero.mp4"
# Versão mobile: recorte 3:4 central, mais leve.
ffmpeg -v error -y -i "$SRC" -t 12.5 -an -vf "crop=540:720:370:0" -c:v libx264 -preset slow -crf 26 \
  -x264-params keyint=4:min-keyint=1:scenecut=0 -pix_fmt yuv420p -movflags +faststart \
  "$OUT_V/hero-mobile.mp4"

grab() { # tempo, filtro, nome
  ffmpeg -v error -y -ss "$1" -i "$SRC" -frames:v 1 -vf "$2" -q:v 2 "$OUT_I/$3.jpg"
}
UP="scale=iw*1.5:ih*1.5:flags=lanczos,unsharp=5:5:0.6"
grab 0.0  "$UP"                                   hero-poster
grab 0.8  "$UP"                                   origin
grab 2.9  "$UP"                                   field-cattle
grab 7.0  "crop=634:354:646:0,$UP"                field-irrigation
grab 7.0  "crop=1280:354:0:366,$UP"               sustainability-rows
grab 5.0  "crop=560:720:620:0,$UP"                people-farmer
grab 8.3  "crop=400:720:200:0,$UP"                people-worker
grab 7.0  "crop=634:354:0:0,$UP"                  tech-sensor
grab 8.3  "$UP"                                   tech-line
grab 10.2 "$UP"                                   industry-port
grab 11.0 "crop=800:450:480:270,$UP"              industry-fleet
grab 12.45 "$UP"                                  hero-end
