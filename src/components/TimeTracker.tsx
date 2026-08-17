"use client";

import { useState } from "react";
import {
  diffParts,
  formatDateTime,
  fromDateTimeInputValue,
  toDateTimeInputValue,
} from "@/lib/format";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();
  const [draft, setDraft] = useState<string | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const inputValue = draft ?? (quitAt ? toDateTimeInputValue(quitAt) : "");

  const handleSave = () => {
    const date = fromDateTimeInputValue(inputValue);
    if (date) {
      onSetQuitAt(date);
      setDraft(null);
    }
  };

  const handleReset = () => {
    setConfirmingReset(false);
    setDraft(null);
    onSetQuitAt(null);
  };

  const parts = quitAt ? diffParts(now, quitAt) : null;

  return (
    <>
      <section className="bg-[#fffdf5] p-6 text-black pixel-frame pixel-shadow">
        <h2 className="font-pixel text-[10px] text-mario-red [text-shadow:2px_2px_0_#000] sm:text-xs">
          {t("tt_title")}
        </h2>

        {quitAt && parts ? (
          <>
            <div className="mt-6 grid grid-cols-4 gap-3 text-center">
              {[
                { value: parts.days, label: t("tt_day") },
                { value: parts.hours, label: t("tt_hour") },
                { value: pad(parts.minutes), label: t("tt_minute") },
                { value: pad(parts.seconds), label: t("tt_second") },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-mario-blue px-1 py-4 pixel-frame pixel-shadow-sm"
                >
                  <div className="font-pixel text-lg text-white pixel-outline tabular-nums sm:text-2xl">
                    {value}
                  </div>
                  <div className="mt-2 font-pixel text-[7px] text-mario-sky sm:text-[8px]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 font-retro text-lg text-black/70">
              {t("tt_since", {
                date: formatDateTime(quitAt),
              })}
            </p>
          </>
        ) : (
          <p className="mt-4 font-retro text-xl text-black/70">
            {t("tt_empty")}
          </p>
        )}

        <div className="mt-5 bg-mario-sky p-4 pixel-frame">
          <label
            htmlFor="quit-datetime"
            className="block font-pixel text-[9px] text-black"
          >
            {t("tt_label")}
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="quit-datetime"
              type="datetime-local"
              value={inputValue}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full min-w-0 bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none sm:flex-1"
            />
            <div className="flex shrink-0 gap-3">
              <button
                onClick={handleSave}
                className="pixel-btn flex-1 bg-mario-green text-white sm:flex-none"
              >
                {parts ? t("tt_update") : t("tt_start")}
              </button>
              {parts && (
                <button
                  onClick={() => setConfirmingReset(true)}
                  className="pixel-btn bg-mario-red text-white"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {confirmingReset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setConfirmingReset(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#fffdf5] p-6 text-center pixel-frame pixel-shadow"
            role="dialog"
            aria-modal="true"
            aria-label="Konfirmasi reset"
          >
            <h3 className="font-pixel text-xs text-mario-red [text-shadow:2px_2px_0_#000]">
              {t("tt_reset_title")}
            </h3>
            <p className="mt-4 font-retro text-xl text-black/70">
              {t("tt_reset_text")}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmingReset(false)}
                className="pixel-btn flex-1 bg-slate-200 text-black"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleReset}
                className="pixel-btn flex-1 bg-mario-red text-white"
              >
                {t("confirm_reset")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}