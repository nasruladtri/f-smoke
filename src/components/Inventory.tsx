"use client";

import { ITEMS } from "@/lib/items";
import { ItemIcon, rarityBg, rarityColor } from "@/components/PixelItems";

export interface OwnedItem {
  item_id: string;
  quantity: number;
}

export default function Inventory({ items }: { items: OwnedItem[] }) {
  return (
    <section className="bg-[#fffdf5] p-6 text-black pixel-frame pixel-shadow">
      <h2 className="font-pixel text-[10px] text-mario-red [text-shadow:2px_2px_0_#000] sm:text-xs">
        INVENTORY
      </h2>

      {items.length === 0 ? (
        <p className="mt-4 bg-mario-sky px-3 py-2 font-retro text-lg text-black/70 pixel-frame">
          Naik level atau check-in harian untuk mendapat item!
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {items.map(({ item_id, quantity }) => {
            const def = ITEMS.find((item) => item.id === item_id);
            if (!def) return null;
            return (
              <div
                key={item_id}
                title={def.description}
                className={`${rarityBg(def.rarity)} p-3 text-center pixel-frame pixel-shadow-sm`}
              >
                <ItemIcon id={item_id} className="mx-auto h-10 w-10" />
                <p
                  className={`mt-2 font-pixel text-[7px] leading-tight ${rarityColor(def.rarity)}`}
                >
                  {def.name.toUpperCase()}
                </p>
                <p className="font-retro text-lg text-black">x{quantity}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}