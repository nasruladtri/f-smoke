"use client";

interface CheckInButtonProps {
  checkedInToday: boolean;
  onCheckIn: () => void;
}

export default function CheckInButton({
  checkedInToday,
  onCheckIn,
}: CheckInButtonProps) {
  return (
    <button
      onClick={onCheckIn}
      disabled={checkedInToday}
      className={`pixel-btn w-full ${
        checkedInToday
          ? "bg-slate-300 text-slate-500"
          : "bg-mario-yellow text-black"
      }`}
    >
      {checkedInToday ? "SUDAH CHECK-IN HARI INI" : "CHECK-IN HARIAN (+25 XP + ITEM)"}
    </button>
  );
}