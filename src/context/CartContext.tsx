import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';

const STORAGE_KEY = 'basma.cart.v1';
const MAX_QTY = 99;

export interface CartLine {
  slug: string;
  qty: number;
}

/** A cart line joined to its product. Lines whose product no longer exists are dropped. */
export interface ResolvedLine extends CartLine {
  product: Product;
}

interface CartValue {
  lines: CartLine[];
  resolved: ResolvedLine[];
  /** Number of distinct products. */
  lineCount: number;
  /** Sum of quantities — this is what the header badge shows. */
  unitCount: number;
  qtyOf: (slug: string) => number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

function load(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (l): l is CartLine =>
          !!l && typeof l === 'object' && typeof (l as CartLine).slug === 'string' && typeof (l as CartLine).qty === 'number',
      )
      .map((l) => ({ slug: l.slug, qty: Math.min(MAX_QTY, Math.max(1, Math.round(l.qty))) }))
      // Drop anything that is no longer in the catalogue.
      .filter((l) => PRODUCTS.some((p) => p.slug === l.slug));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full or blocked — the cart just won't survive a reload */
    }
  }, [lines]);

  // Keep two tabs in sync; people do open the catalogue twice.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setLines(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...prev, { slug, qty: Math.min(MAX_QTY, Math.max(1, qty)) }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const resolved = lines
      .map((line) => {
        const product = PRODUCTS.find((p) => p.slug === line.slug);
        return product ? { ...line, product } : null;
      })
      .filter((l): l is ResolvedLine => l !== null);

    return {
      lines,
      resolved,
      lineCount: resolved.length,
      unitCount: resolved.reduce((sum, l) => sum + l.qty, 0),
      qtyOf: (slug) => lines.find((l) => l.slug === slug)?.qty ?? 0,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

export { MAX_QTY };
