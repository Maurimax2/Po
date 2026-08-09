import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoMark from '../assets/generated/cutouts/logo-mark.png';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import { SHOP } from '../data/shop';
import { generalLink } from '../lib/whatsapp';
import { useScrollLock } from '../lib/hooks';
import { CartIcon, CloseIcon, MenuIcon, WhatsAppIcon } from './Icons';
import { CATEGORY_ICONS } from './Icons';
import { Container, ExternalButton } from './ui';

export function Header() {
  const { t, lang, toggle } = useLang();
  const { unitCount } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useScrollLock(open);
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-semibold transition-colors ${
      isActive ? 'text-amber-ink' : 'text-ink-soft hover:text-ink'
    }`;

  return (
    <>
      {/* Utility strip — the phone number is the single most useful thing here. */}
      <div className="hidden border-b border-line bg-surface md:block">
        <Container className="flex h-9 items-center justify-between">
          <p className="text-[12.5px] text-ink-faint">
            {SHOP.city} — {SHOP.country}
          </p>
          <div className="flex items-center gap-5 text-[12.5px] text-ink-faint">
            <span>{t.footer.noPrice}</span>
            <a
              href={`tel:${SHOP.phoneHref}`}
              className="latin numeric font-semibold text-ink transition-colors hover:text-amber-ink"
            >
              {SHOP.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-line bg-page/90 backdrop-blur-xl' : 'border-line/60 bg-page'
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={t.brand.full}>
            <img
              src={logoMark}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
              // The mark is on every page — never let it arrive late.
              fetchPriority="high"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {t.brand.name}
              </span>
              <span className="mt-1 hidden text-[11.5px] text-ink-faint sm:block">
                {lang === 'fr' ? 'Services publics' : 'للخدمات العامة'}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label={t.nav.menu}>
            <NavLink to="/" className={navLink} end>
              {t.nav.home}
            </NavLink>
            <NavLink to="/catalogue" className={navLink}>
              {t.nav.catalogue}
            </NavLink>
            <NavLink to="/contact" className={navLink}>
              {t.nav.contact}
            </NavLink>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              onClick={toggle}
              className="h-10 rounded-full border border-line-strong px-3.5 text-[13px] font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
              aria-label={t.meta.switchToAria}
              lang={lang === 'fr' ? 'ar' : 'fr'}
            >
              <span className="sm:hidden">{t.meta.switchToShort}</span>
              <span className="hidden sm:inline">{t.meta.switchTo}</span>
            </button>

            <ExternalButton
              href={generalLink(lang)}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              aria-label={t.contactStrip.cta}
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </ExternalButton>

            <Link
              to="/panier"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-surface"
              aria-label={unitCount > 0 ? t.a11y.cartCount(unitCount) : t.a11y.cartEmpty}
            >
              <CartIcon className="h-[18px] w-[18px]" />
              {unitCount > 0 && (
                <span className="numeric absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber px-1 text-[10px] font-bold text-ink">
                  {unitCount > 99 ? '99+' : unitCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-surface lg:hidden"
              aria-label={t.nav.openMenu}
              aria-expanded={open}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu — full sheet, big targets, categories included so the
          catalogue is one tap away instead of two. */}
      {open && (
        <div className="fixed inset-0 z-60 lg:hidden" role="dialog" aria-modal="true" aria-label={t.nav.menu}>
          <div className="absolute inset-0 bg-page" onClick={() => setOpen(false)} />
          <div className="anim-rise relative flex h-full flex-col overflow-y-auto">
            <Container className="flex h-16 shrink-0 items-center justify-between">
              <span className="text-[13px] font-semibold text-ink-faint">{t.nav.menu}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink"
                aria-label={t.nav.closeMenu}
                autoFocus
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </Container>

            <Container className="flex flex-1 flex-col gap-8 pt-4 pb-12">
              <nav className="flex flex-col" aria-label={t.nav.menu}>
                {[
                  { to: '/', label: t.nav.home },
                  { to: '/catalogue', label: t.nav.catalogue },
                  { to: '/panier', label: t.nav.cart },
                  { to: '/contact', label: t.nav.contact },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `font-display border-b border-line py-4 text-2xl font-bold ${
                        isActive ? 'text-amber-ink' : 'text-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div>
                <p className="mb-3 text-[13px] font-semibold text-ink-faint">{t.nav.categories}</p>
                <ul className="grid gap-2">
                  {CATEGORIES.map((c) => {
                    const Icon = CATEGORY_ICONS[c.id];
                    return (
                      <li key={c.id}>
                        <Link
                          to={`/catalogue/${c.id}`}
                          className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3.5 text-sm font-medium text-ink"
                        >
                          <Icon className="h-5 w-5 shrink-0 text-amber-ink" />
                          {c.name[lang]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ExternalButton href={generalLink(lang)} size="lg" className="w-full">
                <WhatsAppIcon className="h-5 w-5" />
                {t.contactStrip.cta}
              </ExternalButton>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
