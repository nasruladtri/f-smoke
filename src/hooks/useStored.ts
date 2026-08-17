"use client";

import { useSyncExternalStore } from "react";
import {
  STORE_CHANGE_EVENT,
  getNumberSnapshot,
  getQuitAtSnapshot,
} from "@/lib/store";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORE_CHANGE_EVENT, onStoreChange);
  };
}

export function useStoredQuitAt(): Date | null {
  return useSyncExternalStore(subscribe, getQuitAtSnapshot, () => null);
}

export function useStoredNumber(key: string, fallback: number): number {
  return useSyncExternalStore(
    subscribe,
    () => getNumberSnapshot(key, fallback),
    () => fallback
  );
}