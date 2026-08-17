"use client";

import { MILESTONES, MILESTONES_EN } from "@/lib/content";
import { CheckInIcon, TaskIcon } from "@/components/PixelIcons";
import { useLanguage } from "@/lib/i18n";

interface TasksScreenProps {
  minutes: number;
  checkedInToday: boolean;
  streak: number;
}

function fmtRemaining(minutes: number, t: (k: string, v?: Record<string, string | number>) => string): string {
  if (minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return t("remaining_days", { d, h: h % 24 });
  }
  if (h > 0) return t("remaining_hours", { h, m });
  return t("remaining_minutes", { m });
}

export default function TasksScreen({
  minutes,
  checkedInToday,
  streak,
}: TasksScreenProps) {
  const { lang, t } = useLanguage();
  const milestones = lang === "en" ? MILESTONES_EN : MILESTONES;

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          {t("tasks_title")}
        </h1>
        <p className="font-retro text-2xl text-black/60">{t("tasks_subtitle")}</p>
      </header>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-12 w-12 place-items-center border-4 border-black ${
                checkedInToday ? "bg-mario-green text-white" : "bg-mario-yellow text-black"
              }`}
            >
              <CheckInIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="font-pixel text-[9px] text-black">{t("tasks_daily")}</p>
              <p className="font-retro text-lg leading-tight text-black/60">
                {t("tasks_daily_reward")}
              </p>
            </div>
          </div>
          <span
            className={`shrink-0 font-pixel text-[8px] px-2 py-1 border-4 border-black ${
              checkedInToday ? "bg-mario-green text-white" : "bg-mario-red text-white"
            }`}
          >
            {checkedInToday ? t("tasks_done") : t("tasks_notdone")}
          </span>
        </div>
        <p className="mt-3 border-t-4 border-black pt-2 font-retro text-lg text-black/60">
          {t("tasks_streak", { n: streak })}
        </p>
      </section>

      <section className="space-y-3">
        <p className="flex items-center justify-center gap-2 font-pixel text-[9px] text-black/70">
          <TaskIcon className="h-4 w-4" /> {t("tasks_mission")}
        </p>
        {milestones.map((m, i) => {
          const done = minutes >= m.minutes;
          const progress = Math.min(1, minutes / m.minutes);
          return (
            <div
              key={m.label}
              className="bg-[#fffdf5] p-3 pixel-frame pixel-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-pixel text-[9px] text-black">
                    {String(i + 1).padStart(2, "0")} · {m.label}
                  </p>
                  <p className="font-retro text-lg leading-tight text-black/60">
                    {m.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-1 font-pixel text-[7px] border-4 border-black ${
                    done ? "bg-mario-green text-white" : "bg-white text-black/70"
                  }`}
                >
                  {done ? "+" + m.xp + " XP" : t("tasks_left")}
                </span>
              </div>
              <div className="mt-2 h-3 border-2 border-black bg-slate-200">
                <div
                  className={`h-full transition-all duration-700 ${
                    done ? "bg-mario-green" : "bg-mario-sky"
                  }`}
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="mt-1 font-retro text-base leading-none text-black/50">
                {done ? t("tasks_complete") : fmtRemaining(m.minutes - minutes, t)}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}