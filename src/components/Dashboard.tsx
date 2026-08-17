"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNow } from "@/hooks/useNow";
import { createClient } from "@/lib/supabase/client";
import { CHECK_IN_XP, levelFromXp, milestoneXp, timeXp } from "@/lib/levels";
import { rollItem } from "@/lib/items";
import { elapsedMinutes } from "@/lib/format";
import TimeTracker from "@/components/TimeTracker";
import SavingsCalculator from "@/components/SavingsCalculator";
import HealthTimeline from "@/components/HealthTimeline";
import SOSButton from "@/components/SOSButton";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import LevelCard from "@/components/LevelCard";
import Inventory, { type OwnedItem } from "@/components/Inventory";
import CheckInButton from "@/components/CheckInButton";
import ItemToast, { type Toast } from "@/components/ItemToast";

interface ProgressRow {
  quit_at: string | null;
  price_per_pack: number;
  cigs_per_day: number;
  check_in_xp: number;
  last_check_in: string | null;
  last_rewarded_level: number;
}

interface DashboardProps {
  userId: string;
  email: string;
}

export default function Dashboard({ userId, email }: DashboardProps) {
  const supabase = createClient();
  const now = useNow();

  const [progress, setProgress] = useState<ProgressRow | null>(null);
  const [inventory, setInventory] = useState<OwnedItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;

      if (data) {
        setProgress(data as ProgressRow);
      } else {
        const { data: inserted } = await supabase
          .from("user_progress")
          .upsert({ user_id: userId })
          .select()
          .maybeSingle();
        if (inserted) setProgress(inserted as ProgressRow);
      }

      const { data: inv } = await supabase
        .from("inventory")
        .select("item_id, quantity")
        .eq("user_id", userId);
      if (!cancelled && inv) setInventory(inv as OwnedItem[]);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [supabase, userId]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const id = setTimeout(() => setToasts((t) => t.slice(1)), 6000);
    return () => clearTimeout(id);
  }, [toasts]);

  const quitAt = useMemo(
    () => (progress?.quit_at ? new Date(progress.quit_at) : null),
    [progress]
  );
  const minutes = quitAt ? elapsedMinutes(now, quitAt) : 0;
  const totalXp =
    (quitAt ? timeXp(minutes) + milestoneXp(minutes) : 0) +
    (progress?.check_in_xp ?? 0);
  const level = levelFromXp(totalXp);

  useEffect(() => {
    if (!progress || !quitAt) return;
    const baseLevel = progress.last_rewarded_level;
    const currentLevel = levelFromXp(totalXp);

    if (currentLevel > baseLevel) {
      const gained = currentLevel - baseLevel;
      const drops = Array.from({ length: gained }, () => rollItem());

      void (async () => {
        for (const item of drops) {
          await supabase.rpc("add_item", { p_item_id: item.id });
        }
        await supabase
          .from("user_progress")
          .update({ last_rewarded_level: currentLevel })
          .eq("user_id", userId);

        const { data: inv } = await supabase
          .from("inventory")
          .select("item_id, quantity")
          .eq("user_id", userId);
        if (inv) setInventory(inv as OwnedItem[]);

        setProgress((p) =>
          p ? { ...p, last_rewarded_level: currentLevel } : p
        );
        setToasts((prev) => [
          ...prev,
          ...drops.map((item) => ({
            id: toastId.current++,
            item,
            source: "LEVEL UP",
          })),
        ]);
      })();
    }
  }, [progress, totalXp, quitAt, supabase, userId]);

  const handleSetQuitAt = useCallback(
    (date: Date | null) => {
      setProgress((p) =>
        p ? { ...p, quit_at: date ? date.toISOString() : null } : p
      );
      void supabase
        .from("user_progress")
        .update({ quit_at: date ? date.toISOString() : null })
        .eq("user_id", userId);
    },
    [supabase, userId]
  );

  const handleSettingsChange = useCallback(
    (price: number, cigs: number) => {
      setProgress((p) =>
        p ? { ...p, price_per_pack: price, cigs_per_day: cigs } : p
      );
      void supabase
        .from("user_progress")
        .update({ price_per_pack: price, cigs_per_day: cigs })
        .eq("user_id", userId);
    },
    [supabase, userId]
  );

  const handleCheckIn = useCallback(() => {
    if (!progress) return;
    const item = rollItem();
    const newXp = progress.check_in_xp + CHECK_IN_XP;
    const lastCheckIn = new Date().toISOString();

    void (async () => {
      await supabase.rpc("add_item", { p_item_id: item.id });
      await supabase
        .from("user_progress")
        .update({ check_in_xp: newXp, last_check_in: lastCheckIn })
        .eq("user_id", userId);

      const { data: inv } = await supabase
        .from("inventory")
        .select("item_id, quantity")
        .eq("user_id", userId);
      if (inv) setInventory(inv as OwnedItem[]);

      setProgress((p) =>
        p ? { ...p, check_in_xp: newXp, last_check_in: lastCheckIn } : p
      );
      setToasts((prev) => [
        ...prev,
        { id: toastId.current++, item, source: "CHECK-IN" },
      ]);
    })();
  }, [progress, supabase, userId]);

  const checkedInToday =
    progress?.last_check_in != null &&
    new Date(progress.last_check_in).toDateString() === now.toDateString();

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

        <ProfileHeader email={email} level={level} />

        {!progress ? (
          <section className="bg-[#fffdf5] p-6 text-center text-black pixel-frame pixel-shadow">
            <p className="font-retro text-2xl">MEMUAT DATA...</p>
          </section>
        ) : (
          <>
            <LevelCard xp={totalXp} />
            <CheckInButton checkedInToday={checkedInToday} onCheckIn={handleCheckIn} />
            <TimeTracker quitAt={quitAt} now={now} onSetQuitAt={handleSetQuitAt} />
            <SavingsCalculator
              quitAt={quitAt}
              now={now}
              pricePerPack={progress.price_per_pack}
              cigsPerDay={progress.cigs_per_day}
              onSettingsChange={handleSettingsChange}
            />
            <HealthTimeline quitAt={quitAt} now={now} />
            <Inventory items={inventory} />
          </>
        )}

        <SOSButton />
      </main>

      {toasts.map((toast) => (
        <ItemToast key={toast.id} toast={toast} />
      ))}

      <Footer />
    </>
  );
}