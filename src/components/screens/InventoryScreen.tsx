"use client";

import { useState } from "react";
import {
  BUY_COST,
  ITEMS,
  SELL_PRICES,
  type ItemDef,
  type Rarity,
} from "@/lib/items";
import { ItemIcon, rarityBg, rarityColor } from "@/components/PixelItems";
import { BagIcon, CoinIcon, ShopIcon } from "@/components/PixelIcons";
import { useLanguage } from "@/lib/i18n";

export interface OwnedItem {
  item_id: string;
  quantity: number;
}

interface InventoryScreenProps {
  items: OwnedItem[];
  coins: number;
  onSell: (itemId: string) => Promise<boolean>;
  onBuy: () => Promise<ItemDef | null>;
}

function ItemDetailModal({
  item,
  quantity,
  onClose,
  onSell,
}: {
  item: ItemDef;
  quantity: number;
  onClose: () => void;
  onSell: (itemId: string) => Promise<boolean>;
}) {
  const { t } = useLanguage();
  const [confirming, setConfirming] = useState(false);
  const [selling, setSelling] = useState(false);
  const price = SELL_PRICES[item.rarity];
  const name = t(`item_${item.id}_name`);
  const description = t(`item_${item.id}_desc`);

  const handleSell = async () => {
    setSelling(true);
    const ok = await onSell(item.id);
    setSelling(false);
    if (ok) {
      setConfirming(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={() => !confirming && onClose()}
    >
      <div
        className="w-full max-w-xs bg-[#fffdf5] p-4 text-center pixel-frame pixel-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mx-auto grid h-24 w-24 place-items-center border-4 border-black ${rarityBg(
            item.rarity
          )}`}
        >
          <ItemIcon id={item.id} className={`h-16 w-16 ${rarityColor(item.rarity)}`} />
        </div>
        <p className={`mt-3 font-pixel text-[8px] ${rarityColor(item.rarity)}`}>
          {t(`rarity_${item.rarity}`)}
        </p>
        <p className="mt-1 font-pixel text-[12px] text-black">{name}</p>
        <p className="mt-2 font-retro text-lg leading-tight text-black/60">
          {description}
        </p>
        <p className="mt-2 font-pixel text-[9px] text-mario-green">
          {t("inv_owned", { n: quantity })}
        </p>

        {confirming ? (
          <div className="mt-4 border-4 border-black bg-mario-red/10 p-3">
            <p className="font-pixel text-[8px] text-black">
              {t("sell_confirm_title")}
            </p>
            <p className="mt-1 font-retro text-lg leading-tight text-black/70">
              {t("sell_confirm_text", { name, n: price })}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="pixel-btn flex-1 bg-slate-200 text-black"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSell}
                disabled={selling}
                className="pixel-btn flex-1 bg-mario-red text-white"
              >
                {selling ? "..." : t("inv_sell")}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={onClose}
              className="pixel-btn bg-mario-blue text-white"
            >
              {t("close")}
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="pixel-btn bg-mario-red text-white"
            >
              {t("inv_sell")} +{price}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InventoryScreen({
  items,
  coins,
  onSell,
  onBuy,
}: InventoryScreenProps) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"bag" | "shop">("bag");
  const [selected, setSelected] = useState<ItemDef | null>(null);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState(false);
  const [bought, setBought] = useState<ItemDef | null>(null);

  const ownedMap = new Map(
    items.filter((i) => i.quantity > 0).map((i) => [i.item_id, i.quantity])
  );
  const ownedList = [...ownedMap.entries()].map(([item_id, quantity]) => ({
    item_id,
    quantity,
  }));
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const collected = ownedMap.size;

  const handleBuy = async () => {
    setBuying(true);
    setBuyError(false);
    const item = await onBuy();
    setBuying(false);
    if (item) {
      setBought(item);
    } else {
      setBuyError(true);
    }
  };

  const sell = async (itemId: string) => {
    const ok = await onSell(itemId);
    if (ok) setSelected(null);
    return ok;
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          {t("inv_title")}
        </h1>
        <p className="font-retro text-2xl text-black/60">{t("inv_subtitle")}</p>
      </header>

      <div className="grid grid-cols-2 border-4 border-black">
        <button
          onClick={() => setTab("bag")}
          className={`flex items-center justify-center gap-2 py-2.5 font-pixel text-[8px] ${
            tab === "bag" ? "bg-mario-yellow text-black" : "bg-mario-dark text-white/60"
          }`}
        >
          <BagIcon className="h-4 w-4" /> {t("inv_tab_bag")}
        </button>
        <button
          onClick={() => setTab("shop")}
          className={`flex items-center justify-center gap-2 py-2.5 font-pixel text-[8px] ${
            tab === "shop" ? "bg-mario-yellow text-black" : "bg-mario-dark text-white/60"
          }`}
        >
          <ShopIcon className="h-4 w-4" /> {t("inv_tab_shop")}
        </button>
      </div>

      {tab === "bag" ? (
        <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
          <div className="flex items-center justify-between border-4 border-black bg-mario-dark p-2">
            <p className="flex items-center gap-2 font-pixel text-[8px] text-white">
              <BagIcon className="h-4 w-4 text-mario-yellow" /> {t("inv_total")}
            </p>
            <p className="font-pixel text-[10px] text-mario-yellow">
              {totalItems}
            </p>
          </div>
          <p className="mt-2 text-center font-retro text-lg text-black/60">
            {t("inv_collection", { a: collected, b: ITEMS.length })}
          </p>
          <div className="mt-3">
            {ownedList.length === 0 ? (
              <div className="border-4 border-black bg-slate-100 p-8 text-center">
                <BagIcon className="mx-auto h-10 w-10 text-black/30" />
                <p className="mt-3 font-pixel text-[9px] text-black/60">
                  {t("inv_empty_title")}
                </p>
                <p className="mt-2 font-retro text-lg leading-tight text-black/50">
                  {t("inv_empty_text")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-3">
                {ownedList.map(({ item_id, quantity }) => {
                  const item = ITEMS.find((i) => i.id === item_id) ?? ITEMS[0];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className={`relative flex flex-col items-center gap-1 border-4 border-black p-2 transition-transform hover:scale-105 ${rarityBg(
                        item.rarity
                      )}`}
                    >
                      <span className="relative">
                        <ItemIcon
                          id={item.id}
                          className={`h-8 w-8 sm:h-10 sm:w-10 ${rarityColor(
                            item.rarity
                          )}`}
                        />
                        <span className="absolute -right-2 -top-2 border-2 border-black bg-mario-red px-1 font-pixel text-[7px] text-white">
                          x{quantity}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-[#fffdf5] p-4 pixel-frame pixel-shadow">
          <div className="flex items-center justify-between border-4 border-black bg-mario-dark p-2">
            <p className="flex items-center gap-2 font-pixel text-[8px] text-white">
              <CoinIcon className="h-4 w-4" /> {t("shop_coin")}
            </p>
            <p className="font-pixel text-[10px] text-mario-yellow tabular-nums">
              {coins}
            </p>
          </div>
          <p className="mt-2 text-center font-retro text-lg text-black/60">
            {t("shop_desc")}
          </p>

          <div className="mt-4 border-4 border-black bg-mario-blue p-4 text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center border-4 border-black bg-mario-yellow pixel-frame">
              <span className="font-pixel text-4xl text-black">?</span>
            </div>
            <p className="mt-3 font-pixel text-[10px] text-white">
              {t("shop_box")}
            </p>
            <p className="mt-1 font-retro text-lg leading-tight text-white/70">
              {t("shop_box_desc")}
            </p>
            <p className="mt-2 font-pixel text-[8px] text-mario-sky">
              {t("shop_cost", { n: BUY_COST })}
            </p>
            <button
              onClick={handleBuy}
              disabled={buying}
              className={`pixel-btn mt-3 w-full ${
                coins < BUY_COST
                  ? "cursor-not-allowed bg-slate-400 text-white"
                  : "bg-mario-yellow text-black"
              }`}
            >
              {buying ? "..." : t("shop_buy")}
            </button>
            {buyError && (
              <p className="mt-2 font-retro text-lg leading-tight text-white">
                {t("shop_no_coin")}
              </p>
            )}
          </div>

          <p className="mt-3 text-center font-retro text-base leading-snug text-black/50">
            {t("shop_legend_chance")}
          </p>
        </section>
      )}

      {selected && (
        <ItemDetailModal
          item={selected}
          quantity={ownedMap.get(selected.id) ?? 0}
          onClose={() => setSelected(null)}
          onSell={sell}
        />
      )}

      {bought && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setBought(null)}
        >
          <div
            className="w-full max-w-xs bg-[#fffdf5] p-4 text-center pixel-frame pixel-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-pixel text-[10px] text-mario-green">
              {t("shop_bought")}
            </p>
            <div
              className={`mx-auto mt-3 grid h-24 w-24 place-items-center border-4 border-black ${rarityBg(
                bought.rarity
              )}`}
            >
              <ItemIcon
                id={bought.id}
                className={`h-16 w-16 ${rarityColor(bought.rarity)}`}
              />
            </div>
            <p className={`mt-3 font-pixel text-[8px] ${rarityColor(bought.rarity)}`}>
              {t(`rarity_${bought.rarity as Rarity}`)}
            </p>
            <p className="mt-1 font-pixel text-[12px] text-black">
              {t(`item_${bought.id}_name`)}
            </p>
            <button
              onClick={() => setBought(null)}
              className="pixel-btn mt-4 w-full bg-mario-blue text-white"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}