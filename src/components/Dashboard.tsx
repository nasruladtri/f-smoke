"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNow } from "@/hooks/useNow";
import { useSfx } from "@/hooks/useSfx";
import { createClient } from "@/lib/supabase/client";
import { CHECK_IN_XP, levelFromXp, levelProgress, milestoneXp, timeXp } from "@/lib/levels";
import { BUY_COST, ITEMS, rollItem, SELL_PRICES, type ItemDef } from "@/lib/items";
import { elapsedMinutes } from "@/lib/format";
import SOSButton from "@/components/SOSButton";
import ItemToast, { type Toast } from "@/components/ItemToast";
import GameTopBar from "@/components/GameTopBar";
import GameMenuBar, { type GameScreen } from "@/components/GameMenuBar";
import HomeScreen, { type LeaderboardEntry } from "@/components/screens/HomeScreen";
import TasksScreen, { type CravEntry } from "@/components/screens/TasksScreen";
import CheckInScreen from "@/components/screens/CheckInScreen";
import InventoryScreen, { type OwnedItem } from "@/components/screens/InventoryScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import MusicPlayer from "@/components/MusicPlayer";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

interface ProgressRow {
  quit_at: string | null;
  price_per_pack: number;
  cigs_per_day: number;
  check_in_xp: number;
  last_check_in: string | null;
  last_rewarded_level: number;
  streak: number;
  coins: number;
}

interface LeaderboardRow {
  name: string;
  check_in_xp: number;
  quit_at: string | null;
  streak: number;
  coins: number;
}

interface DashboardProps {
  userId: string;
  email: string;
}

