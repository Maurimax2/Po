/**
 * Builds the WhatsApp order message. This is the entire checkout: there is no
 * backend, no payment and no e-mail.
 *
 * Deliberately, and permanently: no price, no subtotal, no total, no currency.
 * The last line of the message is what asks the shop for the price — that is
 * the whole point of the flow.
 */
import type { Lang } from '../i18n';
import { dictionaries } from '../i18n';
import type { ResolvedLine } from '../context/CartContext';
import { whatsappLink } from '../data/shop';

export type DeliveryMode = 'pickup' | 'nouakchott' | 'interior';

export interface OrderDetails {
  name: string;
  phone: string;
  city: string;
  delivery: DeliveryMode;
  note: string;
}

export function buildOrderMessage(lines: ResolvedLine[], details: OrderDetails, lang: Lang): string {
  const t = dictionaries[lang].whatsapp;
  const checkout = dictionaries[lang].checkout;

  const products = lines
    .map((line, i) => `${i + 1}. ${line.product.name[lang]} — ${t.qty} : ${line.qty}`)
    .join('\n');

  const rows = [
    `${t.name} : ${details.name.trim()}`,
    `${t.phone} : ${details.phone.trim()}`,
    `${t.city} : ${details.city.trim()}`,
    `${t.delivery} : ${checkout.deliveryOptions[details.delivery]}`,
  ];
  if (details.note.trim()) rows.push(`${t.note} : ${details.note.trim()}`);

  return [
    t.orderHeader,
    t.rule,
    t.products,
    products,
    '',
    t.rule,
    ...rows,
    '',
    t.closing,
  ].join('\n');
}

export const orderLink = (lines: ResolvedLine[], details: OrderDetails, lang: Lang) =>
  whatsappLink(buildOrderMessage(lines, details, lang));

/** "Commander sur WhatsApp" for one product — used on product pages and in the footer. */
export const singleProductLink = (productName: string, lang: Lang) =>
  whatsappLink(dictionaries[lang].whatsapp.singleProduct(productName));

export const availabilityLink = (productName: string, lang: Lang) =>
  whatsappLink(dictionaries[lang].whatsapp.availability(productName));

export const generalLink = (lang: Lang) => whatsappLink(dictionaries[lang].whatsapp.general);

export const quoteLink = (lang: Lang) => whatsappLink(dictionaries[lang].whatsapp.quote);
