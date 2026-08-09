import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useTitle } from '../lib/hooks';
import { CATEGORIES, PRODUCTS, getCategory, type Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button, Container, LinkButton, SectionHeading } from '../components/ui';
import { CATEGORY_ICONS, CloseIcon, SearchIcon } from '../components/Icons';

type SortKey = 'default' | 'nameAsc' | 'nameDesc' | 'newest';

/** Cheap accent-insensitive match — "camera" should find "Caméra". */
const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Arabic diacritics and tatweel, so "كاميرا" matches regardless of harakat,
    // plus the alef/ya/ta-marbuta variants people actually type on a phone.
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه');

function searchable(p: Product): string {
  return normalise(
    [
      p.name.fr,
      p.name.ar,
      p.slug,
      p.shortDescription.fr,
      p.shortDescription.ar,
      ...p.specs.flatMap((s) => [s.value.fr, s.value.ar, s.label.fr, s.label.ar]),
    ].join(' '),
  );
}

export default function Catalogue() {
  const { category } = useParams<{ category?: string }>();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('default');

  const active = category ? getCategory(category) : undefined;
  const unknownCategory = Boolean(category && !active);

  useTitle(
    active
      ? `${active.name[lang]} — ${t.brand.name}`
      : `${t.catalogue.title} — ${t.brand.full}`,
  );

  const results = useMemo(() => {
    const terms = normalise(query.trim()).split(/\s+/).filter(Boolean);
    let list = PRODUCTS.filter((p) => (active ? p.category === active.id : true));

    if (terms.length) {
      list = list.filter((p) => {
        const haystack = searchable(p);
        return terms.every((term) => haystack.includes(term));
      });
    }

    const collator = new Intl.Collator(lang === 'ar' ? 'ar' : 'fr');
    switch (sort) {
      case 'nameAsc':
        return [...list].sort((a, b) => collator.compare(a.name[lang], b.name[lang]));
      case 'nameDesc':
        return [...list].sort((a, b) => collator.compare(b.name[lang], a.name[lang]));
      case 'newest':
        return [...list].sort((a, b) => Number(b.badge === 'Nouveau') - Number(a.badge === 'Nouveau'));
      default:
        return list;
    }
  }, [active, query, sort, lang]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="trame-grid absolute inset-0 opacity-40" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(70%_80%_at_20%_0%,rgba(236,131,4,0.08),transparent_72%)]"
          aria-hidden
        />
        <Container className="relative py-12 sm:py-16">
          <SectionHeading
            eyebrow={active ? active.tagline[lang] : t.categories.eyebrow}
            title={active ? active.name[lang] : t.catalogue.title}
            lead={active ? active.description[lang] : t.catalogue.lead}
          />
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        {/* Filters */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.catalogue.searchPlaceholder}
                aria-label={t.catalogue.search}
                className="h-12 w-full rounded-full border border-line bg-surface ps-11 pe-11 text-sm text-ink placeholder:text-ink-faint focus:border-amber focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute end-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink-faint transition-colors hover:text-amber-ink"
                  aria-label={t.catalogue.clearSearch}
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            <label className="flex items-center gap-3 sm:shrink-0">
              <span className="text-[13px] font-semibold text-ink-faint">{t.catalogue.sort}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-12 rounded-full border border-line bg-surface px-4 text-sm text-ink focus:border-amber focus:outline-none"
              >
                {(Object.keys(t.catalogue.sortOptions) as SortKey[]).map((key) => (
                  <option key={key} value={key} className="bg-surface">
                    {t.catalogue.sortOptions[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Category chips — horizontally scrollable on a phone. */}
          <nav aria-label={t.nav.categories} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              <li>
                <Link
                  to="/catalogue"
                  className={`eyebrow inline-flex h-10 items-center rounded-full border px-4 transition-colors ${
                    !active
                      ? 'border-amber bg-amber text-ink'
                      : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {t.catalogue.all}
                </Link>
              </li>
              {CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICONS[c.id];
                const on = active?.id === c.id;
                return (
                  <li key={c.id}>
                    <Link
                      to={`/catalogue/${c.id}`}
                      className={`eyebrow inline-flex h-10 items-center gap-2 rounded-full border px-4 transition-colors ${
                        on
                          ? 'border-amber bg-amber text-ink'
                          : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {c.name[lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className="text-[13px] font-semibold text-ink-faint" role="status" aria-live="polite">
            {t.catalogue.resultCount(results.length)}
          </p>
        </div>

        {/* Results */}
        {unknownCategory || results.length === 0 ? (
          <div className="mt-12 rounded-xl border border-line bg-surface px-6 py-16 text-center">
            <h2 className="font-display text-title font-bold text-ink">{t.catalogue.noResults}</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-ink-soft">{t.catalogue.noResultsText}</p>
            <div className="mt-7 flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('');
                  setSort('default');
                  navigate('/catalogue');
                }}
              >
                {t.catalogue.reset}
              </Button>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} eager={i < 4} />
              </li>
            ))}
          </ul>
        )}

        {active && (
          <div className="mt-14 flex justify-center">
            <LinkButton to="/catalogue" variant="quiet" size="sm">
              {t.catalogue.all}
            </LinkButton>
          </div>
        )}
      </Container>
    </>
  );
}
