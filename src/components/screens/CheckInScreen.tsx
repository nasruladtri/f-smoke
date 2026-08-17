"use client";

import { CheckInIcon } from "@/components/PixelIcons";
import { BagIcon } from "@/components/PixelIcons";

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
  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          CHECK-IN HARIAN
        </h1>
        <p className="font-retro text-2xl text-black/60">
          Buktikan tekadmu hari ini.
        </p>
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
          {checkedInToday ? "SUDAH CHECK-IN!" : "SIAP CHECK-IN?"}
        </p>
        <p className="mt-2 font-retro text-xl text-black/60">
          Streak:{" "}
          <span className="font-bold text-mario-green">{streak} hari</span>{" "}
          berturut-turut
        </p>

        <div className="mx-auto mt-4 grid max-w-xs grid-cols-2 gap-3">
          <div className="border-4 border-black bg-mario-sky/30 p-2">
            <p className="font-pixel text-[10px] text-mario-blue">+25</p>
            <p className="font-pixel text-[6px] text-black/60">XP</p>
          </div>
          <div className="border-4 border-black bg-mario-yellow/30 p-2">
            <BagIcon className="mx-auto h-5 w-5 text-black" />
            <p className="mt-1 font-pixel text-[6px] text-black/60">
              1 ITEM ACAK
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
          {checkedInToday ? "BESOK LAGI YA!" : "CHECK-IN SEKARANG"}
        </button>

        {!checkedInToday && (
          <p className="mt-3 font-retro text-lg text-black/50">
            Tahan 3 detik — cukup untuk satu napas dalam.
          </p>
        )}
      </section>
    </div>
  );
}