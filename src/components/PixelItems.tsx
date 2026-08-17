import type { ReactNode } from "react";

interface ItemIconProps {
  id: string;
  className?: string;
}

export function ItemIcon({ id, className }: ItemIconProps) {
  const common = "text-black";
  const icons: Record<string, ReactNode> = {
    coin: (
      <circle cx="16" cy="16" r="13" fill="#ffd700" stroke="currentColor" strokeWidth="3" />
    ),
    fire_flower: (
      <g stroke="currentColor" strokeWidth="2">
        <rect x="10" y="3" width="12" height="12" fill="#ff6a00" />
        <rect x="4" y="15" width="8" height="8" fill="#ff4500" />
        <rect x="20" y="15" width="8" height="8" fill="#ff4500" />
        <rect x="13" y="13" width="6" height="6" fill="#ffcc00" />
        <rect x="14" y="19" width="4" height="12" fill="#3fae3f" />
      </g>
    ),
    mushroom_1up: (
      <g stroke="currentColor" strokeWidth="2">
        <path d="M4 18a12 12 0 0 1 24 0z" fill="#00a800" />
        <circle cx="11" cy="13" r="3" fill="#fff" />
        <circle cx="21" cy="12" r="2.5" fill="#fff" />
        <rect x="12" y="18" width="8" height="12" fill="#fff3d6" />
      </g>
    ),
    pipe: (
      <g stroke="currentColor" strokeWidth="2">
        <rect x="6" y="10" width="20" height="6" fill="#3fae3f" />
        <rect x="8" y="16" width="16" height="16" fill="#3fae3f" />
        <rect x="10" y="12" width="7" height="3" fill="#7edb7e" />
      </g>
    ),
    question_block: (
      <g stroke="#7a4a00" strokeWidth="4">
        <rect x="2" y="2" width="28" height="28" fill="#ffb700" />
      </g>
    ),
    star: (
      <path
        d="M16 3l3.5 8.2 8.5 1-6.3 6 1.6 8.8-7.3-4.3-7.3 4.3 1.6-8.8-6.3-6 8.5-1z"
        fill="#ffd700"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    ),
    golden_key: (
      <g stroke="currentColor" strokeWidth="2.5">
        <circle cx="9" cy="23" r="5" fill="#ffd700" />
        <rect x="13" y="22" width="16" height="3" fill="#ffd700" />
        <rect x="25" y="16" width="3" height="6" fill="#ffd700" />
        <rect x="21" y="19" width="3" height="6" fill="#ffd700" />
      </g>
    ),
    heart: (
      <path
        d="M16 28C6 21 2 15 2 9.5 2 5 5.5 2 9.5 2 12 2 14.5 3.5 16 6c1.5-2.5 4-4 6.5-4C26.5 2 30 5 30 9.5 30 15 26 21 16 28z"
        fill="#e52521"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    ),
    super_mushroom: (
      <g stroke="currentColor" strokeWidth="2">
        <path d="M3 20a13 13 0 0 1 26 0z" fill="#e52521" />
        <circle cx="10" cy="13" r="3.5" fill="#fff" />
        <circle cx="22" cy="12" r="3" fill="#fff" />
        <rect x="12" y="20" width="8" height="12" fill="#fff3d6" />
        <rect x="15" y="26" width="3" height="3" fill="#3d3d3d" />
      </g>
    ),
    crown: (
      <g stroke="currentColor" strokeWidth="2.5">
        <path
          d="M4 10l6 5 6-8 6 8 6-5v14H4z"
          fill="#ffd700"
          strokeLinejoin="miter"
        />
        <circle cx="16" cy="24" r="3" fill="#e52521" />
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g className={common}>{icons[id] ?? icons.coin}</g>
      {id === "question_block" && (
        <text
          x="16"
          y="23"
          textAnchor="middle"
          fontFamily="var(--font-pixel)"
          fontSize="14"
          fill="#7a4a00"
        >
          ?
        </text>
      )}
    </svg>
  );
}

export function rarityColor(rarity: string): string {
  switch (rarity) {
    case "uncommon":
      return "text-mario-green";
    case "rare":
      return "text-mario-blue";
    case "epic":
      return "text-purple-600";
    case "legendary":
      return "text-mario-yellow";
    default:
      return "text-slate-500";
  }
}

export function rarityBg(rarity: string): string {
  switch (rarity) {
    case "uncommon":
      return "bg-mario-green/10";
    case "rare":
      return "bg-mario-blue/10";
    case "epic":
      return "bg-purple-100";
    case "legendary":
      return "bg-mario-yellow/20";
    default:
      return "bg-slate-100";
  }
}