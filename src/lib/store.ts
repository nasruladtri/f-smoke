export const QUIT_KEY = "f-smoke:quitAt";
export const PRICE_KEY = "f-smoke:pricePerPack";
export const CIGS_KEY = "f-smoke:cigsPerDay";
export const CIGS_PER_PACK = 20;
export const STORE_CHANGE_EVENT = "f-smoke:store-change";

export function readQuitAt(): Date | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(QUIT_KEY);
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function readNumber(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (raw === null) return fallback;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

let cachedQuitAt: Date | null = null;

export function getQuitAtSnapshot(): Date | null {
  const next = readQuitAt();
  const same =
    next === cachedQuitAt ||
    (next !== null &&
      cachedQuitAt !== null &&
      next.getTime() === cachedQuitAt.getTime());
  if (!same) cachedQuitAt = next;
  return cachedQuitAt;
}

const cachedNumbers = new Map<string, number>();

export function getNumberSnapshot(key: string, fallback: number): number {
  const next = readNumber(key, fallback);
  if (!cachedNumbers.has(key) || cachedNumbers.get(key) !== next) {
    cachedNumbers.set(key, next);
  }
  return cachedNumbers.get(key) as number;
}

export function writeQuitAt(date: Date | null) {
  if (typeof window === "undefined") return;
  if (date) {
    window.localStorage.setItem(QUIT_KEY, date.toISOString());
  } else {
    window.localStorage.removeItem(QUIT_KEY);
  }
  window.dispatchEvent(new CustomEvent(STORE_CHANGE_EVENT));
}

export function writeSettings(price: number, cigs: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRICE_KEY, String(price));
  window.localStorage.setItem(CIGS_KEY, String(cigs));
  window.dispatchEvent(new CustomEvent(STORE_CHANGE_EVENT));
}