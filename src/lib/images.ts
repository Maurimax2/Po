/**
 * Resolves the derivatives produced by scripts/optimize-images.mjs into hashed
 * URLs. Everything goes through Vite's asset pipeline, so filenames are
 * content-hashed and can be cached forever.
 *
 * Card images are 4:5, wide images are 16:10 — the aspect ratios are fixed at
 * build time, which is what keeps the grid from shifting while photos load.
 */

const CARD_WIDTHS = [400, 720, 1080] as const;
const WIDE_WIDTHS = [640, 1100, 1600] as const;
const CUTOUT_WIDTHS = [360, 720, 1080] as const;

export const CARD_ASPECT = 4 / 5;
export const WIDE_ASPECT = 16 / 10;

const cardFiles = import.meta.glob('../assets/generated/cards/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const wideFiles = import.meta.glob('../assets/generated/wide/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const cutoutFiles = import.meta.glob('../assets/generated/cutouts/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function index(files: Record<string, string>) {
  const map = new Map<string, Map<number, string>>();
  for (const [path, url] of Object.entries(files)) {
    const match = /\/([^/]+)-(\d+)\.webp$/.exec(path);
    if (!match) continue;
    const [, name, width] = match;
    if (!map.has(name)) map.set(name, new Map());
    map.get(name)!.set(Number(width), url);
  }
  return map;
}

const cards = index(cardFiles);
const wides = index(wideFiles);
const cutouts = index(cutoutFiles);

export interface ResponsiveImage {
  /** Largest derivative, used as the plain `src` fallback. */
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

function build(
  map: Map<string, Map<number, string>>,
  name: string,
  widths: readonly number[],
  ratio: number,
  kind: string,
): ResponsiveImage {
  const entry = map.get(name);
  if (!entry) {
    throw new Error(
      `Missing ${kind} image "${name}". Add the source to assets/products/ and run \`npm run images\`.`,
    );
  }
  const available = widths.filter((w) => entry.has(w));
  const largest = available[available.length - 1];
  return {
    src: entry.get(largest)!,
    srcSet: available.map((w) => `${entry.get(w)} ${w}w`).join(', '),
    width: largest,
    height: Math.round(largest / ratio),
  };
}

export const cardImage = (name: string) => build(cards, name, CARD_WIDTHS, CARD_ASPECT, 'card');
export const wideImage = (name: string) => build(wides, name, WIDE_WIDTHS, WIDE_ASPECT, 'wide');
/** Transparent product cut-out, always square. */
export const cutoutImage = (name: string) => build(cutouts, name, CUTOUT_WIDTHS, 1, 'cutout');

export const hasWide = (name: string) => wides.has(name);
