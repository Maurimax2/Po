/**
 * Build-time image pipeline for basma.mr
 * ---------------------------------------
 * The source photos are real shop photos: mixed aspect ratios, mixed lighting,
 * some are boxes on a shelf shot on a phone. Rather than hard-cropping them
 * (which is where sites like this usually fall apart), every product image is
 * *contained* on a fixed 4:5 canvas over a blurred, darkened copy of itself.
 * The result is a uniform, deliberate-looking inventory grid.
 *
 * Two source images are clean renders on a white background. Those get the
 * white keyed out to alpha so they can sit on the dark UI, and are also
 * exported as standalone cut-outs for the hero / feature sections.
 *
 * Run with:  npm run images
 * Outputs to src/assets/generated/ (git-ignored, regenerated on install).
 */
import sharp from 'sharp';
import { mkdir, rm, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets/products';
const BRAND = 'assets/brand';
const OUT = 'src/assets/generated';

/** Card canvas: 4:5 portrait, three widths for srcset. */
const CARD_WIDTHS = [400, 720, 1080];
const CARD_RATIO = 5 / 4;
/** Wide canvas: 16:10, used by the hero feed panel and the "notre stock" strip. */
const WIDE_WIDTHS = [640, 1100, 1600];
const WIDE_RATIO = 10 / 16;
/** Transparent cut-outs of the two clean supplier renders (hero + features). */
const CUTOUT_WIDTHS = [360, 720, 1080];

const INK = { r: 0x14, g: 0x12, b: 0x15 }; // --color-caisse

/** Images that are clean renders on white and need the background keyed out. */
const WHITE_BG = new Set(['cam-solaire-ptz-4-lentilles', 'cam-4g-wifi-double-lentille-ptz']);
/** Images that also get a 16:10 export (hero + stock strip). */
const WIDE = new Set([
  'dahua-5mp-dual-light-stock',
  'cam-smart-stock-boites',
  'dahua-bullet-2mp-dual-light',
  'refroidisseur-air-startrack-stock',
  'tondeuse-cheveux-pro',
  'kit-dahua-1080p-dvr-hdcvi',
  'recepteur-starsat-micros-sans-fil',
  'megaphone-onduleur-multimetre',
  'app-controle-ptz-smartphone',
]);
/**
 * Regions painted white before the white-key runs, as fractions of w/h. Used to
 * erase a reverse-image-search watermark badge sitting in the empty corner of
 * one supplier render.
 */
const WHITEOUT = {
  'cam-4g-wifi-double-lentille-ptz': [{ left: 0, top: 0.84, width: 0.16, height: 0.16 }],
};
/** Pre-crops applied to the source before anything else (fractions of w/h). */
const PRECROP = {
  // Strip the social-media chrome off the PTZ app screenshot, keep the card.
  'app-controle-ptz-smartphone': { left: 0, top: 0.235, width: 1, height: 0.28 },
};

/**
 * Key near-white pixels to transparent. Deliberately conservative: a pixel only
 * goes transparent when it is both very bright and nearly neutral, so pale grey
 * product housings survive. Alpha is feathered so edges do not look cut with
 * scissors.
 */
async function keyWhite(input) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8ClampedArray(data);
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min > 22) continue; // saturated -> real content
    // 232 fully opaque, 250 fully transparent, linear in between
    const t = (min - 232) / 18;
    if (t <= 0) continue;
    px[i + 3] = Math.round(px[i + 3] * (1 - Math.min(1, t)));
  }
  return sharp(Buffer.from(px.buffer), { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 });
}


/**
 * Rebuilds the logo as a clean two-colour mark for dark surfaces.
 *
 * The source is a JPEG on white: keying the white out leaves a grey halo of
 * compression artefacts that is invisible on white and glaring on black, and
 * the black half of the mark disappears entirely on a dark UI. So instead of
 * keying, every pixel is classified — saturated pixels become the brand amber,
 * neutral pixels become the ink colour with alpha taken from how dark they
 * were. Antialiasing survives, the halo does not.
 */
async function brandMark(input, ink) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8ClampedArray(data);
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min > 45) {
      px[i] = 0xec; px[i + 1] = 0x83; px[i + 2] = 0x04; px[i + 3] = 255;
    } else {
      px[i] = ink[0]; px[i + 1] = ink[1]; px[i + 2] = ink[2];
      px[i + 3] = 255 - max;
    }
  }
  return sharp(Buffer.from(px.buffer), { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 });
}

/** A soft amber pool of light, used behind keyed-out renders instead of a blur. */
function glow(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stop-color="#EC8304" stop-opacity="0.30"/>
          <stop offset="55%" stop-color="#EC8304" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="#EC8304" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`,
  );
}

/** Vignette so every card darkens toward its own edges — the viewfinder feel. */
function vignette(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="v" cx="50%" cy="48%" r="72%">
          <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#v)"/>
    </svg>`,
  );
}

