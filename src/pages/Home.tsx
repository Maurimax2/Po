import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useReveal, useTitle } from '../lib/hooks';
import { CATEGORIES, PRODUCTS, STOCK_SHOTS, featuredProducts, productsIn } from '../data/products';
import { SHOP } from '../data/shop';
import { generalLink, quoteLink } from '../lib/whatsapp';
import { ApertureMark } from '../components/Aperture';
import { ProductCard } from '../components/ProductCard';
import {
  Container,
  Corners,
  CutoutImage,
  ExternalButton,
  LinkButton,
  SectionHeading,
  WideImage,
} from '../components/ui';
import { ArrowIcon, CATEGORY_ICONS, ChevronIcon, TRUST_ICONS, WhatsAppIcon } from '../components/Icons';

/* ────────────────────────────────────────────────────────────────────────────
   HERO
   A framed photograph of the shop's own shelves, captioned like a catalogue
   plate, with the flagship camera stepping out of the frame in front of it.
   No overlays, no running clock, nothing blinking.
──────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const { t, lang } = useLang();

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="trame-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(236,131,4,0.07),transparent_72%)]"
        aria-hidden
      />

      <Container className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* — Text column — */}
          <div className="anim-rise order-2 lg:order-1">
            <p className="eyebrow flex items-center gap-2.5 text-amber-ink">
              <ApertureMark className="h-4 w-4" />
              {t.hero.eyebrow}
            </p>

            <h1 className="font-display mt-5 text-hero font-bold text-ink text-balance">
              <span className="block">{t.hero.title1}</span>
              <span className="block">{t.hero.title2}</span>
              <span className="block text-amber-deep">{t.hero.title3}</span>
            </h1>

            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">{t.hero.lead}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton to="/catalogue" size="lg">
                {t.hero.ctaPrimary}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </LinkButton>
              <ExternalButton href={generalLink(lang)} variant="outline" size="lg">
                <WhatsAppIcon className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </ExternalButton>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-7">
              {[
                { n: `${PRODUCTS.length}`, l: lang === 'fr' ? 'Références en ligne' : 'صنفًا على الموقع' },
                { n: `${productsIn('videosurveillance').length}`, l: lang === 'fr' ? 'Modèles de caméras' : 'موديل كاميرا' },
                { n: `${new Date().getFullYear() - SHOP.foundedYear}+`, l: lang === 'fr' ? "Années d'activité" : 'سنوات من العمل' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display numeric text-2xl font-bold text-ink sm:text-3xl">{s.n}</dt>
                  <dd className="mt-1.5 text-[11px] leading-tight text-ink-faint sm:text-xs">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* — Framed plate — */}
          <div className="relative order-1 lg:order-2">
            <div className="group relative rounded-xl border border-line bg-page p-2.5 shadow-[0_24px_60px_-32px_rgba(23,19,15,.35)] sm:p-3">
              <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-surface">
                <WideImage
                  name="dahua-5mp-dual-light-stock"
                  alt={t.hero.caption}
                  eager
                  sizes="(min-width: 1024px) 52vw, 94vw"
                  className="h-full w-full object-cover"
                />
                <Corners />
              </div>

              {/* Captioned like a catalogue plate, padded clear of the camera. */}
              <p className="ps-28 pe-1 pt-3 pb-1 text-end text-[12px] text-ink-faint sm:ps-44 lg:ps-56">
                {t.hero.caption}
              </p>
            </div>

            {/* The camera itself, stepping out in front of the shelf it watches. */}
            <div className="pointer-events-none absolute -bottom-7 -start-3 w-26 sm:-bottom-12 sm:-start-8 sm:w-40 lg:-start-14 lg:w-52">
              <CutoutImage
                name="cam-solaire-ptz-4-lentilles"
                alt={
                  lang === 'fr'
                    ? 'Caméra solaire PTZ à quatre lentilles avec panneau solaire intégré'
                    : 'كاميرا شمسية PTZ بأربع عدسات مع لوح شمسي مدمج'
                }
                eager
                sizes="(min-width: 1024px) 210px, 150px"
                className="h-auto w-full drop-shadow-[0_18px_28px_rgba(23,19,15,.28)]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Trust strip ─────────────────────────────────────────────────────────── */
function TrustStrip() {
  const { t } = useLang();
  const { ref, shown } = useReveal();

  return (
    <section className="border-b border-line bg-surface" aria-labelledby="trust-title">
      <Container className="py-14 sm:py-16">
        <h2 id="trust-title" className="sr-only">
          {t.trust.title}
        </h2>
        <div ref={ref} data-shown={shown} className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {t.trust.items.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={item.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-amber/35 bg-page text-amber-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ── Category wall — six monitors ────────────────────────────────────────── */
function CategoryWall() {
  const { t, lang } = useLang();
  const { ref, shown } = useReveal<HTMLUListElement>();

  return (
    <section className="relative" aria-labelledby="cat-title">
      <Container className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="cat-title"
            eyebrow={t.categories.eyebrow}
            title={t.categories.title}
            lead={t.categories.lead}
          />
          <Link
            to="/catalogue"
            className="group hidden items-center gap-2 text-[13px] font-semibold text-amber-ink transition-colors hover:text-ink sm:flex"
          >
            {t.categories.seeAll}
            <ChevronIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <ul ref={ref} data-shown={shown} className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
          {CATEGORIES.map((c, i) => {
            const Icon = CATEGORY_ICONS[c.id];
            const count = productsIn(c.id).length;
            const flagship = c.id === 'videosurveillance';
            return (
              <li
                key={c.id}
                className={
                  flagship
                    ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                    : c.id === 'divers'
                      ? 'sm:col-span-2 lg:col-span-1'
                      : ''
                }
              >
                <Link
                  to={`/catalogue/${c.id}`}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-line bg-page p-6 transition-all duration-300 hover:border-line-strong hover:shadow-[0_14px_40px_-24px_rgba(23,19,15,.35)] sm:p-7 ${
                    flagship ? 'min-h-56' : 'min-h-40'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(236,131,4,0.08),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-lg border border-line bg-surface text-amber-ink transition-colors group-hover:border-amber/50">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="numeric text-[13px] font-semibold text-ink-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <p className="eyebrow text-amber-ink">{c.tagline[lang]}</p>
                    <h3 className="font-display mt-2.5 text-title font-bold text-ink">{c.name[lang]}</h3>
                    {flagship && (
                      <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-soft">{c.description[lang]}</p>
                    )}
                    <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ink-faint transition-colors group-hover:text-amber-ink">
                      {t.categories.productCount(count)}
                      <ChevronIcon className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ── Featured ────────────────────────────────────────────────────────────── */
function Featured() {
  const { t } = useLang();
  const { ref, shown } = useReveal();
  const items = featuredProducts().slice(0, 8);

  return (
    <section className="border-y border-line bg-surface" aria-labelledby="featured-title">
      <Container className="py-20 sm:py-24">
        <SectionHeading id="featured-title" eyebrow={t.featured.eyebrow} title={t.featured.title} lead={t.featured.lead} />
        <div ref={ref} data-shown={shown} className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <LinkButton to="/catalogue" variant="outline" size="lg">
            {t.categories.seeAll}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

/* ── Remote control ──────────────────────────────────────────────────────── */
function AppSection() {
  const { t, lang } = useLang();
  const { ref, shown } = useReveal();

  return (
    <section aria-labelledby="app-title">
      <Container className="py-20 sm:py-24">
        <div ref={ref} data-shown={shown} className="reveal grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="group relative overflow-hidden rounded-xl border border-line bg-page p-2.5 shadow-[0_24px_60px_-32px_rgba(23,19,15,.3)]">
              <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-surface">
                <WideImage
                  name="app-controle-ptz-smartphone"
                  alt={t.app.imageAlt}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="h-full w-full object-cover"
                />
                <Corners />
              </div>
            </div>
            {/* The 4G camera, as the thing being driven from that screen. */}
            {/* Anchored to the physical right in both directions: the screenshot
                carries its own text on the left, so a logical offset would drop the
                camera on top of it in the RTL layout. */}
            <div className="pointer-events-none absolute -right-3 -bottom-12 w-28 sm:-right-10 sm:-bottom-14 sm:w-40 lg:-right-16 lg:w-44">
              <CutoutImage
                name="cam-4g-wifi-double-lentille-ptz"
                alt={
                  lang === 'fr'
                    ? 'Caméra PTZ 4G double lentille pilotée depuis un smartphone'
                    : 'كاميرا PTZ بشريحة 4G بعدستين تُدار من الهاتف'
                }
                sizes="(min-width: 1024px) 180px, 130px"
                className="h-auto w-full drop-shadow-[0_16px_26px_rgba(23,19,15,.28)]"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading id="app-title" eyebrow={t.app.eyebrow} title={t.app.title} lead={t.app.lead} />
            <ul className="mt-8 space-y-4">
              {t.app.bullets.map((b) => (
                <li key={b} className="flex gap-3.5 text-[14px] leading-relaxed text-ink">
                  <ApertureMark className="mt-0.5 h-4 w-4 shrink-0 text-amber-ink" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <LinkButton to="/catalogue/videosurveillance" variant="outline">
                {CATEGORIES[0].name[lang]}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Proof of stock ──────────────────────────────────────────────────────── */
function StockProof() {
  const { t, lang } = useLang();
  const { ref, shown } = useReveal<HTMLUListElement>();

  return (
    <section className="border-y border-line bg-page" aria-labelledby="stock-title">
      <Container className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="stock-title" eyebrow={t.stock.eyebrow} title={t.stock.title} lead={t.stock.lead} />
          <ExternalButton href={generalLink(lang)} variant="outline" className="shrink-0">
            <WhatsAppIcon className="h-4 w-4" />
            {t.stock.cta}
          </ExternalButton>
        </div>

        <ul
          ref={ref}
          data-shown={shown}
          className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3"
        >
          {STOCK_SHOTS.map((shot) => (
            <li key={shot.image} className="group overflow-hidden rounded-xl border border-line bg-page">
              <div className="relative aspect-16/10 overflow-hidden bg-surface">
                <WideImage
                  name={shot.image}
                  alt={shot.caption[lang]}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
                <Corners subtle />
              </div>
              {/* The caption sits under the photograph, not printed over it. */}
              <p className="border-t border-line px-4 py-3 text-[12.5px] leading-snug text-ink-soft">
                {shot.caption[lang]}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ── Installation & maintenance — the one light section ──────────────────── */
function ServiceSection() {
  const { t, lang } = useLang();
  const { ref, shown } = useReveal();

  return (
    <section className="border-y border-line bg-amber-wash" aria-labelledby="service-title">
      <Container className="py-20 sm:py-28">
        <div ref={ref} data-shown={shown} className="reveal grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-amber-ink">
              <ApertureMark className="h-4 w-4" />
              {t.service.eyebrow}
            </p>
            <h2 id="service-title" className="font-display mt-3.5 text-display font-bold text-ink text-balance">
              {t.service.title}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">{t.service.lead}</p>
            <ExternalButton href={quoteLink(lang)} variant="solid" size="lg" className="mt-9">
              <WhatsAppIcon className="h-4 w-4" />
              {t.service.cta}
            </ExternalButton>
          </div>

          <ol className="relative">
            {t.service.steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                {i < t.service.steps.length - 1 && (
                  <span className="absolute start-[19px] top-11 bottom-1 w-px bg-amber/30" aria-hidden />
                )}
                <span className="numeric relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber/40 bg-page text-[12px] font-semibold text-amber-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-base font-bold text-page">{step.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-page/65">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ── Closing contact strip ───────────────────────────────────────────────── */
function ContactStrip() {
  const { t, lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-page" aria-labelledby="order-title">
      <div className="trame-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(236,131,4,0.10),transparent_72%)]"
        aria-hidden
      />
      <Container className="relative py-20 text-center sm:py-24">
        <p className="eyebrow flex items-center justify-center gap-2.5 text-amber-ink">
          <ApertureMark className="h-4 w-4" />
          {t.contactStrip.eyebrow}
        </p>
        <h2 id="order-title" className="font-display mx-auto mt-4 max-w-2xl text-display font-bold text-ink text-balance">
          {t.contactStrip.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{t.contactStrip.lead}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ExternalButton href={generalLink(lang)} size="lg">
            <WhatsAppIcon className="h-5 w-5" />
            {t.contactStrip.cta}
          </ExternalButton>
          <a
            href={`tel:${SHOP.phoneHref}`}
            className="numeric latin text-lg font-bold text-ink transition-colors hover:text-amber-ink sm:text-xl"
          >
            {SHOP.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  useTitle(`${t.brand.full} — ${t.brand.tagline}`);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryWall />
      <Featured />
      <AppSection />
      <StockProof />
      <ServiceSection />
      <ContactStrip />
    </>
  );
}
