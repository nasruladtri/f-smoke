"use client";

import { useEffect, useState } from "react";
import { QUOTES } from "@/lib/content";

export default function SOSButton() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);

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
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center bg-mario-red font-pixel text-[10px] text-white pixel-frame pixel-shadow-sm transition-transform active:translate-y-0.5"
        aria-label="Tombol SOS darurat"
      >
        SOS
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeSos}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#fffdf5] p-6 text-center pixel-frame pixel-shadow"
            role="dialog"
            aria-modal="true"
            aria-label="Panduan darurat berhenti merokok"
          >
            <h2 className="font-pixel text-xs text-mario-red [text-shadow:2px_2px_0_#000]">
              TENANG, KAMU BISA!
            </h2>
            <p className="mt-2 font-retro text-lg text-black/70">
              Ikuti napas berikut, craving hanya lewat sebentar.
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <div className="absolute inset-0 bg-mario-blue opacity-40 animate-breathe" />
                <div className="absolute inset-6 bg-mario-sky animate-breathe" />
                <div className="relative z-10 flex h-24 w-24 items-center justify-center bg-[#fffdf5] pixel-frame">
                  <span className="px-2 font-pixel text-[8px] text-mario-blue animate-breathe-text">
                    TARIK NAPAS...
                  </span>
                  <span className="absolute px-2 font-pixel text-[8px] text-mario-blue animate-breathe-text-alt">
                    HEMBUSKAN...
                  </span>
                </div>
              </div>
            </div>

            <blockquote className="mt-6 bg-mario-yellow px-4 py-3 font-retro text-xl leading-snug text-black pixel-frame">
              “{quote}”
            </blockquote>

            <button
              onClick={closeSos}
              className="pixel-btn mt-6 w-full bg-black text-white"
            >
              Aku kuat, tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}