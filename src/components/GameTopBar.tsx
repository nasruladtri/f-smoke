"use client";

import { signOut } from "@/app/actions";
import { useLanguage } from "@/lib/i18n";

interface GameTopBarProps {
  displayName: string;
  level: number;
  xp: number;
  xpProgress: number;
}

export default function GameTopBar({
  displayName,
  level,
  xp,
  xpProgress,
}: GameTopBarProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b-4 border-black bg-mario-dark">
      <div className="mx-auto flex w-full max-w-lg items-center gap-3 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[7px] text-white/50">{t("topbar_player")}</p>
          <p className="truncate font-retro text-lg leading-tight text-white">
            {displayName}
          </p>
        </div>
        <div className="shrink-0 bg-white px-2 py-1 pixel-frame">
          <p className="font-pixel text-[9px] text-mario-red">LV {level}</p>
        </div>
        <div className="shrink-0 w-28 sm:w-36">
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
        <form action={signOut} className="shrink-0">
          <button
            className="pixel-btn !px-2 !py-1.5 bg-mario-red text-white !text-[8px]"
            aria-label={t("topbar_logout")}
          >
            {t("topbar_logout")}
          </button>
        </form>
      </div>
    </div>
  );
}