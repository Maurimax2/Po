import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { useTitle } from '../lib/hooks';
import { buildOrderMessage, orderLink, type DeliveryMode, type OrderDetails } from '../lib/whatsapp';
import { Button, Container, ExternalButton, LinkButton, PriceOnRequest } from '../components/ui';
import { ApertureMark } from '../components/Aperture';
import { ArrowIcon, CheckIcon, WhatsAppIcon } from '../components/Icons';

type FieldErrors = Partial<Record<'name' | 'phone' | 'city', string>>;

const EMPTY: OrderDetails = { name: '', phone: '', city: '', delivery: 'pickup', note: '' };

export default function Checkout() {
  const { t, lang } = useLang();
  const { resolved, unitCount } = useCart();
  const [details, setDetails] = useState<OrderDetails>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useTitle(`${t.checkout.title} — ${t.brand.name}`);

  const message = useMemo(
    () => (resolved.length ? buildOrderMessage(resolved, details, lang) : ''),
    [resolved, details, lang],
  );
  const link = useMemo(
    () => (resolved.length ? orderLink(resolved, details, lang) : ''),
    [resolved, details, lang],
  );

  const set = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    setDetails((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: FieldErrors = {};
    if (details.name.trim().length < 2) next.name = t.checkout.errors.name;
    // Mauritanian numbers are 8 digits; accept an international prefix too.
    if (details.phone.replace(/\D/g, '').length < 8) next.phone = t.checkout.errors.phone;
    if (details.city.trim().length < 2) next.city = t.checkout.errors.city;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!resolved.length || !validate()) return;
    // Opened synchronously inside the submit handler so the pop-up blocker
    // treats it as a user gesture. The fallback link below covers the rest.
    window.open(orderLink(resolved, details, lang), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  if (resolved.length === 0) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-display font-bold text-white">{t.cart.empty}</h1>
          <p className="mt-4 text-[15px] text-sable-dim">{t.checkout.emptyRedirect}</p>
          <div className="mt-9 flex justify-center">
            <LinkButton to="/catalogue" size="lg">
              {t.cart.emptyCta}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </LinkButton>
          </div>
        </div>
      </Container>
    );
  }

  const field =
    'h-12 w-full rounded-lg border bg-noir px-4 text-sm text-white placeholder:text-sable-faint focus:outline-none';
  const ok = 'border-trame focus:border-amber';
  const bad = 'border-red-500/70 focus:border-red-400';

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="hud flex items-center gap-2.5 text-amber">
          <ApertureMark className="h-3.5 w-3.5" />
          {t.contactStrip.eyebrow}
        </p>
        <h1 className="font-display mt-4 text-display font-bold text-white">{t.checkout.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-sable-dim">{t.checkout.lead}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start lg:gap-10">
        <form onSubmit={submit} noValidate className="min-w-0 rounded-xl border border-trame bg-caisse p-5 sm:p-7">
          <h2 className="hud text-sable-faint">{t.checkout.section}</h2>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="f-name" className="mb-2 block text-[13px] font-medium text-sable">
                {t.checkout.name} <span className="text-amber">*</span>
              </label>
              <input
                id="f-name"
                name="name"
                autoComplete="name"
                value={details.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder={t.checkout.namePlaceholder}
                className={`${field} ${errors.name ? bad : ok}`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'e-name' : undefined}
                required
              />
              {errors.name && (
                <p id="e-name" className="mt-2 text-[12px] text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="f-phone" className="mb-2 block text-[13px] font-medium text-sable">
                {t.checkout.phone} <span className="text-amber">*</span>
              </label>
              <input
                id="f-phone"
                name="tel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                value={details.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder={t.checkout.phonePlaceholder}
                className={`${field} text-start ${errors.phone ? bad : ok}`}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'e-phone' : undefined}
                required
              />
              {errors.phone && (
                <p id="e-phone" className="mt-2 text-[12px] text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="f-city" className="mb-2 block text-[13px] font-medium text-sable">
                {t.checkout.city} <span className="text-amber">*</span>
              </label>
              <input
                id="f-city"
                name="address-level2"
                autoComplete="address-level2"
                value={details.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder={t.checkout.cityPlaceholder}
                className={`${field} ${errors.city ? bad : ok}`}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? 'e-city' : undefined}
                required
              />
              {errors.city && (
                <p id="e-city" className="mt-2 text-[12px] text-red-400">
                  {errors.city}
                </p>
              )}
            </div>

            <fieldset>
              <legend className="mb-3 block text-[13px] font-medium text-sable">
                {t.checkout.delivery} <span className="text-amber">*</span>
              </legend>
              <div className="grid gap-2.5">
                {(Object.keys(t.checkout.deliveryOptions) as DeliveryMode[]).map((mode) => {
                  const on = details.delivery === mode;
                  return (
                    <label
                      key={mode}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 text-sm transition-colors ${
                        on ? 'border-amber bg-amber/8 text-white' : 'border-trame bg-noir text-sable-dim hover:border-trame-lift'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={mode}
                        checked={on}
                        onChange={() => set('delivery', mode)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                          on ? 'border-amber' : 'border-trame-lift'
                        }`}
                        aria-hidden
                      >
                        {on && <span className="h-2.5 w-2.5 rounded-full bg-amber" />}
                      </span>
                      {t.checkout.deliveryOptions[mode]}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="f-note" className="mb-2 block text-[13px] font-medium text-sable">
                {t.checkout.note}{' '}
                <span className="hud text-sable-faint">({t.checkout.optional})</span>
              </label>
              <textarea
                id="f-note"
                name="note"
                rows={4}
                value={details.note}
                onChange={(e) => set('note', e.target.value)}
                placeholder={t.checkout.notePlaceholder}
                className={`${ok} w-full rounded-lg border bg-noir px-4 py-3 text-sm leading-relaxed text-white placeholder:text-sable-faint focus:outline-none`}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full">
            <WhatsAppIcon className="h-5 w-5" />
            {t.checkout.submit}
          </Button>

          {/* Fallback — some in-app browsers swallow window.open. */}
          {sent && (
            <div className="mt-6 rounded-lg border border-amber/40 bg-amber/8 p-5" role="status">
              <p className="font-display flex items-center gap-2 text-sm font-bold text-white">
                <CheckIcon className="h-4 w-4 text-amber" />
                {t.checkout.sentTitle}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-sable-dim">{t.checkout.sentText}</p>
              <p className="mt-4 text-[13px] font-semibold text-sable">{t.checkout.fallbackTitle}</p>
              <p className="mt-1 text-[13px] text-sable-dim">{t.checkout.fallbackText}</p>
              <ExternalButton href={link} variant="outline" size="md" className="mt-4 w-full">
                <WhatsAppIcon className="h-4 w-4" />
                {t.checkout.fallbackLink}
              </ExternalButton>
            </div>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="hud text-sable-faint underline-offset-4 transition-colors hover:text-amber hover:underline"
              aria-expanded={showPreview}
            >
              {showPreview ? t.checkout.hidePreview : t.checkout.showPreview}
            </button>
            {showPreview && (
              <pre
                dir="ltr"
                className="font-mono mt-3 max-h-72 overflow-auto rounded-lg border border-trame bg-noir p-4 text-[11px] leading-relaxed whitespace-pre-wrap text-sable-dim"
              >
                {message}
              </pre>
            )}
          </div>
        </form>

        {/* Order recap — quantities only. */}
        <aside className="min-w-0 rounded-xl border border-trame bg-caisse p-6 lg:sticky lg:top-24">
          <h2 className="hud text-sable-faint">{t.checkout.orderSection}</h2>
          <ul className="mt-5 space-y-3.5">
            {resolved.map(({ product, qty }) => (
              <li key={product.slug} className="flex items-start justify-between gap-3 text-[13px]">
                <Link
                  to={`/produit/${product.slug}`}
                  className="leading-snug text-sable transition-colors hover:text-amber"
                >
                  {product.name[lang]}
                </Link>
                <span className="font-mono shrink-0 text-sable-faint tabular-nums">×{qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-trame pt-5 text-sm">
            <span className="text-sable-dim">{t.cart.totalUnits}</span>
            <span className="font-mono font-semibold text-white tabular-nums">{unitCount}</span>
          </div>
          <div className="mt-5">
            <PriceOnRequest size="lg" />
          </div>
          <LinkButton to="/panier" variant="quiet" size="sm" className="mt-5 w-full">
            {t.nav.cart}
          </LinkButton>
        </aside>
      </div>
    </Container>
  );
}
