"use client";

import { useLanguage } from "@/lib/i18n";
import {
  BagIcon,
  CheckInIcon,
  HomeIcon,
  SettingIcon,
  TaskIcon,
} from "@/components/PixelIcons";

export type GameScreen = "home" | "tasks" | "checkin" | "inventory" | "setting";

interface GameMenuBarProps {
  active: GameScreen;
  onChange: (screen: GameScreen) => void;
}

export default function GameMenuBar({ active, onChange }: GameMenuBarProps) {
  const { t } = useLanguage();

  const MENU_ITEMS: { id: GameScreen; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: t("home"), icon: <HomeIcon className="h-6 w-6" /> },
    { id: "tasks", label: t("task"), icon: <TaskIcon className="h-6 w-6" /> },
    { id: "checkin", label: t("checkin"), icon: <CheckInIcon className="h-6 w-6" /> },
    { id: "inventory", label: t("inventory"), icon: <BagIcon className="h-6 w-6" /> },
    { id: "setting", label: t("setting"), icon: <SettingIcon className="h-6 w-6" /> },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-black bg-mario-dark">
      <div className="mx-auto grid w-full max-w-lg grid-cols-5">
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