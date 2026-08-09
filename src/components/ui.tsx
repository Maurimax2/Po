import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ApertureMark } from './Aperture';
import { useLang } from '../context/LangContext';
import { cardImage, cutoutImage, wideImage } from '../lib/images';

/* ── Viewfinder corner brackets ────────────────────────────────────────────
   Four L-shaped marks at the corners of an image. On hover (inside a `group`)
   they grow and brighten, like a camera locking focus. */
export function Corners({ subtle = false }: { subtle?: boolean }) {
  const tone = subtle ? 'border-sable/25' : 'border-amber/70';
  const common = `pointer-events-none absolute z-10 h-3.5 w-3.5 ${tone} transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-6 group-hover:w-6 group-hover:border-amber`;
  return (
    <>
      <span className={`${common} start-2 top-2 border-s border-t`} />
      <span className={`${common} end-2 top-2 border-e border-t`} />
      <span className={`${common} bottom-2 start-2 border-b border-s`} />
      <span className={`${common} bottom-2 end-2 border-b border-e`} />
    </>
  );
}

/* ── Section heading ───────────────────────────────────────────────────────
   Aperture tick + monospace eyebrow + display title. Used on every section so
   the page has one rhythm instead of six. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'start',
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: 'start' | 'center';
  id?: string;
}) {
  return (
    <header className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`hud flex items-center gap-2.5 text-amber ${align === 'center' ? 'justify-center' : ''}`}>
        <ApertureMark className="h-3.5 w-3.5 shrink-0" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display mt-4 text-display font-bold text-white text-balance">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[15px] leading-relaxed text-sable-dim sm:text-base">{lead}</p>}
    </header>
  );
}

/* ── Buttons ───────────────────────────────────────────────────────────────
   Three levels only. The amber is the accent and is not spent anywhere else. */
const buttonBase =
  'inline-flex items-center justify-center gap-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 sm:text-sm';

const variants = {
  primary: 'bg-amber text-black hover:bg-amber-lift active:scale-[.98] shadow-[0_0_0_0_rgba(236,131,4,.5)] hover:shadow-[0_6px_28px_-8px_rgba(236,131,4,.75)]',
  outline: 'border border-trame-lift text-sable hover:border-amber hover:text-amber active:scale-[.98]',
  solid: 'bg-caisse-lift text-sable border border-trame hover:border-trame-lift hover:bg-trame/60 active:scale-[.98]',
  quiet: 'text-sable-dim hover:text-amber',
} as const;

const sizes = {
  sm: 'h-9 px-4',
  md: 'h-11 px-5',
  lg: 'h-13 px-7 text-sm sm:text-[15px]',
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={`${buttonBase} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={`${buttonBase} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}

export function ExternalButton({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonBase} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

/* ── Price slot ────────────────────────────────────────────────────────────
   There is no price on this site, by design. This component is the only thing
   that ever occupies the place a price would take. */
export function PriceOnRequest({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const { t } = useLang();
  if (size === 'lg') {
    return (
      <div className="border-s-2 border-amber ps-4">
        <p className="font-display text-title font-bold text-amber">{t.product.priceOnRequest}</p>
        <p className="mt-1 text-[13px] text-sable-faint">{t.product.priceNote}</p>
      </div>
    );
  }
  return <p className="hud whitespace-nowrap text-amber">{t.product.priceOnRequest}</p>;
}

/* ── Badge ─────────────────────────────────────────────────────────────────*/
export function Badge({ children, tone = 'amber' }: { children: ReactNode; tone?: 'amber' | 'quiet' }) {
  return (
    <span
      className={`hud inline-flex items-center rounded-full px-2.5 py-1.5 leading-none backdrop-blur-sm ${
        tone === 'amber' ? 'bg-amber text-black' : 'border border-sable/25 bg-noir/70 text-sable'
      }`}
    >
      {children}
    </span>
  );
}

/* ── Images ────────────────────────────────────────────────────────────────
   Width/height always set from the generated derivative so the browser
   reserves the box before the bytes arrive. No layout shift, anywhere. */
export function CardImage({
  name,
  alt,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw',
  className = '',
  eager = false,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const img = cardImage(name);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={className}
    />
  );
}

export function WideImage({
  name,
  alt,
  sizes = '(min-width: 1024px) 60vw, 96vw',
  className = '',
  eager = false,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const img = wideImage(name);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={className}
    />
  );
}

/** Transparent product cut-out on a square canvas — hero and feature sections. */
export function CutoutImage({
  name,
  alt,
  sizes = '(min-width: 1024px) 30vw, 60vw',
  className = '',
  eager = false,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const img = cutoutImage(name);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={className}
    />
  );
}

/* ── Layout helper ─────────────────────────────────────────────────────────*/
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10 ${className}`}>{children}</div>;
}
