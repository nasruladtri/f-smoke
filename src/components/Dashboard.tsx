"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNow } from "@/hooks/useNow";
import { createClient } from "@/lib/supabase/client";
import { CHECK_IN_XP, levelFromXp, levelProgress, milestoneXp, timeXp } from "@/lib/levels";
import { rollItem } from "@/lib/items";
import { elapsedMinutes } from "@/lib/format";
import SOSButton from "@/components/SOSButton";
import ItemToast, { type Toast } from "@/components/ItemToast";
import GameTopBar from "@/components/GameTopBar";
import GameMenuBar, { type GameScreen } from "@/components/GameMenuBar";
import HomeScreen from "@/components/screens/HomeScreen";
import TasksScreen from "@/components/screens/TasksScreen";
import CheckInScreen from "@/components/screens/CheckInScreen";
import InventoryScreen, { type OwnedItem } from "@/components/screens/InventoryScreen";

interface ProgressRow {
  quit_at: string | null;
  price_per_pack: number;
  cigs_per_day: number;
  check_in_xp: number;
  last_check_in: string | null;
  last_rewarded_level: number;
  streak: number;
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
  const [screen, setScreen] = useState<GameScreen>("home");
  const toastId = useRef(0);

  const pushError = useCallback((message: string) => {
    console.error("F-Smoke:", message);
    setToasts((prev) => [...prev, { id: toastId.current++, message }]);
  }, []);

  const saveProgress = useCallback(
    async (updates: Partial<ProgressRow>) => {
      const { error } = await supabase
        .from("user_progress")
        .upsert({ user_id: userId, ...updates }, { onConflict: "user_id" });
      if (error) pushError(error.message);
    },
    [supabase, userId, pushError]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        pushError("Gagal memuat data player.");
        return;
      }

      if (data) {
        setProgress(data as ProgressRow);
      } else {
        const { data: inserted, error: upsertError } = await supabase
          .from("user_progress")
          .upsert(
            { user_id: userId, price_per_pack: 20000, cigs_per_day: 15 },
            { onConflict: "user_id" }
          )
          .select()
          .maybeSingle();
        if (upsertError) {
          pushError("Gagal membuat data player.");
          return;
        }
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
  }, [supabase, userId, pushError]);

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
  const xpMeta = levelProgress(totalXp);

  useEffect(() => {
    if (!progress || !quitAt) return;
    const baseLevel = progress.last_rewarded_level;
    const currentLevel = levelFromXp(totalXp);

    if (currentLevel > baseLevel) {
      const gained = currentLevel - baseLevel;
      const drops = Array.from({ length: gained }, () => rollItem());

      void (async () => {
        for (const item of drops) {
          const { error } = await supabase.rpc("add_item", {
            p_item_id: item.id,
          });
          if (error) pushError("Hadiah level gagal disimpan.");
        }
        await saveProgress({ last_rewarded_level: currentLevel });

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
  }, [progress, totalXp, quitAt, supabase, userId, saveProgress, pushError]);

  const handleSetQuitAt = useCallback(
    (date: Date | null) => {
      setProgress((p) =>
        p ? { ...p, quit_at: date ? date.toISOString() : null } : p
      );
      void saveProgress({ quit_at: date ? date.toISOString() : null });
    },
    [saveProgress]
  );

  const handleSettingsChange = useCallback(
    (price: number, cigs: number) => {
      setProgress((p) =>
        p ? { ...p, price_per_pack: price, cigs_per_day: cigs } : p
      );
      void saveProgress({ price_per_pack: price, cigs_per_day: cigs });
    },
    [saveProgress]
  );

  const handleCheckIn = useCallback(() => {
    if (!progress) return;
    const item = rollItem();
    const newXp = progress.check_in_xp + CHECK_IN_XP;
    const lastCheckIn = new Date().toISOString();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const last = progress.last_check_in
      ? new Date(progress.last_check_in)
      : null;
    const newStreak =
      last && last.toDateString() === yesterday.toDateString()
        ? (progress.streak ?? 0) + 1
        : 1;

    void (async () => {
      const { error } = await supabase.rpc("add_item", {
        p_item_id: item.id,
      });
      if (error) pushError("Item check-in gagal disimpan.");
      await saveProgress({ check_in_xp: newXp, last_check_in: lastCheckIn });

      const { error: streakError } = await supabase
        .from("user_progress")
        .update({ streak: newStreak })
        .eq("user_id", userId);
      if (streakError) {
        console.warn("F-Smoke: streak tidak tersimpan:", streakError.message);
      }

      const { data: inv } = await supabase
        .from("inventory")
        .select("item_id, quantity")
        .eq("user_id", userId);
      if (inv) setInventory(inv as OwnedItem[]);

      setProgress((p) =>
        p
          ? {
              ...p,
              check_in_xp: newXp,
              last_check_in: lastCheckIn,
              streak: newStreak,
            }
          : p
      );
      setToasts((prev) => [
        ...prev,
        { id: toastId.current++, item, source: "CHECK-IN" },
      ]);
    })();
  }, [progress, saveProgress, supabase, userId, pushError]);

  const checkedInToday =
    progress?.last_check_in != null &&
    new Date(progress.last_check_in).toDateString() === now.toDateString();

  return (
    <>
      <GameTopBar
        email={email}
        level={level}
        xp={totalXp}
        xpProgress={xpMeta.progress}
      />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-28 pt-20 sm:py-24">
        {!progress ? (
          <section className="mt-10 bg-[#fffdf5] p-6 text-center text-black pixel-frame pixel-shadow">
            <p className="animate-pulse font-retro text-2xl">
              MEMUAT DUNIA GAME...
            </p>
          </section>
        ) : (
          <div key={screen} className="screen-fade">
            {screen === "home" && (
              <HomeScreen
                level={level}
                xp={totalXp}
                xpProgress={xpMeta.progress}
                streak={progress.streak ?? 0}
                quitAt={quitAt}
                now={now}
                onSetQuitAt={handleSetQuitAt}
                pricePerPack={progress.price_per_pack}
                cigsPerDay={progress.cigs_per_day}
                onSettingsChange={handleSettingsChange}
              />
            )}
            {screen === "tasks" && (
              <TasksScreen
                minutes={minutes}
                checkedInToday={checkedInToday}
                streak={progress.streak ?? 0}
              />
            )}
            {screen === "checkin" && (
              <CheckInScreen
                checkedInToday={checkedInToday}
                streak={progress.streak ?? 0}
                onCheckIn={handleCheckIn}
              />
            )}
            {screen === "inventory" && <InventoryScreen items={inventory} />}
          </div>
        )}

        <SOSButton />
      </main>

      {toasts.map((toast) => (
        <ItemToast key={toast.id} toast={toast} />
      ))}

      <GameMenuBar active={screen} onChange={setScreen} />
    </>
  );
}