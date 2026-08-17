"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { ShareIcon } from "@/components/PixelIcons";

interface ShareStreakButtonProps {
  displayName: string;
  level: number;
  streak: number;
  daysFree: number;
  coins: number;
}

export default function ShareStreakButton({
  displayName,
  level,
  streak,
  daysFree,
  coins,
}: ShareStreakButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { lang, t } = useLanguage();

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 600;
    const H = 400;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, W - 8, H - 8);

    ctx.textAlign = "center";
    ctx.fillStyle = "#e52521";
    ctx.font = "26px 'Press Start 2P', monospace";
    ctx.fillText("F-SMOKE", W / 2, 64);

    ctx.fillStyle = "#ffffff";
    ctx.font = "14px 'Press Start 2P', monospace";
    const name = displayName.length > 22 ? displayName.slice(0, 21) + "…" : displayName;
    ctx.fillText(`${name} — LV ${level}`, W / 2, 118);

    const dayLabel = lang === "en" ? "DAY STREAK" : "STREAK HARI";
    const freeLabel = lang === "en" ? "DAYS SMOKE-FREE" : "HARI BEBAS ROKOK";
    const coinLabel = lang === "en" ? "COINS" : "KOIN";

    ctx.fillStyle = "#ffd700";
    ctx.font = "44px 'Press Start 2P', monospace";
    ctx.fillText(String(streak), W / 2 - 150, 230);
    ctx.fillText(String(daysFree), W / 2, 230);
    ctx.fillText(String(coins), W / 2 + 150, 230);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px 'Press Start 2P', monospace";
    ctx.fillText(dayLabel, W / 2 - 150, 268);
    ctx.fillText(freeLabel, W / 2, 268);
    ctx.fillText(coinLabel, W / 2 + 150, 268);

    ctx.fillStyle = "#6ab8ff";
    ctx.font = "13px monospace";
    ctx.fillText("f-smoke.nasruladitri.space", W / 2, H - 32);

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b ?? new Blob()), "image/png")
    );
    const file = new File([blob], "f-smoke-card.png", { type: "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "F-Smoke" });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "f-smoke-card.png";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <canvas ref={canvasRef} width={600} height={400} className="hidden" />
      <button
        onClick={handleShare}
        className="pixel-btn flex w-full items-center justify-center gap-2 bg-mario-yellow text-black"
      >
        <ShareIcon className="h-4 w-4" /> {t("share")}
      </button>
    </>
  );
}