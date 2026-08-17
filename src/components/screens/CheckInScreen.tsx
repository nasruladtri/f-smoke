"use client";

import { CheckInIcon, BagIcon } from "@/components/PixelIcons";
import { useLanguage } from "@/lib/i18n";

interface CheckInScreenProps {
  checkedInToday: boolean;
  streak: number;
  onCheckIn: () => void;
}

export default function CheckInScreen({
  checkedInToday,
  streak,
  onCheckIn,
}: CheckInScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          {t("checkin_title")}
        </h1>
        <p className="font-retro text-2xl text-black/60">{t("checkin_subtitle")}</p>
      </header>

      <section className="bg-[#fffdf5] p-6 text-center pixel-frame pixel-shadow">
        <span
          className={`mx-auto grid h-20 w-20 place-items-center border-4 border-black ${
            checkedInToday
              ? "animate-coinBounce bg-mario-green text-white"
              : "bg-mario-yellow text-black"
          }`}
        >
          <CheckInIcon className="h-12 w-12" />
        </span>

        <p className="mt-4 font-pixel text-[10px] text-black">
          {checkedInToday ? t("checkin_done") : t("checkin_ready")}
        </p>
        <p className="mt-2 font-retro text-xl text-black/60">
          {t("checkin_streak", { n: streak })}
        </p>

        <div className="mx-auto mt-4 grid max-w-xs grid-cols-2 gap-3">
          <div className="border-4 border-black bg-mario-sky/30 p-2">
            <p className="font-pixel text-[10px] text-mario-blue">{t("checkin_xp")}</p>
            <p className="font-pixel text-[6px] text-black/60">XP</p>
          </div>
          <div className="border-4 border-black bg-mario-yellow/30 p-2">
            <BagIcon className="mx-auto h-5 w-5 text-black" />
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              {t("checkin_item")}
            </p>
          </div>
        </div>

        <button
          onClick={onCheckIn}
          disabled={checkedInToday}
          className={`pixel-btn mt-5 w-full !py-3 text-sm ${
            checkedInToday
              ? "cursor-not-allowed bg-slate-400 text-white"
              : "bg-mario-green text-white"
          }`}
        >
          {checkedInToday ? t("checkin_btn_done") : t("checkin_btn")}
        </button>

        {!checkedInToday && (
          <p className="mt-3 font-retro text-lg text-black/50">{t("checkin_hint")}</p>
        )}
      </section>
    </div>
  );
}