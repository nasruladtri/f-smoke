"use client";

import { useState } from "react";
import { ITEMS, type ItemDef } from "@/lib/items";
import { ItemIcon, rarityBg, rarityColor } from "@/components/PixelItems";
import { BagIcon } from "@/components/PixelIcons";
import { useLanguage } from "@/lib/i18n";

export interface OwnedItem {
  item_id: string;
  quantity: number;
}

function ItemDetailModal({
  item,
  quantity,
  onClose,
}: {
  item: ItemDef;
  quantity: number;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const name = t(`item_${item.id}_name`);
  const description = t(`item_${item.id}_desc`);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
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
        <button
          onClick={onClose}
          className="pixel-btn mt-4 w-full bg-mario-blue text-white"
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}

export default function InventoryScreen({ items }: { items: OwnedItem[] }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<ItemDef | null>(null);
  const ownedMap = new Map(
    items.filter((i) => i.quantity > 0).map((i) => [i.item_id, i.quantity])
  );
  const ownedList = [...ownedMap.entries()].map(([item_id, quantity]) => ({
    item_id,
    quantity,
  }));
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const collected = ownedMap.size;

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-pixel text-xl text-white pixel-outline sm:text-2xl">
          {t("inv_title")}
        </h1>
        <p className="font-retro text-2xl text-black/60">{t("inv_subtitle")}</p>
      </header>

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

      {selected && (
        <ItemDetailModal
          item={selected}
          quantity={ownedMap.get(selected.id) ?? 0}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}