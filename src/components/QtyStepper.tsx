import { MinusIcon, PlusIcon } from './Icons';
import { useLang } from '../context/LangContext';
import { MAX_QTY } from '../context/CartContext';

/**
 * Quantity control. Deliberately chunky: 44px targets, because the whole
 * audience is on a phone and half of them are standing in a shop.
 */
export function QtyStepper({
  value,
  onChange,
  size = 'md',
  min = 1,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  size?: 'sm' | 'md';
  min?: number;
  label?: string;
}) {
  const { t } = useLang();
  const box = size === 'sm' ? 'h-10' : 'h-12';
  const btn = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';

  return (
    <div
      className={`inline-flex ${box} items-center rounded-full border border-trame bg-caisse`}
      role="group"
      aria-label={label ?? t.product.quantity}
    >
      <button
        type="button"
        className={`${btn} grid shrink-0 place-items-center rounded-full text-sable-dim transition-colors hover:text-amber disabled:opacity-30 disabled:hover:text-sable-dim`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={t.product.decrease}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span
        className="font-mono w-8 text-center text-sm font-semibold tabular-nums text-white"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        className={`${btn} grid shrink-0 place-items-center rounded-full text-sable-dim transition-colors hover:text-amber disabled:opacity-30 disabled:hover:text-sable-dim`}
        onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
        disabled={value >= MAX_QTY}
        aria-label={t.product.increase}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
