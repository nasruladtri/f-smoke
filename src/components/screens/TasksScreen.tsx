"use client";

import { useState } from "react";
import { MILESTONES, MILESTONES_EN } from "@/lib/content";
import { CheckInIcon, NoteIcon, TaskIcon } from "@/components/PixelIcons";
import { useLanguage } from "@/lib/i18n";

export interface CravEntry {
  id: string;
  note: string;
  created_at: string;
}

interface TasksScreenProps {
  minutes: number;
  checkedInToday: boolean;
  streak: number;
  level: number;
  coins: number;
  checkInTotal: number;
  collectedItems: number;
  cravings: CravEntry[];
  onAddCravings: (note: string) => Promise<boolean>;
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
  level,
  coins,
  checkInTotal,
  collectedItems,
  cravings,
  onAddCravings,
}: TasksScreenProps) {
  const { lang, t } = useLanguage();
  const milestones = lang === "en" ? MILESTONES_EN : MILESTONES;
  const [note, setNote] = useState("");
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "saved">("idle");

  const badges = [
    {
      key: "first_checkin",
      earned: checkInTotal >= 1,
      icon: "1",
    },
    {
      key: "week_streak",
      earned: streak >= 7,
      icon: "7",
    },
    {
      key: "30_checkins",
      earned: checkInTotal >= 30,
      icon: "30",
    },
    {
      key: "lvl10",
      earned: level >= 10,
      icon: "10",
    },
    {
      key: "collector",
      earned: collectedItems >= 10,
      icon: "★",
    },
    {
      key: "rich",
      earned: coins >= 1000,
      icon: "$",
    },
  ];

  const handleAddCravings = async () => {
    const text = note.trim();
    if (!text) return;
    setNoteStatus("saving");
    const ok = await onAddCravings(text);
    setNoteStatus(ok ? "saved" : "idle");
    if (ok) setNote("");
    setTimeout(() => setNoteStatus("idle"), 2000);
  };

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

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <p className="mb-3 text-center font-pixel text-[9px] text-black/60">
          {t("badge_title")}
        </p>
        <p className="text-center font-retro text-lg text-black/50">
          {t("badge_subtitle")}
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <div
              key={b.key}
              className={`flex flex-col items-center gap-1 border-4 border-black p-2 text-center ${
                b.earned ? "bg-mario-yellow/40" : "bg-slate-100"
              }`}
              title={t(`badge_${b.key}_desc`)}
            >
              <span
                className={`grid h-10 w-10 place-items-center border-4 border-black font-pixel text-[10px] ${
                  b.earned ? "bg-mario-yellow text-black" : "bg-slate-300 text-black/40"
                }`}
              >
                {b.icon}
              </span>
              <p className="font-pixel text-[6px] leading-tight text-black/70">
                {t(`badge_${b.key}`)}
              </p>
              <p
                className={`font-pixel text-[5px] ${
                  b.earned ? "text-mario-green" : "text-black/40"
                }`}
              >
                {b.earned ? t("badge_earned") : t("badge_locked")}
              </p>
            </div>
          ))}
        </div>
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

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <p className="mb-1 flex items-center justify-center gap-2 text-center font-pixel text-[9px] text-black/60">
          <NoteIcon className="h-4 w-4" /> {t("journal_title")}
        </p>
        <p className="text-center font-retro text-lg text-black/50">
          {t("journal_desc")}
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCravings()}
            placeholder={t("journal_placeholder")}
            maxLength={120}
            className="w-full min-w-0 flex-1 bg-white px-3 py-3 font-retro text-lg text-black pixel-frame outline-none focus:bg-mario-yellow/20"
          />
          <button
            onClick={handleAddCravings}
            disabled={noteStatus === "saving"}
            className="pixel-btn shrink-0 bg-mario-green text-white"
          >
            {noteStatus === "saved" ? "✓" : t("journal_add")}
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {cravings.length === 0 && (
            <p className="border-4 border-black bg-slate-100 p-4 text-center font-retro text-lg text-black/50">
              {t("journal_empty")}
            </p>
          )}
          {cravings.map((c) => (
            <div
              key={c.id}
              className="flex items-start justify-between gap-3 border-4 border-black bg-white px-3 py-2"
            >
              <p className="min-w-0 font-retro text-lg leading-tight text-black">
                {c.note}
              </p>
              <span className="shrink-0 font-pixel text-[6px] text-black/40">
                {new Date(c.created_at).toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}