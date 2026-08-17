"use client";

import { MILESTONES } from "@/lib/content";
import { CheckInIcon, TaskIcon } from "@/components/PixelIcons";

interface TasksScreenProps {
  minutes: number;
  checkedInToday: boolean;
  streak: number;
}

function fmtRemaining(minutes: number): string {
  if (minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `Sisa ${d} hari ${h % 24} jam`;
  }
  if (h > 0) return `Sisa ${h} jam ${m} mnt`;
  return `Sisa ${m} menit`;
}

export default function TasksScreen({
  minutes,
  checkedInToday,
  streak,
}: TasksScreenProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          MISSION
        </h1>
        <p className="font-retro text-2xl text-black/60">
          Selesaikan misi, kumpulkan XP.
        </p>
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
              <p className="font-pixel text-[9px] text-black">
                TASK HARIAN: CHECK-IN
              </p>
              <p className="font-retro text-lg leading-tight text-black/60">
                Hadiah: +25 XP & 1 item acak
              </p>
            </div>
          </div>
          <span
            className={`shrink-0 font-pixel text-[8px] px-2 py-1 border-4 border-black ${
              checkedInToday ? "bg-mario-green text-white" : "bg-mario-red text-white"
            }`}
          >
            {checkedInToday ? "SELESAI" : "BELUM"}
          </span>
        </div>
        <p className="mt-3 border-t-4 border-black pt-2 font-retro text-lg text-black/60">
          Streak check-in:{" "}
          <span className="font-bold text-mario-green">{streak} hari</span>
        </p>
      </section>

      <section className="space-y-3">
        <p className="flex items-center justify-center gap-2 font-pixel text-[9px] text-black/70">
          <TaskIcon className="h-4 w-4" /> MISI PENYELAMATAN
        </p>
        {MILESTONES.map((m, i) => {
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
                  {done ? "+" + m.xp + " XP" : "LAGI"}
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
                {done ? "MISI SELESAI!" : fmtRemaining(m.minutes - minutes)}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}