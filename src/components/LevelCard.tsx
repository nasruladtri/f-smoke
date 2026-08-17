"use client";

import { levelProgress } from "@/lib/levels";

export default function LevelCard({ xp }: { xp: number }) {
  const { level, current, needed, progress } = levelProgress(xp);

  return (
    <section className="bg-[#fffdf5] p-6 text-black pixel-frame pixel-shadow">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[10px] text-mario-red [text-shadow:2px_2px_0_#000] sm:text-xs">
          LEVEL {level}
        </h2>
        <span className="font-pixel text-[9px] text-slate-500">{xp} XP</span>
      </div>
      <div className="mt-4 h-6 border-4 border-black bg-white">
        <div
          className="h-full bg-mario-green transition-all duration-500"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="mt-2 font-retro text-lg text-black/60">
        {current} / {needed} XP menuju Level {level + 1}
      </p>
    </section>
  );
}