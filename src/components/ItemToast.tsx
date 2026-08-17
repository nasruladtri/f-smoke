"use client";

import type { ItemDef } from "@/lib/items";
import { ItemIcon } from "@/components/PixelItems";

export interface Toast {
  id: number;
  item: ItemDef;
  source: string;
}

export default function ItemToast({ toast }: { toast: Toast }) {
  return (
    <div className="fixed bottom-20 left-4 z-50 flex max-w-[280px] items-center gap-3 bg-[#fffdf5] p-3 text-black pixel-frame pixel-shadow">
      <ItemIcon id={toast.item.id} className="h-9 w-9 shrink-0" />
      <div className="min-w-0">
        <p className="font-pixel text-[8px] text-mario-green">ITEM DIDAPAT!</p>
        <p className="truncate font-retro text-lg leading-tight text-black">
          {toast.item.name} ({toast.source})
        </p>
      </div>
    </div>
  );
}