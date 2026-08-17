"use client";

import { useCallback, useEffect, useRef } from "react";

const cache = new Map<string, HTMLAudioElement>();

export function useSfx() {
  const enabledRef = useRef(true);

  useEffect(() => {
    enabledRef.current = window.localStorage.getItem("f-smoke.sfx") !== "0";
  });

  const play = useCallback((name: "checkin" | "levelup" | "item" | "sell" | "buy") => {
    if (!enabledRef.current) return;
    let audio = cache.get(name);
    if (!audio) {
      audio = new Audio(`/sfx/${name}.wav`);
      audio.volume = 0.45;
      cache.set(name, audio);
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  return { play };
}