"use client";

import { CheckIcon } from "@/components/icons";
import { MILESTONES } from "@/lib/content";
import { elapsedMinutes } from "@/lib/format";

interface HealthTimelineProps {
  quitAt: Date | null;
  now: Date;
}

export default function HealthTimeline({ quitAt, now }: HealthTimelineProps) {
  const minutesElapsed = quitAt ? elapsedMinutes(now, quitAt) : 0;

  return (
    <section className="bg-[#fffdf5] p-6 text-black pixel-frame pixel-shadow">
      <h2 className="font-pixel text-[10px] text-mario-red [text-shadow:2px_2px_0_#000] sm:text-xs">
        TIMELINE PEMULIHAN KESEHATAN
      </h2>
      {!quitAt && (
        <p className="mt-3 bg-mario-yellow px-3 py-2 font-retro text-lg text-black pixel-frame">
          Atur waktu berhenti di tracker untuk melihat progres pemulihanmu.
        </p>
      )}

      <ol className="mt-6 space-y-6 border-l-4 border-black pl-6">
        {MILESTONES.map((milestone) => {
          const passed = minutesElapsed >= milestone.minutes;
          return (
            <li key={milestone.label} className="relative">
              <span
                className={`absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center border-4 border-black ${
                  passed
                    ? "bg-mario-green text-white"
                    : "bg-white text-slate-400"
                }`}
              >
                {passed ? <CheckIcon className="h-3 w-3" /> : null}
              </span>
              <div className="flex flex-wrap items-center gap-x-3">
                <span
                  className={`font-pixel text-[9px] sm:text-[10px] ${
                    passed
                      ? "text-mario-green [text-shadow:1px_1px_0_#000]"
                      : "text-slate-400"
                  }`}
                >
                  {milestone.label}
                </span>
                {passed && (
                  <span className="bg-mario-yellow px-2 py-1 font-pixel text-[7px] text-black pixel-frame">
                    TERCAPAI
                  </span>
                )}
              </div>
              <p
                className={`mt-1 font-retro text-xl ${
                  passed ? "text-black/80" : "text-slate-400"
                }`}
              >
                {milestone.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}