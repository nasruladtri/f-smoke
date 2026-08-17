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
import Footer from "@/components/Footer";

export default function Dashboard() {
  const now = useNow();
  const quitAt = useStoredQuitAt();
  const pricePerPack = useStoredNumber(PRICE_KEY, CIGS_PER_PACK * 1_000);
  const cigsPerDay = useStoredNumber(CIGS_KEY, 15);

  return (
    <>
      <main className="mx-auto w-full max-w-lg flex-1 space-y-6 px-4 py-6 sm:py-10">
        <header className="space-y-2 text-center">
          <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
            F-SMOKE
          </h1>
          <p className="font-retro text-2xl text-black/60">
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
      <Footer />
    </>
  );
}