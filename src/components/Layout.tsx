import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLang } from '../context/LangContext';

/** Route changes should start at the top of the page, not wherever you were. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Layout() {
  const { t } = useLang();
  return (
    <>
      <ScrollToTop />
      <a
        href="#contenu"
        className="text-[13px] font-semibold sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-amber focus:px-5 focus:py-3 focus:text-ink"
      >
        {t.nav.skip}
      </a>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
