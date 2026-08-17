"use client";

import { signOut } from "@/app/actions";

interface ProfileHeaderProps {
  email: string;
  level: number;
}

export default function ProfileHeader({ email, level }: ProfileHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 bg-[#fffdf5] p-4 text-black pixel-frame pixel-shadow">
      <div className="min-w-0">
        <p className="font-pixel text-[8px] text-slate-500">PLAYER</p>
        <p className="truncate font-retro text-xl text-black">{email}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="bg-mario-yellow px-2 py-1 font-pixel text-[9px] text-black pixel-frame">
          LV {level}
        </span>
        <form action={signOut}>
          <button className="pixel-btn !px-3 !py-2 bg-mario-red text-white">
            Keluar
          </button>
        </form>
      </div>
    </header>
  );
}