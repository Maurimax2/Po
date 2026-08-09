import { Link } from 'react-router-dom';
import logoMark from '../assets/generated/cutouts/logo-mark.png';
import { useLang } from '../context/LangContext';
import { CATEGORIES } from '../data/products';
import { SHOP } from '../data/shop';
import { generalLink } from '../lib/whatsapp';
import { Container, ExternalButton } from './ui';
import { PhoneIcon, PinIcon, WhatsAppIcon } from './Icons';

export function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-page">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <img src={logoMark} alt="" width={56} height={56} className="h-13 w-13" loading="lazy" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-extrabold tracking-tight text-ink">{t.brand.name}</span>
                <span className="mt-1.5 text-[12px] text-ink-faint">{t.brand.full}</span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">{t.footer.about}</p>
            <p className="mt-5 text-[13px] font-semibold text-amber-ink">{t.brand.baseline}</p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="text-[13px] font-semibold text-ink-faint">
              {t.footer.navTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: '/', label: t.nav.home },
                { to: '/catalogue', label: t.nav.catalogue },
                { to: '/panier', label: t.nav.cart },
                { to: '/commande', label: t.cart.checkout },
                { to: '/contact', label: t.nav.contact },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-soft transition-colors hover:text-amber-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-cat">
            <h2 id="footer-cat" className="text-[13px] font-semibold text-ink-faint">
              {t.footer.catTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link to={`/catalogue/${c.id}`} className="text-ink-soft transition-colors hover:text-amber-ink">
                    {c.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-semibold text-ink-faint">{t.footer.contactTitle}</h2>
            <ul className="mt-5 space-y-4 text-sm text-ink-soft">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-ink" />
                <span>
                  {t.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-amber-ink" />
                <a href={`tel:${SHOP.phoneHref}`} className="latin transition-colors hover:text-amber-ink">
                  {SHOP.phoneDisplay}
                </a>
              </li>
            </ul>
            <ExternalButton href={generalLink(lang)} size="md" className="mt-6 w-full sm:w-auto">
              <WhatsAppIcon className="h-4 w-4" />
              {t.footer.orderCta}
            </ExternalButton>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-faint">
            © {year} {t.brand.full}. {t.footer.rights}
          </p>
          <p className="text-[12px] text-ink-faint">{t.footer.madeNote}</p>
        </Container>
      </div>
    </footer>
  );
}
