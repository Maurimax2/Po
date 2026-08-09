/**
 * The brand device.
 *
 * Basma's logo is a fingerprint that closes into a camera iris. This is that
 * iris reduced to a line mark: a ring plus six blade edges, each blade's inner
 * vertex offset along the tangent — which is what gives a real lens iris its
 * pinwheel geometry rather than a pie chart.
 *
 * Used as a static mark before section titles, in the empty-cart state and on
 * the map panel. No animation: it belongs to the identity, it is not an effect.
 */

const BLADES = 6;

export function ApertureMark({ className = '' }: { className?: string }) {
  const step = 360 / BLADES;
  const rad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="50" cy="50" r="41" opacity="0.5" />
        {Array.from({ length: BLADES }, (_, i) => {
          const a = i * step;
          const x1 = 50 + 14 * Math.cos(rad(a + 90));
          const y1 = 50 + 14 * Math.sin(rad(a + 90));
          const x2 = 50 + 39 * Math.cos(rad(a + step / 2));
          const y2 = 50 + 39 * Math.sin(rad(a + step / 2));
          return <path key={i} d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
        })}
      </g>
    </svg>
  );
}
