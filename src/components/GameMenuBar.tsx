"use client";

import { BagIcon, CheckInIcon, HomeIcon, TaskIcon } from "@/components/PixelIcons";

export type GameScreen = "home" | "tasks" | "checkin" | "inventory";

interface GameMenuBarProps {
  active: GameScreen;
  onChange: (screen: GameScreen) => void;
}

const MENU_ITEMS: { id: GameScreen; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "HOME", icon: <HomeIcon className="h-6 w-6" /> },
  { id: "tasks", label: "TASK", icon: <TaskIcon className="h-6 w-6" /> },
  { id: "checkin", label: "CHECK-IN", icon: <CheckInIcon className="h-6 w-6" /> },
  { id: "inventory", label: "KANTONG", icon: <BagIcon className="h-6 w-6" /> },
];

export default function GameMenuBar({ active, onChange }: GameMenuBarProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-black bg-mario-dark">
      <div className="mx-auto grid w-full max-w-lg grid-cols-4">
        {MENU_ITEMS.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1 border-r-4 border-black py-2.5 transition-colors last:border-r-0 ${
                isActive
                  ? "bg-mario-yellow text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {icon}
              <span className="font-pixel text-[7px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}