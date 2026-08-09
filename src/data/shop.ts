/**
 * ── SHOP CONFIGURATION ──────────────────────────────────────────────────────
 * Everything the owner is likely to want to change lives here.
 *
 * TO CHANGE THE WHATSAPP NUMBER: edit `whatsappNumber` below. It must be in
 * international format with no "+", no spaces and no leading zero, because
 * that is what wa.me expects. `phoneDisplay` is what visitors actually read,
 * so keep it formatted the local way.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const SHOP = {
  /** wa.me target — digits only, country code first. 222 = Mauritania. */
  whatsappNumber: '22226490908',
  /** Shown on screen. */
  phoneDisplay: '+222 26 49 09 08',
  /** tel: link target. */
  phoneHref: '+22226490908',

  city: 'Nouakchott',
  country: 'Mauritanie',

  /** Used for the "open in Google Maps" link on the contact page. */
  mapsQuery: 'بصمة للخدمات العامة Nouakchott Mauritanie',

  foundedYear: 2016,
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.mapsQuery)}`;
