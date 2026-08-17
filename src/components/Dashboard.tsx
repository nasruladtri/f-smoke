"use client";

import { useNow } from "@/hooks/useNow";
import { useStoredNumber, useStoredQuitAt } from "@/hooks/useStored";
import {
  CIGS_KEY,
  CIGS_PER_PACK,
  PRICE_KEY,
  writeQuitAt,
  writeSettings,
} from "@/lib/store";
import TimeTracker from "@/components/TimeTracker";
import SavingsCalculator from "@/components/SavingsCalculator";
import HealthTimeline from "@/components/HealthTimeline";
import SOSButton from "@/components/SOSButton";

export default function Dashboard() {
  const now = useNow();
  const quitAt = useStoredQuitAt();
  const pricePerPack = useStoredNumber(PRICE_KEY, CIGS_PER_PACK * 1_000);
  const cigsPerDay = useStoredNumber(CIGS_KEY, 15);

  return (
    <main className="mx-auto w-full max-w-lg flex-1 space-y-6 px-4 py-6 sm:py-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          F-Smoke
        </h1>
        <p className="text-sm text-slate-500">
          Pantau progres bebas rokokmu, hari demi hari.
        </p>
      </header>

      <TimeTracker quitAt={quitAt} now={now} onSetQuitAt={writeQuitAt} />
      <SavingsCalculator
        quitAt={quitAt}
        now={now}
        pricePerPack={pricePerPack}
        cigsPerDay={cigsPerDay}
        onSettingsChange={writeSettings}
      />
      <HealthTimeline quitAt={quitAt} now={now} />
      <SOSButton />
    </main>
  );
}