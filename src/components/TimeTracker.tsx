"use client";

import { useState } from "react";
import {
  diffParts,
  formatDateTime,
  fromDateTimeInputValue,
  toDateTimeInputValue,
} from "@/lib/format";

interface TimeTrackerProps {
  quitAt: Date | null;
  now: Date;
  onSetQuitAt: (date: Date | null) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function TimeTracker({
  quitAt,
  now,
  onSetQuitAt,
}: TimeTrackerProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const inputValue = draft ?? (quitAt ? toDateTimeInputValue(quitAt) : "");

  const handleSave = () => {
    const date = fromDateTimeInputValue(inputValue);
    if (date) {
      onSetQuitAt(date);
      setDraft(null);
    }
  };

  const handleReset = () => {
    setDraft(null);
    onSetQuitAt(null);
  };

  const parts = quitAt ? diffParts(now, quitAt) : null;

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 p-6 text-white shadow-lg shadow-teal-600/20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-teal-100">
        Waktu Bebas Rokok
      </h2>

      {quitAt && parts ? (
        <>
          <div className="mt-5 grid grid-cols-4 gap-3 text-center">
            {[
              { value: parts.days, label: "Hari" },
              { value: parts.hours, label: "Jam" },
              { value: pad(parts.minutes), label: "Menit" },
              { value: pad(parts.seconds), label: "Detik" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/10 px-2 py-4 backdrop-blur-sm"
              >
                <div className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                  {value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-teal-100">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-teal-100">
            Berhenti sejak{" "}
            <span className="font-semibold text-white">
              {formatDateTime(quitAt)}
            </span>
          </p>
        </>
      ) : (
        <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-teal-50">
          Kamu belum mencatat waktu berhenti. Atur tanggal & jam di bawah, lalu
          mulai hitung!
        </p>
      )}

      <div className="mt-5 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
        <label
          htmlFor="quit-datetime"
          className="block text-xs font-semibold uppercase tracking-wider text-teal-100"
        >
          Tanggal & Waktu Berhenti
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="quit-datetime"
            type="datetime-local"
            value={inputValue}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full rounded-xl border-0 bg-white/95 px-3 py-2.5 text-sm text-slate-800 outline-none ring-teal-300 transition focus:ring-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50 active:scale-95 sm:flex-none"
            >
              {parts ? "Perbarui" : "Mulai"}
            </button>
            {parts && (
              <button
                onClick={handleReset}
                className="rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30 active:scale-95"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}