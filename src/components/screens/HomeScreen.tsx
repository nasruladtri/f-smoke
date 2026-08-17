"use client";

import TimeTracker from "@/components/TimeTracker";
import SavingsCalculator from "@/components/SavingsCalculator";
import { CheckInIcon } from "@/components/PixelIcons";

interface HomeScreenProps {
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
}

export default function HomeScreen({
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
}: HomeScreenProps) {
  const minutes = quitAt ? Math.max(0, (now.getTime() - quitAt.getTime()) / 60000) : 0;
  const daysFree = Math.floor(minutes / (24 * 60));

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          F-SMOKE
        </h1>
        <p className="font-retro text-2xl text-black/60">
          Berhenti merokok adalah petualanganmu.
        </p>
      </header>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <p className="mb-3 text-center font-pixel text-[9px] text-black/60">
          STATUS PLAYER
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-4 border-black bg-white p-3 text-center">
            <p className="font-pixel text-2xl text-mario-red">{level}</p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">LEVEL</p>
          </div>
          <div className="border-4 border-black bg-white p-3 text-center">
            <p className="flex items-center justify-center gap-2 font-retro text-2xl leading-none text-mario-green">
              <CheckInIcon className="h-5 w-5 text-mario-green" />
              {streak}
            </p>
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              STREAK (HARI)
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
            Bebas rokok selama{" "}
            <span className="font-bold text-mario-green">{daysFree} hari</span>{" "}
            berturut-turut!
          </p>
        )}
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