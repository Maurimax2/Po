import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ApertureMark } from './Aperture';
import { useLang } from '../context/LangContext';
import { cardImage, cutoutImage, wideImage } from '../lib/images';

/* ── Corner brackets ───────────────────────────────────────────────────────
   Four L-shaped marks framing an image, from the lens motif in the logo. They
   sit in the rule colour and only pick up the accent on hover, so they read as
   a printed catalogue frame rather than an on-screen effect. */
export function Corners({ subtle = false }: { subtle?: boolean }) {
  const tone = subtle ? 'border-line' : 'border-line-strong';
  const common = `pointer-events-none absolute z-10 h-3.5 w-3.5 ${tone} transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-5 group-hover:w-5 group-hover:border-amber`;
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
   Aperture mark + eyebrow + display title. Used on every section so the page
   keeps one rhythm instead of six. */
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
      <p className={`eyebrow flex items-center gap-2.5 text-amber-ink ${align === 'center' ? 'justify-center' : ''}`}>
        <ApertureMark className="h-4 w-4 shrink-0" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display mt-3.5 text-display font-bold text-ink text-balance">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">{lead}</p>}
    </header>
  );
}

/* ── Buttons ───────────────────────────────────────────────────────────────
   Three levels only. The amber is the accent and is not spent anywhere else. */
const buttonBase =
  'inline-flex items-center justify-center gap-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 sm:text-sm';

/* The orange only reaches 2.6:1 on white, so it is never used as small text.
   As a fill with near-black type on top it clears 7:1. */
const variants = {
  primary: 'bg-amber text-ink hover:bg-amber-deep active:scale-[.98] shadow-[0_2px_10px_-4px_rgba(236,131,4,.6)] hover:shadow-[0_8px_22px_-8px_rgba(236,131,4,.8)]',
  outline: 'border border-line-strong text-ink hover:border-ink hover:bg-surface active:scale-[.98]',
  solid: 'bg-ink text-page hover:bg-ink/90 active:scale-[.98]',
  quiet: 'text-ink-soft hover:text-amber-ink',
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
      <div className="rounded-lg border border-amber/40 bg-amber-wash px-5 py-4">
        <p className="font-display text-title font-bold text-ink">{t.product.priceOnRequest}</p>
        <p className="mt-1 text-[13px] text-amber-ink">{t.product.priceNote}</p>
      </div>
    );
  }
  return (
    <p className="text-[13px] font-semibold whitespace-nowrap text-amber-ink">{t.product.priceOnRequest}</p>
  );
}

/* ── Badge ─────────────────────────────────────────────────────────────────*/
export function Badge({ children, tone = 'amber' }: { children: ReactNode; tone?: 'amber' | 'quiet' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1.5 text-[11px] leading-none font-semibold ${
        tone === 'amber' ? 'bg-amber text-ink' : 'border border-line bg-page/90 text-ink-soft backdrop-blur-sm'
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
