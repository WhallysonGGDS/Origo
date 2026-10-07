// Gera uma malha de pontos dos continentes (projeção equiretangular) para o mapa editorial.
// Saída: lib/world-dots.json  →  { w, h, step, dots: [x, y][] }
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
const land = feature(topo, topo.objects.land);
const W = 1000, H = 440;             // recorte de lat 72°N → 60°S (sem Antártida)
const LAT_TOP = 72, LAT_BOTTOM = -60, STEP = 9;
const dots = [];
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const lon = (x / W) * 360 - 180;
    const lat = LAT_TOP - (y / H) * (LAT_TOP - LAT_BOTTOM);
    if (geoContains(land, [lon, lat])) dots.push([+x.toFixed(1), +y.toFixed(1)]);
  }
}
writeFileSync("lib/world-dots.json", JSON.stringify({ w: W, h: H, step: STEP, latTop: LAT_TOP, latBottom: LAT_BOTTOM, dots }));
console.log(`${dots.length} pontos`);
