"use client";

import { useEffect, useState } from "react";
import { QUOTES, QUOTES_EN } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export default function SOSButton() {
  const { lang, t } = useLanguage();
  const quotes = lang === "en" ? QUOTES_EN : QUOTES;
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);

  const openSos = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
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
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center bg-mario-red font-pixel text-[8px] text-white pixel-frame pixel-shadow-sm transition-transform active:translate-y-0.5"
        aria-label={t("sos_title")}
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
            aria-label={t("sos_title")}
          >
            <h2 className="font-pixel text-xs text-mario-red [text-shadow:2px_2px_0_#000]">
              {t("sos_title")}
            </h2>
            <p className="mt-2 font-retro text-lg text-black/70">
              {t("sos_text")}
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <div className="absolute inset-0 bg-mario-blue opacity-40 animate-breathe" />
                <div className="absolute inset-6 bg-mario-sky animate-breathe" />
                <div className="relative z-10 flex h-24 w-24 items-center justify-center bg-[#fffdf5] pixel-frame">
                  <span className="px-2 font-pixel text-[8px] text-mario-blue animate-breathe-text">
                    {t("sos_inhale")}
                  </span>
                  <span className="absolute px-2 font-pixel text-[8px] text-mario-blue animate-breathe-text-alt">
                    {t("sos_exhale")}
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
              {t("sos_close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}