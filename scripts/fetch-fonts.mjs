// One-off helper: downloads the self-hosted woff2 files into src/assets/fonts.
// Re-run only if you change the font stack. The site never talks to a CDN at runtime.
import { writeFile } from 'node:fs/promises';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const FAMILIES = [
  { css: 'Bricolage+Grotesque:opsz,wght@12..96,400..800', subsets: ['latin'], out: 'bricolage-grotesque' },
  { css: 'Instrument+Sans:wght@400..700', subsets: ['latin'], out: 'instrument-sans' },
  { css: 'JetBrains+Mono:wght@400..600', subsets: ['latin'], out: 'jetbrains-mono' },
  { css: 'Tajawal:wght@400', subsets: ['arabic'], out: 'tajawal-400' },
  { css: 'Tajawal:wght@500', subsets: ['arabic'], out: 'tajawal-500' },
  { css: 'Tajawal:wght@700', subsets: ['arabic'], out: 'tajawal-700' },
  { css: 'Tajawal:wght@800', subsets: ['arabic'], out: 'tajawal-800' },
];

for (const fam of FAMILIES) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${fam.css}&display=swap`, { headers: { 'User-Agent': UA } })).text();
  const blocks = css.split('/*').slice(1);
  for (const subset of fam.subsets) {
    const block = blocks.find((b) => b.trimStart().startsWith(subset + ' */'));
    if (!block) throw new Error(`missing subset ${subset} for ${fam.out}`);
    const url = block.match(/url\((https:[^)]+)\)\s*format\('woff2'\)/)[1];
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    const file = `src/assets/fonts/${fam.out}-${subset}.woff2`;
    await writeFile(file, buf);
    console.log(file, (buf.length / 1024).toFixed(1) + ' KB');
  }
}
