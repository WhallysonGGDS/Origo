// Gera uma versão estática (sem Next) para publicar como Artifact: dist-artifact/
import { build } from "esbuild";
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const out = "dist-artifact";
rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/fonts`, { recursive: true });

await build({
  entryPoints: ["artifact/main.tsx"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  outfile: `${out}/app.js`,
  jsx: "automatic",
  loader: { ".jpg": "file" },
  assetNames: "images/[name]",
  publicPath: ".",
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
  logOverride: { "unsupported-directive": "silent" },
  plugins: [
    {
      name: "artifact-shims",
      setup(b) {
        b.onResolve({ filter: /^next\/image$/ }, () => ({ path: path.resolve("artifact/shims/image.tsx") }));
        // Caminhos absolutos do Next viram relativos ao Artifact.
        b.onLoad({ filter: /lib[\\/]content\.ts$/ }, (args) => ({
          contents: readFileSync(args.path, "utf8").replaceAll('"/videos/', '"./videos/').replaceAll('"/images/', '"./images/'),
          loader: "ts",
        }));
      },
    },
  ],
});

execSync(`npx @tailwindcss/cli -i artifact/entry.css -o ${out}/app.css --minify`, { stdio: "inherit" });
cpSync("public/videos", `${out}/videos`, { recursive: true });
cpSync("public/images/hero-poster.jpg", `${out}/images/hero-poster.jpg`);
cpSync("node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2", `${out}/fonts/archivo.woff2`);
cpSync("node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", `${out}/fonts/inter.woff2`);

writeFileSync(
  `${out}/index.html`,
  `<title>Da Origem ao Mundo</title>
<meta name="description" content="Experiência institucional cinematográfica da ORIGO, empresa global de alimentos (marca fictícia).">
<link rel="preload" as="image" href="./images/hero-poster.jpg">
<link rel="stylesheet" href="./app.css">
<div id="root"></div>
<script src="./app.js" defer></script>
`,
);
console.log("ok");
