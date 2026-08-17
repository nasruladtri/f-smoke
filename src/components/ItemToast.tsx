"use client";

import type { ItemDef } from "@/lib/items";
import { ItemIcon } from "@/components/PixelItems";

export interface Toast {
  id: number;
  item?: ItemDef;
  source?: string;
  message?: string;
}

export default function ItemToast({ toast }: { toast: Toast }) {
  if (toast.message) {
    return (
      <div className="fixed bottom-20 left-4 z-50 flex max-w-[280px] items-center gap-3 bg-[#fffdf5] p-3 text-black pixel-frame pixel-shadow">
        <span className="grid h-8 w-8 place-items-center border-4 border-black bg-mario-red font-pixel text-[10px] text-white">
          !
        </span>
        <div className="min-w-0">
          <p className="font-pixel text-[8px] text-mario-red">GAGAL SIMPAN</p>
          <p className="truncate font-retro text-lg leading-tight text-black">
            {toast.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 flex max-w-[280px] items-center gap-3 bg-[#fffdf5] p-3 text-black pixel-frame pixel-shadow">
      <ItemIcon id={toast.item!.id} className="h-9 w-9 shrink-0" />
      <div className="min-w-0">
        <p className="font-pixel text-[8px] text-mario-green">ITEM DIDAPAT!</p>
        <p className="truncate font-retro text-lg leading-tight text-black">
          {toast.item!.name} ({toast.source})
        </p>
      </div>
    </div>
  );
}