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