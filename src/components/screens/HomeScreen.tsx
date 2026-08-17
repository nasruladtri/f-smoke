"use client";

import TimeTracker from "@/components/TimeTracker";
import SavingsCalculator from "@/components/SavingsCalculator";
import ShareStreakButton from "@/components/ShareStreakButton";
import { BagIcon, CheckInIcon, CoinIcon, TrophyIcon } from "@/components/PixelIcons";
import { useLanguage } from "@/lib/i18n";

export interface LeaderboardEntry {
  name: string;
  level: number;
  streak: number;
  xp: number;
}

interface HomeScreenProps {
  displayName: string;
  level: number;
  xp: number;
  xpProgress: number;
  streak: number;
  quitAt: Date | null;
  now: Date;
  onSetQuitAt: (date: Date | null) => void;
  pricePerPack: number;
  cigsPerDay: number;
  onSettingsChange: (price: number, cigs: number) => void;
  coins: number;
  itemsCount: number;
  checkIns7: number[];
  checkInTotal: number;
  leaderboard: LeaderboardEntry[];
}

function PixelBarChart({
  values,
  labels,
}: {
  values: number[];
  labels: string[];
}) {
  const max = Math.max(1, ...values);
  const maxH = 56;
  return (
    <div className="flex items-end justify-between gap-2 border-4 border-black bg-mario-sky/20 p-3">
      {values.map((v, i) => {
        const h = Math.max(4, Math.round((v / max) * maxH));
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className="font-pixel text-[6px] text-black/60 tabular-nums">
              {v > 0 ? v * 25 : ""}
            </span>
            <div
              className={`w-full ${v > 0 ? "bg-mario-yellow" : "bg-slate-300"}`}
              style={{ height: `${h}px` }}
            />
            <span className="font-pixel text-[6px] text-black/50">{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function HomeScreen({
  displayName,
  level,
  xp,
  xpProgress,
  streak,
  quitAt,
  now,
  onSetQuitAt,
  pricePerPack,
  cigsPerDay,
  onSettingsChange,
  coins,
  itemsCount,
  checkIns7,
  checkInTotal,
  leaderboard,
}: HomeScreenProps) {
  const { lang, t } = useLanguage();
  const minutes = quitAt ? Math.max(0, (now.getTime() - quitAt.getTime()) / 60000) : 0;
  const daysFree = Math.floor(minutes / (24 * 60));

  const dayLabels =
    lang === "en" ? ["S", "M", "T", "W", "T", "F", "S"] : ["M", "S", "S", "R", "K", "J", "S"];

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          F-SMOKE
        </h1>
        <p className="font-retro text-2xl text-black/60">{t("home_subtitle")}</p>
      </header>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <p className="mb-3 text-center font-pixel text-[9px] text-black/60">
          {t("home_status")}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-4 border-black bg-white p-3 text-center">
            <p className="font-pixel text-2xl text-mario-red">{level}</p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">{t("home_level")}</p>
          </div>
          <div className="border-4 border-black bg-white p-3 text-center">
            <p className="flex items-center justify-center gap-2 font-retro text-2xl leading-none text-mario-green">
              <CheckInIcon className="h-5 w-5 text-mario-green" />
              {streak}
            </p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              {t("home_streak")}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[7px] text-black/60">XP</span>
            <span className="font-pixel text-[7px] text-black/60">
              {Math.round(xpProgress * 100)}%
            </span>
          </div>
          <div className="mt-1 h-4 border-4 border-black bg-slate-200">
            <div
              className="h-full bg-mario-yellow transition-all duration-700"
              style={{ width: `${Math.round(xpProgress * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-right font-retro text-lg leading-none text-black/60">
            {xp} XP
          </p>
        </div>
        {daysFree > 0 && (
          <p className="mt-3 border-t-4 border-black pt-2 text-center font-retro text-xl text-black/70">
            {t("home_free_days", { days: daysFree })}
          </p>
        )}
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <p className="mb-3 text-center font-pixel text-[9px] text-black/60">
          {t("home_stats")}
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="border-4 border-black bg-white p-2 text-center">
            <p className="flex items-center justify-center gap-1 font-retro text-2xl leading-none text-mario-blue">
              <CheckInIcon className="h-4 w-4 text-mario-blue" />
              {checkInTotal}
            </p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              {t("stats_checkins")}
            </p>
          </div>
          <div className="border-4 border-black bg-white p-2 text-center">
            <p className="flex items-center justify-center gap-1 font-retro text-2xl leading-none text-black">
              <BagIcon className="h-4 w-4" />
              {itemsCount}
            </p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              {t("stats_items")}
            </p>
          </div>
          <div className="border-4 border-black bg-white p-2 text-center">
            <p className="flex items-center justify-center gap-1 font-retro text-2xl leading-none text-mario-yellow">
              <CoinIcon className="h-4 w-4" />
              {coins}
            </p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              {t("shop_coin")}
            </p>
          </div>
        </div>

        <p className="mt-4 mb-2 font-pixel text-[8px] text-black/60">
          {t("stats_7day")}
        </p>
        <PixelBarChart values={checkIns7} labels={dayLabels} />
        {checkIns7.every((v) => v === 0) && (
          <p className="mt-2 text-center font-retro text-lg text-black/50">
            {t("stats_empty")}
          </p>
        )}

        <div className="mt-4">
          <ShareStreakButton
            displayName={displayName}
            level={level}
            streak={streak}
            daysFree={daysFree}
            coins={coins}
          />
          <p className="mt-1 text-center font-retro text-base text-black/50">
            {t("share_desc")}
          </p>
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <p className="mb-3 flex items-center justify-center gap-2 text-center font-pixel text-[9px] text-black/60">
          <TrophyIcon className="h-4 w-4 text-mario-yellow" /> {t("lb_title")}
        </p>
        <p className="text-center font-retro text-lg text-black/50">
          {t("lb_desc", { n: 5 })}
        </p>
        <div className="mt-3 space-y-2">
          {leaderboard.length === 0 && (
            <p className="border-4 border-black bg-slate-100 p-4 text-center font-retro text-lg text-black/50">
              {t("lb_empty")}
            </p>
          )}
          {leaderboard.map((entry, i) => (
            <div
              key={entry.name + i}
              className="flex items-center justify-between gap-3 border-4 border-black bg-white px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center border-2 border-black font-pixel text-[9px] ${
                    i === 0
                      ? "bg-mario-yellow text-black"
                      : i === 1
                        ? "bg-slate-300 text-black"
                        : i === 2
                          ? "bg-amber-600 text-white"
                          : "bg-slate-100 text-black/60"
                  }`}
                >
                  {i + 1}
                </span>
                <p className="truncate font-retro text-lg leading-tight text-black">
                  {entry.name}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-pixel text-[8px] text-mario-red">
                  {t("lb_level", { n: entry.level })}
                </span>
                <span className="flex items-center gap-1 font-pixel text-[8px] text-mario-green">
                  <CheckInIcon className="h-3 w-3" /> {entry.streak}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TimeTracker quitAt={quitAt} now={now} onSetQuitAt={onSetQuitAt} />

      <SavingsCalculator
        quitAt={quitAt}
        now={now}
        pricePerPack={pricePerPack}
        cigsPerDay={cigsPerDay}
        onSettingsChange={onSettingsChange}
      />
    </div>
  );
}