async function compose({ source, width, ratio, keyed, pad }) {
  const height = Math.round(width * ratio);
  const layers = [];

  if (keyed) {
    layers.push({ input: glow(width, height), blend: 'over' });
  } else {
    const bg = await sharp(source)
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .blur(Math.max(8, width / 34))
      .modulate({ saturation: 0.45, brightness: 0.42 })
      .toBuffer();
    layers.push({ input: bg, blend: 'over' });
  }

  const inner = await sharp(source)
    .resize(Math.round(width * (1 - pad * 2)), Math.round(height * (1 - pad * 2)), {
      fit: 'inside',
      withoutEnlargement: false,
    })
    .toBuffer();
  layers.push({ input: inner, gravity: 'center' });
  layers.push({ input: vignette(width, height), blend: 'over' });

  return sharp({
    create: { width, height, channels: 4, background: INK },
  })
    .composite(layers)
    .webp({ quality: 76, effort: 5 })
    .toBuffer();
}

async function run() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(`${OUT}/cards`, { recursive: true });
  await mkdir(`${OUT}/wide`, { recursive: true });
  await mkdir(`${OUT}/cutouts`, { recursive: true });

  const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg')).sort();
  let bytes = 0;

  for (const file of files) {
    const name = path.basename(file, '.jpg');
    let source = path.join(SRC, file);

    const pre = PRECROP[name];
    if (pre) {
      const meta = await sharp(source).metadata();
      source = await sharp(source)
        .extract({
          left: Math.round(pre.left * meta.width),
          top: Math.round(pre.top * meta.height),
          width: Math.round(pre.width * meta.width),
          height: Math.round(pre.height * meta.height),
        })
        .toBuffer();
    }

    const patches = WHITEOUT[name];
    if (patches) {
      const meta = await sharp(source).metadata();
      source = await sharp(source)
        .composite(
          patches.map((p) => ({
            input: {
              create: {
                width: Math.round(p.width * meta.width),
                height: Math.round(p.height * meta.height),
                channels: 3,
                background: '#ffffff',
              },
            },
            left: Math.round(p.left * meta.width),
            top: Math.round(p.top * meta.height),
          })),
        )
        .toBuffer();
    }

    const keyed = WHITE_BG.has(name);
    if (keyed) {
      const cut = await (await keyWhite(source)).toBuffer();
      // Transparent WebP, three widths. PNG would be ~1.4 MB for the same
      // pixels, which is not something to ship over mobile data.
      for (const w of CUTOUT_WIDTHS) {
        // Squared onto a transparent canvas so the aspect ratio is always 1:1
        // and the layout can reserve the box with no manifest lookup.
        const buf = await sharp(cut)
          .resize(w, w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ quality: 82, effort: 5, alphaQuality: 90 })
          .toBuffer();
        bytes += buf.length;
        await sharp(buf).toFile(`${OUT}/cutouts/${name}-${w}.webp`);
      }
      source = cut;
    }

    for (const w of CARD_WIDTHS) {
      const buf = await compose({ source, width: w, ratio: CARD_RATIO, keyed, pad: keyed ? 0.09 : 0.055 });
      bytes += buf.length;
      await sharp(buf).toFile(`${OUT}/cards/${name}-${w}.webp`);
    }

    if (WIDE.has(name)) {
      for (const w of WIDE_WIDTHS) {
        const h = Math.round(w * WIDE_RATIO);
        const buf = await sharp(source)
          .resize(w, h, { fit: 'cover', position: 'attention' })
          .composite([{ input: vignette(w, h), blend: 'over' }])
          .webp({ quality: 74, effort: 5 })
          .toBuffer();
        bytes += buf.length;
        await sharp(buf).toFile(`${OUT}/wide/${name}-${w}.webp`);
      }
    }
  }

  // --- Brand marks -------------------------------------------------------
  const SABLE = [0xed, 0xe4, 0xd6];
  const source = path.join(BRAND, 'logo-basma.jpg');
  const full = await (await brandMark(source, SABLE)).toBuffer();

  // Social preview card. This matters more than usual here: the shop shares
  // its link inside WhatsApp, which renders og:image in the chat bubble.
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#0B0B0C' } })
    .composite([
      {
        input: Buffer.from(
          `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="o" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stop-color="#EC8304" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="#EC8304" stop-opacity="0"/>
            </radialGradient></defs>
            <rect width="100%" height="100%" fill="url(#o)"/>
          </svg>`,
        ),
        blend: 'over',
      },
      { input: await sharp(full).resize(560, 400, { fit: 'inside' }).toBuffer(), gravity: 'center' },
    ])
    .png({ compressionLevel: 9 })
    .toFile('public/og.png');

  // The aperture/fingerprint mark on its own, without the wordmark underneath.
  const meta = await sharp(full).metadata();
  const mark = await sharp(full)
    .extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.79) })
    .trim({ threshold: 1 })
    .toBuffer();

  await sharp(mark)
    .resize(160, 160, { fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/cutouts/logo-mark.png`);

  // Favicon / home-screen icon: the mark on the brand black, squared off.
  await sharp({ create: { width: 256, height: 256, channels: 4, background: '#0B0B0C' } })
    .composite([{ input: await sharp(mark).resize(196, 196, { fit: 'inside' }).toBuffer(), gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile('public/favicon.png');

  console.log(`${files.length} sources -> ${(bytes / 1024 / 1024).toFixed(2)} MB of webp derivatives`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
