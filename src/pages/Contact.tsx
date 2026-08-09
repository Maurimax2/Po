import { useLang } from '../context/LangContext';
import { useTitle } from '../lib/hooks';
import { SHOP, mapsLink } from '../data/shop';
import { generalLink } from '../lib/whatsapp';
import { Container, ExternalButton, SectionHeading } from '../components/ui';
import { ApertureMark } from '../components/Aperture';
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../components/Icons';

export default function Contact() {
  const { t, lang } = useLang();
  useTitle(`${t.contact.title} — ${t.brand.full}`);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="trame-grid absolute inset-0 opacity-40" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(70%_80%_at_20%_0%,rgba(236,131,4,0.08),transparent_72%)]"
          aria-hidden
        />
        <Container className="relative py-12 sm:py-16">
          <SectionHeading eyebrow={t.contactStrip.eyebrow} title={t.contact.title} lead={t.contact.lead} />
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-amber/30 bg-amber-wash text-amber-ink">
              <PinIcon className="h-5 w-5" />
            </span>
            <h2 className="font-display mt-5 text-base font-bold text-ink">{t.contact.address}</h2>
            <address className="mt-3 space-y-1 text-sm leading-relaxed text-ink-soft not-italic">
              {t.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-amber/30 bg-amber-wash text-amber-ink">
              <ClockIcon className="h-5 w-5" />
            </span>
            <h2 className="font-display mt-5 text-base font-bold text-ink">{t.contact.hours}</h2>
            <dl className="mt-3 space-y-2.5 text-sm">
              {t.contact.hoursLines.map((row) => (
                <div key={row.d}>
                  <dt className="text-ink">{row.d}</dt>
                  <dd className="numeric mt-1 text-[13px] text-ink-soft tabular-nums">{row.h}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-amber/30 bg-amber-wash text-amber-ink">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <h2 className="font-display mt-5 text-base font-bold text-ink">{t.contact.phone}</h2>
            <a
              href={`tel:${SHOP.phoneHref}`}
              className="numeric latin mt-3 block text-lg font-semibold text-ink transition-colors hover:text-amber-ink"
            >
              {SHOP.phoneDisplay}
            </a>
            <div className="mt-5 flex flex-col gap-2.5">
              <ExternalButton href={generalLink(lang)} size="md">
                <WhatsAppIcon className="h-4 w-4" />
                {t.contact.whatsappCta}
              </ExternalButton>
              <a
                href={`tel:${SHOP.phoneHref}`}
                className="eyebrow inline-flex h-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-amber hover:text-amber-ink"
              >
                {t.contact.callCta}
              </a>
            </div>
          </div>
        </div>

        {/* Map placeholder — a viewfinder frame rather than a grey box, with a
            link out to Maps. No third-party embed, no tracking script. */}
        <section className="mt-6" aria-labelledby="map-title">
          <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
            <div className="trame-grid absolute inset-0 opacity-70" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,rgba(236,131,4,0.12),transparent_70%)]"
              aria-hidden
            />
            <div className="relative flex min-h-64 flex-col items-center justify-center gap-4 px-6 py-16 text-center sm:min-h-80">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-amber/40 bg-page text-amber-ink">
                <ApertureMark className="h-8 w-8" />
              </span>
              <h2 id="map-title" className="font-display text-title font-bold text-ink">
                {t.contact.mapPlaceholder}
              </h2>
              <p className="text-[13px] font-semibold text-ink-faint">
                {SHOP.city} — {SHOP.country}
              </p>
              <p className="max-w-sm text-[13px] leading-relaxed text-ink-soft">{t.contact.mapNote}</p>
              <ExternalButton href={mapsLink()} variant="outline" size="md" className="mt-2">
                {t.contact.mapCta}
              </ExternalButton>
            </div>
            {/* Viewfinder corners on the frame itself. */}
            <span className="pointer-events-none absolute start-4 top-4 h-6 w-6 border-s border-t border-amber/50" />
            <span className="pointer-events-none absolute end-4 top-4 h-6 w-6 border-t border-e border-amber/50" />
            <span className="pointer-events-none absolute start-4 bottom-4 h-6 w-6 border-s border-b border-amber/50" />
            <span className="pointer-events-none absolute end-4 bottom-4 h-6 w-6 border-e border-b border-amber/50" />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16" aria-labelledby="faq-title">
          <h2 id="faq-title" className="font-display text-title font-bold text-ink">
            {t.contact.faqTitle}
          </h2>
          <dl className="mt-7 grid gap-4 sm:grid-cols-2">
            {t.contact.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-line bg-surface p-6">
                <dt className="font-display flex gap-3 text-[15px] font-bold text-ink">
                  <ApertureMark className="mt-0.5 h-4 w-4 shrink-0 text-amber-ink" />
                  {item.q}
                </dt>
                <dd className="mt-3 text-[13px] leading-relaxed text-ink-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
    </>
  );
}
