import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { useTitle } from '../lib/hooks';
import { getCategory } from '../data/products';
import { QtyStepper } from '../components/QtyStepper';
import { Button, CardImage, Container, Corners, LinkButton, PriceOnRequest } from '../components/ui';
import { ApertureMark } from '../components/Aperture';
import { ArrowIcon, CloseIcon } from '../components/Icons';

export default function Cart() {
  const { t, lang } = useLang();
  const { resolved, lineCount, unitCount, setQty, remove, clear } = useCart();

  useTitle(`${t.cart.title} — ${t.brand.name}`);

  if (resolved.length === 0) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-trame bg-caisse text-amber">
            <ApertureMark className="h-9 w-9" spin />
          </span>
          <h1 className="font-display mt-8 text-display font-bold text-white">{t.cart.empty}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-sable-dim">{t.cart.emptyText}</p>
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

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="hud flex items-center gap-2.5 text-amber">
          <ApertureMark className="h-3.5 w-3.5" />
          {t.cart.articles(lineCount)}
        </p>
        <h1 className="font-display mt-4 text-display font-bold text-white">{t.cart.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-sable-dim">{t.cart.lead}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start lg:gap-10">
        {/* Lines */}
        <ul className="min-w-0 space-y-3">
          {resolved.map(({ product, qty }) => {
            const category = getCategory(product.category);
            const name = product.name[lang];
            return (
              <li
                key={product.slug}
                className="group relative flex gap-4 rounded-xl border border-trame bg-caisse p-3 sm:gap-5 sm:p-4"
              >
                <Link
                  to={`/produit/${product.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-noir sm:h-28 sm:w-24"
                  tabIndex={-1}
                  aria-hidden
                >
                  <CardImage name={product.images[0]} alt="" sizes="96px" className="h-full w-full object-cover" />
                  <Corners subtle />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {category && <p className="hud truncate text-sable-faint">{category.name[lang]}</p>}
                      <h2 className="font-display mt-1.5 text-[15px] leading-snug font-semibold text-white">
                        <Link to={`/produit/${product.slug}`} className="transition-colors hover:text-amber">
                          {name}
                        </Link>
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sable-faint transition-colors hover:bg-noir hover:text-amber"
                      aria-label={t.cart.removeAria(name)}
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <PriceOnRequest />
                    <QtyStepper
                      value={qty}
                      onChange={(next) => setQty(product.slug, next)}
                      size="sm"
                      min={1}
                      label={`${t.product.quantity} — ${name}`}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary — counts only. There is no money on this page, on purpose. */}
        <aside className="min-w-0 rounded-xl border border-trame bg-caisse p-6 lg:sticky lg:top-24">
          <h2 className="hud text-sable-faint">{t.cart.summary}</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sable-dim">{t.cart.lines}</dt>
              <dd className="font-mono font-semibold text-white tabular-nums">{lineCount}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sable-dim">{t.cart.totalUnits}</dt>
              <dd className="font-mono font-semibold text-white tabular-nums">{unitCount}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-trame pt-6">
            <p className="hud text-amber">{t.product.priceOnRequest}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-sable-faint">{t.cart.lead}</p>
          </div>

          <LinkButton to="/commande" size="lg" className="mt-6 w-full">
            {t.cart.checkout}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </LinkButton>
          <LinkButton to="/catalogue" variant="quiet" size="sm" className="mt-3 w-full">
            {t.cart.continue}
          </LinkButton>
          <Button
            variant="quiet"
            size="sm"
            className="mt-1 w-full"
            onClick={() => {
              if (window.confirm(t.cart.clearConfirm)) clear();
            }}
          >
            {t.cart.clear}
          </Button>
        </aside>
      </div>
    </Container>
  );
}
