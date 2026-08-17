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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
        Timeline Pemulihan Kesehatan
      </h2>
      {!quitAt && (
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
          Atur waktu berhenti di tracker untuk melihat progres pemulihanmu.
        </p>
      )}

      <ol className="mt-6 space-y-5 border-l-2 border-slate-200 pl-5">
        {MILESTONES.map((milestone) => {
          const passed = minutesElapsed >= milestone.minutes;
          return (
            <li key={milestone.label} className="relative">
              <span
                className={`absolute -left-[27px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  passed
                    ? "border-teal-500 bg-teal-500 text-white"
                    : "border-slate-300 bg-white text-slate-400"
                }`}
              >
                {passed ? <CheckIcon className="h-3 w-3" /> : null}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span
                  className={`text-sm font-bold ${
                    passed ? "text-teal-700" : "text-slate-400"
                  }`}
                >
                  {milestone.label}
                </span>
                {passed && (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-600">
                    Tercapai
                  </span>
                )}
              </div>
              <p
                className={`text-sm ${
                  passed ? "text-slate-700" : "text-slate-400"
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