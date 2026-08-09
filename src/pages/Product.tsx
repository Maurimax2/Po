import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { useTitle } from '../lib/hooks';
import { PRODUCTS, getCategory, getProduct } from '../data/products';
import { singleProductLink } from '../lib/whatsapp';
import { ProductCard } from '../components/ProductCard';
import { QtyStepper } from '../components/QtyStepper';
import {
  Badge,
  CardImage,
  Container,
  Corners,
  ExternalButton,
  LinkButton,
  PriceOnRequest,
  Button,
} from '../components/ui';
import { ApertureMark } from '../components/Aperture';
import { ArrowIcon, CartIcon, CheckIcon, ChevronIcon, WhatsAppIcon } from '../components/Icons';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLang();
  const { add, qtyOf } = useCart();
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [added, setAdded] = useState(false);

  const product = slug ? getProduct(slug) : undefined;

  useEffect(() => {
    setQty(1);
    setShot(0);
    setAdded(false);
  }, [slug]);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 2200);
    return () => window.clearTimeout(id);
  }, [added]);

  useTitle(product ? `${product.name[lang]} — ${t.brand.name}` : `${t.product.notFound} — ${t.brand.name}`);

  if (!product) {
    return (
      <Container className="py-28 text-center">
        <h1 className="font-display text-display font-bold text-white">{t.product.notFound}</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-sable-dim">{t.product.notFoundText}</p>
        <div className="mt-8 flex justify-center">
          <LinkButton to="/catalogue">{t.product.backToCatalogue}</LinkButton>
        </div>
      </Container>
    );
  }

  const category = getCategory(product.category);
  const inCart = qtyOf(product.slug);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const name = product.name[lang];

  return (
    <>
      {/* Breadcrumb */}
      <Container className="pt-6 pb-2">
        <nav aria-label={t.nav.breadcrumb} className="hud flex flex-wrap items-center gap-2 text-sable-faint">
          <Link to="/" className="transition-colors hover:text-amber">
            {t.nav.home}
          </Link>
          <ChevronIcon className="h-3 w-3 rtl:-scale-x-100" />
          <Link to="/catalogue" className="transition-colors hover:text-amber">
            {t.nav.catalogue}
          </Link>
          {category && (
            <>
              <ChevronIcon className="h-3 w-3 rtl:-scale-x-100" />
              <Link to={`/catalogue/${category.id}`} className="transition-colors hover:text-amber">
                {category.name[lang]}
              </Link>
            </>
          )}
        </nav>
      </Container>

      <Container className="py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="group relative overflow-hidden rounded-2xl border border-trame bg-caisse p-2">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-noir">
                <CardImage
                  key={product.images[shot]}
                  name={product.images[shot]}
                  alt={t.a11y.productImage(name)}
                  eager
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="h-full w-full object-cover"
                />
                <Corners />
                {product.badge && (
                  <div className="absolute start-4 top-4 z-20">
                    <Badge tone={product.badge === 'Stock disponible' ? 'quiet' : 'amber'}>
                      {t.badges[product.badge]}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {product.images.length > 1 && (
              <ul className="mt-3 flex gap-3" aria-label={t.product.gallery}>
                {product.images.map((img, i) => (
                  <li key={img}>
                    <button
                      type="button"
                      onClick={() => setShot(i)}
                      aria-label={t.product.viewImage(i + 1)}
                      aria-current={shot === i}
                      className={`relative block h-20 w-16 overflow-hidden rounded-lg border transition-colors ${
                        shot === i ? 'border-amber' : 'border-trame hover:border-trame-lift'
                      }`}
                    >
                      <CardImage
                        name={img}
                        alt=""
                        sizes="64px"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Detail */}
          <div>
            {category && (
              <Link
                to={`/catalogue/${category.id}`}
                className="hud inline-flex items-center gap-2 text-amber transition-colors hover:text-amber-lift"
              >
                <ApertureMark className="h-3.5 w-3.5" />
                {category.name[lang]}
              </Link>
            )}

            <h1 className="font-display mt-4 text-display font-bold text-white text-balance">{name}</h1>

            <p className="mt-5 text-[15px] leading-relaxed text-sable-dim sm:text-base">
              {product.shortDescription[lang]}
            </p>

            <div className="mt-8">
              <PriceOnRequest size="lg" />
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QtyStepper value={qty} onChange={setQty} />
              <Button
                size="lg"
                onClick={() => {
                  add(product.slug, qty);
                  setAdded(true);
                }}
                className="flex-1 sm:flex-none"
              >
                {added ? <CheckIcon className="h-4 w-4" /> : <CartIcon className="h-4 w-4" />}
                {added ? t.product.added : t.product.addToCart}
              </Button>
            </div>

            <ExternalButton
              href={singleProductLink(name, lang)}
              variant="outline"
              size="lg"
              className="mt-3 w-full"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.product.orderDirect}
            </ExternalButton>

            {inCart > 0 && (
              <p className="hud mt-4 flex items-center gap-2 text-sable-faint" role="status">
                <CheckIcon className="h-3.5 w-3.5 text-amber" />
                {t.product.inCart} · {t.cart.units(inCart)}
                <Link to="/panier" className="text-amber underline-offset-4 hover:underline">
                  {t.nav.viewCart}
                </Link>
              </p>
            )}

            {/* Specs */}
            <section className="mt-12" aria-labelledby="specs-title">
              <h2 id="specs-title" className="hud flex items-center gap-2.5 text-sable-faint">
                <span className="h-px w-6 bg-trame-lift" aria-hidden />
                {t.product.specs}
              </h2>
              <dl className="mt-5 overflow-hidden rounded-xl border border-trame">
                {product.specs.map((s, i) => (
                  <div
                    key={s.label.fr}
                    className={`grid grid-cols-[minmax(7.5rem,38%)_1fr] gap-4 px-4 py-3.5 text-[13px] sm:px-5 sm:text-sm ${
                      i % 2 ? 'bg-caisse/40' : 'bg-caisse'
                    }`}
                  >
                    <dt className="text-sable-faint">{s.label[lang]}</dt>
                    <dd className="text-sable">{s.value[lang]}</dd>
                  </div>
                ))}
              </dl>
              <p className="hud mt-4 text-sable-faint">
                {t.product.reference} : <span className="latin text-sable-dim">{product.slug}</span>
              </p>
            </section>
          </div>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-trame bg-caisse/30" aria-labelledby="related-title">
          <Container className="py-16 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="font-display text-title font-bold text-white">
                {t.product.related}
              </h2>
              {category && (
                <Link
                  to={`/catalogue/${category.id}`}
                  className="hud group flex shrink-0 items-center gap-2 text-amber hover:text-amber-lift"
                >
                  {category.name[lang]}
                  <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </Link>
              )}
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
