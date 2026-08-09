// One-off helper: downloads the self-hosted woff2 files into src/assets/fonts.
// Re-run only if you change the font stack. The site never talks to a CDN at runtime.
//
// The stack is one superfamily across both scripts — IBM Plex — so the Arabic
// site and the French site are set in faces drawn by the same hand rather than
// two unrelated typefaces bolted together.
import { writeFile } from 'node:fs/promises';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const FAMILIES = [
  // Body and UI, Latin. Variable across the weights we actually use.
  { css: 'IBM+Plex+Sans:wght@400..600', subsets: ['latin'], out: 'plex-sans' },
  // Headlines, Latin. Condensed gives the headings their own voice.
  { css: 'IBM+Plex+Sans+Condensed:wght@700', subsets: ['latin'], out: 'plex-condensed-700' },
  // Everything, Arabic — the default language of the site.
  // Two weights only: Arabic ships first here, so every kilobyte is on the
  // critical path. 500 falls back to 400 and 600 to 700 by nearest-weight
  // matching, which is why font-synthesis is disabled — no faux bold.
  { css: 'IBM+Plex+Sans+Arabic:wght@400', subsets: ['arabic'], out: 'plex-arabic-400' },
  { css: 'IBM+Plex+Sans+Arabic:wght@700', subsets: ['arabic'], out: 'plex-arabic-700' },
];

for (const fam of FAMILIES) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${fam.css}&display=swap`, { headers: { 'User-Agent': UA } })
  ).text();
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
