interface PixelIconProps {
  className?: string;
}

export function HomeIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 2l14 10h-4v18h-8V22h-4v8H6V12H2z" />
      <rect x="10" y="0" width="12" height="4" />
    </svg>
  );
}

export function BagIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="6" y="10" width="20" height="18" />
      <rect x="6" y="8" width="20" height="6" />
      <rect x="13" y="2" width="6" height="8" />
      <rect x="12" y="14" width="8" height="6" fill="#fffdf5" />
      <rect x="22" y="18" width="4" height="4" />
      <rect x="6" y="18" width="4" height="4" />
    </svg>
  );
}

export function TaskIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="22" height="26" />
      <rect x="9" y="8" width="14" height="2" fill="#fffdf5" />
      <rect x="9" y="12" width="10" height="2" fill="#fffdf5" />
      <rect x="9" y="16" width="14" height="2" fill="#fffdf5" />
      <rect x="9" y="20" width="10" height="2" fill="#fffdf5" />
      <rect x="9" y="24" width="14" height="2" fill="#fffdf5" />
    </svg>
  );
}

export function CheckInIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="4" y="6" width="24" height="22" />
      <rect x="4" y="6" width="24" height="6" fill="#fffdf5" />
      <rect x="10" y="0" width="4" height="8" />
      <rect x="20" y="0" width="4" height="8" />
      <rect x="8" y="16" width="16" height="3" fill="#fffdf5" />
      <rect x="8" y="21" width="10" height="3" fill="#fffdf5" />
    </svg>
  );
}

export function CigaretteIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="2" y="13" width="6" height="10" />
      <rect x="3" y="14" width="2" height="3" fill="#fffdf5" />
      <rect x="3" y="19" width="2" height="3" fill="#fffdf5" />
      <rect x="8" y="15" width="14" height="6" fill="#fffdf5" />
      <rect x="22" y="16" width="6" height="4" fill="#ffd700" />
      <path d="M8 15h4v6H8z" fill="#e52521" />
    </svg>
  );
}

export function HeartIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 28C6 21 2 15 2 9.5 2 5 5.5 2 9.5 2 12 2 14.5 3.5 16 6c1.5-2.5 4-4 6.5-4C26.5 2 30 5 30 9.5 30 15 26 21 16 28z" />
    </svg>
  );
}

export function SettingIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="16" cy="16" r="6" />
      <path d="M16 2l3 6h-6zM16 30l-3-6h6zM2 16l6-3v6zM30 16l-6 3v-6z" />
      <rect x="12" y="2" width="8" height="2" />
      <rect x="12" y="28" width="8" height="2" />
      <rect x="2" y="12" width="2" height="8" />
      <rect x="28" y="12" width="2" height="8" />
    </svg>
  );
}

export function MusicIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="12" y="2" width="16" height="4" />
      <rect x="12" y="6" width="4" height="18" />
      <rect x="6" y="10" width="4" height="16" />
      <rect x="12" y="24" width="10" height="6" />
      <rect x="6" y="26" width="8" height="4" />
    </svg>
  );
}

export function GlobeIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M3 16h26M16 3c4 4 4 22 0 26M16 3c-4 4-4 22 0 26" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function UserIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="16" cy="9" r="7" />
      <path d="M4 30c0-7 5-11 12-11s12 4 12 11z" />
    </svg>
  );
}

export function LogoutIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="2" y="4" width="16" height="24" />
      <rect x="6" y="14" width="12" height="4" fill="#fffdf5" />
      <path d="M22 8l8 8-8 8v-5h-4v-6h4z" />
    </svg>
  );
}

export function CoinIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="#ffd700" stroke="#000" strokeWidth="3" />
      <rect x="8" y="7" width="9" height="4" fill="#fff4c2" />
    </svg>
  );
}

export function ShopIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2 10h28l-3-7H5z" />
      <rect x="2" y="10" width="28" height="6" />
      <rect x="4" y="16" width="24" height="14" />
      <rect x="6" y="18" width="6" height="5" fill="#fffdf5" />
      <rect x="14" y="18" width="6" height="5" fill="#fffdf5" />
      <rect x="22" y="18" width="4" height="12" fill="#fffdf5" />
      <rect x="6" y="23" width="6" height="7" fill="#fffdf5" />
      <rect x="14" y="23" width="6" height="7" fill="#fffdf5" />
    </svg>
  );
}

export function TrophyIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 6h5v2H6v3c0 3.5 2.5 6 6 7.5V20h8v-1.5c3.5-1.5 6-4 6-7.5V8h-3V6h5v5c0 5-4 8-9 8.5V22h6v4h-5v2h-8v-2h-5v-4h6v-2.5C8 19 4 16 4 11z" />
    </svg>
  );
}

export function BellIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 2c5 0 9 4 9 9v6l4 5H3l4-5v-6c0-5 4-9 9-9z" />
      <rect x="13" y="24" width="6" height="5" />
    </svg>
  );
}

export function NoteIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" fill="#fffdf5" />
      <path d="M6 6h20v4H6z" fill="#ffd700" />
      <path d="M6 14h20v2H6z" />
      <path d="M6 20h20v2H6z" />
      <rect x="4" y="2" width="24" height="28" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function ShareIcon({ className }: PixelIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="16" r="4" />
      <circle cx="26" cy="7" r="4" />
      <circle cx="26" cy="25" r="4" />
      <path d="M9.5 14.5l13-6M9.5 17.5l13 6" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}