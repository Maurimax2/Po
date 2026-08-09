import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { dictionaries, type Dict, type Lang } from '../i18n';

const STORAGE_KEY = 'basma.lang';

interface LangValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dict;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Picks the right side of a { fr, ar } pair. */
  pick: (pair: { fr: string; ar: string }) => string;
}

const LangContext = createContext<LangValue | null>(null);

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'fr';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'fr' || stored === 'ar') return stored;
  // French is the default; only switch on an explicitly Arabic browser.
  return navigator.language?.startsWith('ar') ? 'ar' : 'fr';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private browsing — the site still works, it just forgets the choice */
    }
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'fr' ? 'ar' : 'fr')), []);

  const value = useMemo<LangValue>(
    () => ({
      lang,
      dir,
      t: dictionaries[lang],
      setLang,
      toggle,
      pick: (pair) => pair[lang],
    }),
    [lang, dir, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
