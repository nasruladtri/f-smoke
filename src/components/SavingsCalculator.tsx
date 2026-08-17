"use client";

import { elapsedMinutes, formatIDR, formatNumber } from "@/lib/format";
import { CIGS_PER_PACK } from "@/lib/content";

interface SavingsCalculatorProps {
  quitAt: Date | null;
  now: Date;
  pricePerPack: number;
  cigsPerDay: number;
  onSettingsChange: (price: number, cigs: number) => void;
}

const toNonNegative = (value: string) => Math.max(0, Number(value) || 0);

export default function SavingsCalculator({
  quitAt,
  now,
  pricePerPack,
  cigsPerDay,
  onSettingsChange,
}: SavingsCalculatorProps) {
  const started = quitAt !== null;
  const daysElapsed = quitAt ? elapsedMinutes(now, quitAt) / (24 * 60) : 0;
  const sticksAvoided = daysElapsed * cigsPerDay;
  const packsAvoided = sticksAvoided / CIGS_PER_PACK;
  const moneySaved = packsAvoided * pricePerPack;

  return (
    <section className="bg-[#fffdf5] p-6 text-black pixel-frame pixel-shadow">
      <h2 className="font-pixel text-[10px] text-mario-red [text-shadow:2px_2px_0_#000] sm:text-xs">
        PENGHEMATAN
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="bg-mario-green p-4 pixel-frame pixel-shadow-sm">
          <div className="font-pixel text-[8px] text-white/80">UANG DIHEMAT</div>
          <div className="mt-2 font-pixel text-sm text-white pixel-outline tabular-nums sm:text-lg">
            {started ? formatIDR(moneySaved) : formatIDR(0)}
          </div>
        </div>
        <div className="bg-mario-blue p-4 pixel-frame pixel-shadow-sm">
          <div className="font-pixel text-[8px] text-white/80">
            BATANG TIDAK DIISAP
          </div>
          <div className="mt-2 font-pixel text-sm text-white pixel-outline tabular-nums sm:text-lg">
            {started ? formatNumber(sticksAvoided) : 0}
          </div>
        </div>
      </div>

      <div className="mt-5 bg-mario-sky p-4 pixel-frame">
        <label
          htmlFor="price-input"
          className="block font-pixel text-[9px] text-black"
        >
          HARGA PER BUNGKUS (RP)
        </label>
        <input
          id="price-input"
          type="number"
          min={0}
          inputMode="numeric"
          value={pricePerPack === 0 ? "" : pricePerPack}
          onChange={(e) =>
            onSettingsChange(toNonNegative(e.target.value), cigsPerDay)
          }
          className="mt-2 w-full bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none"
        />

        <label
          htmlFor="cigs-input"
          className="mt-4 block font-pixel text-[9px] text-black"
        >
          BATANG YANG DIISAP PER HARI
        </label>
        <input
          id="cigs-input"
          type="number"
          min={0}
          inputMode="numeric"
          value={cigsPerDay === 0 ? "" : cigsPerDay}
          onChange={(e) =>
            onSettingsChange(pricePerPack, toNonNegative(e.target.value))
          }
          className="mt-2 w-full bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none"
        />

        <p className="mt-4 font-retro text-lg text-black/60">
          Pengaturan tersimpan otomatis. Estimasi asumsi {CIGS_PER_PACK} batang
          per bungkus, mengikuti waktu di tracker.
        </p>
      </div>
    </section>
  );
}