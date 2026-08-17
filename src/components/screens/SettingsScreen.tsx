"use client";

import { useState } from "react";
import { signOut } from "@/app/actions";
import { useLanguage } from "@/lib/i18n";
import { SOCIALS } from "@/lib/socials";
import { ITEMS } from "@/lib/items";
import { ItemIcon, rarityBg, rarityColor } from "@/components/PixelItems";
import {
  BellIcon,
  GlobeIcon,
  LogoutIcon,
  MusicIcon,
  SettingIcon,
  UserIcon,
} from "@/components/PixelIcons";
import type { OwnedItem } from "@/components/screens/InventoryScreen";

interface SettingsScreenProps {
  musicOn: boolean;
  onToggleMusic: () => void;
  sfxOn: boolean;
  onToggleSfx: () => void;
  notifOn: boolean;
  onToggleNotif: () => void;
  displayName: string;
  onSaveDisplayName: (name: string) => Promise<boolean>;
  avatarItemId: string | null;
  onSaveAvatar: (itemId: string | null) => Promise<boolean>;
  inventory: OwnedItem[];
}

export default function SettingsScreen({
  musicOn,
  onToggleMusic,
  sfxOn,
  onToggleSfx,
  notifOn,
  onToggleNotif,
  displayName,
  onSaveDisplayName,
  avatarItemId,
  onSaveAvatar,
  inventory,
}: SettingsScreenProps) {
  const { lang, setLang, t } = useLanguage();
  const [nameDraft, setNameDraft] = useState(displayName);
  const [nameStatus, setNameStatus] = useState<"idle" | "saving" | "saved" | "failed">(
    "idle"
  );
  const [confirmLogout, setConfirmLogout] = useState(false);

  const ownedItems = inventory
    .filter((i) => i.quantity > 0)
    .map((i) => ITEMS.find((item) => item.id === i.item_id))
    .filter((item): item is (typeof ITEMS)[number] => Boolean(item));

  const handleSaveName = async () => {
    const name = nameDraft.trim();
    if (!name) return;
    setNameStatus("saving");
    const ok = await onSaveDisplayName(name);
    setNameStatus(ok ? "saved" : "failed");
    setTimeout(() => setNameStatus("idle"), 2500);
  };

  const handleSaveAvatar = async (itemId: string | null) => {
    await onSaveAvatar(itemId);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          {t("set_title")}
        </h1>
        <p className="font-retro text-2xl text-black/60">{t("set_subtitle")}</p>
      </header>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-yellow text-black">
              <MusicIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="font-pixel text-[9px] text-black">{t("set_music")}</p>
              <p className="font-retro text-lg leading-tight text-black/60">
                {t("set_music_desc")}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleMusic}
            className={`shrink-0 px-3 py-2 font-pixel text-[8px] border-4 border-black transition-colors ${
              musicOn ? "bg-mario-green text-white" : "bg-slate-200 text-black/60"
            }`}
          >
            {musicOn ? t("on") : t("off")}
          </button>
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-blue text-white">
              <span className="font-pixel text-[12px]">♪</span>
            </span>
            <div>
              <p className="font-pixel text-[9px] text-black">{t("set_sfx")}</p>
              <p className="font-retro text-lg leading-tight text-black/60">
                {t("set_sfx_desc")}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleSfx}
            className={`shrink-0 px-3 py-2 font-pixel text-[8px] border-4 border-black transition-colors ${
              sfxOn ? "bg-mario-green text-white" : "bg-slate-200 text-black/60"
            }`}
          >
            {sfxOn ? t("on") : t("off")}
          </button>
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-red text-white">
              <BellIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="font-pixel text-[9px] text-black">{t("set_notif")}</p>
              <p className="font-retro text-lg leading-tight text-black/60">
                {t("set_notif_desc")}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleNotif}
            className={`shrink-0 px-3 py-2 font-pixel text-[8px] border-4 border-black transition-colors ${
              notifOn ? "bg-mario-green text-white" : "bg-slate-200 text-black/60"
            }`}
          >
            {notifOn ? t("on") : t("off")}
          </button>
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-sky text-black">
            <GlobeIcon className="h-7 w-7" />
          </span>
          <div>
            <p className="font-pixel text-[9px] text-black">{t("set_language")}</p>
            <p className="font-retro text-lg leading-tight text-black/60">
              {t("set_lang_desc")}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {(["id", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`pixel-btn ${
                lang === l ? "bg-mario-blue text-white" : "bg-slate-200 text-black"
              }`}
            >
              {l === "id" ? "Bahasa Indonesia" : "English"}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-green text-white">
            <UserIcon className="h-7 w-7" />
          </span>
          <div>
            <p className="font-pixel text-[9px] text-black">{t("set_username")}</p>
            <p className="font-retro text-lg leading-tight text-black/60">
              {t("set_username_desc")}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={nameDraft}
            onChange={(e) => {
              setNameDraft(e.target.value);
              setNameStatus("idle");
            }}
            maxLength={24}
            placeholder={t("set_username_placeholder")}
            className="w-full min-w-0 flex-1 bg-white px-3 py-3 font-retro text-xl text-black pixel-frame focus:bg-mario-yellow/20 outline-none"
          />
          <button
            onClick={handleSaveName}
            disabled={nameStatus === "saving" || !nameDraft.trim()}
            className="pixel-btn shrink-0 bg-mario-green text-white disabled:opacity-50"
          >
            {t("set_save")}
          </button>
        </div>
        {nameStatus === "saved" && (
          <p className="mt-2 font-retro text-lg text-mario-green">{t("set_saved")}</p>
        )}
        {nameStatus === "failed" && (
          <p className="mt-2 font-retro text-lg text-mario-red">{t("set_failed")}</p>
        )}
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-purple-600 text-white">
            {avatarItemId ? (
              <ItemIcon id={avatarItemId} className="h-8 w-8" />
            ) : (
              <UserIcon className="h-7 w-7" />
            )}
          </span>
          <div>
            <p className="font-pixel text-[9px] text-black">{t("set_avatar")}</p>
            <p className="font-retro text-lg leading-tight text-black/60">
              {t("set_avatar_desc")}
            </p>
          </div>
        </div>
        {ownedItems.length === 0 ? (
          <p className="mt-4 border-4 border-black bg-slate-100 p-4 text-center font-retro text-lg text-black/50">
            {t("set_avatar_empty")}
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-5 gap-3">
            <button
              onClick={() => handleSaveAvatar(null)}
              className={`flex flex-col items-center gap-1 border-4 border-black p-2 ${
                avatarItemId === null ? "bg-mario-yellow" : "bg-white"
              }`}
            >
              <span className="grid h-8 w-8 place-items-center border-2 border-black bg-slate-200 font-pixel text-[7px] text-black/60">
                X
              </span>
              <span className="font-pixel text-[5px] text-black/60">
                {t("set_avatar_none")}
              </span>
            </button>
            {ownedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSaveAvatar(item.id)}
                className={`flex flex-col items-center gap-1 border-4 border-black p-2 transition-transform hover:scale-105 ${
                  avatarItemId === item.id ? "bg-mario-yellow" : rarityBg(item.rarity)
                }`}
              >
                <ItemIcon
                  id={item.id}
                  className={`h-8 w-8 sm:h-10 sm:w-10 ${rarityColor(item.rarity)}`}
                />
                <span className="font-pixel text-[5px] text-black/70">
                  {t(`item_${item.id}_name`)}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-red text-white">
              <LogoutIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="font-pixel text-[9px] text-black">{t("logout")}</p>
              <p className="font-retro text-lg leading-tight text-black/60">
                {t("logout_hint")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setConfirmLogout(true)}
            className="pixel-btn shrink-0 bg-mario-red text-white"
          >
            {t("logout")}
          </button>
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center border-4 border-black bg-mario-blue text-white">
            <GlobeIcon className="h-7 w-7" />
          </span>
          <div>
            <p className="font-pixel text-[9px] text-black">{t("set_links")}</p>
            <p className="font-retro text-lg leading-tight text-black/60">
              {t("set_links_desc")}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {SOCIALS.map(({ labelKey, href }) => (
            <a
              key={labelKey}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn bg-white text-black text-center"
            >
              {t(labelKey)}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#fffdf5] p-4 text-center pixel-frame pixel-shadow">
        <p className="flex items-center justify-center gap-2 font-pixel text-[8px] text-black/50">
          <SettingIcon className="h-4 w-4" /> F-SMOKE
        </p>
        <p className="mt-2 font-pixel text-[7px] text-black/40">
          PRESENTED BY NASRUL ADITRI
        </p>
      </section>

      {confirmLogout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setConfirmLogout(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#fffdf5] p-6 text-center pixel-frame pixel-shadow"
            role="dialog"
            aria-modal="true"
            aria-label={t("logout_confirm_title")}
          >
            <h3 className="font-pixel text-xs text-mario-red [text-shadow:2px_2px_0_#000]">
              {t("logout_confirm_title")}
            </h3>
            <p className="mt-4 font-retro text-xl text-black/70">
              {t("logout_confirm_text")}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmLogout(false)}
                className="pixel-btn flex-1 bg-slate-200 text-black"
              >
                {t("cancel")}
              </button>
              <form action={signOut} className="flex-1">
                <button
                  type="submit"
                  className="pixel-btn w-full bg-mario-red text-white"
                >
                  {t("logout")}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}