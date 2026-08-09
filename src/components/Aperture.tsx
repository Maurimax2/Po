import type { CSSProperties } from 'react';

/**
 * The signature motif.
 *
 * `<ApertureBlades>` is a six-blade iris drawn from real geometry: each blade's
 * inner vertex is offset along the tangent, which is what gives a lens iris its
 * pinwheel look rather than a pie chart. It sits over the hero image and swings
 * open once on load. Everything else on the site borrows this shape at a much
 * lower volume.
 */

const BLADES = 6;
const R = 82; // blade outer radius, viewBox units — overshoots the 100×100 frame
const OFFSET = 9; // tangential offset of the inner vertex = the iris opening

function bladePath(index: number): string {
  const step = 360 / BLADES;
  const a = index * step;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const pt = (angle: number, radius: number) =>
    `${(50 + radius * Math.cos(rad(angle))).toFixed(2)} ${(50 + radius * Math.sin(rad(angle))).toFixed(2)}`;

  // Inner vertex pushed sideways from the centre — the opening of the iris.
  const inner = pt(a + 90, OFFSET);
  const start = pt(a - step / 2 - 2, R);
  const end = pt(a + step / 2 + 2, R);
  return `M ${inner} L ${start} A ${R} ${R} 0 0 1 ${end} Z`;
}

interface Props {
  className?: string;
  style?: CSSProperties;
}

export function ApertureBlades({ className = '', style }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={style}
      aria-hidden
      focusable="false"
    >
      <g className="anim-iris-blades" style={{ transformOrigin: '50% 50%' }}>
        {Array.from({ length: BLADES }, (_, i) => (
          <path
            key={i}
            d={bladePath(i)}
            fill="#0B0B0C"
            stroke="rgba(236,131,4,0.55)"
            strokeWidth="0.4"
            opacity={i % 2 ? 0.97 : 1}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * The same iris as a small line mark. Used as the tick before every section
 * title, and inside buttons where the logo would be too loud.
 */
export function ApertureMark({ className = '', spin = false }: { className?: string; spin?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        style={spin ? { transformOrigin: '50% 50%', animation: 'iris-open 1.6s var(--ease-iris) both' } : undefined}
      >
        <circle cx="50" cy="50" r="42" strokeWidth="4" opacity="0.55" />
        {Array.from({ length: BLADES }, (_, i) => {
          const step = 360 / BLADES;
          const a = i * step;
          const rad = (d: number) => (d * Math.PI) / 180;
          const x1 = 50 + 15 * Math.cos(rad(a + 90));
          const y1 = 50 + 15 * Math.sin(rad(a + 90));
          const x2 = 50 + 40 * Math.cos(rad(a + step / 2));
          const y2 = 50 + 40 * Math.sin(rad(a + step / 2));
          return <path key={i} d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
        })}
      </g>
    </svg>
  );
}
