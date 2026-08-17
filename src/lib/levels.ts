import { MILESTONES } from "@/lib/content";

export const XP_PER_MINUTE = 1 / 15;
export const CHECK_IN_XP = 25;

export function xpForLevel(level: number): number {
  return (100 * level * (level - 1)) / 2;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

export function levelProgress(xp: number): {
  level: number;
  current: number;
  needed: number;
  progress: number;
} {
  const level = levelFromXp(xp);
  const current = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return {
    level,
    current: xp - current,
    needed: next - current,
    progress: Math.min(1, (xp - current) / (next - current)),
  };
}

export function timeXp(minutes: number): number {
  return Math.floor(minutes * XP_PER_MINUTE);
}

export function milestoneXp(minutes: number): number {
  return MILESTONES.filter((m) => minutes >= m.minutes).reduce(
    (sum, m) => sum + m.xp,
    0
  );
}