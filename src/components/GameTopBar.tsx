"use client";

import { CoinIcon } from "@/components/PixelIcons";
import { ItemIcon } from "@/components/PixelItems";
import { useLanguage } from "@/lib/i18n";

interface GameTopBarProps {
  displayName: string;
  avatarItemId: string | null;
  level: number;
  xp: number;
  xpProgress: number;
  coins: number;
}

export default function GameTopBar({
  displayName,
  avatarItemId,
  level,
  xp,
  xpProgress,
  coins,
}: GameTopBarProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b-4 border-black bg-mario-dark">
      <div className="mx-auto flex w-full max-w-lg items-center gap-3 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[7px] text-white/50">{t("topbar_player")}</p>
          <p className="flex items-center gap-1.5 truncate font-retro text-lg leading-tight text-white">
            {avatarItemId && (
              <span className="grid h-6 w-6 shrink-0 place-items-center border-2 border-black bg-white">
                <ItemIcon id={avatarItemId} className="h-4 w-4" />
              </span>
            )}
            {displayName}
          </p>
        </div>
        <div className="shrink-0 bg-white px-2 py-1 pixel-frame">
          <p className="font-pixel text-[9px] text-mario-red">LV {level}</p>
        </div>
        <div className="shrink-0">
          <div className="flex items-center justify-center gap-1 bg-mario-yellow px-2 py-1 pixel-frame">
            <CoinIcon className="h-4 w-4" />
            <span className="font-pixel text-[9px] text-black tabular-nums">
              {coins}
            </span>
          </div>
        </div>
        <div className="hidden w-28 sm:block sm:w-36">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[6px] text-white/50">XP</span>
            <span className="font-pixel text-[6px] text-white/50">{xp}</span>
          </div>
          <div className="mt-1 h-3 border-2 border-black bg-slate-700">
            <div
              className="h-full bg-mario-yellow transition-all duration-500"
              style={{ width: `${Math.round(xpProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}