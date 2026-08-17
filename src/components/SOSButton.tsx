"use client";

import { useEffect, useRef, useState } from "react";
import { QUOTES } from "@/lib/content";

export default function SOSButton() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openSos = () => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setOpen(true);
  };

  const closeSos = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSos();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        onClick={openSos}
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-sm font-extrabold uppercase tracking-wide text-white shadow-xl shadow-rose-600/40 transition hover:bg-rose-700 active:scale-90"
        aria-label="Tombol SOS darurat"
      >
        SOS
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={closeSos}
        >
          <div
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Panduan darurat berhenti merokok"
          >
            <h2 className="text-lg font-bold text-slate-900">
              Tenang, kamu bisa!
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ikuti napas berikut, craving hanya lewat sebentar.
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 opacity-40 animate-breathe" />
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 animate-breathe" />
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                  <span className="px-3 text-xs font-semibold text-teal-700 animate-breathe-text">
                    Tarik Napas...
                  </span>
                  <span className="absolute px-3 text-xs font-semibold text-teal-700 animate-breathe-text-alt">
                    Hembuskan...
                  </span>
                </div>
              </div>
            </div>

            <blockquote className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm italic leading-relaxed text-slate-600">
              “{quote}”
            </blockquote>

            <button
              onClick={closeSos}
              className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-95"
            >
              Aku kuat, tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}