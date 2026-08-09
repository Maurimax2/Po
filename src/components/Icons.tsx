import type { SVGProps } from 'react';
import type { CategoryId } from '../data/products';

type Icon = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export const WhatsAppIcon: Icon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.17 8.17 0 0 1-1.26-4.37c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.28.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.84c0 4.55-3.7 8.21-8.25 8.21Zm4.53-6.15c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.19-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.42.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.13.17 1.72 2.62 4.16 3.67.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);

export const CartIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 4h2.2l1.6 9.6a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.3L19.5 7H6.2" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="16.5" cy="19" r="1.4" />
  </svg>
);

export const SearchIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const CloseIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const MenuIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const PlusIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const CheckIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ArrowIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12h16m-6.5-6.5L20 12l-6.5 6.5" />
  </svg>
);

export const ChevronIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const PinIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const ClockIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const PhoneIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M7.5 3.5h-2A2.5 2.5 0 0 0 3 6c0 8.3 6.7 15 15 15a2.5 2.5 0 0 0 2.5-2.5v-2l-4.2-1.6-2 2.2a13.6 13.6 0 0 1-6.4-6.4l2.2-2L7.5 3.5Z" />
  </svg>
);

export const ShieldIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.9 7 9.8 4.1-1.9 7-5.5 7-9.8V5.8L12 3Z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);

export const ToolIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M15.5 3.5a5 5 0 0 0-5.9 6.4L3.6 15.9a2 2 0 1 0 2.8 2.8l6-6a5 5 0 0 0 6.4-5.9l-2.9 2.9-2.4-.6-.6-2.4 2.6-3.2Z" />
  </svg>
);

export const TruckIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M2.5 6.5h10v10h-10zM12.5 10h4l3 3v3.5h-7z" />
    <circle cx="6.5" cy="18" r="1.6" />
    <circle cx="16.5" cy="18" r="1.6" />
  </svg>
);

export const HeadsetIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 13.5h2.2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4ZM20 13.5h-2.2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1v-4Z" />
    <path d="M18.5 18.5V19a2.5 2.5 0 0 1-2.5 2.5h-2" />
  </svg>
);

// ── Category marks ──────────────────────────────────────────────────────────

const CameraIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 8.5 16.5 5l1.4 5.2L4.4 13.8 3 8.5Z" />
    <path d="M17.9 10.2 21 9.3l-.9-3.2-3.1.9" />
    <path d="M7.5 13.2 8.6 17M6 20h6" />
    <circle cx="10.5" cy="9.4" r="1.4" />
  </svg>
);

const TvIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="5" width="19" height="12" rx="1.5" />
    <path d="M8.5 20.5h7M12 17v3.5" />
  </svg>
);

const AudioIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 10v4M8 7v10M12 4.5v15M16 8v8M20 10.5v3" />
  </svg>
);

const SolarIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="3.8" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
  </svg>
);

const FanIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="1.8" />
    <path d="M12 10.2c0-3 .6-5.7 2.4-5.7s2.6 3 .8 4.6c-1.3 1.2-3.2 1.1-3.2 1.1ZM13.8 12c3 0 5.7.6 5.7 2.4s-3 2.6-4.6.8c-1.2-1.3-1.1-3.2-1.1-3.2ZM12 13.8c0 3-.6 5.7-2.4 5.7s-2.6-3-.8-4.6c1.3-1.2 3.2-1.1 3.2-1.1ZM10.2 12c-3 0-5.7-.6-5.7-2.4s3-2.6 4.6-.8c1.2 1.3 1.1 3.2 1.1 3.2Z" />
  </svg>
);

const BoxIcon: Icon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3 3.5 7v10L12 21l8.5-4V7L12 3Z" />
    <path d="M3.5 7 12 11l8.5-4M12 11v10" />
  </svg>
);

export const CATEGORY_ICONS: Record<CategoryId, Icon> = {
  videosurveillance: CameraIcon,
  'tv-recepteurs': TvIcon,
  audio: AudioIcon,
  'energie-solaire': SolarIcon,
  ventilation: FanIcon,
  divers: BoxIcon,
};

export const TRUST_ICONS = [ShieldIcon, ToolIcon, TruckIcon, HeadsetIcon];
