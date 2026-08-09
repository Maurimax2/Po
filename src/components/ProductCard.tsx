import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { getCategory } from '../data/products';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { Badge, CardImage, Corners, PriceOnRequest } from './ui';
import { CartIcon, CheckIcon } from './Icons';

/**
 * The inventory card. Fixed 4:5 image box, uniform dark surface, viewfinder
 * brackets. A shelf photo and a studio render sit in the same frame and read
 * as one catalogue — which is the entire trick of this design.
 */
export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { t, lang } = useLang();
  const { add, qtyOf } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = qtyOf(product.slug);

  useEffect(() => {
    if (!justAdded) return;
    const id = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(id);
  }, [justAdded]);

  const name = product.name[lang];
  const category = getCategory(product.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-trame bg-caisse transition-colors duration-300 hover:border-trame-lift focus-within:border-amber/60">
      <div className="relative aspect-4/5 overflow-hidden bg-noir">
        <CardImage
          name={product.images[0]}
          alt={t.a11y.productImage(name)}
          eager={eager}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]"
        />
        <Corners />
        {product.badge && (
          <div className="absolute start-3.5 top-3.5 z-20">
            <Badge tone={product.badge === 'Stock disponible' ? 'quiet' : 'amber'}>{t.badges[product.badge]}</Badge>
          </div>
        )}
        {inCart > 0 && (
          <div className="absolute end-3.5 top-3.5 z-20">
            <span className="hud grid h-7 min-w-7 place-items-center rounded-full bg-amber px-2 text-black">
              {inCart}
            </span>
          </div>
        )}
        {/* Bottom fade so the card title never fights a bright photo edge. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-caisse to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {category && <p className="hud text-sable-faint">{category.name[lang]}</p>}
        <h3 className="font-display text-[15px] leading-snug font-semibold text-white sm:text-base">
          {/* The whole card is reachable through this one link. */}
          <Link to={`/produit/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-sable-dim">{product.shortDescription[lang]}</p>

        <div className="mt-auto space-y-3 pt-2">
          <PriceOnRequest />
          <button
            type="button"
            onClick={() => {
              add(product.slug);
              setJustAdded(true);
            }}
            className="relative z-20 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-trame-lift text-[12px] font-semibold text-sable transition-colors hover:border-amber hover:bg-amber/8 hover:text-amber"
            aria-label={`${t.product.addToCart} — ${name}`}
          >
            {justAdded ? <CheckIcon className="h-4 w-4 text-amber" /> : <CartIcon className="h-4 w-4" />}
            {justAdded ? t.product.added : t.product.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
}