export default function Dashboard({ userId, email }: DashboardProps) {
  const supabase = createClient();
  const now = useNow();
  const { play } = useSfx();
  const { t } = useLanguage();

  const [progress, setProgress] = useState<ProgressRow | null>(null);
  const [inventory, setInventory] = useState<OwnedItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [screen, setScreen] = useState<GameScreen>("home");
  const [displayName, setDisplayName] = useState(email.split("@")[0] || email);
  const [avatarItemId, setAvatarItemId] = useState<string | null>(null);
  const [musicOn, setMusicOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("f-smoke.music") !== "0";
  });
  const [sfxOn, setSfxOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("f-smoke.sfx") !== "0";
  });
  const [notifOn, setNotifOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("f-smoke.notif") === "1";
  });
  const [checkIns7, setCheckIns7] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [checkInTotal, setCheckInTotal] = useState(0);
  const [cravings, setCravings] = useState<CravEntry[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const toastId = useRef(0);

  const pushToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      setToasts((prev) => [...prev, { ...toast, id: toastId.current++ }]);
    },
    []
  );

  const pushError = useCallback(
    (message: string) => {
      console.error("F-Smoke:", message);
      pushToast({ message });
    },
    [pushToast]
  );

  const saveDisplayName = useCallback(
    async (name: string): Promise<boolean> => {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userId, display_name: name }, { onConflict: "id" });
      if (error) {
        pushError(error.message);
        return false;
      }
      setDisplayName(name);
      return true;
    },
    [supabase, userId, pushError]
  );

  const saveAvatar = useCallback(
    async (itemId: string | null): Promise<boolean> => {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userId, avatar_item_id: itemId }, { onConflict: "id" });
      if (error) {
        pushError(error.message);
        return false;
      }
      setAvatarItemId(itemId);
      return true;
    },
    [supabase, userId, pushError]
  );

  const saveProgress = useCallback(
    async (updates: Partial<ProgressRow>) => {
      const { error } = await supabase
        .from("user_progress")
        .upsert({ user_id: userId, ...updates }, { onConflict: "user_id" });
      if (error) pushError(error.message);
    },
    [supabase, userId, pushError]
  );

  const toggleMusic = useCallback(() => {
    setMusicOn((on) => {
      const next = !on;
      try {
        window.localStorage.setItem("f-smoke.music", next ? "1" : "0");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const toggleSfx = useCallback(() => {
    setSfxOn((on) => {
      const next = !on;
      try {
        window.localStorage.setItem("f-smoke.sfx", next ? "1" : "0");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const toggleNotif = useCallback(() => {
    setNotifOn((on) => {
      const next = !on;
      try {
        window.localStorage.setItem("f-smoke.notif", next ? "1" : "0");
      } catch {
        // ignore storage errors
      }
      if (next && typeof window !== "undefined" && "Notification" in window) {
        void Notification.requestPermission();
      }
      return next;
    });
  }, []);

  const refreshInventory = useCallback(async () => {
    const { data } = await supabase
      .from("inventory")
      .select("item_id, quantity")
      .eq("user_id", userId);
    if (data) setInventory(data as OwnedItem[]);
  }, [supabase, userId]);

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

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, avatar_item_id")
        .eq("id", userId)
        .maybeSingle();
      if (cancelled) return;
      if (profile?.display_name) {
        setDisplayName(profile.display_name);
      } else {
        const name = email.split("@")[0] || email;
        await supabase
          .from("profiles")
          .upsert({ id: userId, display_name: name }, { onConflict: "id" });
        setDisplayName(name);
      }
      setAvatarItemId(profile?.avatar_item_id ?? null);

      const from = new Date();
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      const { data: checkIns } = await supabase
        .from("check_ins")
        .select("created_at")
        .eq("user_id", userId)
        .gte("created_at", from.toISOString());
      if (!cancelled && checkIns) {
        const buckets = [0, 0, 0, 0, 0, 0, 0];
        for (const row of checkIns) {
          const day = new Date(row.created_at);
          const idx = Math.floor(
            (day.getTime() - from.getTime()) / (24 * 60 * 60 * 1000)
          );
          if (idx >= 0 && idx < 7) buckets[idx]++;
        }
        setCheckIns7(buckets);
      }

      const { count: total } = await supabase
        .from("check_ins")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId);
      if (!cancelled && total !== null) setCheckInTotal(total);

      const { data: crav } = await supabase
        .from("cravings")
        .select("id, note, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (!cancelled && crav) setCravings(crav as CravEntry[]);

      const { data: lb } = await supabase.rpc("get_leaderboard", {
        p_limit: 5,
      });
      if (!cancelled && lb) {
        setLeaderboard(
          (lb as LeaderboardRow[]).map((row) => {
            const minutes = row.quit_at
              ? Math.max(0, (Date.now() - new Date(row.quit_at).getTime()) / 60000)
              : 0;
            const totalXp = row.check_in_xp + timeXp(minutes) + milestoneXp(minutes);
            return {
              name: row.name,
              level: levelFromXp(totalXp),
              streak: row.streak ?? 0,
              xp: totalXp,
            };
          })
        );
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [supabase, userId, email, pushError]);

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

  const checkedInToday =
    progress?.last_check_in != null &&
    new Date(progress.last_check_in).toDateString() === now.toDateString();

  useEffect(() => {
    if (!progress || !quitAt) return;
    const baseLevel = progress.last_rewarded_level;
    const currentLevel = levelFromXp(totalXp);

    if (currentLevel > baseLevel) {
      const gained = currentLevel - baseLevel;
      const drops = Array.from({ length: gained }, () => rollItem());

      void (async () => {
        play("levelup");
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
  }, [progress, totalXp, quitAt, supabase, userId, saveProgress, pushError, play]);

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

      const { error: ciError } = await supabase
        .from("check_ins")
        .insert({ user_id: userId });
      if (ciError) console.warn("F-Smoke: check-in history:", ciError.message);

      await saveProgress({ check_in_xp: newXp, last_check_in: lastCheckIn });

      const { error: streakError } = await supabase
        .from("user_progress")
        .update({ streak: newStreak })
        .eq("user_id", userId);
      if (streakError) {
        console.warn("F-Smoke: streak tidak tersimpan:", streakError.message);
      }

      await refreshInventory();

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
      play("checkin");
      setTimeout(() => play("item"), 120);
      setCheckInTotal((n) => n + 1);
      setCheckIns7((b) => {
        const next = [...b];
        next[next.length - 1] += 1;
        return next;
      });
      pushToast({ item, source: "CHECK-IN" });
    })();
  }, [progress, saveProgress, supabase, userId, pushError, refreshInventory, play, pushToast]);

  const handleSell = useCallback(
    async (itemId: string): Promise<boolean> => {
      const item = ITEMS.find((i) => i.id === itemId);
      if (!item) return false;
      const { error } = await supabase.rpc("sell_item", {
        p_item_id: itemId,
        p_price: SELL_PRICES[item.rarity],
      });
      if (error) {
        pushError(error.message);
        return false;
      }
      play("sell");
      await refreshInventory();
      setProgress((p) =>
        p ? { ...p, coins: p.coins + SELL_PRICES[item.rarity] } : p
      );
      return true;
    },
    [supabase, pushError, refreshInventory, play]
  );

  const handleBuy = useCallback(async (): Promise<ItemDef | null> => {
    const { data, error } = await supabase.rpc("buy_item", { p_cost: BUY_COST });
    if (error || !data) {
      pushError(error?.message ?? "Gagal membeli.");
      return null;
    }
    play("buy");
    await refreshInventory();
    setProgress((p) =>
      p ? { ...p, coins: Math.max(0, p.coins - BUY_COST) } : p
    );
    const bought = ITEMS.find((i) => i.id === data) ?? null;
    return bought;
  }, [supabase, pushError, refreshInventory, play]);

  const handleAddCravings = useCallback(
    async (note: string): Promise<boolean> => {
      const { data, error } = await supabase
        .from("cravings")
        .insert({ user_id: userId, note })
        .select("id, note, created_at")
        .single();
      if (error) {
        pushError(error.message);
        return false;
      }
      setCravings((prev) => [data as CravEntry, ...prev].slice(0, 10));
      play("item");
      return true;
    },
    [supabase, userId, pushError, play]
  );

  useEffect(() => {
    if (!progress) return;
    if (checkedInToday) return;
    const id = setTimeout(() => {
      pushToast({ message: `${t("reminder_title")} ${t("reminder_text")}` });
    }, 4000);
    return () => clearTimeout(id);
  }, [progress, checkedInToday, pushToast, t]);

  useEffect(() => {
    if (!notifOn || !progress) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;

    const maybeNotify = () => {
      if (checkedInToday) return;
      if (Notification.permission !== "granted") return;
      try {
        new Notification("F-Smoke", { body: t("reminder_text") });
      } catch {
        // ignore
      }
    };

    const onLoad = setTimeout(maybeNotify, 8000);
    const interval = setInterval(maybeNotify, 30 * 60 * 1000);
    return () => {
      clearTimeout(onLoad);
      clearInterval(interval);
    };
  }, [notifOn, progress, checkedInToday, t]);

  const coins = progress?.coins ?? 0;
  const itemsCount = inventory.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <LanguageProvider>
      <GameTopBar
        displayName={displayName}
        avatarItemId={avatarItemId}
        level={level}
        xp={totalXp}
        xpProgress={xpMeta.progress}
        coins={coins}
      />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-28 pt-20 sm:py-24">
        {!progress ? (
          <LoadingScreen />
        ) : (
          <div key={screen} className="screen-fade">
            {screen === "home" && (
              <HomeScreen
                displayName={displayName}
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
                coins={coins}
                itemsCount={itemsCount}
                checkIns7={checkIns7}
                checkInTotal={checkInTotal}
                leaderboard={leaderboard}
              />
            )}
            {screen === "tasks" && (
              <TasksScreen
                minutes={minutes}
                checkedInToday={checkedInToday}
                streak={progress.streak ?? 0}
                level={level}
                coins={coins}
                checkInTotal={checkInTotal}
                collectedItems={inventory.filter((i) => i.quantity > 0).length}
                cravings={cravings}
                onAddCravings={handleAddCravings}
              />
            )}
            {screen === "checkin" && (
              <CheckInScreen
                checkedInToday={checkedInToday}
                streak={progress.streak ?? 0}
                onCheckIn={handleCheckIn}
              />
            )}
            {screen === "inventory" && (
              <InventoryScreen
                items={inventory}
                coins={coins}
                onSell={handleSell}
                onBuy={handleBuy}
              />
            )}
            {screen === "setting" && (
              <SettingsScreen
                musicOn={musicOn}
                onToggleMusic={toggleMusic}
                sfxOn={sfxOn}
                onToggleSfx={toggleSfx}
                notifOn={notifOn}
                onToggleNotif={toggleNotif}
                displayName={displayName}
                onSaveDisplayName={saveDisplayName}
                avatarItemId={avatarItemId}
                onSaveAvatar={saveAvatar}
                inventory={inventory}
              />
            )}
          </div>
        )}

        <SOSButton />
      </main>

      {toasts.map((toast) => (
        <ItemToast key={toast.id} toast={toast} />
      ))}

      <MusicPlayer enabled={musicOn} />

      <GameMenuBar active={screen} onChange={setScreen} />
    </LanguageProvider>
  );
}

function LoadingScreen() {
  const { t } = useLanguage();
  return (
    <section className="mt-10 bg-[#fffdf5] p-6 text-center text-black pixel-frame pixel-shadow">
      <p className="animate-pulse font-retro text-2xl">{t("loading")}</p>
    </section>
  );
}