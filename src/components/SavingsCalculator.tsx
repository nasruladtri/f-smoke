"use client";

import { elapsedMinutes, formatIDR, formatNumber } from "@/lib/format";
import { CIGS_PER_PACK } from "@/lib/store";

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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
        Penghematan
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="text-xs font-medium text-emerald-600">
            Uang Dihemat
          </div>
          <div className="mt-1 text-xl font-bold text-emerald-700 tabular-nums sm:text-2xl">
            {started ? formatIDR(moneySaved) : formatIDR(0)}
          </div>
        </div>
        <div className="rounded-2xl bg-teal-50 p-4">
          <div className="text-xs font-medium text-teal-600">
            Batang Tidak Diisap
          </div>
          <div className="mt-1 text-xl font-bold text-teal-700 tabular-nums sm:text-2xl">
            {started ? formatNumber(sticksAvoided) : 0}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <label
          htmlFor="price-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Harga per Bungkus (Rp)
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
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none ring-teal-300 transition focus:border-teal-500 focus:ring-2"
        />

        <label
          htmlFor="cigs-input"
          className="mt-3 block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Batang yang Diisap per Hari
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
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none ring-teal-300 transition focus:border-teal-500 focus:ring-2"
        />

        <p className="mt-3 text-xs text-slate-400">
          Pengaturan tersimpan otomatis. Estimasi dihitung asumsi {CIGS_PER_PACK}{" "}
          batang per bungkus, mengikuti waktu yang berlalu di tracker.
        </p>
      </div>
    </section>
  );
}